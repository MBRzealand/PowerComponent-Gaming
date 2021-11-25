const express = require('express');
const defaultRoutes = require('./routes/defaultRoute');
const items = require('./routes/items');
const connectDB = require('./database/connect')
require('dotenv').config();
const app = express();



app.use(express.json());
app.use('/version1', defaultRoutes);
app.use('/version1/item', items);

const start = async() => {
  try {
    await connectDB(process.env.DB_URL);

    app.listen(process.env.PORT, () => {
      console.log('Server is running..');
    });

  }catch (e) {
    console.log(e)
  }
}

start()
module.exports = app;
