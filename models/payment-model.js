// Modules
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const passwordComplexity = require('joi-password-complexity');
// const jwt = require('jsonwebtoken');
// // Includes
// const jwtPassengerKey = require('../startup/config.js').jwtKeys().passengerJwt;
// Schema
const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //will not take spaces or new lines
    minlength: 3,
    maxlength: 64,
  },
  amount: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports.Payment = mongoose.model('payment', paymentSchema);
