const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');
const RegExps = require('../regExps');
// Set Password Complexity
const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 2,
};

// Set Validation Schema
const validationSocialSchema = Joi.object().keys({
  name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(64)
    .pattern(RegExps.stringRegExp, 'userName'),
  userName: Joi.string().required().trim().min(3).max(64),
  pass: passwordComplexity(complexityOptions),
  email: Joi.string().email().trim().lowercase().min(6).max(64),

  // accessToken: Joi.string().required().trim(),
  // stripeToken: Joi.string().required().trim(),
});

//set validation for login
module.exports.validateSocial = (social) => {
  return validationSocialSchema.validate(social);
};
//set validation for login
const validationSocialLogin = Joi.object().keys({
  userName: Joi.string().required().trim().min(3).max(64),
  pass: Joi.string().required().min(8).max(30),
});

module.exports.validateSocialLogin = (social) => {
  return validationSocialLogin.validate(social);
};
