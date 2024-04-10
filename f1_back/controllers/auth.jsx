const User = require("./../models/User");

exports.signUp = (req, res, next) => {
  console.log("Tentative de création de compte");
  next();
};
