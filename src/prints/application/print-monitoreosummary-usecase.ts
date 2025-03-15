import { MonitoreoSummaryCmp } from "../../components/pdfs/MonitoreoSummary";
import { formattedFullname } from "../../components/utils/formattedFullname";
import { Cuota } from "../../cuota/domain/cuota.entity";
import { CustomerRepository } from "../../customer/domain/interfaces/CustomerRepository";
import { sendDocument } from "../../shared/infraestructure/sendDocument";
import { base64 } from "../../shared/utils/base64";
import { generatePdfFile } from "../../shared/utils/generatePdf";
import { companyInfo } from "../constants";

export interface MonitoreoSummary {
  cuotas: Cuota[];
  totalAmount: number;
}

export enum SendMethods {
  WPP = "WPP",
  EMAIL = "EMAIL",
}

export type Result = Promise<{
  result: string;
  data?: any;
}>;

const generateCaption = () =>
  `Estimado usuario:
Se adjunta resumen de cuenta del servicio *ALARMAS IVCAR*.
   
Por favor, enviar comporbante. 
   
_¡Gracias por elegirnos!_`;

// TODO: implement Strategy Pattern
export class PrintMonitoreoSummaryUseCase {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async print(customerId: string, sendMethod?: SendMethods): Result {
    const customer = await this.customerRepo.getCustomer(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    // DATA
    const monitoreoSummary: MonitoreoSummary = {
      cuotas: customer.getCuotasPtesPago(),
      totalAmount: customer
        .getCuotasPtesPago()
        .reduce((acc, cuota) => acc + cuota.getAmount(), 0),
    };

    // HTML
    const document = await MonitoreoSummaryCmp({
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
    });

    const today = new Date().toLocaleDateString();
    const fullname = formattedFullname(
      customer.getFirstName(),
      customer.getLastName(),
    );
    // SPECIFIC IMPLEMENTATIONS

    if (!sendMethod) {
      // render to stream

      const { renderToStream } = await import("@react-pdf/renderer");

      const pdfStream = await renderToStream(document);
      return {
        result: "success",
        data: {
          pdfStream,
          filename: `RSM_MONIT-${fullname.trim()}-${today}`.toUpperCase(),
        },
      };
    }

    if (sendMethod === SendMethods.WPP) {
      // send wpp
      const { pdfBuffer } = await generatePdfFile("rsm-monit", document);
      const pdfBase64 = base64(pdfBuffer);

      await sendDocument({
        pdf: pdfBase64,
        to: customer.getPhone(),
        caption: generateCaption(),
        filename: `RESUMEN_IVCAR-${fullname.trim()}-${today}`.toUpperCase(),
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
