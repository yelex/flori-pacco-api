const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  description: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 200,
  },

  currentPrice: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  crossedPrice: {
    type: mongoose.Types.Decimal128,
    required: false,
  },

  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  }],

  unit: {
    type: String,
    minlength: 10,
    maxlength: 200,
  },

});

module.exports = mongoose.model('product', productSchema);
