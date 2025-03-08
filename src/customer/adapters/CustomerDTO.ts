import { CustomerEntity } from "../domain/customer.entity";
import { CustomerModalidad, CustomerStatus } from "../domain/types";

type ModalidadData =
  | {
      modalidad: CustomerModalidad.CLOUD;
      cloudCategory: {
        name: string;
        price: number;
        uuid: string;
      };
    }
  | {
      modalidad: CustomerModalidad.REGULAR;
    };

export class CustomerDTO {
  public readonly uuid: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly status: CustomerStatus;
  public readonly createdAt: Date;
  public readonly modalidadData: ModalidadData;

  constructor(customer: CustomerEntity) {
    this.uuid = customer.getId();
    this.firstName = customer.getFirstName();
    this.lastName = customer.getLastName();
    this.email = customer.getEmail();
    this.phone = customer.getPhone();
    this.status = customer.getStatus();
    this.createdAt = customer.getCreatedAt();

    /* Inject the specific depending on the Customer */
    if (customer.getModalidad() === CustomerModalidad.CLOUD) {
      
      this.modalidadData = {
        modalidad: CustomerModalidad.CLOUD,
        cloudCategory: {
          name: customer.getPriceCategory()!.getName(),
          price: customer.getPriceCategory()!.getPrice(),
          uuid: customer.getPriceCategory()!.getId(),
        },
      };
    } else if (customer.getModalidad() === CustomerModalidad.REGULAR) {
      this.modalidadData = {
        modalidad: CustomerModalidad.REGULAR,
      };
    } else {
      throw new Error("Invalid modalidad");
    }
  }
}
