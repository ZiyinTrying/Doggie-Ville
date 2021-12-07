const users = [
  {
    _id: "001",
    ownerName: "Chun",
    dogName: "Elsa",
    dogGender: "female",
    dogAge: "4 years old",
    dogBreed: "Poodle",
    dogWeight: "20",
    latitude: "45.418160",
    longtitude: "-73.48762",
    email: "chun@123.com",
  },
  {
    _id: "002",
    ownerName: "Simon",
    dogName: "Ekko",
    dogGender: "male",
    dogAge: "1 years old",
    dogBreed: "German Shepherd",
    dogWeight: "90",
    latitude: "45.451740",
    longtitude: "-73.463460",
    email: "simon@123.com",
  },
  {
    _id: "003",
    ownerName: "Dallas",
    dogName: "Mahogany",
    dogGender: "female",
    dogAge: "9 years old",
    dogBreed: "Pineranian",
    dogWeight: "10",
    latitude: "45.441110",
    longtitude: "-73.599720",
    email: "dallas@123.com",
  },
  {
    _id: "004",
    ownerName: "Alex",
    dogName: "Odie",
    dogGender: "male",
    dogAge: "11 years old",
    dogBreed: "Schnoodle",
    dogWeight: "20",
    latitude: "45.472290",
    longtitude: "-73.611010",
    email: "alex@123.com",
  },
  {
    _id: "005",
    ownerName: "Konstantin",
    dogName: "Dusya",
    dogGender: "female",
    dogAge: "5 years old",
    dogBreed: "Labrador",
    dogWeight: "60",
    latitude: "45.399261",
    longtitude: "-74.132881",
    email: "konstantin@123.com",
  },
  {
    _id: "006",
    ownerName: "Nicolas",
    dogName: "Jackson",
    dogGender: "male",
    dogAge: "5 years old",
    dogBreed: "Labradoodle",
    dogWeight: "70",
    latitude: "45.4496098",
    longtitude: "-73.6024524",
    email: "nicolas@123.com",
  },
  {
    _id: "007",
    ownerName: "Ashton",
    dogName: "Tofu",
    dogGender: "male",
    dogAge: "4 years old",
    dogBreed: "Bahamian Pot Cake",
    dogWeight: "20",
    latitude: "45.492801666259766",
    longtitude: "-73.57196807861328",
    email: "ashton@123.com",
  },
];
const nationalParks = [
  {
    _id: "1",
    parkName: "Parc national du Mont-Saint-Bruno",
    moreInfoUrl: "https://www.sepaq.com/pq/msb/",
    latitude: "",
    longtitude: "",
    imgSrc:
      "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638805000/Doggie_Ville_Maps/mont-saint_bruno_fdphlo.png",
    summerTrail: {
      trails: ["Le Seigneurial", "Le Petit-Duc", "Le Grand-Duc"],
      mapSrc:
        "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638803419/Doggie_Ville_Maps/Mont-saint-bruno_summer_ipqcgt.png",
    },
    winterTrail: {
      trails: ["Le Seigneurial", "Le Petit-Duc", "Le Grand-Duc"],
      mapSrc:
        "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638803418/Doggie_Ville_Maps/mont-saint-bruno_winter_h0fxri.png",
    },
    picnicArea: true,
    campsite: false,
  },
  {
    _id: "2",
    parkName: "PARC NATIONAL DES ÎLES-DE-BOUCHERVILLE",
    moreInfoUrl: "https://www.sepaq.com/pq/bou/",
    latitude: "",
    longtitude: "",
    imgSrc:
      "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638806334/Doggie_Ville_Maps/boucheville_ppejde.png",
    summerTrail: {
      trails: ["L'Île-Sainte-Marguerite (multifunctional trail)"],
      mapSrc:
        "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638806333/Doggie_Ville_Maps/Boucheville_summer_itupfc.png",
    },
    winterTrail: {
      trails: ["L'Île-Sainte-Marguerite (multifunctional trail)"],
      mapSrc:
        "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638806333/Doggie_Ville_Maps/Boucheville_winter_ikifdq.png",
    },
    picnicArea: true,
    campsite: true,
    campsiteBookingUrl:
      "https://www.sepaq.com/en/reservation/camping/parc-national-des-iles-de-boucherville/molson-espace-vr",
  },
  {
    _id: "3",
    parkName: "PARC NATIONAL DU MONT-TREMBLANT",
    moreInfoUrl: "https://www.sepaq.com/pq/mot/",
    latitude: "",
    longtitude: "",
    imgSrc:
      "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638807655/Doggie_Ville_Maps/mont_tremblant_lnostt.png",
    summerTrail: {
      trails: [
        "La Roche",
        "La Corniche",
        "La Coulée",
        "La Piste-du-Loup",
        "L'Envol",
        "La Chute-aux-Rats",
        "La Boucle-du-Lac-de-L'Assomption",
        "Les Grandes-Vallées",
      ],
      mapSrc:
        "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638807655/Doggie_Ville_Maps/mont-tremblant_summer_dz8zis.png",
    },
    winterTrail: {
      trails: ["La Roche", "La Corniche", "La Coulée"],
      mapSrc:
        "https://res.cloudinary.com/dvmtjbjlp/image/upload/v1638807656/Doggie_Ville_Maps/mont-trenblant-winter_jrovgg.png",
    },
    picnicArea: true,
    campsite: true,
    campsiteBookingUrl:
      "https://www.sepaq.com/en/reservation/camping/parc-national-du-mont-tremblant",
  },
];
module.exports = { users, nationalParks };
