import { Cuota } from "@/cuota/domain/cuota.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { CustomerModalidad } from "../types";

export class RegularCustomer implements IModalidadCliente {
  constructor() {}

  getModalidad(): CustomerModalidad {
    return CustomerModalidad.REGULAR;
  }
  getCategoriaPago(): null {
    return null;
  }
  addCuota(): void {
    throw new Error("Regular customers cannot have cuotas");
  }
  getCuotas() {
    return [];
  }
  getCuotasPtesPago(): Cuota[] {
    return [];
  }
  updateCuota(cuotaId: string, status: string): void {
    throw new Error("Regular customers cannot have cuotas");
  }

  addPago(): void {
    throw new Error("Regular customers cannot have pagos");
  }
  getPagos() {
    return [];
  }
}
