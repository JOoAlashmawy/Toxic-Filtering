const { Social } = require('../../models/social-model');

module.exports.profileSocial = async (req, res) => {
  const userId = req.user.id;
  const socialUser = await Social.findById(userId);
  return res.send(socialUser);
};

//update profile information
module.exports.profileUpdateSocial = async (req, res) => {
  if (req.body.pass)
    req.body.pass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt(10));
  const socialUser = await Admin.findByIdAndUpdate(req.user.id, req.body);
  return res.send(socialUser);
};
