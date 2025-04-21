import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Yeni E-Bülten Aboneliği',
      html: `
        <h2 style="color: #1e40af; margin-bottom: 20px;">Yeni E-Bülten Aboneliği</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 200px;">E-posta:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Tarih:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${new Date().toLocaleString('tr-TR')}</td>
          </tr>
        </table>
        <p style="color: #6b7280; font-size: 14px;">Bu mail otomatik olarak gönderilmiştir.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'E-bülten kaydınız başarıyla alındı.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { message: 'E-bülten kaydı alınırken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 