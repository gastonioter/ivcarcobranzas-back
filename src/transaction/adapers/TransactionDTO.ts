import { CustomerEntity } from "../../customer/domain/customer.entity";
import { Detail, Transaction } from "../../transaction/domain/Transaction";

export function mapTransactionDTO(
  t: Transaction,
  c?: CustomerEntity,
): ITransactionDTO {
  console.log(t);
  return {
    createdAt: t.getCreatedAt(),
    iva: t.getIva(),
    serie: t.getSerie(),
    uuid: t.getId(),
    customer: c ? mapCustomer(c) : undefined,
    details: mapDetails(t.getDetails()),
    sellerId: t.getSellerId(),
  };
}

export interface ITransactionDTO {
  uuid: string;
  serie: string;
  details: DetailDTO[];
  customer?: SaleCustomerDTO;
  createdAt: Date;
  iva: number;
  sellerId: string;
}

interface DetailDTO {
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface SaleCustomerDTO {
  uuid: string;
  firstName: string;
  lastName: string;
}

export function mapCustomer(customer: CustomerEntity): SaleCustomerDTO {
  return {
    firstName: customer.getFirstName(),
    lastName: customer.getLastName(),
    uuid: customer.getId(),
  };
}

export function mapDetails(details: Detail[]): DetailDTO[] {
  return details.map((detail) => ({
    product: detail.product,
    quantity: detail.quantity,
    unitPrice: detail.unitPrice,
    total: detail.unitPrice * detail.quantity,
  }));
}
