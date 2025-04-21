import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('Contact form data received:', formData);

    // Email transporter oluştur
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    console.log('Testing SMTP connection...');
    
    // Bağlantıyı test et
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      throw verifyError;
    }

    // Email içeriğini oluştur
    const mailOptions = {
      from: {
        name: 'Taşdanlar Otomotiv İletişim Formu',
        address: process.env.EMAIL_USER as string
      },
      to: process.env.EMAIL_TO,
      subject: `İletişim Formu: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a56db; border-bottom: 2px solid #1a56db; padding-bottom: 10px;">Yeni İletişim Formu Mesajı</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #374151;">Ad Soyad:</strong> ${formData.name}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">E-posta:</strong> ${formData.email}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Telefon:</strong> ${formData.phone}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Konu:</strong> ${formData.subject}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Mesaj:</strong><br>${formData.message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
            Bu email otomatik olarak gönderilmiştir. Lütfen yanıtlamayınız.
          </p>
        </div>
      `
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return NextResponse.json(
      { message: 'Mesajınız başarıyla alındı.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Detailed error:', error);
    let errorMessage = 'Mesaj gönderilirken bir hata oluştu.';
    
    if (error instanceof Error) {
      errorMessage += ' Hata detayı: ' + error.message;
      console.error('Stack trace:', error.stack);
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
} 