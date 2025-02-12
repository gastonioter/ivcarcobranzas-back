export interface DetailDTO {
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface SaleCustomerDTO {
  firstName: string;
  lastName: string;
}
export interface ITransactionDTO {
  uuid: string;
  serie: string;
  details: DetailDTO[];
  customer?: SaleCustomerDTO;
  createdAt: Date;
  iva: number;
}
