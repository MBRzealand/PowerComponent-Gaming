const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.put('/', async function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'NYWallBuilder@gmail.com',
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = await {
    from: 'NYWallBuilder@gmail.com',
    to: 'chil0041@edu.zealand.dk',
    subject: req.body.email,
    text: req.body.text,
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

module.exports = router;
