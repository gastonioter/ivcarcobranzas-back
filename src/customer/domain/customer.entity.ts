import { Email } from "../../shared/valueObjects/email.vo";
import { autoGetterSetter } from "../../shared/utils/autoGetterSetter";
import { CloudCustomerType, CustomerStatus, CustomerType } from "./types";
import { Entity } from "../../shared/domain/Entity";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { CreateCustomerDTO } from "../adapters/inputDTO";

/*  */
abstract class BaseCustomer extends Entity {
  protected firstName: string;
  protected lastName: string;
  protected email: Email;
  protected phone: string;
  protected status: CustomerStatus;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(
    uuid: EntityId,
    firstName: string,
    lastName: string,
    email: Email,
    phone: string,
    status: CustomerStatus,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(uuid);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public isBaja(): boolean {
    return this.status === CustomerStatus.INACTIVE;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getFirstName(): string {
    return this.firstName;
  }
  public getLastName(): string {
    return this.lastName;
  }
  public getEmail(): string {
    return this.email.getEmail();
  }
  public getPhone(): string {
    return this.phone;
  }
  public getStatus(): CustomerStatus {
    return this.status;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

export class CustomerEntity extends BaseCustomer {
  /* determina el precio de la mensualidad */
  private category?: CloudCustomerType;

  constructor(
    uuid: EntityId,
    firstName: string,
    lastName: string,
    email: Email,
    phone: string,
    status: CustomerStatus,
    createdAt: Date,
    updatedAt: Date,
    category?: CloudCustomerType,
  ) {
    super(
      uuid,
      firstName,
      lastName,
      email,
      phone,
      status,
      createdAt,
      updatedAt,
    );
    this.category = category;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public isBaja(): boolean {
    return this.status === CustomerStatus.INACTIVE;
  }

  public getCategory(): CloudCustomerType | undefined {
    return this.category;
  }

  public isCloud(): boolean {
    return !!this.category;
  }
  public getType(): CustomerType {
    return this.isCloud() ? CustomerType.CLOUD : CustomerType.REGULAR;
  }

  public static new({
    firstName,
    lastName,
    email,
    phone,
    category,
  }: CreateCustomerDTO): CustomerEntity {
    if (!firstName || !lastName || !email || !phone) {
      throw new Error("Missing required fields");
    }
    return new CustomerEntity(
      EntityId.create(),
      firstName,
      lastName,
      Email.create(email),
      phone,
      CustomerStatus.ACTIVE,
      new Date(),
      new Date(),
      category,
    );
  }

  public static fromPersistence(obj: any): CustomerEntity {
    return new CustomerEntity(
      EntityId.fromExisting(obj.uuid),
      obj.firstName,
      obj.lastName,
      Email.create(obj.email),
      obj.phone,
      obj.status,
      obj.createdAt,
      obj.updatedAt,
      obj.category,
    );
  }
}
