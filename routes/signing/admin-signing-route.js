const router = require('express').Router();

//controlers
const {
  loginAdmin,
  registerAdmin,
} = require('../../controllers/signing/admin-signing-controller');
//developer Register
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
