import { PaymentEntity } from "./payment.entity";

export interface PaymentRepository {
  save(payment: PaymentEntity): Promise<PaymentEntity | null>;
  list(): Promise<PaymentEntity[]>;
}
