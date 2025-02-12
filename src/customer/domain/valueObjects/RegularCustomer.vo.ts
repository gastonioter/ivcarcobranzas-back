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
}
