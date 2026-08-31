import nodemailer from "nodemailer";
import { Resend } from "resend";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (
    email: string,
    subject: string,
    otp: string
): Promise<void> => {

    const html = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
            <h2>SocialiX</h2>

            <p>Your One-Time Password (OTP) is:</p>

            <h1 style="letter-spacing:5px; color:#2563eb;">
                ${otp}
            </h1>

            <p>This OTP is valid for <b>5 minutes</b>.</p>

            <p>If you did not request this OTP, please ignore this email.</p>

            <br/>

            <p>Thanks,<br/>SocialiX Team</p>
        </div>
    `;

    // dev
    if (process.env.NODE_ENV === "development") {

        await transporter.sendMail({
            from: `"SocialiX" <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            html,
        });

        console.log(`OTP sent using Nodemailer to ${email}`);
        return;
    }

    // production
    const { data, error } = await resend.emails.send({
        from: "SocialiX <onboarding@resend.dev>",
        to: [email],
        subject,
        html,
    });

    if (error) {
        console.error( error);
        throw new Error(error.message);
    }

    console.log("OTP sent using Resend:", data);
};