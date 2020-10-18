// Modules
const mongoose = require('mongoose');
const RegExps = require('../validators/regExps');
const jwt = require('jsonwebtoken');
const jwtKey = require('../startup/config').getJwtToken();
// const jwt = require('jsonwebtoken');
// // Includes
// const jwtPassengerKey = require('../startup/config.js').jwtKeys().passengerJwt;

// Schema
const socialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //will not take spaces or new lines
    minlength: 3,
    maxlength: 64,
    match: RegExps.stringRegExp,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true, //will not take spaces or new lines
    minlength: 3,
    maxlength: 64,
  },
  pass: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 1024,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: RegExps.mailRegExp,
  },
  accessToken: {
    type: String,
    // required: true,
    trim: true,
  },
  stripeToken: {
    type: String,
    // required: true,
    trim: true,
  },
});

socialSchema.methods.generateJWT = function (expire = '72h') {
  return jwt.sign(
    {
      id: this._id,
      type: 'social',
    },
    jwtKey,
    { expiresIn: expire }
  );
};

module.exports.Social = mongoose.model('Social', socialSchema);
