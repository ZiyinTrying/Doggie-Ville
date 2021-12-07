const path = require("path");
const express = require("express");
const { getBusinessesByCategory } = require("./handlers/yelpApiHandler");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
} = require("./handlers/userHandler");
const PORT = 8000;

var app = express();

app.use(express.json());
app.get("/hello", (req, res) => {
  res.status(200).json({ hi: "hi" });
});
// get category and bissiness informatin from yelp api
app.get("/facilities/:category/:lat/:lon", getBusinessesByCategory);

// end points for users database
app.get("/users", getAllUsers);
app.get("/users/:_id", getUserById);
app.post("/users", createUser);
app.put("/users/:_id", updateUser);

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
