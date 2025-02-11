import mongoose from "mongoose";
import { PriceCategoryDoc } from "../../../priceCategory/infraestructure/db.schema";
import { EditCustomerDTO } from "../../adapters/CreateCustomerDTO";
import { CustomerEntity } from "../../domain/customer.entity";
import { CustomerNotFoundError } from "../../domain/customer.exceptions";
import { CustomerFactory } from "../../domain/CustomerFactory";
import { CustomerRepository } from "../../domain/interfaces/CustomerRepository";
import { CustomerModalidad, CustomerStatus } from "../../domain/types";
import {
  CloudCustomerModel,
  CustomerModel,
  RegularCustomerModel,
} from "../models/customer.schema";

export class CustomerMongoRepository implements CustomerRepository {
  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    try {
      let saved;
      const baseCustomerData = {
        uuid: customer.getId(),
        firstName: customer.getFirstName(),
        lastName: customer.getLastName(),
        email: customer.getEmail(),
        phone: customer.getPhone(),
        modalidad: customer.getModalidad(),
        status: customer.getStatus(),
        createdAt: customer.getCreatedAt(),
      };

      if (customer.getModalidad() === CustomerModalidad.CLOUD) {
        saved = await CloudCustomerModel.create({
          ...baseCustomerData,
          categoryPriceId: customer.getPriceCategory()?.getId(),
        });

        const toReturn = await CustomerModel.findOne({ uuid: saved.uuid })
          .populate<{ priceCategory: PriceCategoryDoc }>("priceCategory", {
            strictPopulate: false,
          })
          .exec();

        if (toReturn) {
          return CustomerFactory.fromPersistence(toReturn);
        } else {
          throw new Error("Ocurrio un error al crear el cliente");
        }
      } else {
        saved = await RegularCustomerModel.create({
          ...baseCustomerData,
        });
        return CustomerFactory.fromPersistence(saved);
      }
    } catch (e) {
      console.log(e);
      throw new Error("Ocurrio un error al crear el cliente");
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
      const baseCustomerData = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        modalidad: customer.modalidadData.modalidad,
      };

      const currentCustomer = await CustomerModel.findOne({ uuid }).lean();

      if (!currentCustomer) {
        throw new CustomerNotFoundError();
      }

      if (customer.modalidadData.modalidad === CustomerModalidad.CLOUD) {
        const updated = await CloudCustomerModel.updateOne(
          { uuid },
          {
            ...baseCustomerData,
            categoryPriceId: customer.modalidadData.priceCategoryId,
          },
          {
            new: true,
            lean: true,
          },
        ).populate<{ priceCategory: PriceCategoryDoc }>("priceCategory");

        return CustomerFactory.fromPersistence(updated);
      } else {
        const updated = await RegularCustomerModel.updateOne(
          { uuid },
          {
            ...baseCustomerData,
          },
          { new: true, lean: true },
        );

        return CustomerFactory.fromPersistence(updated);
      }
    } catch (e) {
      console.log(e);
      throw new Error("Algo salio mal al editar el cliente.");
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
