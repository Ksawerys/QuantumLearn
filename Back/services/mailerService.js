const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: 'Federico422###'
    }
});

const sendCode = async (mail) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000); 

    const mailOptions = {
        from: process.env.MAIL,
        to: mail,
        subject: 'Código de verificación',
        text: `Su código de verificación es: ${verificationCode}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { status: 'success', message: 'Email sent', code: verificationCode };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Error sending email' };
    }
}

module.exports = {
    sendCode
}