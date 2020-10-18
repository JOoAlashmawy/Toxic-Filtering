// Modules
const mongoose = require('mongoose');
const RegExps = require('../validators/regExps');
const jwt = require('jsonwebtoken');
const jwtKey = require('../startup/config').getJwtToken();

// const jwt = require("jsonwebtoken");
// // Includes
// const jwtPassengerKey = require("../startup/config.js").jwtKeys().passengerJwt;

//******************  Model ******************
// Schema
const developerSchema = new mongoose.Schema({
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
    required: true,
    trim: true,
    match: RegExps.mailRegExp,
  },
  stripeToken: {
    type: String,
    // required: true,
    trim: true,
  },
});

developerSchema.methods.generateJWT = function (expire = '72h') {
  return jwt.sign(
    {
      id: this._id,
      // stripeId: this.stripeId,
      type: 'developer',
    },
    jwtKey,
    { expiresIn: expire }
  );
};
module.exports.Developers = mongoose.model('developers', developerSchema);
