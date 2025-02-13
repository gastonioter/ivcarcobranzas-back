import { SalePaymentRepository } from "../salePayment.repository";

export class SalePaymentUseCases {
  constructor(private salePaymentRepository: SalePaymentRepository) {}

  /* These methods are going to be called by the SaleUseCases */
  async updateSalePayment({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }) {
    return this.salePaymentRepository.update({
      saleID,
      paymentID,
      status,
    });
  }

  async findAll(saleID: string) {
    return this.salePaymentRepository.findAll(saleID);
  }
}
