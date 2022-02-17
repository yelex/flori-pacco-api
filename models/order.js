const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipient',
    },

    deliveryAddress: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 200,
    },

    totalPrice: {
        type: mongoose.Types.Decimal128,
        required: false,
    },

    orderStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderStatus',
    },

    isDelivery: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
    }

});

module.exports = mongoose.model('order', orderSchema);