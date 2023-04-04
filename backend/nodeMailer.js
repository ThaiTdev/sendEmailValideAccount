const nodeMailer = require("nodemailer");
require("dotenv").config();
const Email = process.env.EMAIL;
const password = process.env.PASSWORD;

const transport = nodeMailer.createTransport({
  service: "hotmail",
  auth: {
    user: Email,
    pass: password,
  },
});

module.exports.sendConfirmationEmail = (email, activationCode) => {
  transport
    .sendMail({
      from: "t.thai@outlook.fr",
      to: email,
      subject: "Confirmer votre compte 'Flex'",
      html: `<div>
    <h1>Email de confirmation</h1>
    <h2>Bonjour ${email},</h2>
    <p>Pour validez votre compte, veuillez cliquer sur ce lien</p>
    <a href=http://localhost:3000/emailConfirm/${activationCode}>Cliquez ici!</a></div>`,
    })
    .catch((err) => console.log(err));
};
