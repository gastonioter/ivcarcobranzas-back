import { SaleDTO, SaleDTO } from "./sale.dto";
import {
  SalePaymentEntity,
  TransactionEntity,
  TransactionStatus,
} from "./sale.entity";

export interface SaleRepository {
  save(sale: TransactionEntity): Promise<TransactionEntity | null>;
  findById(uuid: string): Promise<SaleDTO | null>;
  getTotalSalesNumber(): Promise<number>;
  findAll(): Promise<SaleDTO[]>;
  changeStatus({
    uuid,
    status,
  }: {
    uuid: string;
    status: TransactionStatus;
  }): Promise<TransactionEntity | null>;
  addPayment(uuid: string, data: SalePaymentEntity): Promise<TransactionEntity>;

  updatePaymentStatus({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }): Promise<TransactionEntity>;

  getPayments(saleID: string): Promise<SalePaymentEntity[]>;
}
