import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('Form data received:', formData);

    // Email transporter oluştur
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'e.tasdanclub@gmail.com',
        pass: 'jfmo rzah lppg hzaw'
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
        name: 'Taşdanlar Otomotiv Bayi Başvuru',
        address: 'e.tasdanclub@gmail.com'
      },
      to: 'e.tasdanclub@gmail.com',
      subject: 'Yeni Bayi Başvurusu',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a56db; border-bottom: 2px solid #1a56db; padding-bottom: 10px;">Yeni Bayi Başvurusu</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #374151;">Firma Adı:</strong> ${formData.companyName}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Yetkili Adı Soyadı:</strong> ${formData.name}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Telefon:</strong> ${formData.phone}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">E-posta:</strong> ${formData.email}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Şehir:</strong> ${formData.city}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Adres:</strong> ${formData.address}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Mesaj:</strong> ${formData.message}</p>
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
      { message: 'Başvurunuz başarıyla alındı.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Detailed error:', error);
    let errorMessage = 'Başvuru gönderilirken bir hata oluştu.';
    
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