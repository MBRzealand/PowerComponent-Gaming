const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'The Password must be specified'],
    trim: true,
  },
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
