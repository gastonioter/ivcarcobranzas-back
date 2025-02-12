import { CloudCategory } from "../../cloudCategory/domain/cloudCategory.entity";
import { Email } from "../../shared/valueObjects/email.vo";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CustomerEntity } from "./customer.entity";
import { IModalidadCliente } from "./interfaces/IModalidadCliente";
import { CustomerModalidad } from "./types";
import { CloudCustomer } from "./valueObjects/CloudCustomer.vo";
import { RegularCustomer } from "./valueObjects/RegularCustomer.vo";

export class CustomerFactory {
  static createCustomer(data: {
    firstName: string;
    lastName: string;
    email: Email;
    phone: string;
    modalidad: CustomerModalidad;
    category?: CloudCategory | null;
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

  static fromPersistence(data: any): CustomerEntity {
    let modalidad: IModalidadCliente;

    if (data.modalidad == CustomerModalidad.CLOUD) {
      console.log(data.cloudCategory.uuid);
      modalidad = new CloudCustomer(
        CloudCategory.fromPersistence({
          uuid: data.cloudCategory.uuid,
          name: data.cloudCategory.name,
          price: data.cloudCategory.price,
          description: data.cloudCategory.description,
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

export interface IPersistedCustomer {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  modalidad: string;
  modalidadData?: {
    uuid: string;
    name: string;
    price: number;
    description: string;
  };
  createdAt: Date;
} 

