import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { clientName, WeaponPrice, phone, billingName, billingAddress } = await request.json();

    const clientEmail = "tarunmonga221427@gmail.com";
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [clientEmail],
      subject: 'Confirmation For Sports Firearm Request',
        html: `<p>Dear ${clientName},</p>
        <p>Thank you for your request to book a sports firearm. We are pleased to confirm your booking.</p>
        <p>Weapon Price: ${WeaponPrice}</p>
        <p>We will contact you shortly to finalize the details.</p>
        <p>Best regards,</p>
        <p>Chauhan Sports</p>
      `,
    });

    // Send notification to admin
    const adminEmail = 'tarunmonga221427@gmail.com'; // Change to your admin email
    const adminData = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [adminEmail],
      subject: 'New Weapon Booking Notification',
      html: `<p>A new weapon has been booked.</p>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Client Email:</strong> ${clientEmail}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Billing Name:</strong> ${billingName}</p>
        <p><strong>Billing Address:</strong> ${billingAddress}</p>
        <p><strong>Weapon Price:</strong> ${WeaponPrice}</p>
      `,
    });

    return NextResponse.json({ data, adminData });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 