import { PriceCategory } from "../../../priceCategory/domain/priceCategory.entity";
import { CustomerModalidad } from "../types";
import { CategoriaPago } from "../valueObjects/CategoriaPago";

export interface IModalidadCliente {
  getModalidad(): CustomerModalidad;
  getCategoriaPago(): PriceCategory | null;
  // resumenMonitoreo(): [];
}
