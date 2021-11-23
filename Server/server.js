const express = require('express');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/version1', routes);
app.listen(process.env.PORT, () => {
  console.log('Server is running..');
});

module.exports = app;
