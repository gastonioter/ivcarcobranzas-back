import { SalePayment } from "@/transaction/salePayment/salePayment.entity";
import { Reciept } from "../../components/pdfs/Receipt";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { SaleRepository } from "../../transaction/sale/domain/sale.repository";
import { companyInfo } from "../constants";

let renderToStream: any;
export class PrintReciboUseCase {
  constructor(
    private readonly saleRepo: SaleRepository,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async print(saleId: string, paymentId: string) {
    const sale = await this.saleRepo.findByUuid(saleId);
    const customer = await this.customerRepo.getCustomer(sale.getCustomerId());
    if (!sale) {
      throw new Error("Sale not found");
    }
    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!renderToStream) {
      renderToStream = (await import("@react-pdf/renderer")).renderToStream;
    }
    const payment = sale
      .getPayments()
      .find((p) => p.getId() === paymentId) as SalePayment;

    const saleSummary = sale.getSummary();
    const pdfStream = await renderToStream(
      await Reciept({
        company: companyInfo,
        customer: {
          firstName: customer.getFirstName(),
          lastName: customer.getLastName(),
          email: customer.getEmail(),
          phone: customer.getPhone(),
        },
        receipt: {
          id: payment.getId(),
          date: payment.getCreatedAt().toISOString(),
          amount: payment.getAmount(),
          method: payment.getMethod(),
          saleNumer: sale.getSerie(),
        },
        saleSummary,
      }),
    );
    return {
      pdfStream,
      filename: `PAY-${payment.getId().split("-")[0]}`.toUpperCase(),
    };
  }
}
