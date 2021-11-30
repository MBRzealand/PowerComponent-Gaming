const express = require('express');
const router = express.Router();
const ItemScheme = require('../model/itemscheme');

router.post('/', async function (req, res, next) {
  try {
    const item = await ItemScheme.create(req.body);
    res.status(201).json({
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/', async (req, res, next) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const items = await ItemScheme.find({});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id: itemId } = req.params;
    const item = await ItemScheme.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        message: 'Item could not be found',
      });
    }

    res.status(202).json({ item });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id: itemId } = req.params;
    const item = await ItemScheme.findOneAndDelete({ _id: itemId });

    if (!item) {
      return res.status(404).json({
        message: 'Item could not be found',
      });
    }

    res.status(410).json({ item });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id: itemId } = req.params;
    const item = await ItemScheme.findOne({ _id: itemId });

    if (!item) {
      return res.status(404).json({
        message: 'Item could not be found',
      });
    }

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
