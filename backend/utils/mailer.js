const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
    }
});

const sendVerificationEmail = async (to, token) => {
    const url = `${process.env.BASE_URL}/email-verify?token=${token}`;
    await transporter.sendMail({
        from : `"Auth app" <${process.env.EMAIL_USER}>`,
        to : to,
        subject : "Verify your email address using the link given below",
        html : `<p>Please click <a href=${url}>here</a> to verify your email address</p>`,
    })
}

module.exports = {sendVerificationEmail};