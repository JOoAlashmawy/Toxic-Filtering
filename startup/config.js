const config = require('config'); //to connect with config folder to access at getServerConfig
module.exports.getMongoCred = function () {
  const connectMongo = process.env.TF_LOCAL_URI;
  if (!connectMongo) {
    throw new error('that not found at environment.');
  }
  return connectMongo;
};

module.exports.getServerConfig = function () {
  const port = config.get('port'),
    host = config.get('host'); //get from config folder
  if (!(port && host)) {
    throw new error('Server Config Error');
  }
  return { port, host };
};

module.exports.getJwtToken = function () {
  const jwtKey = process.env.TF_JWT;
  if (!jwtKey) {
    throw new error('that not found at environment.');
  }
  return jwtKey;
};
