import {
  CustomerEntity,
  CustomerStatus,
} from "@/customer/domain/customer.entity";
import { CustomerRepository } from "@/customer/domain/customer.repository";
import { EditCustomerRequest } from "@/customer/domain/customer.validations";
import { MongoServerError } from "mongodb";
import {
  CustomerAlreadyExistsError,
  CustomerNotFoundError,
} from "../../domain/customer.exceptions";
import { CustomerModel } from "../models/customer.schema";
import mongoose from "mongoose";

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
  async editCustomer(
    uuid: string,
    customer: EditCustomerRequest
  ): Promise<CustomerEntity | null> {
    try {
      const editedCustomer = CustomerModel.findOneAndUpdate(
        { uuid },
        customer,
        {
          new: true,
        }
      );
      return editedCustomer;
    } catch (e) {
      if (
        (e instanceof MongoServerError && e.code === 11000) ||
        e instanceof mongoose.Error
      ) {
        throw new CustomerAlreadyExistsError();
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        throw new CustomerNotFoundError();
      }

      return null;
    }
  }

  async updateStatus(
    uuid: string,
    status: CustomerStatus
  ): Promise<CustomerEntity | null> {
    try {
      const customer = await CustomerModel.findOneAndUpdate(
        {
          uuid,
        },
        {
          status,
        },
        {
          new: true,
        }
      );
      return customer;
    } catch (e) {
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        throw new CustomerNotFoundError();
      }
      return null;
    }
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
