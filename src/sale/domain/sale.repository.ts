import { SaleDetailsDTO, SaleDTO } from "./sale.dto";
import { SalePaymentEntity, SaleEntity } from "./sale.entity";
import { UpdateSaleStatusRequestType } from "./sale.validations";

export interface SaleRepository {
  save(sale: SaleEntity): Promise<SaleEntity | null>;
  findById(uuid: string): Promise<SaleDetailsDTO | null>;
  getTotalSalesNumber(): Promise<number>;
  findAll(): Promise<SaleDTO[]>;
  changeStatus({
    uuid,
    status,
  }: UpdateSaleStatusRequestType): Promise<SaleEntity | null>;
  addPayment(uuid: string, data: SalePaymentEntity): Promise<SaleEntity>;

  updatePaymentStatus({
    saleID,
    paymentID,
    status,
  }: {
    saleID: string;
    paymentID: string;
    status: string;
  }): Promise<SaleEntity>;

  getPayments(saleID: string): Promise<SalePaymentEntity[]>;
}
