import { CloudCategory } from "../../../cloudCategory/domain/cloudCategory.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { CustomerModalidad } from "../types";
import { Cuota } from "../../../cuota/domain/cuota.entity";

export class CloudCustomer implements IModalidadCliente {
  private category: CloudCategory;
  private cuotas: Cuota[];

  constructor(category: CloudCategory, cuotas?: Cuota[]) {
    this.category = category;
    this.cuotas = cuotas || [];
  }

  addCuota(cuota: Cuota): void {
    this.cuotas.push(cuota);
  }

  getCuotas(): Cuota[] {
    return this.cuotas;
  }

  getModalidad(): CustomerModalidad {
    return CustomerModalidad.CLOUD;
  }
  getCategoriaPago(): CloudCategory {
    return this.category;
  }
}
