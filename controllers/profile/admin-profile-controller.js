const { Admin } = require('../../models/admin-model');
const bcrypt = require('bcryptjs');

//get profile information
module.exports.profileAdmin = async (req, res) => {
  const userId = req.user.id;
  const adminUser = await Admin.findById(userId);
  return res.send(adminUser);
};

//update profile information
module.exports.profileUpdateAdmin = async (req, res) => {
  if (req.body.pass)
    req.body.pass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt(10));
  const adminUser = await Admin.findByIdAndUpdate(req.user.id, req.body);
  return res.send(adminUser);
};
