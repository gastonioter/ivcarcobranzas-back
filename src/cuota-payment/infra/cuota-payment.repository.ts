import { CuotaPayment } from "../domain/cuota-payment.entity";
import { CuotaPaymentRepository } from "../domain/cuota-payment.repository";
import { CuotaPaymentModel, ICuotaPayment } from "./cuota-payment.schema";

export class MongoCuotaPaymentRepository implements CuotaPaymentRepository {
  async findById(uuid: string): Promise<CuotaPayment | null> {
    const doc = await CuotaPaymentModel.findOne({ uuid });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async save(uuid: string, payment: CuotaPayment): Promise<void> {
    await CuotaPaymentModel.findOneAndUpdate(
      { uuid },
      this.toPersistence(payment),
      { upsert: true, new: true },
    );
  }

  private toPersistence(payment: CuotaPayment): ICuotaPayment {
    return {
      uuid:       payment.getId(),
      customerId: payment.customerId,
      lines:      payment.lines,
      serie:      payment.serie,
      createdAt:  payment.createdAt,
    };
  }

  private toDomain(doc: ICuotaPayment): CuotaPayment {
    return CuotaPayment.fromPersistence({
      uuid:       doc.uuid,
      customerId: doc.customerId,
      lines:      doc.lines,
      serie:      doc.serie,
      createdAt:  doc.createdAt,
    });
  }
}