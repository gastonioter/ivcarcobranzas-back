import { MongoCuotaPaymentRepository } from "../../cuota-payment/infra/cuota-payment.repository";
import { CuotaStatus } from "../../cuotaV2/domain/cuota.entity";
import { MongoCuotaRepository } from "../../cuotaV2/infra/cuota.repository";
import { MongoCustomerRepository } from "../../customerV2/infra/mongo.repository";
import { ReciboMonitoreo } from "../../components/pdfs/ReciboMonitoreo";
import { formattedFullname } from "../../components/utils/formattedFullname";
import { sendDocument } from "../../shared/infraestructure/sendDocument";
import { base64 } from "../../shared/utils/base64";
import { generatePdfFile } from "../../shared/utils/generatePdf";
import { companyInfo } from "../constants";
import { Result, SendMethods } from "./print-monitoreosummary-usecase";

export class PrintReciboMonitoreoUseCase {
  constructor(
    private readonly paymentsRepo: MongoCuotaPaymentRepository,
    private readonly cuotasRepo: MongoCuotaRepository,
    private readonly customerRepo: MongoCustomerRepository,
  ) {}

  async print(
    customerId: string,
    paymentId: string,
    sendMethod?: SendMethods,
  ): Result {
    const customer = await this.customerRepo.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }
    const payment = await this.paymentsRepo.findById(paymentId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    const fullname = formattedFullname(customer.firstName, customer.lastName);
    const cuotasPtePago = await this.cuotasRepo.findAll({
      customerId,
      status: CuotaStatus.PENDING,
    });

    const reciboData = {
      createdAt: payment.createdAt.toISOString(),
      cuotas: payment.lines,
      serie: payment.serie,
      totalAmount: payment.lines.reduce((acc, cuota) => acc + cuota.amount, 0),
    };

    const document = await ReciboMonitoreo({
      company: companyInfo,
      customer: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        uuid: customer.id,
      },
      cuotas: payment.lines,
      reciboData,
      cuotasPtes: cuotasPtePago,
    });

    if (!sendMethod) {
      // render to stream

      const { renderToStream } = await import("@react-pdf/renderer");

      const pdfStream = await renderToStream(document);
      return {
        result: "success",
        data: {
          pdfStream,
          filename: `RECIBO${payment.serie}-${fullname.trim()}`.toUpperCase(),
        },
      };
    }

    if (sendMethod == SendMethods.WPP) {
      const { pdfBuffer } = await generatePdfFile("recibo-cuotas", document);
      const pdfBase64 = base64(pdfBuffer);

      await sendDocument({
        pdf: pdfBase64,
        to: customer.phone,
        caption: generateCaption(),
        filename: `${payment.serie}-${fullname.trim()}`.toUpperCase(),
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
