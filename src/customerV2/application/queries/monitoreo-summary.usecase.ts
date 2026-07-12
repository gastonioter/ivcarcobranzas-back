import { Cuota } from "@/cuotaV2/domain/cuota.entity";
import { Customer } from "../../domain/customer.entity.";
import { MongoCustomerQueries } from "@/customerV2/infra/queries.mongo";

export interface MonitoreoSummary {
  cuotasPtePago: Cuota[];
  totalAmount: number;
  customer: Pick<Customer, "id" | "email" | "firstName" | "lastName" | "phone">;
}

export async function execute(
  customerId: string,
  queries: MongoCustomerQueries,
): Promise<MonitoreoSummary> {
  const summary = await queries.monitoreoSummary(customerId);
  if (!summary) {
    throw new Error(
      "El cliente no tiene cuotas pendientes de pago. Se encuentra al dia.",
    );
  }
  return summary;
}
