import { CuotaPayment } from "../domain/cuota-payment.entity";

export interface CuotaPaymentDTO {
  uuid: string;
  customerId: string;
  lines: {
    month: number;
    year: number;
    amount: number;
  }[];
  sent: boolean;
  serie: string;
  createdAt: Date;
}

export const toDTO = (payment: CuotaPayment): CuotaPaymentDTO => {
  return {
    uuid: payment.getId(),
    customerId: payment.customerId,
    lines: payment.lines.map((line) => ({
      month: line.month,
      year: line.year,
      amount: line.amount,
    })),
    sent: payment.sent,
    serie: payment.serie,
    createdAt: payment.createdAt,
  };
};
