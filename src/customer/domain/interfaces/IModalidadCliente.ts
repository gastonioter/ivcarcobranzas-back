import { Cuota } from "@/cuota/domain/cuota.entity";
import { CloudCategory } from "../../../cloudCategory/domain/cloudCategory.entity";
import { CustomerModalidad, CustomerStatus } from "../types";
import { Pago } from "../pago.entity";

export interface IModalidadCliente {
  getModalidad(): CustomerModalidad;
  getCategoriaPago(): CloudCategory | null;
  addCuota(cuota: Cuota): void;
  getCuotas(): Cuota[] | [];
  updateCuota(cuotaId: string, status: string): void;
  addPago(pago: Pago): void;
  getPagos(): Pago[];
  getCuotasPtesPago(): Cuota[];
  generateCuotaForCurrentMonth(customerStatus: CustomerStatus): void;
}
