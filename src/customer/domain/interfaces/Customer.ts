import { Email } from "../../../shared/valueObjects/email.vo";
import { CustomerStatus } from "../types";
import { IModalidadCliente } from "./IModalidadCliente";
import { EntityId } from "../../../shared/valueObjects/entityId.vo";

export type Customer = {
  uuid: EntityId;
  firstName: string;
  lastName: string;
  email: Email;
  phone: string;
  status: CustomerStatus;
  modalidad: IModalidadCliente;
  cuit: string;
  createdAt: Date;
};
