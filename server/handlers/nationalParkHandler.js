"use strict";
require("dotenv").config({
  path: "../.env",
});
const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const { v4: uuidv4 } = require("uuid");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");

const getAllNationalParks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "doggie_ville";
  const collectionName = "nationalParks";
  await client.connect();

  const db = client.db(dbName);
  try {
    const data = await db.collection(collectionName).find().toArray();

    res.status(200).json({
      status: 200,
      nationalParks: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.massage,
    });
  } finally {
    client.close();
  }
};

const getNationalParksById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;

  await client.connect();

  const db = client.db("doggie_ville");

  db.collection("nationalParks").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, nationalPark: result })
      : res.status(404).json({ status: 404, _id, message: "User not Found" });
    client.close(); // need to close right after finding one element
  });
};

module.exports = { getAllNationalParks, getNationalParksById };
