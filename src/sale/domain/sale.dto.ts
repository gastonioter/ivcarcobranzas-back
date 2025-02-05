import { SaleDetailEntity, SaleStatuses } from "./sale.entity";

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
  status: SaleStatuses;
  totalAmount: number;
  createdAt: Date;
}

export interface SaleDetailsDTO {
  uuid: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  iva: number;
  items: SaleDetailEntity[];
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
  };
};
