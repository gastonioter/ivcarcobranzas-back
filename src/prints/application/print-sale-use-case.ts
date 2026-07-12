import { SaleRepository } from "../../transaction/sale/domain/sale.repository";
import { companyInfo } from "../constants";
import { Invoice } from "../../components/pdfs/Invoice";
import { CustomerRepository } from "@/customerV2/domain/customer.repository";

let renderToStream: any;
export class PrintSaleUseCase {
  constructor(
    private readonly saleRepo: SaleRepository,
    private readonly customerRepo: CustomerRepository,
  ) {}

  async printSale(uuid: string) {
    const sale = await this.saleRepo.findByUuid(uuid);
    const customer = await this.customerRepo.findById(sale.getCustomerId());
    if (!sale) {
      throw new Error("Sale not found");
    }
    if (!customer) {
      throw new Error("Customer not found");
    }

    // Imporve with dependency injection
    if (!renderToStream) {
      renderToStream = (await import("@react-pdf/renderer")).renderToStream;
    }

    const pdfStream = await renderToStream(
      await Invoice({
        company: companyInfo,
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
        },
        details: sale.getDetails().map((d) => ({
          quantity: d.quantity,
          description: d.product,
          price: d.unitPrice,
          total: d.unitPrice * d.quantity,
        })),
        transaction: {
          date: sale.getCreatedAt().toISOString(),
          id: sale.getSerie(),
          iva: sale.getIva(),
          total: sale.getTotalAmount(),
          subtotal: sale.getSubtotal(),
        },
      }),
    );

    return {
      pdfStream,
      filename: `${sale.getSerie()}`,
    };
  }
}
