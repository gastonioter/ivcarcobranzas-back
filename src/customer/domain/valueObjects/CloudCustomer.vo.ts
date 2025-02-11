import { PriceCategory } from "@/priceCategory/domain/priceCategory.entity";
import { IModalidadCliente } from "../interfaces/IModalidadCliente";
import { CustomerModalidad } from "../types";

export class CloudCustomer implements IModalidadCliente {
  private category: PriceCategory;

  constructor(category: PriceCategory) {
    this.category = category;
  }

  getModalidad(): CustomerModalidad {
    return CustomerModalidad.CLOUD;
  }
  getCategoriaPago(): PriceCategory {
    return this.category;
  }
}
