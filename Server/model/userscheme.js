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
    },
    street: {
      type: String,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  cardInformation: {
    cardNumber: {
      type: String, 
      trim: true,
    },
    cardExpiryDate: {
      type: String,
      maxlength: 4,
      trim: true,
    },
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
