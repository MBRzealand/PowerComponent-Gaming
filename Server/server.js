const express = require('express');
const routes = require('./routes/routes');
const connectDB = require('./database/connect')
const {response} = require("express");
require('dotenv').config();
const app = express();



app.use(express.json());
app.use('/version1', routes);

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
