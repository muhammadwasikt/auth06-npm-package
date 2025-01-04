import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config()

const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
        },
    })


const sendEmail = async (email,subject , html) => {
    try {
        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: subject,
            html: html
        })
        console.log('Reset email sent to:', email);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }


}



export { sendEmail }