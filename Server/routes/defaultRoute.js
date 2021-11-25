const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).json({
      name: "Fredrik"
  });
});



module.exports = router;
