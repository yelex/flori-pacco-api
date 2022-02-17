const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String, //TODO : MAKE VALIDATOR FOR PHONE
    required: [true, 'User phone number required']
  },
});

module.exports = mongoose.model('recipient', recipientSchema);