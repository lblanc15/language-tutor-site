import { InquiryEmail } from "@/app/email-templates/inquiry";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Website <onboarding@resend.dev>",
      to: ["jaspergenesrico@gmail.com"],
      subject: `New inquiry from ${name}`,
      html: InquiryEmail(name, email, message),
    });

    if (error) {
      console.error(error);

      return Response.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}