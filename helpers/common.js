const jwt = require("jsonwebtoken");

const generateToken = ({ data }) => {
  return jwt.sign(data, process.env.SECRETTOPRIVATEKEY, { expiresIn: "4h" });
};

module.exports = {
  generateToken,
};
