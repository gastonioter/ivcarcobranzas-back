import { SalePayment } from "../salePayment.entity";

export function SalePaymentDTO(payment: SalePayment) {
  return {
    uuid: payment.getId(),
    amount: payment.getAmount(),
    paymentMethod: payment.getMethod(),
    status: payment.getStatus(),
    createdAt: payment.getCreatedAt(),
    isCupon: payment.isCuponPayment(),
  };
}
