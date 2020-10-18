module.exports.authorizeSocial = (req, res, next) => {
  if (req.user.type !== 'social')
    return res.status(403).send('unauthorized social');
  next();
};
module.exports.authorizeDeveloper = (req, res, next) => {
  if (req.user.type !== 'developer')
    return res.status(403).send('unauthorized developer');
  next();
};
module.exports.authorizeAdmin = (req, res, next) => {
  if (req.user.type !== 'admin')
    return res.status(403).send('unauthorized admin');
  next();
};
