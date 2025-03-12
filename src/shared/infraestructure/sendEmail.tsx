import { WelcomeEmail } from "../../components/emails/WelcomeTemplateEmail";
import { render } from "@react-email/render";
import { Resend } from "resend";

interface SendEmailArgs {
  to: string[];
  subject: string;
}

export const sendEmail = async ({ to, subject }: SendEmailArgs) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const html = await render(<WelcomeEmail name="Juan" />);

    const { data, error } = await resend.emails.send({
      from: "IVCAR <onboarding@ivcaralarmas.com>",
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error(error);
      throw new Error("Error sending email");
    }

    return data;
  } catch (e) {
    throw new Error("Error sending email");
    console.error(e);
  }
};
