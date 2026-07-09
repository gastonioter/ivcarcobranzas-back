import { Entity } from "../../shared/domain/Entity";
import { Email } from "../../shared/valueObjects/email.vo";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CustomerModalidad, CustomerStatus } from "../../customer/domain/types";

export interface CustomerProps {
  uuid: EntityId;
  firstName: string;
  lastName: string;
  email: Email;
  phone: string;
  cuit: string;
  status: CustomerStatus;
  createdAt: Date;
  type: CustomerModalidad
}

export class Customer extends Entity {
  private _firstName: string;
  private _lastName: string;
  private _email: Email;
  private _phone: string;
  private _cuit: string;
  private _status: CustomerStatus;
  private _createdAt: Date;
  private _type: CustomerModalidad;

  private constructor(props: CustomerProps) {
    super(props.uuid);
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._email = props.email;
    this._phone = props.phone;
    this._cuit = props.cuit;
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._type = props.type;
  }

  static create(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    cuit: string,
    type: CustomerModalidad,
  ): Customer {
    if (!firstName || !lastName) throw new Error("Name is required");
    if (!phone) throw new Error("Phone is required");

    return new Customer({
      uuid: EntityId.create(),
      firstName,
      lastName,
      email: Email.create(email),
      phone,
      cuit: cuit || "-",
      status: CustomerStatus.ACTIVE,
      type,
      createdAt: new Date(),
    });
  }

  static fromPersistence(data: {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cuit: string;
    status: string;
    type: string;
    createdAt: Date;
  }): Customer {
    return new Customer({
      uuid: EntityId.fromExisting(data.uuid),
      firstName: data.firstName,
      lastName: data.lastName,
      email: Email.fromExisting(data.email),
      phone: data.phone,
      cuit: data.cuit,
      status: data.status as CustomerStatus,
      type: data.type as CustomerModalidad,
      createdAt: data.createdAt,
    });
  }


  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email.getEmail();
  }

  get phone(): string {
    return this._phone;
  }

  get cuit(): string {
    return this._cuit;
  }

  get status(): CustomerStatus {
    return this._status;
  }

  set status(value: CustomerStatus) {
    this._status = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get type(): CustomerModalidad{
    return this._type;
  }

  isCloud(): boolean{
    return this._type === CustomerModalidad.CLOUD;
  }

  isActive(): boolean {
    return this._status === CustomerStatus.ACTIVE;
  }
}