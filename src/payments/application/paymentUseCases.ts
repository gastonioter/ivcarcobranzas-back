import { PaymentRepository } from "../domain/payment.repository";
import { CreatePaymentRequest } from "../domain/payment.validations";
import { PaymentValue } from "../domain/payment.value";

export class PaymentUseCases {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  public createPayment = async (payment: CreatePaymentRequest) => {
    const paymentValue = new PaymentValue(payment);
    return await this.paymentRepository.save(paymentValue);
  };

  public findAllPayments = async () => {
    return await this.paymentRepository.list();
  };
}
