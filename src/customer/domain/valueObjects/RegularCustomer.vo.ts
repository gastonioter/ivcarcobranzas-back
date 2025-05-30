import { Cuota } from "@/cuota/domain/cuota.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { CustomerModalidad } from "../types";

export class RegularCustomer implements IModalidadCliente {
  constructor() {}
  existsCuotaForMonthAndYear(month: number, year: number): boolean {
    throw new Error("Regular customers cannot have cuotas");
  }
  esDeudor(): boolean {
    return false; // Regular customers do not have cuotas, so they cannot be debtors
  }

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
  generateCuotaForCurrentMonth() {
    throw new Error("Regular customers cannot have cuotas");
  }
}
