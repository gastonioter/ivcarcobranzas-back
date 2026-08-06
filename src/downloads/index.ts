import { Router } from "express";
import path from "path";
import { PdfStorageService } from "../shared/infraestructure/PdfStorageService";

export const downloadsRouter = Router();
const storage = new PdfStorageService();

downloadsRouter.get("/:token", (req, res) => {
  const filePath = storage.getFilePath(req.params.token);
  if (!filePath) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="documento.pdf"');
  res.sendFile(path.resolve(filePath));
});
