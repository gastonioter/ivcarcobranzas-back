import { CuotaPaymentFilters } from "../infra/cuota-payment.repository";
import { CuotaPayment } from "./cuota-payment.entity";

export interface CuotaPaymentRepository {
  save(uuid: string, payment: CuotaPayment): Promise<void>;
  findById(uuid: string): Promise<CuotaPayment | null>;
  findAll(filters?: CuotaPaymentFilters): Promise<CuotaPayment[]>;
}
