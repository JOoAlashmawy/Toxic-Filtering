const { Admin } = require('../../models/admin-model');
const bcrypt = require('bcryptjs');
//validators functions
const {
  validateAdmin,
  validateAdminLogin,
} = require('../../validators/signing/admin-signing-validator');

//register
module.exports.registerAdmin = async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request
  req.body.pass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt(10));
  const adminUser = await Admin.create(req.body);
  return res
    .status(200)
    .header('x-login-token', adminUser.generateJWT())
    .send('OK');
};

//login
module.exports.loginAdmin = async (req, res) => {
  const { error } = validateAdminLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request

  const adminUser = await Admin.findOne({
    userName: req.body.userName,
  });
  //Checkin if username found
  if (!adminUser) return res.status(401).send('Invalid login credentials'); //access denied
  //Checkin if Password is correct
  const validPassword = await bcrypt.compare(req.body.pass, adminUser.pass);
  if (!validPassword) return res.status(401).send('Invalid login credentials');
  return res
    .header('x-login-token', adminUser.generateJWT())
    .status(200)
    .send('logged in');
};
