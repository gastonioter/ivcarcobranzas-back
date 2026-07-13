import { CuotaPaymentModel } from "../cuota-payment/infra/cuota-payment.schema";
import { CuotaModel } from "../cuotaV2/infra/cuota.schema";

export interface DeudoresData {
  _id: string;
  pendingCount: number;
  totalOwed: number;
  firstName: string;
  lastName: string;
}

export interface CuotasSummary {
  totalPaidCuotas: number;
  totalRevenue: number;
  totalGeneratedCuotas: number;
}

export interface MonthlyRevenue {
  month: number;
  year: number;
  revenue: number;
}

export interface DashboardQueriesRepository {
  findDeudores(): Promise<DeudoresData[]>;
  aggregateCuotas(): Promise<CuotasSummary[]>;
  revenueByMonth(): Promise<MonthlyRevenue[]>;
}

export class MongoDashboardRepository implements DashboardQueriesRepository {
  async findDeudores(): Promise<DeudoresData[]> {
    const deudoresDetallados = await CuotaModel.aggregate([
      {
        $match: {
          status: "PENDIENTE",
        },
      },
      {
        $group: {
          _id: "$customerId",
          pendingCount: { $sum: 1 },
          totalOwed: { $sum: "$amount" },
        },
      },
      {
        $match: {
          // TODO: make this limit configurable or dynamic.
          pendingCount: { $gt: 3 }, //  This counts 3 months plus the current month in PENDING status
        },
      },
      {
        $lookup: {
          from: "customers",
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
          customerId: "$_id",
          pendingCount: 1,
          totalOwed: 1,
          firstName: "$customerDetails.firstName",
          phone: "$customerDetails.phone",
          lastName: "$customerDetails.lastName",
        },
      },
    ]);

    return deudoresDetallados;
  }
  async aggregateCuotas(): Promise<CuotasSummary[]> {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const result = await CuotaModel.aggregate([
      {
        $match: {
          // importante: mismo filtro que usaste para currentMonthCuotas
          month: currentMonth,
          year: currentYear,
        },
      },
      {
        $group: {
          _id: null,
          totalGeneratedCuotas: { $sum: 1 },

          totalPaidCuotas: {
            $sum: {
              $cond: [{ $eq: ["$status", "PAGADA"] }, 1, 0],
            },
          },
          totalRevenue: {
            $sum: {
              $cond: [{ $eq: ["$status", "PAGADA"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    return result;
  }

  async revenueByMonth(): Promise<MonthlyRevenue[]> {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    return CuotaPaymentModel.aggregate([
      { $match: { createdAt: { $gte: from } } },
      { $unwind: "$lines" },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$lines.amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          revenue: 1,
        },
      },
    ]);
  }
}
