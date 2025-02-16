/* mapper DTO from a entity to be sent to the client */

import { SalePayment } from "@/transaction/salePayment/salePayment.entity";
import { CustomerEntity } from "../../../customer/domain/customer.entity";
import {
  ITransactionDTO,
  mapTransactionDTO,
} from "../../../transaction/adapers/TransactionDTO";
import { SalePaymentsDTO } from "../../../transaction/salePayment/infraestructure/outputSalePaymentDTO";
import { Sale, SaleStatus } from "../domain/sale.entity";
import { UserEntity } from "@/user/domain/user.entity";

interface SaleSummary {
  debe: number;
  haber: number;
}

interface ISaleDTO extends ITransactionDTO {
  summary: SaleSummary;
  status: SaleStatus;
  payments: SalePaymentsDTO[];
  discount?: number;
}

export default function SaleDTO(
  sale: Sale,
  customer?: CustomerEntity,
  seller?: UserEntity,
): ISaleDTO {
  return {
    ...mapTransactionDTO(sale, customer, seller),

    status: sale.getStatus(),
    discount: sale.getDiscount(),
    summary: {
      debe: sale.getTotalAmount(),
      haber: sale.getTotalPaid(),
    },
    payments: mapPayments(sale.getPayments()),
  };
}

function mapPayments(payments: SalePayment[]): SalePaymentsDTO[] {
  return payments.map((payment) => ({
    uuid: payment.getId(),
    createdAt: payment.getCreatedAt(),
    amount: payment.getAmount(),
    status: payment.getStatus(),
    paymentMethod: payment.getMethod(),
  }));
}
