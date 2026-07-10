import { CuotaPayment } from "./cuota-payment.entity";

export interface CuotaPaymentRepository {
    findById(uuid:string): Promise<CuotaPayment | null>;
    save(uuid:string, payment:CuotaPayment):Promise<void>;
}