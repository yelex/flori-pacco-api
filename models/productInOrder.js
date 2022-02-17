const mongoose = require('mongoose');

const productInOrderSchema = new mongoose.Schema({
    
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },

    quantity: {
        type: Number,
        required: true,
    },

});

module.exports = mongoose.model('order', orderSchema);