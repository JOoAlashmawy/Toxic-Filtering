const router = require('express').Router();

const {
  profileDeveloper,
  profileUpdatedeveloper,
} = require('../../controllers/profile/developer-profile-controller');

router.get('/', profileDeveloper);
router.put('/', profileUpdatedeveloper);

module.exports = router;
