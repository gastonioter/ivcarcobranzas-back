import { CustomerRepository } from "@/customer/domain/customer.repository";
import { CustomerStatus } from "@/customer/domain/types";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import {
  CustomerAlreadyExistsError,
  CustomerNotFoundError,
} from "../../domain/customer.exceptions";
import { CustomerModel } from "../models/customer.schema";
import { CustomerEntity } from "../../domain/customer.entity";
import { EditCustomerDTO } from "../../adapters/inputDTO";

export class CustomerMongoRepository implements CustomerRepository {
  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    try {
      const customerDoc = await CustomerModel.create({
        uuid: customer.getId(),
        firstName: customer.getFirstName(),
        lastName: customer.getLastName(),
        email: customer.getEmail(),
        phone: customer.getPhone(),
        status: customer.getStatus(),
        category: customer.getCategory(),
      });
      return CustomerEntity.fromPersistence(customerDoc);
    } catch (e) {
      console.log(e);
      if (e instanceof MongoServerError && e.code === 11000) {
        throw new CustomerAlreadyExistsError();
      }

      throw new Error("Error al crear el cliente");
    }
  }

  async checkIfExistsOne(email: string, phone: string): Promise<boolean> {
    const customer = await CustomerModel.findOne({
      $or: [{ email }, { phone }],
    });

    return !!customer;
  }
  async editCustomer(
    uuid: string,
    customer: EditCustomerDTO,
  ): Promise<CustomerEntity | null> {
    try {
      const editedCustomer = CustomerModel.findOneAndUpdate(
        { uuid },
        customer,
        {
          new: true,
        },
      );
      return CustomerEntity.fromPersistence(editedCustomer);
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
    status: CustomerStatus,
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
        },
      );
      return CustomerEntity.fromPersistence(customer);
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
    const customersDoc = await CustomerModel.find({}).lean();

    return customersDoc.map((customer) =>
      CustomerEntity.fromPersistence(customer),
    );
  }
}
