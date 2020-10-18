const { Developers } = require('../../models/developer-model');
const bcrypt = require('bcryptjs');
//validators functions
const {
  validateDeveloper,
  validateDeveloperLogin,
} = require('../../validators/signing/developer-signing-validator');

//register
module.exports.registerDeveloper = async (req, res) => {
  const { error } = validateDeveloper(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request
  req.body.pass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt(10));
  const developerUser = await Developers.create(req.body);
  return res
    .status(200)
    .header('x-login-token', developerUser.generateJWT())
    .send('OK');
};

//login
module.exports.loginDeveloper = async (req, res) => {
  const { error } = validateDeveloperLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request

  const developerUser = await Developers.findOne({
    userName: req.body.userName,
  });
  //Checkin if username found
  if (!developerUser) return res.status(401).send('Invalid login credentials'); //access denied
  //Checkin if Password is correct
  const validPassword = await bcrypt.compare(req.body.pass, developerUser.pass);
  if (!validPassword) return res.status(401).send('Invalid login credentials');
  return res
    .header('x-login-token', developerUser.generateJWT())
    .status(200)
    .send('logged in');
};
