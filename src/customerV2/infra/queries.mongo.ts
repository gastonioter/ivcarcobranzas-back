import { CuotaModel } from "../../cuotaV2/infra/cuota.schema";
import { MonitoreoSummary } from "../application/queries/monitoreo-summary.usecase";

export interface CustomerQueries {
  // build sales summary
  monitoreoSummary(customerId: string): Promise<MonitoreoSummary>;
}

export class MongoCustomerQueries implements CustomerQueries {
  async monitoreoSummary(customerId: string): Promise<MonitoreoSummary> {
    const result = await CuotaModel.aggregate([
      {
        $match: {
          customerId,
          status: "PENDIENTE",
        },
      },
      {
        $group: {
          _id: "$customerId",
          totalAmount: { $sum: "$amount" },
          cuotasPtePago: { $push: "$$ROOT" },
        },
      },

      {
        $lookup: {
          from: "customerv2",
          localField: "_id",
          foreignField: "uuid",
          as: "customerDetails",
        },
      },

      {
        $unwind: "$customerDetails",
      },

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
