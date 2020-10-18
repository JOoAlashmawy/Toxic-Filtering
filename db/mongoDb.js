const mongoose = require('mongoose');
const connectMongo = require('../startup/config').getMongoCred();
module.exports.connectMongo = function () {
  mongoose
    .connect(
      //   'mongodb+srv://JOo:12345678y@youssef.wq53p.mongodb.net/Toxic-Filtering?retryWrites=true&w=majority'
      connectMongo,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connected to MongooDB...'))
    .catch((err) => console.error('Could not connect to MongoDB ' + err));
};
