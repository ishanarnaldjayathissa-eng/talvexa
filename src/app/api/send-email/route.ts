import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, customerName, orderId, totalAmount } = body;

    const { data, error } = await resend.emails.send({
      from: 'TALVEXA <onboarding@resend.dev>', 
      to: [email], 
      subject: `Order Confirmation - TALVEXA #${orderId.slice(0, 8).toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #0A192F;">Thank you for your order, ${customerName}!</h2>
          <p>Your order has been successfully placed.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Order ID:</strong> #${orderId.slice(0, 8).toUpperCase()}</p>
            <p><strong>Total Amount:</strong> $${totalAmount}</p>
          </div>
          <p>We will notify you once your order is shipped.</p>
          <br/>
          <p style="color: #D4AF37; font-weight: bold;">TALVEXA Team</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}