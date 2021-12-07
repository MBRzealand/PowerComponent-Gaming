const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();

router.get('/', function (req, res, next) {
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        /*let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let sender = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });*/

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'NYWallBuilder@gmail.com',
              pass: 'cdXpu5LFJsaWTRi',
            }
                  });

        let mailOptions = {
          from: 'NYWallBuilder@gmail.com',
          to: 'fredrikbille@hotmail.com',
          subject: 'Hello',
          text: 'Hello world?',
        }
      
        // send mail with defined transport object
         transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
      main().catch(console.error);
});

module.exports = router;
