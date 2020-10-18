const router = require('express').Router();

const {
  profileSocial,
  profileUpdateSocial,
} = require('../../controllers/profile/social-profile-controller');

router.get('/', profileSocial);
router.put('/', profileUpdateSocial);

module.exports = router;
