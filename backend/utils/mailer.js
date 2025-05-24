const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
    }
});

const sendVerificationEmail = async (to, token) => {
    // console.log("mailer func called");
    try {

        const url = `${process.env.BASE_URL}/email-verify?token=${token}`;
        // console.log(url);
        await transporter.sendMail({
            from : `"Email Verification" <${process.env.EMAIL_USER}>`,
            to : to,
            subject : "Verify your email address using the link given below",
            html : `<p>Please click <a href=${url}>here</a> to verify your email address</p>`,
        })
    }
    catch (err) {
        return res.status(400).json({Message : "Error in email sending"});
    }
}

module.exports = {sendVerificationEmail};