import { CloudCategory } from "../../../cloudCategory/domain/cloudCategory.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { CustomerModalidad } from "../types";
import { Cuota, CuotaStatus } from "../../../cuota/domain/cuota.entity";
import { EntityId } from "@/shared/valueObjects/entityId.vo";
import { Pago } from "../pago.entity";

export class CloudCustomer implements IModalidadCliente {
  private category: CloudCategory;
  private cuotas: Cuota[];
  private pagos: Pago[];

  constructor(category: CloudCategory, cuotas?: Cuota[], pagos?: Pago[]) {
    this.category = category;
    this.cuotas = cuotas || [];
    this.pagos = pagos || [];
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

  generateCuotaForCurrentMonth() {
    const cuota = Cuota.new({
      amount: this.getCategoriaPago().getPrice(),
      status: CuotaStatus.PENDING,
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
    console.log(this.pagos);
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
}
