const { MongoClient } = require("mongodb");

require("dotenv").config({
  path: "../.env",
});
const { MONGO_URI } = process.env;
//use file-system module to read data
const { users, nationalParks } = require("./data");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("doggie_ville");

  // await db.collection("users").insertMany(users);
  await db.collection("nationalParks").insertMany(nationalParks);

  client.close();
};

batchImport();
module.exports = { batchImport };
