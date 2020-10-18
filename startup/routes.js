// Import Modules
const express = require('express');
require('express-async-errors');
const error = require('../middlewares/error');
const { authentication } = require('../middlewares/authentication');
const {
  authorizeSocial,
  authorizeDeveloper,
  authorizeAdmin,
} = require('../middlewares/authorization');
//Import Routes
const developerSigning = require('../routes/signing/developer-signing-route');
const socialSigning = require('../routes/signing/social-signing-route');
const adminSigning = require('../routes/signing/admin-signing-route');
const socialProfile = require('../routes/profile/social-profile-route');
const developerProfile = require('../routes/profile/developer-profile-route');
const adminProfile = require('../routes/profile/admin-profile-route');

// Apply routes & Middleware
module.exports.API = function (app) {
  app.use(express.json({ limit: '5mb' })); // Reparse body of the request into json object
  app.use(express.urlencoded({ extended: true, limit: '5mb' })); // Reparse url to encoded url payload
  //morgan for logging requests
  if (process.env.NODE_ENV == 'development') {
    app.use(require('morgan')('tiny'));
  }
  app.use('/signing/developer', developerSigning);
  app.use('/signing/social', socialSigning);
  app.use('/signing/admin', adminSigning);
  app.use('/profile/social', [authentication, authorizeSocial], socialProfile);
  app.use(
    '/profile/developer',
    [authentication, authorizeDeveloper],
    developerProfile
  );
  app.use('/profile/admin', [authentication, authorizeAdmin], adminProfile);

  // Apply Error Middle ware
  app.use(error);
};
// Import Middlewares
// const error = require("../middlewares/error");
// const authentication = require("../middlewares/authentication");

// Import Routes

// Login & Registration
