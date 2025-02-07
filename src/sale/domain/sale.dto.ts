import { SalePaymentEntity, TransactionStatus } from "./sale.entity";

export interface SaleDTO {
  uuid: string;
  seller: {
    email: string;
  };
  customer: {
    firstName: string;
    lastName: string;
  };
  serie: string;
  status: TransactionStatus;
  totalAmount: number;
  createdAt: Date;
  payments: SalePaymentEntity[];
}

export const saleDTO = (obj: any): SaleDTO => {
  return {
    uuid: obj.uuid,
    seller: {
      email: obj.sellerData.email,
    },
    customer: {
      firstName: obj.customerData.firstName,
      lastName: obj.customerData.lastName,
    },
    serie: obj.serie,
    status: obj.status,
    totalAmount: obj.totalAmount,
    createdAt: obj.createdAt,
    payments: obj.payments,
  };
};
