import { Email } from "../../shared/valueObjects/email.vo";
import { CustomerModalidad, CustomerStatus } from "./types";
import { IModalidadCliente } from "./interfaces/IModalidadCliente";
import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { Customer } from "./interfaces/Customer";
import { CloudCategory } from "../../cloudCategory/domain/cloudCategory.entity";
import { Cuota, CuotaStatus } from "../../cuota/domain/cuota.entity";
import { Pago } from "./pago.entity";

export class CustomerEntity extends Entity {
  private firstName: string;
  private lastName: string;
  private email: Email;
  private phone: string;
  private status: CustomerStatus;
  private modalidad: IModalidadCliente;
  private createdAt: Date;

  constructor(customer: Customer) {
    super(customer.uuid);
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.email = customer.email;
    this.phone = customer.phone;
    this.status = customer.status;
    this.modalidad = customer.modalidad;
    this.createdAt = customer.createdAt;
  }

  static create(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    modalidad: IModalidadCliente,
  ): CustomerEntity {
    return new CustomerEntity({
      uuid: EntityId.create(),
      firstName,
      lastName,
      email: Email.create(email),
      phone,
      status: CustomerStatus.ACTIVE,
      createdAt: new Date(),
      modalidad,
    });
  }

  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  getEmail(): string {
    return this.email.getEmail();
  }
  getPhone(): string {
    return this.phone;
  }
  getStatus(): CustomerStatus {
    return this.status;
  }
  getModalidad(): CustomerModalidad {
    return this.modalidad.getModalidad();
  }
  setModalidad(modalidad: IModalidadCliente): void {
    this.modalidad = modalidad;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getPriceCategory(): CloudCategory | null {
    return this.modalidad.getCategoriaPago();
  }
  addCuota(newCuota: Cuota): void {
    this.modalidad.addCuota(newCuota);
  }
  getCuotas() {
    return this.modalidad.getCuotas();
  }
  addPago(pago: Pago) {
    this.modalidad.addPago(pago);
  }
  getPagos(): Pago[] {
    return this.modalidad.getPagos();
  }

  updateCuota(cuotaId: string, status: CuotaStatus) {
    this.modalidad.updateCuota(cuotaId, status);
  }
  getCuotasPtesPago(): Cuota[] {
    return this.modalidad.getCuotasPtesPago();
  }

  generateCuotaForCurrentMonth() {
    this.modalidad.generateCuotaForCurrentMonth();
  }
}

export interface AccountSummary {
  details: SummaryDetail[];
  debe: number;
  haber: number;
  saldo: number;
}

export interface SummaryDetail {
  date: Date;
  saleId: string;
  saleSerie: string;
  debe: number;
  haber: number;
  saldo: number;
}
