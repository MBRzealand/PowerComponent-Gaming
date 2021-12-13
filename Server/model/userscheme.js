const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A Email must be specified'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'The Password must be specified'],
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  adresse: {
    zipCode: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    street: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      lowercase: true,
      trim: true,
      default: 'Danmark',
    },
  },
  cardInformation: {
    cardNumber: {
      type: String,
      required: true,
      trim: true,
    },
    cardExpiryDate: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
      trim: true,
    },
    required: false,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
