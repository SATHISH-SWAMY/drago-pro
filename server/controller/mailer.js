import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import env from 'dotenv';
import Email from "../model/email.js";

env.config();

// Define the registerMail function to send registration emails
export const registerMail = async (req, res) => {
  console.log(req.body)
  
  const { username, userEmail, text, subject, body } = req.body;
  
  // Check if userEmail, username, text, and subject are provided
  if (!userEmail || !username || !text || !subject || !body) {
    return res.status(400).json({ error: "Username, email address, text, and subject are required." });
  }
  
  const config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  
  const transporter = nodemailer.createTransport(config);
  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });
  
  const response = {
    body: {
      // name: "",
      intro: body, // Use the text provided in the request as the intro
      

    },
  };
  

  const mail = MailGenerator.generate(response);
  
  const message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject,
    html: mail, 
    
  };
  
  transporter.sendMail(message)
    .then(() => {
      return res.status(201).json({ msg: "Email sent successfully" });
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};