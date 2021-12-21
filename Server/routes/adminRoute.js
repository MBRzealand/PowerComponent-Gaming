const express = require('express');
const AdminSchema = require('../model/adminscheme');
const router = express.Router();

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body);
    const admin = await AdminSchema.create(req.body);
    res.status(201).json({
      msg: 'Admin er blevet oprettet',
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
    const user = await AdminSchema.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({
        msg: 'Admin eksisterer ikke',
      });
    }
    if (user.password !== userPassword) {
      return res.status(404).json({
        msg: 'Forkert password',
      });
    }
    res.status(200).json({
      msg: 'Admin logget ind',
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
