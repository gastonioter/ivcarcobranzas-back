import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Section,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text>Hola {name},</Text>
            <Text>¡Bienvenido a nuestra plataforma!</Text>
            <Text>
              Para comenzar, visita nuestro sitio web:{" "}
              <Link href="https://tu-sitio.com">https://tu-sitio.com</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
