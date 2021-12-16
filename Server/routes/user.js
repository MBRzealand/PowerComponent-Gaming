const express = require('express');
const Userscheme = require('../model/userscheme');
const router = express.Router();

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body);
    const user = await Userscheme.create(req.body);
    res.status(201).json({
      msg: 'Bruger er blevet oprettet',
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post('/login', async function (req, res, next) {
  try {
    console.log(req.body);
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = await Userscheme.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({
        msg: 'Bruger eksisterer ikke',
      });
    }
    if (user.password !== userPassword) {
      return res.status(404).json({
        msg: 'Forkert password',
      });
    }
    res.status(200).json({
      msg: 'Bruger logget ind',
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
