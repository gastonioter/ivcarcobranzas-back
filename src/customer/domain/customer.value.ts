import {
  CustomerEntity,
  CustomerStatus,
  CustomerType,
} from "./customer.entity";
import { v4 as uuid } from "uuid";

export class CustomerValue implements CustomerEntity {
  uuid: string;
  firstName: string;
  lastName: string;
  email?: string;
  type: CustomerType;
  status: string;
  phone: string;
  montoMes?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    firstName,
    lastName,
    email = "",
    type,
    phone,
    montoMes = 0,
  }: {
    firstName: string;
    lastName: string;
    email?: string;
    type: CustomerType;
    phone: string;
    montoMes?: number;
  }) {
    if (!firstName || !lastName || !phone) {
      throw new Error("El nombre, apellido y teléfono son requeridos");
    }

    if (!montoMes && type === CustomerType.CLOUD) {
      throw new Error("El monto mensual es requerido para los clientes cloud");
    }

    if (montoMes <= 0) {
      throw new Error("El monto mensual debe ser mayor a 0");
    }

    this.uuid = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.phone = phone;
    this.montoMes = montoMes;
    this.status = CustomerStatus.ACTIVE;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
