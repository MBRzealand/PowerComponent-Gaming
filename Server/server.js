const express = require('express');
const defaultRoutes = require('./routes/defaultRoute');
const items = require('./routes/items');
const search = require('./routes/search');
const mailRoute = require('./routes/supportMail');
const invoiceRoute = require('./routes/invoiceMail');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/adminRoute')

const connectDB = require('./database/connect');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/version1', defaultRoutes);
app.use('/version1/item', items);
app.use('/version1/search', search);
app.use('/version1/sendMail', mailRoute);
app.use('/version1/invoiceMail', invoiceRoute);
app.use('/version1/user', userRoute);
app.use('/version1/admin',adminRoute )

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port --> ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
module.exports = app;
