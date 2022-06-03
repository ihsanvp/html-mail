const nodemailer = require("nodemailer");
const fs = require("fs/promises");
var inlineBase64 = require("nodemailer-plugin-inline-base64");

async function main() {
  const transport = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@studiotwofour.com",
      pass: "asdhuyasdg62-xQ",
    },
  });

  transport.use("compile", inlineBase64({ cidPrefix: "images_" }));

  const template = await fs.readFile("mail.html", { encoding: "utf-8" });

  const mail = await transport.sendMail({
    from: "<info@studiotwofour.com>", // sender address
    to: "ihsanvp2738@gmail.com, rafi.studiotwofour@gmail.com", // list of receivers
    subject: "EDM Test", // Subject line
    html: template,
  });

  console.log("Message sent: %s", mail.messageId);
}

main().catch(console.error);
