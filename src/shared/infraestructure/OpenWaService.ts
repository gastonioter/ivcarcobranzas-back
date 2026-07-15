export interface IOpenWaService {
  sendText(dto: SendTextDto): Promise<any>;
  sendPdf(dto: SendFileDto): Promise<any>;
}

interface SendTextDto {
  chatId: string;
  text: string;
}

interface SendFileDto {
  chatId: string;
  fileUrl: string;
  filename: string;
  caption?: string;
}

export class OpenWaService implements IOpenWaService {
  constructor(
    private readonly baseUrl: string = process.env.OPENWA_BASE_URL,
    private readonly apiKey: string = process.env.OPENWA_API_KEY,
    private readonly sessionId: string = process.env.OPENWA_SESSION_ID,
  ) {}

  /**
   * Envía un mensaje de texto simple
   */
  async sendText(dto: SendTextDto): Promise<any> {
    const url = `${this.baseUrl}/sessions/${this.sessionId}/messages/send-text`;

    try {
      dto.chatId = this.formatArgentinaPhone(dto.chatId);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.apiKey,
        },
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error enviando mensaje por OpenWA:", error);
      throw error;
    }
  }

  /**
   * Envía un PDF (soporta URL o Base64 directamente en 'fileUrl')
   */
  async sendPdf(dto: SendFileDto): Promise<any> {
    const url = `${this.baseUrl}/sessions/${this.sessionId}/messages/send-document`;

    // 1. Limpiamos el encabezado data URI en caso de que venga incluido
    let base64Data = dto.fileUrl;
    if (base64Data.includes(";base64,")) {
      // Esto remueve "data:application/pdf;base64," y nos deja el Base64 puro
      base64Data = base64Data.split(";base64,")[1];
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.apiKey,
        },
        body: JSON.stringify({
          chatId: this.formatArgentinaPhone(dto.chatId),
          file: base64Data, // Pasamos el base64 limpio
          filename: dto.filename,
          caption: dto.caption || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error enviando PDF por OpenWA:", error);
      throw error;
    }
  }

  private formatArgentinaPhone(rawPhone: string): string {
    // 1. Limpiamos espacios, guiones, paréntesis y el símbolo "+"
    let clean = rawPhone.replace(/[^\d]/g, "");

    // 2. Si el usuario puso el "0" local (ej. 03385...), se lo sacamos
    if (clean.startsWith("0")) {
      clean = clean.substring(1);
    }

    // 3. Si no tiene el código de país (54), se lo agregamos
    if (!clean.startsWith("54")) {
      clean = "54" + clean;
    }

    // 4. Si es de Argentina (54) y no tiene el "9" después del país, se lo insertamos
    //    (comprobando que el número no tenga ya el 9 en esa posición)
    if (clean.startsWith("54") && clean.charAt(2) !== "9") {
      clean = "549" + clean.substring(2);
    }

    // 5. Retornamos el formato definitivo que WhatsApp ama
    return `${clean}@c.us`;
  }
}
