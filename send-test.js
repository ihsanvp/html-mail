const nodemailer = require("nodemailer");
const fs = require("fs/promises");

async function main() {
  const testAccount = await nodemailer.createTestAccount();

  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const template = await fs.readFile("mail.html", { encoding: "utf-8" });

  const mail = await transport.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: template,
  });

  console.log("Message sent: %s", mail.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));
}

main().catch(console.error);
