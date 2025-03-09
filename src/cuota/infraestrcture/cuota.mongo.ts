import { Pago } from "@/customer/domain/pago.entity";
import { CloudCategoryDoc } from "../../cloudCategory/infraestructure/db.schema";
import { CustomerFactory } from "../../customer/domain/CustomerFactory";
import { CustomerEntity } from "../../customer/domain/customer.entity";
import { CustomerNotFoundError } from "../../customer/domain/customer.exceptions";
import { CustomerModalidad } from "../../customer/domain/types";
import {
  CloudCustomerModel,
  CustomerModel,
} from "../../customer/infraestructure/models/customer.schema";
import { InvalidOperationError } from "../../shared/domain/exceptions";
import { Cuota, CuotaStatus } from "../domain/cuota.entity";
import { CuotaRepository } from "../domain/cuota.repository";

export class CuotaMongoRepository implements CuotaRepository {
  async save(customerId: string, cuota: Cuota): Promise<void> {
    const customer = await CustomerModel.findOne({ uuid: customerId });

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    if (customer.modalidad === CustomerModalidad.CLOUD) {
      await CloudCustomerModel.findOneAndUpdate(
        { uuid: customerId },
        {
          $push: {
            cuotas: {
              uuid: cuota.getId(),
              amount: cuota.getAmount(),
              year: cuota.getYear(),
              month: cuota.getMonth(),
              createdAt: cuota.getCreatedAt(),
              serie: cuota.getSerie(),
              status: cuota.getStatus(),
            },
          },
        },
      );
    } else {
      throw new Error("El cliente no es de modalidad cloud");
    }
  }

  async update(customer: CustomerEntity): Promise<CustomerEntity> {
    await CloudCustomerModel.findOneAndUpdate(
      {
        uuid: customer.getId(),
      },
      {
        $set: {
          cuotas: customer.getCuotas().map(mapCuota),
          pagos: customer.getPagos().map(mapPago),
        },
      },
      {
        new: true,
      },
    );

    return customer;
  }

  async findCustomerCuotas(customerId: string): Promise<CustomerEntity> {
    const customer = await CustomerModel.findOne({ uuid: customerId })
      .populate<{
        cloudCategory?: CloudCategoryDoc;
      }>("cloudCategory")
      .lean();

    if (!customer) {
      throw new CustomerNotFoundError();
    }
    if (customer.modalidad !== CustomerModalidad.CLOUD) {
      throw new InvalidOperationError("El cliente no es de modalidad cloud");
    }
    return CustomerFactory.fromPersistence(customer);
  }
}
function mapPago(pago: Pago) {
  return {
    uuid: pago.getId(),
    cuotas: pago.getCuotas().map(mapCuota),
    total: pago.getTotal(),
    serie: pago.getSerie(),
    createdAt: pago.getCreatedAt(),
  };
}

function mapCuota(cuota: Cuota): any {
  return {
    uuid: cuota.getId(),
    amount: cuota.getAmount(),
    year: cuota.getYear(),
    month: cuota.getMonth(),
    createdAt: cuota.getCreatedAt(),
    serie: cuota.getSerie(),
    status: cuota.getStatus(),
  };
}
