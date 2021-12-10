const express = require('express');
const nodemailer = require('nodemailer');
const ItemSchema = require('../model/itemscheme')
const router = express.Router();
require('dotenv').config();

  async function getItems(id) {
    let response = '';
    response = await ItemSchema.findOne({_id:id});
    return response;
  }


    const items = async (orderedItems) => {
    let mailItems = [];

    let array = orderedItems;
      for (let i = 0; i < array.length; i++) {

        let thingie = await getItems(array[i])
        mailItems.push(thingie);

      }
    
    return mailItems;
  }


  const prepInvoice = (array) => {
    let invoiceText = '';
    array.forEach(element => {
        let name = element.name;
        let price = element.price;
        invoiceText = invoiceText.concat(name + " " + price + "kr.\n");
    });
    return invoiceText;
}



router.post('/', async function (req, res, next) {

  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = await {
    from: process.env.MAIL,
    to: req.body.customerEmail,
    subject: 'Faktura for Køb',
    text: prepInvoice(await items(req.body.orderedItems)),
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(404).json({msg : "Error in mail server"})
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({msg : "Mail has been sendt"})
    }
  });
});

module.exports = router;