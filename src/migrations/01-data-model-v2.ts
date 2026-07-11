/**
 Migration script
 * Migration: Customer V1 → V2
 *
 * What this does:
 *   1. Reads every document from the "Customer" collection (v1)
 *   2. Inserts a flat document into "CustomerV2" (skips if already migrated)
 *   3. For Cloud customers: extracts embedded cuotas[] → inserts into "CuotaV2"
 *   4. For Cloud customers: extracts embedded pagos[] → inserts into "CuotaPayment"
 *
 * Safe to re-run: all inserts use upsert on uuid, so duplicates are skipped.
 *
 * Run:
 *   ENV=dev npx ts-node scripts/migrate-customer-v1-to-v2.ts
 */

import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// ---------------------------------------------------------------------------
// V1 types (read-only, we never write back to these collections)
// ---------------------------------------------------------------------------

interface V1Cuota {
  uuid: string;
  month: number;
  year: number;
  amount: number;
  status: string;
  serie: string;
  createdAt: Date;
}

interface V1Pago {
  uuid: string;
  total: number;
  serie: string;
  cuotas: V1Cuota[];
  createdAt: Date;
}

interface V1Customer {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cuit: string;
  status: string;
  modalidad: "Regular" | "Cloud";
  createdAt: Date;
  // Cloud-only
  cloudCategoryId?: string;
  cuotas?: V1Cuota[];
  pagos?: V1Pago[];
}

// ---------------------------------------------------------------------------
// V2 collection schemas (raw, no Mongoose overhead)
// ---------------------------------------------------------------------------

const CustomerV2Schema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cuit: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const CuotaV2Schema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const PaymentLineSchema = new mongoose.Schema(
  {
    cuotaId: { type: String, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false },
);

const CuotaPaymentSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    serie: { type: String, required: true, unique: true },
    lines: { type: [PaymentLineSchema], required: true },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const V1CustomerModel = mongoose.model<V1Customer & mongoose.Document>(
  "Customer",
  new mongoose.Schema({}, { strict: false }),
);
const CustomerV2Model = mongoose.model("CustomerV2", CustomerV2Schema);
const CuotaV2Model = mongoose.model("CuotaV2", CuotaV2Schema);
const CuotaPaymentModel = mongoose.model("CuotaPayment", CuotaPaymentSchema);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildMongoUri(): string {
  if (process.env.ENV === "dev") {
    return `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  }
  return `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
}

const upsertOpts = { upsert: true, new: true };

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function migrateCustomer(v1: V1Customer): Promise<void> {
  // 1. Upsert flat CustomerV2 document
  await CustomerV2Model.findOneAndUpdate(
    { uuid: v1.uuid },
    {
      uuid: v1.uuid,
      firstName: v1.firstName,
      lastName: v1.lastName,
      email: v1.email,
      phone: v1.phone,
      cuit: v1.cuit,
      status: v1.status,
      type: v1.modalidad, // "Regular" | "Cloud" — values match
      createdAt: v1.createdAt,
    },
    upsertOpts,
  );

  if (v1.modalidad !== "Cloud") return;

  // 2. Extract embedded cuotas → CuotaV2
  const cuotas = v1.cuotas ?? [];
  for (const cuota of cuotas) {
    await CuotaV2Model.findOneAndUpdate(
      { uuid: cuota.uuid },
      {
        uuid: cuota.uuid,
        customerId: v1.uuid,
        month: cuota.month,
        year: cuota.year,
        amount: cuota.amount,
        status: cuota.status,
        createdAt: cuota.createdAt,
      },
      upsertOpts,
    );
  }

  // 3. Extract embedded pagos → CuotaPayment
  const pagos = v1.pagos ?? [];
  for (const pago of pagos) {
    // Build payment lines from the cuotas snapshot embedded inside the pago
    const lines = pago.cuotas.map((c) => ({
      cuotaId: c.uuid,
      month: c.month,
      year: c.year,
      amount: c.amount,
    }));

    await CuotaPaymentModel.findOneAndUpdate(
      { uuid: pago.uuid },
      {
        uuid: pago.uuid,
        customerId: v1.uuid,
        serie: pago.serie,
        lines,
        createdAt: pago.createdAt,
      },
      upsertOpts,
    );
  }
}

async function run(): Promise<void> {
  await mongoose.connect(buildMongoUri());
  console.log("Connected to MongoDB");

  const customers = await V1CustomerModel.find({}).lean<V1Customer[]>();
  console.log(`Found ${customers.length} v1 customers to migrate`);

  let ok = 0;
  let failed = 0;

  for (const customer of customers) {
    try {
      await migrateCustomer(customer);
      console.log(`  ✓ ${customer.uuid} (${customer.modalidad})`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${customer.uuid}:`, err);
      failed++;
    }
  }

  console.log(`\nDone — ${ok} migrated, ${failed} failed`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
