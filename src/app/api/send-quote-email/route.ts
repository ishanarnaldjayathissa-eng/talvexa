import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, whatsapp, country, product, quantity, packaging, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'TALVEXA <onboarding@resend.dev>', 
      // 👇 මෙතන ඔයාට ඊමේල් එන්න ඕන ඇඩ්‍රස් එක දාන්න (Resend එකට දුන්න එක)
      to: ['ishanarnaldjayathissa@gmail.com'], 
      subject: `New Quote Request: ${product}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #0A192F;">New Bulk Quote Request!</h2>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Packaging:</strong> ${packaging}</p>
          <hr/>
          <p><strong>Buyer Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Destination:</strong> ${country}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      console.log("Email Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("Server Error:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}