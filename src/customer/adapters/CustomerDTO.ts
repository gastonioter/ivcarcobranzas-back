import { CustomerEntity } from "../domain/customer.entity";
import { CustomerModalidad } from "../domain/types";

type ModalidadData =
  | {
      modalidad: CustomerModalidad.CLOUD;
      priceCategory: {
        name: string;
        price: number;
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
  public readonly status: string;
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
        priceCategory: {
          name: customer.getPriceCategory()!.getName(),
          price: customer.getPriceCategory()!.getPrice(),
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
