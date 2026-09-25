import { Html, Head, Body, Container, Text, Heading, Hr, Link } from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactAdminEmail({ name, email, message, adminUrl }: ContactEmailProps & { adminUrl: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f4", padding: "20px" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", marginBottom: "16px" }}>New Contact Inquiry</Heading>
          <Text><strong>From:</strong> {name} ({email})</Text>
          <Hr style={{ borderColor: "#e6e6e6", margin: "16px 0" }} />
          <Text style={{ fontWeight: "bold" }}>Message:</Text>
          <Text style={{ whiteSpace: "pre-wrap", color: "#333" }}>{message}</Text>
          <Link href={adminUrl} style={{ color: "#1e3a8a", fontWeight: "bold" }}>
            View this inquiry in the admin area
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

export function ContactConfirmationEmail({ name }: Pick<ContactEmailProps, "name">) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f4", padding: "20px" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "8px" }}>
          <Heading style={{ fontSize: "20px", marginBottom: "16px" }}>We received your inquiry</Heading>
          <Text>Hi {name},</Text>
          <Text>
            Thank you for contacting Academia de Espanol Rico. We received your inquiry and will respond as soon as possible.
          </Text>
          <Text>We appreciate your interest and look forward to speaking with you.</Text>
          <Text>Academia de Espanol Rico</Text>
        </Container>
      </Body>
    </Html>
  );
}