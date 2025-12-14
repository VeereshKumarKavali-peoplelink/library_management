const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
let isConnected;
const models = require("./models/");

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose
    .connect(process.env.mongoConnString, {
      maxPoolSize: 10,
      maxIdleTimeMS: 10000,
    })
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};