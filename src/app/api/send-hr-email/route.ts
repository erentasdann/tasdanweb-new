import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { Attachment } from 'nodemailer/lib/mailer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log('HR application form data received');

    // CV dosyasını işle
    const cvFile = formData.get('cv') as File | null;
    let cvAttachment;

    if (cvFile) {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Dosya adını güvenli hale getir
      const originalName = cvFile.name;
      const timestamp = Date.now();
      const safeName = `${timestamp}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      // Geçici dosya yolu oluştur
      const tempDir = path.join(process.cwd(), 'temp');
      const filePath = path.join(tempDir, safeName);

      try {
        // Geçici klasörü oluştur
        await writeFile(filePath, buffer);
        
        // E-posta eki olarak ekle
        cvAttachment = {
          filename: originalName,
          path: filePath
        };
      } catch (error) {
        console.error('Error saving CV file:', error);
        throw new Error('CV dosyası kaydedilirken bir hata oluştu');
      }
    }

    // Form verilerini al
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const education = formData.get('education') as string;
    const experience = formData.get('experience') as string;
    const message = formData.get('message') as string;

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
        name: 'Taşdanlar Otomotiv İK Başvurusu',
        address: process.env.EMAIL_USER as string
      },
      to: process.env.EMAIL_TO,
      subject: `İş Başvurusu: ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a56db; border-bottom: 2px solid #1a56db; padding-bottom: 10px;">Yeni İş Başvurusu</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #374151;">Ad Soyad:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">E-posta:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Telefon:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Başvurulan Pozisyon:</strong> ${position}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Eğitim Bilgileri:</strong><br>${education}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">İş Deneyimi:</strong><br>${experience}</p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Ek Mesaj:</strong><br>${message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">
            Bu email otomatik olarak gönderilmiştir. Lütfen yanıtlamayınız.
          </p>
        </div>
      `,
      attachments: cvFile && cvAttachment ? [cvAttachment as Attachment] : []
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    // Geçici dosyayı temizle
    if (cvFile && cvAttachment) {
      try {
        await unlink(cvAttachment.path);
      } catch (error) {
        console.error('Error deleting temporary file:', error);
      }
    }

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