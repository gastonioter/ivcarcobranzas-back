import { MonitoreoSummaryCmp } from "../../components/pdfs/MonitoreoSummary";
import { formattedFullname } from "../../components/utils/formattedFullname";
import { execute } from "../../customerV2/application/queries/monitoreo-summary.usecase";
import { MongoCustomerQueries } from "../../customerV2/infra/queries.mongo";
import { IOpenWaService } from "../../shared/infraestructure/OpenWaService";
import { base64 } from "../../shared/utils/base64";
import { generatePdfFile } from "../../shared/utils/generatePdf";
import { companyInfo } from "../constants";

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
  constructor(private readonly openWAService: IOpenWaService) {}

  async print(customerId: string, sendMethod?: SendMethods): Result {
    // DATA
    const queriesService = new MongoCustomerQueries();
    const { cuotasPtePago, customer, totalAmount } = await execute(
      customerId,
      queriesService,
    );
    // HTML
    const document = await MonitoreoSummaryCmp({
      company: companyInfo,
      customer: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        uuid: customer.id,
      },
      cuotas: cuotasPtePago,
      totalAmount: totalAmount,
    });

    const today = new Date().toLocaleDateString();
    const fullname = formattedFullname(customer.firstName, customer.lastName);
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

      await this.openWAService.sendFile({
        chatId: customer.phone,
        fileUrl: pdfBase64,
        caption: generateCaption(),
        filename: `RESUMEN_IVCAR-${fullname.trim()}-${today}.pdf`.toUpperCase(),
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
