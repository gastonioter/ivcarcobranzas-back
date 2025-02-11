import { CustomerRepository } from "../../domain/interfaces/CustomerRepository";
import { CustomerStatus } from "../../domain/types";
import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import {
  CustomerAlreadyExistsError,
  CustomerNotFoundError,
} from "../../domain/customer.exceptions";
import { CustomerModel } from "../models/customer.schema";
import { CustomerEntity } from "../../domain/customer.entity";
import { EditCustomerDTO } from "../../adapters/CreateCustomerDTO";
import { CustomerFactory } from "../../domain/CustomerFactory";
import { PriceCategoryDoc } from "../../../priceCategory/infraestructure/db.schema";

export class CustomerMongoRepository implements CustomerRepository {
  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    try {
      const saved = await CustomerModel.create({
        uuid: customer.getId(),
        firstName: customer.getFirstName(),
        lastName: customer.getLastName(),
        email: customer.getEmail(),
        phone: customer.getPhone(),
        status: customer.getStatus(),
        createdAt: customer.getCreatedAt(),
        priceCategoryId: customer.getPriceCategory()?.getId(),
      });

      if (saved) {
        const toReturn = await CustomerModel.findOne({ uuid: saved.uuid })
          .populate<{ priceCategory: PriceCategoryDoc }>("priceCategory")
          .exec();
        console.log(toReturn);

        if (!toReturn) {
          throw new Error("Error al crear el cliente");
        }
        return CustomerFactory.fromPersistence(toReturn);
      }
      throw new Error("Error al crear el cliente");
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
  ): Promise<CustomerEntity> {
    try {
      const editedCustomer = await CustomerModel.findOneAndUpdate(
        { uuid },
        customer,
        {
          new: true,
        },
      )
        .populate<{ priceCategory?: PriceCategoryDoc }>("priceCategory")
        .lean()
        .exec();
      if (!editedCustomer) {
        throw new CustomerNotFoundError();
      }
      return CustomerFactory.fromPersistence(editedCustomer);
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

      throw new Error("Error al editar el cliente");
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
      )
        .lean()
        .populate<{ priceCategory?: PriceCategoryDoc }>("priceCategory")
        .exec();
      if (!customer) {
        throw new CustomerNotFoundError();
      }
      return CustomerFactory.fromPersistence(customer);
    } catch (e) {
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        throw new CustomerNotFoundError();
      }

      throw new Error("Error al actualizar el estado del cliente");
    }
  }
  deleteCustomer(uuid: string): Promise<CustomerEntity> {
    throw new Error("Method not implemented.");
  }
  getCustomer(uuid: string): Promise<CustomerEntity> {
    throw new Error("Method not implemented.");
  }
  async getCustomers(): Promise<CustomerEntity[]> {
    const customersDoc = await CustomerModel.find({})
      .lean()
      .populate<{ priceCategory?: PriceCategoryDoc }>("priceCategory")
      .exec();

    return customersDoc.map((customer) =>
      CustomerFactory.fromPersistence(customer),
    );
  }
}
