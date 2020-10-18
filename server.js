const express = require('express');
const app = express();
const { API } = require('./startup/routes');
const { port, host } = require('./startup/config').getServerConfig();
//--------------
//initialize database
const { connectMongo } = require('./db/mongoDb');
connectMongo();
//apply API Routes
API(app);
//start serving request
app.listen(port, host, () => {
  console.log(`Server is listenning on ${host}:${port}`);
});
