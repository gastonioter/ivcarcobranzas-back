import { Cuota } from "@/cuota/domain/cuota.entity";
import { CloudCategory } from "../../../cloudCategory/domain/cloudCategory.entity";
import { CustomerModalidad } from "../types";

export interface IModalidadCliente {
  getModalidad(): CustomerModalidad;
  getCategoriaPago(): CloudCategory | null;
  addCuota(cuota: Cuota): void;
  getCuotas(): Cuota[] | [];
}
