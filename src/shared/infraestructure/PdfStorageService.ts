import crypto from "crypto";
import fs from "fs";
import path from "path";

export class PdfStorageService {
  private readonly storageDir: string;
  private readonly baseUrl: string;

  constructor() {
    this.storageDir =
      process.env.STORAGE_PATH ?? path.join(process.cwd(), "storage", "pdfs");
    this.baseUrl = process.env.PUBLIC_BASE_URL;
    fs.mkdirSync(this.storageDir, { recursive: true });
  }

  save(buffer: Buffer): string {
    const token = crypto.randomUUID();
    fs.writeFileSync(path.join(this.storageDir, `${token}.pdf`), buffer);
    return `${this.baseUrl}/downloads/${token}`;
  }

  getFilePath(token: string): string | null {
    const filePath = path.join(this.storageDir, `${token}.pdf`);
    return fs.existsSync(filePath) ? filePath : null;
  }
}
