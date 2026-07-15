import fs from "fs";
import path from "path";
import { MonitoreoSummaryCmp } from "../../components/pdfs/MonitoreoSummary";
import { formattedFullname } from "../../components/utils/formattedFullname";
import { execute } from "../../customerV2/application/queries/monitoreo-summary.usecase";
import { MongoCustomerQueries } from "../../customerV2/infra/queries.mongo";
import { IOpenWaService } from "../../shared/infraestructure/OpenWaService";
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
      const { pdfBuffer } = await generatePdfFile("rsm-monit", document);
      const filename = `RESUMEN_IVCAR-${fullname.trim()}-${today}.pdf`.toUpperCase().replace(/[^A-Z0-9.\-_]/g, "_");
      const tempPath = path.join(process.cwd(), "temp", filename);
      fs.writeFileSync(tempPath, pdfBuffer);
      const fileUrl = `${process.env.APP_URL}/app/temp/${encodeURIComponent(filename)}`;
      await this.openWAService.sendFile({
        chatId: customer.phone,
        fileUrl,
        filename,
        caption: generateCaption(),
      });
      setTimeout(() => { try { fs.unlinkSync(tempPath); } catch {} }, 60_000);
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
