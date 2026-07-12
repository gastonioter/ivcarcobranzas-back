import { UserEntity } from "../../user/domain/user.entity";
import { Detail, Transaction } from "../../transaction/domain/Transaction";
import { Customer } from "@/customerV2/domain/customer.entity.";

export function mapTransactionDTO(
  t: Transaction,
  c?: Customer,
  u?: UserEntity,
): ITransactionDTO {
  return {
    createdAt: t.getCreatedAt(),
    iva: t.getIva(),
    serie: t.getSerie(),
    uuid: t.getId(),
    customer: c ? mapCustomer(c) : undefined,
    details: mapDetails(t.getDetails()),
    seller: u ? { email: u.email } : undefined,
    totalAmount: t.getTotalAmount(),
  };
}

export interface ITransactionDTO {
  uuid: string;
  serie: string;
  details: DetailDTO[];
  customer?: SaleCustomerDTO;
  createdAt: Date;
  iva: number;
  totalAmount: number;
  seller?: SellerDTO;
}

interface SellerDTO {
  email: string;
}
interface DetailDTO {
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  uuid: string;
}

interface SaleCustomerDTO {
  uuid: string;
  firstName: string;
  lastName: string;
}

export function mapCustomer(customer: Customer): SaleCustomerDTO {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    uuid: customer.id,
  };
}

export function mapDetails(details: Detail[]): DetailDTO[] {
  return details.map((detail) => ({
    uuid: detail.uuid,
    product: detail.product,
    quantity: detail.quantity,
    unitPrice: detail.unitPrice,
    total: detail.unitPrice * detail.quantity,
  }));
}
