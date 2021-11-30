const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name must be specified'],
  },
  image: {
    type: String,
    default: '../assets/placeholder_image.png',
  },
  specifications: { type: Array },

  price: {
    type: Number,
    required: [true, 'A price must be specified'],
    min: 0,
  },
  inStorage: {
    type: Number,
    default: 0,
    min: 0,
  },
  amountSold: {
    type: Number,
    default: 0,
    min: 0,
  },
  categories: [String],
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
