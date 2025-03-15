import { ReciboMonitoreo } from "../../components/pdfs/ReciboMonitoreo";
import { formattedFullname } from "../../components/utils/formattedFullname";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { sendDocument } from "../../shared/infraestructure/sendDocument";
import { base64 } from "../../shared/utils/base64";
import { generatePdfFile } from "../../shared/utils/generatePdf";
import { companyInfo } from "../constants";
import { Result, SendMethods } from "./print-monitoreosummary-usecase";

export class PrintReciboMonitoreoUseCase {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async print(
    customerId: string,
    paymentId: string,
    sendMethod?: SendMethods,
  ): Result {
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

    const fullname = formattedFullname(
      customer.getFirstName(),
      customer.getLastName(),
    );

    const reciboData = {
      createdAt: payment.getCreatedAt().toISOString(),
      cuotas: payment.getCuotas(),
      serie: payment.getSerie(),
      totalAmount: payment
        .getCuotas()
        .reduce((acc, cuota) => acc + cuota.getAmount(), 0),
    };

    const document = await ReciboMonitoreo({
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
    });

    if (!sendMethod) {
      // render to stream

      const { renderToStream } = await import("@react-pdf/renderer");

      const pdfStream = await renderToStream(document);
      return {
        result: "success",
        data: {
          pdfStream,
          filename:
            `RECIBO${payment.getSerie()}-${fullname.trim()}`.toUpperCase(),
        },
      };
    }

    if (sendMethod == SendMethods.WPP) {
      const { pdfBuffer } = await generatePdfFile("recibo-cuotas", document);
      const pdfBase64 = base64(pdfBuffer);

      await sendDocument({
        pdf: pdfBase64,
        to: customer.getPhone(),
        caption: generateCaption(),
        filename: `${payment.getSerie()}-${fullname.trim()}`.toUpperCase(),
      });
      return {
        result: "success",
      };
    }

    if (sendMethod === SendMethods.EMAIL) {
      return {
        result: "success",
      };
    }

    return {
      result: "error",
    };
  }
}

function generateCaption() {
  return `Estimado usuario:

Hemos *recibido su pago* correspondiente al servicio *ALARMAS IVCAR*. 

¡Muchas gracias!

_IVCAR_.
  
`;
}
