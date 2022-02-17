const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

});

module.exports = mongoose.model('orderStatus', orderStatusSchema);
