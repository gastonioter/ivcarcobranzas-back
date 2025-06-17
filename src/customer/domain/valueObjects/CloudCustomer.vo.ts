import { CloudCategory } from "../../../cloudCategory/domain/cloudCategory.entity";
import { Cuota, CuotaStatus } from "../../../cuota/domain/cuota.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { Pago } from "../pago.entity";
import { CustomerModalidad, CustomerStatus } from "../types";

export class CloudCustomer implements IModalidadCliente {
  private category: CloudCategory;
  private cuotas: Cuota[];
  private pagos: Pago[];
  private resumenEnviado: boolean;

  constructor(
    category: CloudCategory,
    cuotas?: Cuota[],
    pagos?: Pago[],
    resumenEnviado?: boolean,
  ) {
    this.category = category;
    this.cuotas = cuotas || [];
    this.pagos = pagos || [];
    this.resumenEnviado = resumenEnviado ?? false;
  }

  addCuota(newCuota: Cuota): void {
    const repetedCuota = this.getCuotas().find(
      (cuota) =>
        cuota.getMonth() == newCuota.getMonth() &&
        cuota.getYear() == newCuota.getYear(),
    );
    if (repetedCuota) {
      throw new Error("El cliente ya tiene una cuota para el mismo mes y año");
    }
    this.cuotas.push(newCuota);
  }

  generateCuotaForCurrentMonth(customerStatus: CustomerStatus) {
    const status =
      customerStatus == CustomerStatus.ACTIVE
        ? CuotaStatus.PENDING
        : CuotaStatus.NO_SERVICE;

    const cuota = Cuota.new({
      amount: this.getCategoriaPago().getPrice(),
      status,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      secuence: this.getCuotas().length,
    });

    this.addCuota(cuota);
  }

  getCuotas(): Cuota[] {
    return this.cuotas;
  }

  getCuotasPtesPago(): Cuota[] {
    return this.cuotas.filter(
      (cuota) =>
        cuota.getStatus() === CuotaStatus.PENDING ||
        cuota.getStatus() === CuotaStatus.LATE,
    );
  }
  getPagos(): Pago[] {
    return this.pagos;
  }

  addPago(pago: Pago) {
    this.pagos.push(pago);
  }

  seEnvioResumen() {
    return this.resumenEnviado;
  }

  updateCuota(cuotaId: string, status: CuotaStatus) {
    const cuota = this.cuotas.find((cuota) => cuota.getId() === cuotaId);
    if (!cuota) {
      throw new Error("La cuota no existe");
    }
    cuota.setState(status);
  }
  getModalidad(): CustomerModalidad {
    return CustomerModalidad.CLOUD;
  }
  getCategoriaPago(): CloudCategory {
    return this.category;
  }

  existsCuotaForMonthAndYear(month: number, year: number): boolean {
    return this.cuotas.some(
      (cuota) => cuota.getMonth() === month && cuota.getYear() === year,
    );
  }
  setResumenEnviado(enviado: boolean): void {
    this.resumenEnviado = enviado;
  }
  getResumenEnviado() {
    return this.resumenEnviado;
  }
  esDeudor(): boolean {
    return this.getCuotasPtesPago().length >= 3;
  }
}
