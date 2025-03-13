import { JsxElement } from "typescript";
import { MyDocument } from "../../components/pdfs/MyDocument";

// fix: npm i @react-pdf/types
export const generatePdfFile = async (
  name: string,
  document: React.ReactElement<any>,
) => {
  const { renderToBuffer } = await import("@react-pdf/renderer");

  const pdfBuffer = await renderToBuffer(document);

  // OPTIONAL: save the pdf to the filesystem
  //const filePath = `${__dirname}/../../../temp/doc-${Date.now()}.pdf`;
  //fs.writeFileSync(filePath, pdfBuffer);

  return { pdfBuffer };
};
