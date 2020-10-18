const jwt = require('jsonwebtoken');
const jwtKey = require('../startup/config').getJwtToken();
//-----------------

module.exports.authentication = (req, res, next) => {
  const token = req.header('x-login-token');
  if (!token) return res.status(401).send('no token provided');
  req.user = jwt.verify(token, jwtKey); //we check our token(validate it) and return payload in req.use(that we created)
  next();
};
