const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.put('/', async function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = await {
    from: process.env.MAIL,
    to: process.env.TOMAIL,
    subject: req.body.email,
    text: req.body.text,
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(404).json({ msg: 'Error in mail server' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ msg: 'Mail has been sendt' });
    }
  });
});

module.exports = router;
