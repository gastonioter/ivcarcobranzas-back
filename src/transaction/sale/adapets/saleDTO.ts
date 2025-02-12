/* mapper DTO from a entity to be sent to the client */

import { Detail } from "../../../transaction/domain/Transaction";
import {
  DetailDTO,
  ITransactionDTO,
} from "../../../transaction/adapers/TransactionDTO";
import { Sale, SaleStatus } from "../domain/sale.entity";
import { CustomerEntity } from "../../../customer/domain/customer.entity";
import { SalePaymentsDTO } from "../../../transaction/salePayment/infraestructure/outputSalePaymentDTO";
import { SalePayment } from "@/transaction/salePayment/salePayment.entity";

interface SaleSummary {
  debe: number;
  haber: number;
}

interface ISaleDTO extends ITransactionDTO {
  summary: SaleSummary;
  status: SaleStatus;
  payments: SalePaymentsDTO[];
}

export default function SaleDTO(
  sale: Sale,
  customer?: CustomerEntity,
): ISaleDTO {
  return {
    uuid: sale.getId(),
    status: sale.getStatus(),
    serie: sale.getSerie(),
    payments: mapPayments(sale.getPayments()),
    details: mapDetails(sale.getDetails()),
    summary: {
      debe: sale.getTotalAmount(),
      haber: sale.getTotalPaid(),
    },
    customer: customer ? mapCustomer(customer) : undefined,
    createdAt: sale.getCreatedAt(),
    iva: sale.getIva(),
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

function mapCustomer(customer: CustomerEntity) {
  return {
    firstName: customer.getFirstName(),
    lastName: customer.getLastName(),
  };
}
function mapDetails(details: Detail[]): DetailDTO[] {
  return details.map((detail) => ({
    product: detail.product,
    quantity: detail.quantity,
    unitPrice: detail.unitPrice,
    total: detail.unitPrice * detail.quantity,
  }));
}
