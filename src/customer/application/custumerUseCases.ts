import { MongoPriceCategoryRepository } from "../../cloudCategory/infraestructure/db.mongo";
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
import { CloudCategory } from "../../cloudCategory/domain/cloudCategory.entity";
import {
  CustomerEntity,
  AccountSummary,
  SummaryDetail,
} from "../domain/customer.entity";
import { SaleMongoRepository } from "@/transaction/sale/infraestructure/sale.mongo";
import { getCustomerSummaryAccount } from "../domain/services/AccountSummary";
import connectDB from "@/config/mongo";

export class CustomerUseCases {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly priceCategoryRepository: MongoPriceCategoryRepository,
    private readonly salesRepository: SaleMongoRepository,
  ) {}

  editCustomer = async (
    uuid: string,
    customer: EditCustomerDTO,
  ): Promise<CustomerDTO> => {
    const edited = await this.customerRepository.editCustomer(uuid, customer);

    return new CustomerDTO(edited);
  };

  getCustomer = async (uuid: string) => {
    const customer = await this.customerRepository.getCustomer(uuid);
    return new CustomerDTO(customer);
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

    let categoriaPago: CloudCategory | null = null;
    if (customer.modalidadData.modalidad === CustomerModalidad.CLOUD) {
      categoriaPago = await this.priceCategoryRepository.findById(
        customer.modalidadData.cloudCategoryId,
      );
    }

    const customerEntity = CustomerFactory.createCustomer({
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      modalidad: customer.modalidadData.modalidad,
      email: Email.fromExisting(customer.email),
      category: categoriaPago,
      cuit: customer.cuit || "-",
    });

    const saved = await this.customerRepository.createCustomer(customerEntity);

    return new CustomerDTO(saved);
  };

  updateStatus = async (uuid: string, status: CustomerStatus) => {
    return await this.customerRepository.updateStatus(uuid, status);
  };

  accountSummary = async (uuid: string): Promise<AccountSummary> => {
    const sales = await this.salesRepository.getSalesByCustomer(uuid);
    const accountSummary: AccountSummary =
      await getCustomerSummaryAccount(sales);

    return accountSummary;
  };
}
