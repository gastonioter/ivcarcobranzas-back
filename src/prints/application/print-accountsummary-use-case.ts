import { SaleRepository } from "../../transaction/sale/domain/sale.repository";
import { AccountSummaryCmp } from "../../components/pdfs/AccountSummary";
import { companyInfo } from "../constants";
import { CustomerRepository } from "../../customerV2/domain/customer.repository";
import {
  AccountSummary,
  getCustomerSummaryAccount,
} from "../../customerV2/application/queries/account-summary.usecase";

let renderToStream: any;
export class PrintAccountSummaryUseCase {
  constructor(
    private readonly saleRepo: SaleRepository,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async print(customerId: string) {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!renderToStream) {
      renderToStream = (await import("@react-pdf/renderer")).renderToStream;
    }

    const sales = await this.saleRepo.getSalesByCustomer(customerId);
    const accountSummary: AccountSummary =
      await getCustomerSummaryAccount(sales);

    const pdfStream = await renderToStream(
      await AccountSummaryCmp({
        company: companyInfo,
        customer: {
          uuid: customer.getId(),
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
        },
        details: accountSummary.details,
        summary: {
          debe: accountSummary.debe,
          haber: accountSummary.haber,
          saldo: accountSummary.saldo,
        },
      }),
    );
    return {
      pdfStream,
      filename: `RSMCTA-${customer.firstName}-${customer.lastName}-${new Date().toISOString()}`,
    };
  }
}
