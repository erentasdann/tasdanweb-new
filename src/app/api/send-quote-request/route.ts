import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();

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
      subject: 'Yeni Teklif Talebi',
      html: `
        <h2 style="color: #1e40af; margin-bottom: 20px;">Yeni Teklif Talebi</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 200px;">Firma Adı:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Yetkili Ad Soyad:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">E-posta:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Telefon:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Şehir:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.city}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Vergi Dairesi:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.taxOffice}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Vergi Numarası:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.taxNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">İlgilendiği Ürün Grubu:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.productInterest}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Araç Markası:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.carBrand}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Araç Modeli:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.carModel}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Araç Yılı:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.carYear}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Adres:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.address}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Mesaj:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formData.message}</td>
          </tr>
        </table>
        <p style="color: #6b7280; font-size: 14px;">Bu mail otomatik olarak gönderilmiştir.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Teklif talebiniz başarıyla gönderildi.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { message: 'Teklif talebi gönderilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 