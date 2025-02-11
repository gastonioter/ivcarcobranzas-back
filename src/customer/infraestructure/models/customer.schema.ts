import { InferSchemaType, model, Schema } from "mongoose";
import { CustomerModalidad, CustomerStatus } from "../../domain/types";

interface ICustomer extends Document {
  /* Common properties */
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;

  modalidad: CustomerModalidad;
}

/* No se usa directamente para crear documentos, pero que sirve como base de      validaciones y definir el discrimiation union*/
const CustomerSchema = new Schema<ICustomer>(
  {
    uuid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(CustomerStatus),
      required: true,
    },
    modalidad: {
      type: String,
      required: true,
      enum: Object.values(CustomerModalidad),
    },
    createdAt: { type: Date, required: true },
    // updatedAt: { type: Date, required: true },
  },
  { discriminatorKey: "modalidad", timestamps: true },
);

export const CustomerModel = model<ICustomer>("Customer", CustomerSchema);

/* Specific Customers Types */
export interface ICloudCustomer extends ICustomer {
  categoryPriceId: string;
}

export interface IRegularCustomer extends ICustomer {}

const CloudCustomerSchema = new Schema<ICloudCustomer>({
  categoryPriceId: { type: String, required: true },
});

const RegularCustomerSchema = new Schema<IRegularCustomer>({});

/* .discriminator crea un submodelo  de tipo ICloudCustomer que hereda de CustomerModel, pero con un esquema diferente. */
export const CloudCustomerModel = CustomerModel.discriminator<ICloudCustomer>(
  CustomerModalidad.CLOUD, // discriminatorKey
  CloudCustomerSchema,
);

export const RegularCustomerModel =
  CustomerModel.discriminator<IRegularCustomer>(
    CustomerModalidad.REGULAR,
    RegularCustomerSchema,
  );

CustomerSchema.virtual("priceCategory", {
  ref: "PriceCategory",
  localField: "categoryPriceId",
  foreignField: "uuid",
  justOne: true,
});

CustomerSchema.set("toObject", { virtuals: true });
CustomerSchema.set("toJSON", { virtuals: true });

export type CustomerDoc = InferSchemaType<typeof CustomerSchema>;
