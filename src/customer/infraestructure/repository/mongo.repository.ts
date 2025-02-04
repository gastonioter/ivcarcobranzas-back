import { CustomerEntity } from "@/customer/domain/customer.entity";
import { CustomerRepository } from "@/customer/domain/customer.repository";
import { EditCustomerRequest } from "@/customer/domain/customer.validations";
import { MongoServerError } from "mongodb";
import { CustomerAlreadyExistsError } from "../../domain/customer.exceptions";
import { CustomerModel } from "../models/customer.schema";

export class CustomerMongoRepository implements CustomerRepository {
  async createCustomer(
    customer: CustomerEntity
  ): Promise<CustomerEntity | null> {
    try {
      const customerDoc = await CustomerModel.create(customer);
      return customerDoc;
    } catch (e) {
      if (e instanceof MongoServerError && e.code === 11000) {
        throw new CustomerAlreadyExistsError();
      }

      return null;
    }
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
