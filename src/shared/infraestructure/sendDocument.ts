import axios from "axios";

interface SendDocumentProps {
  pdf: string;
  to: string;
  caption: string;
  filename: string;
}
export const sendDocument = async ({
  pdf,
  to,
  caption,
  filename,
}: SendDocumentProps) => {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
  const token = process.env.ULTRAMSG_TOKEN;

  const url = `https://api.ultramsg.com/${instanceId}/messages/document`;

  const payload = {
    token,
    to,
    filename,
    document: pdf,
    caption,
  };

  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    throw new Error("Error enviando wpp");
  }
};
