import {
  SaleDetailEntity,
  SalePaymentEntity,
  TransactionStatus,
} from "./sale.entity";

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
}

export interface SaleDetailsDTO {
  payments: SalePaymentEntity[];
  serie: string;
  uuid: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  iva: number;
  items: SaleDetailEntity[];
  totalAmount: number;
  status: TransactionStatus;
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
  };
};

export const mapSaleDetailDTO = (obj: any): SaleDetailsDTO => {
  return {
    uuid: obj.uuid,
    customer: {
      firstName: obj.customerData.firstName,
      lastName: obj.customerData.lastName,
    },
    iva: obj.iva,
    items: obj.items,
    payments: obj.payments,
    totalAmount: obj.totalAmount,
    status: obj.status,
    serie: obj.serie,
  };
};
