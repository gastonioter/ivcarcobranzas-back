import { AccountSummary } from "../../customer/domain/customer.entity";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { SaleRepository } from "../../transaction/sale/domain/sale.repository";
import { getCustomerSummaryAccount } from "../../customer/domain/services/AccountSummary";
import { AccountSummaryCmp } from "../../components/pdfs/AccountSummary";
import { companyInfo } from "../constants";

let renderToStream: any;
export class PrintAccountSummaryUseCase {
  constructor(
    private readonly saleRepo: SaleRepository,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async print(customerId: string) {
    const customer = await this.customerRepo.getCustomer(customerId);
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
          firstName: customer.getFirstName(),
          lastName: customer.getLastName(),
          email: customer.getEmail(),
          phone: customer.getPhone(),
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
      filename: `RSMCTA-${customer.getFirstName()}-${customer.getLastName()}-${new Date().toISOString()}`,
    };
  }
}
