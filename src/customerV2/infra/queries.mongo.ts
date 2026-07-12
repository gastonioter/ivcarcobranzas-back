import { CuotaModel } from "../../cuotaV2/infra/cuota.schema";
import { MonitoreoSummary } from "../application/queries/monitoreo-summary.usecase";

export interface CustomerQueries {
  // build sales summary
  monitoreoSummary(customerId: string): Promise<MonitoreoSummary>;
}

export class MongoCustomerQueries implements CustomerQueries {
  async monitoreoSummary(customerId: string): Promise<MonitoreoSummary> {
    const result = await CuotaModel.aggregate([
      // Step 1: Filtrar por el cliente específico Y que estén pendientes
      {
        $match: {
          // The order matters to use the proper index
          customerId: customerId,
          status: "PENDIENTE",
        },
      },

      // Step 2
      {
        $group: {
          _id: "$customerId",
          totalAmount: { $sum: "$amount" },
          cuotasPtePago: { $push: "$$ROOT" },
        },
      },

      // Step 3: Traer los datos del cliente
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "uuid",
          as: "customerDetails",
        },
      },

      // Step 4: Aplanar el array del cliente
      {
        $unwind: "$customerDetails",
      },

      // Step 5: Moldear la salida exacta de la interfaz
      {
        $project: {
          _id: 0,
          cuotasPtePago: 1,
          totalAmount: 1,
          customer: {
            id: "$customerDetails.uuid",
            email: "$customerDetails.email",
            firstName: "$customerDetails.firstName",
            lastName: "$customerDetails.lastName",
            phone: "$customerDetails.phone",
          },
        },
      },
    ]);

    // Si no se encontraron cuotas pendientes para ese ID, result será []
    return result[0];
  }
}
