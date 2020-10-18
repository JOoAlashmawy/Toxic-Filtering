module.exports = function (err, req, res, next) {
  console.log(err.message);
  res.status(500).send(`Internal Error:\n${err.message}`);
};
