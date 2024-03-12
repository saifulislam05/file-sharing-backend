
const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMailHandler = async (to, subject, text, html,res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      // port: 587,
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_KEY,
      },
    });
    const info = await transporter.sendMail({
      // from: "no-reply-saiful@gmail.com", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.json({
      success: true,
      message: `Link sent to the given Email`,
      messageId: info.messageId,
    });
  } catch (error) {
    console.log("error sending email- ", error);
    res.status(500).json({
      success: false,
      message: `there is an problem occured sending email`,
    });
  }
};

module.exports = sendMailHandler;