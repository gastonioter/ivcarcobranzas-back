import { MyDocument } from "../../components/pdfs/MyDocument";
import fs from "fs";

export const generatePdf = async (name: string) => {
  const { renderToBuffer } = await import("@react-pdf/renderer");

  const pdfBuffer = await renderToBuffer(await MyDocument(name));

  // OPTIONAL: save the pdf to the filesystem
  //const filePath = `${__dirname}/../../../temp/doc-${Date.now()}.pdf`;
  //fs.writeFileSync(filePath, pdfBuffer);

  return { pdfBuffer };
};
