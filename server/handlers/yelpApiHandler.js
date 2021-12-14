("use strict");

require("dotenv").config({
  path: "../.env",
});

const fetch = require("node-fetch");
const { YELP_API } = process.env;

const processData = (businesses, category) => {
  businesses.map((business) => {
    business.category = category;
    return business;
  });
  return businesses;
};

const getBusinessesByCategory = async (req, res) => {
  const { category, lat, lon } = req.params;
  console.log(category, lat, lon);
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
      let processedData = processData(data.businesses, category);

      res.status(200).json({ status: 200, processedData });
    })
    .catch((err) => res.status(404).json({ status: 404, data: "Not Found" }));
};

const getBusinessesById = async (req, res) => {
  const { id } = req.params;
  // console.log(category, lat, lon);
  fetch(`https://api.yelp.com/v3/businesses/${id}`, {
    method: "GET",
    headers: {
      authorization: YELP_API,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // let processedData = processData(data.businesses, category);

      res.status(200).json({ status: 200, data: data });
    })
    .catch((err) => res.status(404).json({ status: 404, data: "Not Found" }));
};

module.exports = {
  getBusinessesByCategory,
  getBusinessesById,
};
