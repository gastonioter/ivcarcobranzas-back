import { PriceCategory } from "../../../priceCategory/domain/priceCategory.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { CustomerModalidad } from "../types";

export class RegularCustomer implements IModalidadCliente {
  constructor() {}

  getModalidad(): CustomerModalidad {
    return CustomerModalidad.REGULAR;
  }
  getCategoriaPago(): PriceCategory | null {
    return null;
  }
}
