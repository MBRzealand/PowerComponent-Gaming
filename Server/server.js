const express = require('express');
const defaultRoutes = require('./routes/defaultRoute');
const items = require('./routes/items');
const search = require('./routes/search')
const connectDB = require('./database/connect');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use('/version1', defaultRoutes);
app.use('/version1/item', items);
app.use('/version1/search', search)

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
