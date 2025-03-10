import { ReciboMonitoreo } from "../../components/pdfs/ReciboMonitoreo";
import { formattedFullname } from "../../components/utils/formattedFullname";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { companyInfo } from "../constants";
let renderToStream: any;

export class PrintReciboMonitoreoUseCase {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async print(customerId: string, paymentId: string) {
    const customer = await this.customerRepo.getCustomer(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const payment = customer
      .getPagos()
      .find((payment) => payment.getId() == paymentId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    if (!renderToStream) {
      renderToStream = (await import("@react-pdf/renderer")).renderToStream;
    }

    const reciboData = {
      createdAt: payment.getCreatedAt().toISOString(),
      cuotas: payment.getCuotas(),
      serie: payment.getSerie(),
      totalAmount: payment
        .getCuotas()
        .reduce((acc, cuota) => acc + cuota.getAmount(), 0),
    };

    const pdfStream = await renderToStream(
      await ReciboMonitoreo({
        company: companyInfo,
        customer: {
          email: customer.getEmail(),
          firstName: customer.getFirstName(),
          lastName: customer.getLastName(),
          phone: customer.getPhone(),
          uuid: customer.getId(),
        },
        cuotas: payment.getCuotas(),
        reciboData,
        cuotasPtes: customer.getCuotasPtesPago(),
      }),
    );
    return {
      pdfStream,
      filename:
        `${payment.getSerie()}-${formattedFullname(customer.getFirstName(), customer.getLastName())}`.toUpperCase(),
    };
  }
}
