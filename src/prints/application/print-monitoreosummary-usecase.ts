import { Cuota } from "../../cuota/domain/cuota.entity";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { companyInfo } from "../constants";
import { MonitoreoSummaryCmp } from "../../components/pdfs/MonitoreoSummary";
let renderToStream: any;

export interface MonitoreoSummary {
  cuotas: Cuota[];
  totalAmount: number;
}
export class PrintMonitoreoSummaryUseCase {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async print(customerId: string) {
    const customer = await this.customerRepo.getCustomer(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!renderToStream) {
      renderToStream = (await import("@react-pdf/renderer")).renderToStream;
    }

    const monitoreoSummary: MonitoreoSummary = {
      cuotas: customer.getCuotasPtesPago(),
      totalAmount: customer
        .getCuotasPtesPago()
        .reduce((acc, cuota) => acc + cuota.getAmount(), 0),
    };

    const date = new Date();
    const pdfStream = await renderToStream(
      await MonitoreoSummaryCmp({
        company: companyInfo,
        customer: {
          email: customer.getEmail(),
          firstName: customer.getFirstName(),
          lastName: customer.getLastName(),
          phone: customer.getPhone(),
          uuid: customer.getId(),
        },
        cuotas: monitoreoSummary.cuotas,
        totalAmount: monitoreoSummary.totalAmount,
      }),
    );
    return {
      pdfStream,
      filename:
        `RSM-MONITOREO-${date.getDate()}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}-${customer.getId().split("-")[0]}`.toUpperCase(),
    };
  }
}
