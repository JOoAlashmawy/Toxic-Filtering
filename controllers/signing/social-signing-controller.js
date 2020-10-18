const { Social } = require('../../models/social-model');
const bcrypt = require('bcryptjs');
//validators functions
const {
  validateSocial,
  validateSocialLogin,
} = require('../../validators/signing/social-signing-validator');

module.exports.registerSocial = async (req, res) => {
  const { error } = validateSocial(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request
  // async-await
  req.body.pass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt(10));
  /*
  // Callbacks
  bcrypt.genSalt(10, (value, error) => {
    // Failed
    if (error) throw new Error('Generating salt failed');
    // Success
    bcrypt.hash(req.body.pass, value, (value, error) => {
      // Failed
      if (error) throw new Error('Generating hash failed');
      // Success
      req.body.pass = value;
    });
  });*/
  // then-catch
  /*bcrypt.genSalt(10)
    .then((value) => {
      bcrypt.hash(req.body.pass, value)
      .then((value)=>{
        req.body.pass = value
      })
      .catch((error)=> {
        throw new Error(error.message)
      })
    })
    .catch((error) => {
      throw new Error(error.message);
    });
    */
  const socialUser = await Social.create(req.body);
  return res
    .status(200)
    .header('x-login-token', socialUser.generateJWT())
    .send('OK');
};

//login
module.exports.loginSocial = async (req, res) => {
  const { error } = validateSocialLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message); //bad request

  const socialUser = await Social.findOne({
    userName: req.body.userName,
  });
  //Checkin if username found
  if (!socialUser) return res.status(401).send('Invalid login credentials'); //access denied
  //Checkin if Password is correct
  const validPassword = await bcrypt.compare(req.body.pass, socialUser.pass);
  if (!validPassword) return res.status(401).send('Invalid login credentials'); //access denied
  return res
    .header('x-login-token', socialUser.generateJWT())
    .status(200)
    .send('logged in');
};
