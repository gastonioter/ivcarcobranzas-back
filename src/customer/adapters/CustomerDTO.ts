import { CustomerEntity } from "../domain/customer.entity";
import { CustomerModalidad } from "../domain/types";
import { CloudCustomer } from "../domain/valueObjects/CloudCustomer.vo";

type CloudDataDTO = {
  priceCategory: {
    name: string;
    price: number;
  };
};

export class CustomerDTO {
  public readonly uuid: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly status: string;
  public readonly createdAt: Date;
  public readonly modalidad: CustomerModalidad;
  public readonly cloudData?: CloudDataDTO;

  constructor(customer: CustomerEntity) {
    console.log("DTO:", customer.getPriceCategory());
    this.uuid = customer.getId();
    this.firstName = customer.getFirstName();
    this.lastName = customer.getLastName();
    this.email = customer.getEmail();
    this.phone = customer.getPhone();
    this.status = customer.getStatus();
    this.createdAt = customer.getCreatedAt();
    this.modalidad = customer.getModalidad();
    if (customer.getModalidad() === CustomerModalidad.CLOUD) {
      console.log("RETORNANDO UN CUSTOMER CLOUD");
      this.cloudData = {
        priceCategory: {
          name: customer.getPriceCategory()!.getName(),
          price: customer.getPriceCategory()!.getPrice(),
        },
      };
    }
  }
}
