import { Cuota } from "../../../cuota/domain/cuota.entity";
import mongoose, { mongo } from "mongoose";
import { CloudCategoryDoc } from "../../../cloudCategory/infraestructure/db.schema";
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
import { MongoDB } from "@/config/db";

export class CustomerMongoRepository implements CustomerRepository {
  constructor() {}
  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    try {
      await MongoDB.getInstance();
      const baseCustomerData = {
        uuid: customer.getId(),
        firstName: customer.getFirstName(),
        lastName: customer.getLastName(),
        email: customer.getEmail(),
        phone: customer.getPhone(),
        cuit: customer.getCuit(),
        modalidad: customer.getModalidad(),
        status: customer.getStatus(),
        createdAt: customer.getCreatedAt(),
      };

      if (customer.getModalidad() === CustomerModalidad.CLOUD) {
        await CloudCustomerModel.create({
          ...baseCustomerData,
          cloudCategoryId: customer.getPriceCategory()?.getId(),
        });
      } else {
        await RegularCustomerModel.create({
          ...baseCustomerData,
        });
      }

      const toReturn = await this.findByIdAndPopulate(baseCustomerData.uuid);
      return CustomerFactory.fromPersistence(toReturn);
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
        cuit: customer.cuit || "-",
        phone: customer.phone,
        modalidad: customer.modalidadData.modalidad,
      };

      const current = await CustomerModel.findOne({ uuid });
      if (!current) {
        throw new CustomerNotFoundError();
      }

      if (current.modalidad !== customer.modalidadData.modalidad) {
        /*  LA MODALIDAD ES DISTINTA, tengo que eliminar y volver a crear con 
        las nueva modalidad.  */

        await CustomerModel.deleteOne({ uuid });

        if (customer.modalidadData.modalidad === CustomerModalidad.CLOUD) {
          await CloudCustomerModel.create({
            ...baseCustomerData,
            uuid,
            status: current.status,
            createdAt: current.createdAt,
            cloudCategoryId: customer.modalidadData.cloudCategoryId,
          });
        } else {
          await RegularCustomerModel.create({
            ...baseCustomerData,
            uuid,
            status: current.status,
            createdAt: current.createdAt,
          });
        }
      } else {
        /* LA MODALIDAD ES LA MISMA */

        if (customer.modalidadData.modalidad === CustomerModalidad.CLOUD) {
          await CloudCustomerModel.findOneAndUpdate(
            { uuid },
            {
              ...baseCustomerData,
              ...customer.modalidadData,
            },
          );
        } else {
          await RegularCustomerModel.findOneAndUpdate(
            { uuid },
            {
              ...baseCustomerData,
            },
          );
        }
      }

      const toReturn = await this.findByIdAndPopulate(uuid);
      if (!toReturn) {
        throw new Error("Algo salio mal al editar el cliente");
      }
      return CustomerFactory.fromPersistence(toReturn);
    } catch (e) {
      console.log(e);
      if (
        e instanceof mongo.MongoServerError &&
        e.code === 11000 &&
        e.codeName === "DuplicateKey"
      ) {
        throw new Error(`Ya existe un cliente con el mismo email`);
      }
      throw new Error("Algo salio mal al editar el cliente");
    }
  }

  async updateStatus(
    uuid: string,
    status: CustomerStatus,
  ): Promise<CustomerEntity | null> {
    try {
      await CustomerModel.findOneAndUpdate(
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
        .populate<{ cloudCategory?: CloudCategoryDoc }>("cloudCategory")
        .exec();

      const toReturn = await this.findByIdAndPopulate(uuid);
      console.log(toReturn);
      return CustomerFactory.fromPersistence(toReturn);
    } catch (e) {
      console.log(e);
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        throw new CustomerNotFoundError();
      }

      throw new Error("Error al actualizar el estado del cliente");
    }
  }

  deleteCustomer(uuid: string): Promise<CustomerEntity> {
    throw new Error("Method not implemented.");
  }

  async getCustomer(uuid: string): Promise<CustomerEntity> {
    const customer = await this.findByIdAndPopulate(uuid);
    if (!customer) {
      throw new CustomerNotFoundError();
    }
    return CustomerFactory.fromPersistence(customer);
  }

  async getCustomers(): Promise<CustomerEntity[]> {
    const customersDoc = await CustomerModel.find({})
      .populate<{ cloudCategory?: CloudCategoryDoc }>("cloudCategory")
      .lean()
      .exec();

    return customersDoc.map((customer) =>
      CustomerFactory.fromPersistence(customer),
    );
  }

  private async findByIdAndPopulate(uuid: string) {
    return await CustomerModel.findOne({ uuid })
      // solo existe si es un cliente cloud, sino es null
      .populate<{
        cloudCategory?: CloudCategoryDoc;
      }>("cloudCategory")
      .lean();
  }
}
