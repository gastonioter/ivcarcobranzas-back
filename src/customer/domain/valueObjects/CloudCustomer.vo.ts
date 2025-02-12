import { CloudCategory } from "@/cloudCategory/domain/cloudCategory.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { CustomerModalidad } from "../types";

export class CloudCustomer implements IModalidadCliente {
  private category: CloudCategory;

  constructor(category: CloudCategory) {
    this.category = category;
  }

  getModalidad(): CustomerModalidad {
    return CustomerModalidad.CLOUD;
  }
  getCategoriaPago(): CloudCategory {
    return this.category;
  }
}
