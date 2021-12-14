const path = require("path");
const express = require("express");
const {
  getBusinessesByCategory,
  getBusinessesById,
} = require("./handlers/yelpApiHandler");
const {
  getAllNationalParks,
  getNationalParksById,
} = require("./handlers/nationalParkHandler");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserLike,
} = require("./handlers/userHandler");
const PORT = 8000;

var app = express();

app.use(express.json());
app.get("/hello", (req, res) => {
  res.status(200).json({ hi: "hi" });
});
// get category and bissiness informatin from yelp api
app.get("/facilities/:category/:lat/:lon", getBusinessesByCategory);
app.get("/business/:id", getBusinessesById);

// end points for users database
app.get("/users", getAllUsers);
app.get("/users/:_id", getUserById);
app.post("/users", createUser);
app.put("/users/:_id", updateUser);
app.put("/userlike/:_id", updateUserLike);

// get national park from mongodb
app.get("/facilities/nationalParks", getAllNationalParks);
app.get("/facilities/nationalParks/:_id", getNationalParksById);

app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
