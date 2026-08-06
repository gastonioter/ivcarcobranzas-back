export interface IOpenWaService {
  sendText(dto: SendTextDto): Promise<any>;
  sendFile(dto: SendFileDto): Promise<any>;
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
  private isRestarting = false;

  constructor(
    private readonly baseUrl: string = process.env.OPENWA_BASE_URL,
    private readonly apiKey: string = process.env.OPENWA_API_KEY,
    private readonly sessionId: string = process.env.OPENWA_SESSION_ID,
  ) {
    this.schedulePeriodicRestart();
  }

  private schedulePeriodicRestart(): void {
    const FIVE_HOURS = 5 * 60 * 60 * 1000;
    setInterval(() => this.restartSession(), FIVE_HOURS);
  }

  async restartSession(): Promise<void> {
    console.log("OpenWA: iniciando reinicio de sesión...");
    this.isRestarting = true;
    try {
      const headers = { "X-API-Key": this.apiKey };
      const stopUrl = `${this.baseUrl}/sessions/${this.sessionId}/stop`;
      const stopRes = await fetch(stopUrl, { method: "POST", headers });
      if (!stopRes.ok) {
        const err = await stopRes.json().catch(() => ({}));
        throw new Error(
          `Stop failed: ${stopRes.status} — ${err.message ?? ""}`,
        );
      }

      await new Promise((res) => setTimeout(res, 3000));

      const startUrl = `${this.baseUrl}/sessions/${this.sessionId}/start`;
      const startRes = await fetch(startUrl, { method: "POST", headers });
      if (!startRes.ok) {
        const err = await startRes.json().catch(() => ({}));
        throw new Error(
          `Start failed: ${startRes.status} — ${err.message ?? ""}`,
        );
      }

      console.log("OpenWA: sesión reiniciada correctamente.");
    } catch (error) {
      console.error("OpenWA: error al reiniciar sesión:", error);
    } finally {
      this.isRestarting = false;
    }
  }

  async sendText(dto: SendTextDto): Promise<any> {
    if (this.isRestarting) {
      throw new Error(
        "OpenWA: sesión en reinicio, intente nuevamente en unos segundos.",
      );
    }

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

  async sendFile(dto: SendFileDto): Promise<any> {
    if (this.isRestarting) {
      throw new Error("Intenta de nuevo en unos segundos.");
    }

    const url = `${this.baseUrl}/sessions/${this.sessionId}/messages/send-document`;

    let base64Data = dto.fileUrl;
    if (base64Data.includes(";base64,")) {
      base64Data = base64Data.split(";base64,")[1];
    }

    const formattedChatId = this.formatArgentinaPhone(dto.chatId);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.apiKey,
        },
        body: JSON.stringify({
          chatId: formattedChatId,
          base64: base64Data,
          mimetype: "application/pdf",
          filename: dto.filename,
          caption: dto.caption || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          "OpenWA send-document error response:",
          JSON.stringify(errorData),
        );
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
