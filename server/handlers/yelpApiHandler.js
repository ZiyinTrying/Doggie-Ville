("use strict");

require("dotenv").config({
  path: "../../.env",
});

const fetch = require("node-fetch");
const { YELP_API } = process.env;

const getBusinessesByCategory = async (req, res) => {
  const { category, lat, lon } = req.params;

  fetch(
    `https://api.yelp.com/v3/businesses/search?term=dog%2Bfriendly&categories=${category}&latitude=${lat}&longitude=${lon}&radius=40000`,
    {
      method: "GET",

      headers: {
        authorization: YELP_API,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data
        ? res.status(200).json({ status: 200, data: data.businesses })
        : res.status(404).json({ status: 404, data: "Not Found" });
    });
};

module.exports = {
  getBusinessesByCategory,
};
