const router = require('express').Router();

//controlers
const {
  loginDeveloper,
  registerDeveloper,
} = require('../../controllers/signing/developer-signing-controller');
//developer Register
router.post('/register', registerDeveloper);
router.post('/login', loginDeveloper);

module.exports = router;
