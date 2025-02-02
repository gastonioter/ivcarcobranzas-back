import { CustomerEntity } from "@/customer/domain/customer.entity";
import { CustomerRepository } from "@/customer/domain/customer.repository";
import {
  CreateCustomerRequest,
  EditCustomerRequest,
} from "@/customer/domain/customer.validations";
import { CustomerModel } from "../models/customer.schema";

export class CustomerMongoRepository implements CustomerRepository {
  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    const customerDoc = await CustomerModel.create(customer);
    return customerDoc;
  }
  editCustomer(customer: EditCustomerRequest): Promise<CustomerEntity> {
    throw new Error("Method not implemented.");
  }
  deleteCustomer(uuid: string): Promise<CustomerEntity> {
    throw new Error("Method not implemented.");
  }
  getCustomer(uuid: string): Promise<CustomerEntity> {
    throw new Error("Method not implemented.");
  }
  async getCustomers(): Promise<CustomerEntity[]> {
    return await CustomerModel.find({});
  }
}
