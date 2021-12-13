const express = require('express');
const nodemailer = require('nodemailer');
const ItemSchema = require('../model/itemscheme')
const router = express.Router();
require('dotenv').config();

//variables
let amountArray = [];

  async function getItems(id) {
    let response = '';
    response = await ItemSchema.findOne({_id:id});
    return response;
  }


    const items = async (orderedItems) => {
    let mailItems = [];
    let reducedArray = [];

    for (let i = 0; i < orderedItems.length; i++) {
           if (reducedArray.includes(orderedItems[i])){
              amountArray[reducedArray.indexOf(orderedItems[i])] ++;
           }else {
              reducedArray.push(orderedItems[i]);
              amountArray.push(1);
           }
    }    

      for (let i = 0; i < reducedArray.length; i++) {

        let thingie = await getItems(reducedArray[i])
        mailItems.push(thingie);

      }

    return mailItems;
  }


  const prepInvoice = (array) => {
    let invoiceText = '';
    let total = 0;
    array.forEach((element,i) => {
        let name = element.name;
        let price = element.price;
        let stk = amountArray[i];
        total += (stk * price);
        invoiceText = invoiceText.concat(name + " " + price + "kr. Antal: "+ stk + "<br>");
    });
    invoiceText = invoiceText.concat("Total: " + total);
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
    html: 
    `<h1> Faktureringadresse</h1><h2>` + 
    req.body.customerName + "<br>" +
    req.body.customerAddress +"<br>"+
    req.body.customerZipCodeInput + " " + 
    req.body.customerCityInput +"<br>"+
    req.body.customerCountry +"<br>"+
    req.body.customerPhoneNmber +"</h2><br>"+ 
    prepInvoice(await items(req.body.orderedItems)) + "kr.",
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(404).json({msg : "Error in mail server"})
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({msg : "Mail has been sent"})
    }
  });
  await shipping(transporter,req);
});


const shipping = async (transporter,req) => {
 
  let mailOptions = await {
    from: process.env.MAIL,
    to: req.body.customerEmail,
    subject: 'Order er Sendt',
    html: 
    `<h1> Leveringsadresse</h1><h2>` + 
    req.body.customerName + "<br>" +
    req.body.customerAddress +"<br>"+
    req.body.customerZipCodeInput + " " + 
    req.body.customerCityInput +"<br>"+
    req.body.customerCountry +"<br>"+
    req.body.customerPhoneNmber +"<br>"+ 
    "<br>Følgende varer er blevet sendt </h2>" +
    prepInvoice(await items(req.body.orderedItems)) + "kr.",
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(404).json({msg : "Error in mail server"})
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({msg : "Mail has been sent"})
    }
  });
  

   
}



module.exports = router;