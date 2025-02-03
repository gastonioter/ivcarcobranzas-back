import { PaymentEntity } from "../domain/payment.entity";
import { PaymentRepository } from "../domain/payment.repository";
import { PaymentModel } from "./payment.shema";

export class PaymentMongoRespository implements PaymentRepository {
  public async save(payment: PaymentEntity): Promise<PaymentEntity | null> {
    const paymentDoc = await PaymentModel.create(payment);
    return paymentDoc;
  }

  public async list(): Promise<PaymentEntity[]> {
    return await PaymentModel.find({});
  }
}
