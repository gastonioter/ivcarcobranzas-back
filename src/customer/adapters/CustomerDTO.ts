import { CustomerEntity } from "../domain/customer.entity";
import { CustomerType } from "../domain/types";

export class CustomerDTO {
  public readonly uuid: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly status: string;
  public readonly category: string;
  public readonly type: CustomerType;
  public readonly createdAt: Date;

  constructor(customer: CustomerEntity) {
    this.uuid = customer.getId();
    this.type = customer.getType();
    this.firstName = customer.getFirstName();
    this.lastName = customer.getLastName();
    this.email = customer.getEmail();
    this.phone = customer.getPhone();
    this.status = customer.getStatus();
    this.category = customer.getCategory() || "";
    this.createdAt = customer.getCreatedAt();
  }
}
