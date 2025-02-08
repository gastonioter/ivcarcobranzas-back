import axios from "axios";

export const sendDocument = async (pdf: string, to: string) => {

  
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
  const token = process.env.ULTRAMSG_TOKEN;

  const url = `https://api.ultramsg.com/${instanceId}/messages/document`;

  const payload = {
    token,
    to,
    filename: "documento.pdf",
    document: pdf,
    caption: "Aquí tienes tu documento PDF.",
  };

  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    throw new Error("Error enviando wpp");
  }
};
