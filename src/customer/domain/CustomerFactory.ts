import { PriceCategoryDoc } from "../../priceCategory/infraestructure/db.schema";
import { PriceCategory } from "../../priceCategory/domain/priceCategory.entity";
import { Email } from "../../shared/valueObjects/email.vo";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CustomerDoc } from "../infraestructure/models/customer.schema";
import { CustomerEntity } from "./customer.entity";
import { IModalidadCliente } from "./interfaces/IModalidadCliente";
import { CustomerModalidad } from "./types";
import { CloudCustomer } from "./valueObjects/CloudCustomer.vo";
import { RegularCustomer } from "./valueObjects/RegularCustomer.vo";

export class CustomerFactory {
  static createCustomer(data: {
    uuid: EntityId;
    firstName: string;
    lastName: string;
    email: Email;
    phone: string;
    modalidad: CustomerModalidad;
    category?: PriceCategory | null;
  }): CustomerEntity {
    let modalidad: IModalidadCliente;

    /* Asigno el objeto modalidad que corresponde */
    if (data.modalidad === CustomerModalidad.CLOUD) {
      if (!data.category) {
        throw new Error("Los clientes cloud deben tener una categoría de pago");
      }
      modalidad = new CloudCustomer(data.category);
    } else {
      modalidad = new RegularCustomer();
    }

    return CustomerEntity.create(
      data.firstName,
      data.lastName,
      data.email.getEmail(),
      data.phone,
      modalidad,
    );
  }

  static fromPersistence(
    data: CustomerDoc & { priceCategory?: PriceCategoryDoc },
  ): CustomerEntity {
    let modalidad: IModalidadCliente;

    if (data.priceCategory) {
      modalidad = new CloudCustomer(
        PriceCategory.fromPersistence({
          uuid: EntityId.fromExisting(data.priceCategory.uuid),
          name: data.priceCategory.name,
          price: data.priceCategory.price,
          description: data.priceCategory.description,
        }),
      );
    } else {
      modalidad = new RegularCustomer();
    }

    return new CustomerEntity({
      uuid: EntityId.fromExisting(data.uuid),
      firstName: data.firstName,
      lastName: data.lastName,
      email: Email.create(data.email),
      phone: data.phone,
      status: data.status,
      modalidad,
      createdAt: data.createdAt,
    });
  }
}
