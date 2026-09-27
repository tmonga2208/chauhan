import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ConfirmationEmailFimal from '@/emails/confirmEmailFimal';
import AdminNotificationEmail from '@/emails/AdminNotificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { clientName, WeaponPrice, phone, billingName, billingAddress, clientEmail, itemName, itemImg } = await request.json();
    const data = await resend.emails.send({
      from: 'updates@chauhansports.com',
      to: [clientEmail],
      subject: 'Confirmation For Sports Weapon Request',
      react:
        ConfirmationEmailFimal({
          clientName: clientName,
          price: WeaponPrice,
          img: itemImg,
          productName: itemName || "",
        }),
    });

    // Send notification to admin
    const adminEmail = 'contact@chauhansports.com';
    const adminData = await resend.emails.send({
      from: 'updates@chauhansports.com',
      to: [adminEmail],
      subject: 'New Weapon Booking Notification',
      react: AdminNotificationEmail({
        clientName: clientName,
        weaponPrice: WeaponPrice,
        phone: phone,
        billingName: billingName,
        billingAddress: billingAddress,
        clientEmail: clientEmail,
      }),
    });

    return NextResponse.json({ data, adminData });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 