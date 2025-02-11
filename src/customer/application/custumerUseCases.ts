import { MongoPriceCategoryRepository } from "../../priceCategory/infraestructure/db.mongo";
import {
  CreateCustomerDTO,
  EditCustomerDTO,
} from "../adapters/CreateCustomerDTO";
import { CustomerDTO } from "../adapters/CustomerDTO";
import { CustomerRepository } from "../domain/interfaces/CustomerRepository";
import { CustomerModalidad, CustomerStatus } from "../domain/types";
import { CustomerFactory } from "../domain/CustomerFactory";
import { EntityId } from "../../shared/valueObjects/entityId.vo";
import { Email } from "../../shared/valueObjects/email.vo";
import { PriceCategory } from "@/priceCategory/domain/priceCategory.entity";

export class CustomerUseCases {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly priceCategoryRepository: MongoPriceCategoryRepository,
  ) {}

  editCustomer = async (
    uuid: string,
    customer: EditCustomerDTO,
  ): Promise<CustomerDTO> => {
    const edited = await this.customerRepository.editCustomer(uuid, customer);

    return new CustomerDTO(edited);
  };

  getCustomer = async (uuid: string) => {
    return await this.customerRepository.getCustomer(uuid);
  };

  getCustomers = async (): Promise<CustomerDTO[]> => {
    const customers = await this.customerRepository.getCustomers();
    return customers.map((customer) => new CustomerDTO(customer));
  };

  createCustomer = async (
    customer: CreateCustomerDTO,
  ): Promise<CustomerDTO> => {
    const exists = await this.customerRepository.checkIfExistsOne(
      customer.email,
      customer.phone,
    );

    if (exists) {
      throw new Error("Ya existe un cliente con ese email o celular.");
    }

    let categoriaPago: PriceCategory | null = null;
    if (customer.modalidadData.modalidad === CustomerModalidad.CLOUD) {
      categoriaPago = await this.priceCategoryRepository.findById(
        customer.modalidadData.priceCategoryId,
      );
    }

    const customerEntity = CustomerFactory.createCustomer({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      modalidad: customer.modalidadData.modalidad,
      uuid: EntityId.create(),
      email: Email.fromExisting(customer.email),
      category: categoriaPago,
    });

    const saved = await this.customerRepository.createCustomer(customerEntity);

    return new CustomerDTO(saved);
  };

  updateStatus = async (uuid: string, status: CustomerStatus) => {
    return await this.customerRepository.updateStatus(uuid, status);
  };
}
