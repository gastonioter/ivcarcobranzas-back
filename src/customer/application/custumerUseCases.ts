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
    });

    const saved = await this.customerRepository.createCustomer(customerEntity);

    return new CustomerDTO(saved);
  };

  updateStatus = async (uuid: string, status: CustomerStatus) => {
    return await this.customerRepository.updateStatus(uuid, status);
  };

  accountSummary = async (uuid: string): Promise<AccountSummary> => {
    const sales = await this.salesRepository.getSalesByCustomer(uuid);

    if (!sales.length) {
      return {
        debe: 0,
        haber: 0,
        saldo: 0,
        details: [],
      };
    }
    const summaryDetails: SummaryDetail[] = sales.map((sale) => {
      const detail: SummaryDetail = {
        saleId: sale.getId(),
        saleSerie:sale.getSerie(),
        debe: sale.getTotalAmount(),
        haber: sale.getTotalPaid(),
        saldo: sale.getTotalAmount() - sale.getTotalPaid(),
      };
      return detail;
    });

    // if (summaryDetails.length == 1) {
    //   const [detail] = summaryDetails;
    //   return {
    //     debe: detail.debe,
    //     haber: detail.haber,
    //     saldo: detail.saldo,
    //     details: [detail],
    //   };
    // }
    const reducedSummary = summaryDetails.reduce((acc, detail) => {
      return {
        debe: acc.debe + detail.debe,
        haber: acc.haber + detail.haber,
        saldo: acc.saldo + detail.saldo,
      } as SummaryDetail;
    });

    return {
      ...reducedSummary,
      details: summaryDetails,
    };
  };
}
