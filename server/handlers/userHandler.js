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

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "doggie_ville";
  const collectionName = "users";
  await client.connect();

  const db = client.db(dbName);
  try {
    const data = await db.collection(collectionName).find().toArray();

    res.status(200).json({
      status: 200,
      users: data,
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.massage,
    });
  } finally {
    client.close();
  }

  console.log("disconnected!");
};

const getUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;

  await client.connect();

  const db = client.db("doggie_ville");

  db.collection("users").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, userProfile: result })
      : res.status(404).json({ status: 404, _id, message: "User not Found" });
    client.close(); // need to close right after finding one element
  });
};

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("doggie_ville");
  // retrive the key we need from body as a variable
  const { ownerName, dogName, email } = req.body;
  console.log(ownerName, dogName, email);
  const validation = async () => {
    const allLetters = /^[A-Za-z]+$/;
    if (!email || !email.includes("@") || !ownerName || !dogName) {
      res
        .status(500)
        .json({ status: 500, data: req.body, message: "Missing Data" });
      return false;
    } else if (!ownerName.match(allLetters)) {
      res
        .status(500)
        .json({ status: 500, message: "Invalid owner name Input" });
      return false;
    }

    const result = await db.collection("users").findOne({ email });
    if (result) {
      res.status(400).json({ status: 400, message: "User already exist" });
      return false;
    }

    return true;
  };

  const newId = uuidv4();

  if ((await validation()) === false) {
    client.close();
    return;
  }

  try {
    await db.collection("users").insertOne({ ...req.body, _id: newId });

    res.status(201).json({
      status: 201,
      id: newId,
      userProfile: req.body,
      message: "success",
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
const updateUser = async (req, res) => {
  // TODO: connect...
  const client = new MongoClient(MONGO_URI, options);

  const { _id } = req.params;
  //   the object add in JSON is req.body, destructuring the object to see if there is a "hello" key.and save the value to a variable called hello

  const { ownerName, dogName, email } = req.body;
  await client.connect();

  const db = client.db("doggie_ville");
  const query = { _id };

  const newValues = { $set: { ...req.body } };
  //   validation steps
  const allLetters = /^[A-Za-z]+$/;
  if (!email || !email.includes("@") || !ownerName || !dogName) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: "missing data" });
    return false;
  } else if (!ownerName.match(allLetters)) {
    res.status(500).json({ status: 500, message: "invalid input" });
    return false;
  }

  const result = await db.collection("users").findOne({ email });

  try {
    await db.collection("users").updateOne(query, newValues);
    res.status(201).json({ status: 201, _id, ...req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    //   this is the best place to close
    client.close();
  }
};

const updateUserLike = async (req, res) => {
  // TODO: connect...
  const client = new MongoClient(MONGO_URI, options);

  const { _id } = req.params;
  //   the object add in JSON is req.body, destructuring the object to see if there is a "hello" key.and save the value to a variable called hello

  await client.connect();
  // const { favouritesId } = req.body;
  // console.log(favouritesId);

  const db = client.db("doggie_ville");
  const query = { _id };

  const newValues = { $set: { ...req.body } };
  //   validation steps
  console.log(newValues);
  try {
    await db.collection("users").updateOne(query, newValues);
    res.status(201).json({ status: 201, _id, ...req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    //   this is the best place to close
    client.close();
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserLike,
};
