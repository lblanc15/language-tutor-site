import { Html, Head, Body, Container, Text, Heading, Hr } from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactEmail({ name, email, message }: ContactEmailProps) {
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
        </Container>
      </Body>
    </Html>
  );
}