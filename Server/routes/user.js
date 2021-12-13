const express = require('express');
const Userscheme = require('../model/userscheme');
const router = express.Router();

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body)
    const user = await Userscheme.create(req.body);
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
