const router = require('express').Router();

const {
  profileAdmin,
  profileUpdateAdmin,
} = require('../../controllers/profile/admin-profile-controller');

router.get('/', profileAdmin);
router.put('/', profileUpdateAdmin);

module.exports = router;
