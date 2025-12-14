const connectToDatabase = require("./databaseConn");
const models = require("mongoose").models;

async function create(tableName, data, options = null) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.create(data);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function updateOne(tableName, filter, update, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.findOneAndUpdate(filter, update, options);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function updateMany(tableName, filter, update, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.updateMany(filter, update, options);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function findOne(
  tableName,
  filter,
  projection = {},
  options = {},
  populate = false,
  populateField = "",
  selectFields = ""
) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      let result = null;
      if (!populate) result = await model.findOne(filter, projection, options);
      else
        result = await model
          .findOne(filter, projection, options)
          .populate(populateField, selectFields);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function find(
  tableName,
  filter,
  projection = {},
  options = {},
  populate = false,
  populateField = "",
  selectFields = ""
) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      let result = null;
      if (!populate) result = await model.find(filter, projection, options);
      else
        result = await model
          .find(filter, projection, options)
          .populate(populateField, selectFields);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}


async function deleteOne(tableName, filter, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.deleteOne(filter, options);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}



module.exports = {
  create,
  updateOne,
  updateMany,
  findOne,
  find,
  deleteOne,
};