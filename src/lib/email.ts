import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: true,
});

export async function sendOtpEmail(to: string, otp: string) {
    if (!process.env.EMAIL_SERVER_HOST) {
        console.log('⚠️ Mock Email Send (No Config):', otp);
        return;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Your Document Signing OTP',
        text: `Your One-Time Password (OTP) to sign the document is: ${otp}. It expires in 10 minutes.`,
        html: `<p>Your One-Time Password (OTP) to sign the document is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
    });
}
