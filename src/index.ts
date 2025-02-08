import cors from "cors";
import express from "express";

import "./config/env";
import { userRoutes } from "./user";

import morgan from "morgan";
import { categoriesRoutes } from "./category";
import { MyDocument } from "./components/pdfs/MyDocument";
import { MongoDB } from "./config/db";
import { customerRoutes } from "./customer";
import { asyncHandler } from "./middlewares/asyncHandlerMiddleware";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import { monthlyFeeRoutes } from "./monthlyFee";
import { paymentRoutes } from "./payments";
import { productRoutes } from "./product";
import { salesRoutes } from "./sale";
import { sendEmail } from "./shared/infraestructure/sendEmail";

import { sendDocument } from "./shared/infraestructure/sendDocument";
import { generatePdf } from "./shared/utils/generatePdf";

import "./config/ultramsg.js";
import { base64 } from "./shared/utils/base64";
let renderToStream: any;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const API_PORT = process.env.API_PORT || 3000;

/* public routes */
app.use("/api/auth", userRoutes);

app.get(
  "/email",
  asyncHandler(async (req, res) => {
    await sendEmail({
      to: ["gaston10.c@hotmail.com"],
      subject: "Bienvenido a IVCAR",
    });

    res.json("ok");
  }),
);

app.post(
  "/sendpdf",
  asyncHandler(async (req, res) => {
    const { phone, name } = req.body;

    const { pdfBuffer } = await generatePdf(name);

    const pdfBase64 = base64(pdfBuffer);

    console.log("Sending PDF to", phone);

    await sendDocument(pdfBase64, phone);

    res.status(200).json({ message: "PDF enviado correctamente" });
  }),
);

app.get(
  "/pdf-stream",
  asyncHandler(async (req, res) => {
    if (!renderToStream) {
      renderToStream = (await import("@react-pdf/renderer")).renderToStream;
    }
    const pdfStream = await renderToStream(await MyDocument("Gaston"));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=documento.pdf`);
    pdfStream.pipe(res);
    pdfStream.on("end", () => res.end());
    pdfStream.on("error", (error: any) => {
      console.error(error);
      res.status(500).end();
    });
  }),
);

/* private routes */
app.use(authorizationMiddleware);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/monthlyfees", monthlyFeeRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorHandler);

MongoDB.getInstance().then(() => {
  app.listen(API_PORT, () => {
    console.log(`🚀 Server is running on port ${API_PORT} `);
  });
});
