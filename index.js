const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/sendNotif", function (req, res) {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b305ffa356868b",
      pass: "c89a022435417b",
    },
  });

  message = {
    from: "from-example@email.com",
    to: "antoniojuricic1@gmail.com",
    subject: "Subject",
    text: "Hello SMTP Email",
  };
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        success: true,
      });
    }
  });
});

app.listen(port, function () {
  console.log(`HTTP listening on port: ${port}`);
});