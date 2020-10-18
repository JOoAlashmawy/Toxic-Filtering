const { Developers } = require('../../models/developer-model');

module.exports.profileDeveloper = async (req, res) => {
  const userId = req.user.id;
  const developerUser = await Developers.findById(userId);
  return res.send(developerUser);
};

//update profile information
module.exports.profileUpdatedeveloper = async (req, res) => {
  if (req.body.pass)
    req.body.pass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt(10));
  const developerUser = await Developer.findByIdAndUpdate(
    req.user.id,
    req.body
  );
  return res.send(developerUser);
};
