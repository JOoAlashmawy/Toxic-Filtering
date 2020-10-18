const router = require('express').Router();

//controlers
const {
  loginSocial,
  registerSocial,
} = require('../../controllers/signing/social-signing-controller');
//developer Register
router.post('/register', registerSocial);
router.post('/login', loginSocial);

module.exports = router;
