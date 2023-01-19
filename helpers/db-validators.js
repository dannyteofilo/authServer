const User = require("../models/user");

const existEmailValid = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`email: ${email} already exist`);
  }
};

const existUserId = async (id) => {
  const existId = await User.findById(id);
  if (!existId) {
    throw new Error(`user: ${id} not exist`);
  }
};

module.exports = {
  existEmailValid,
  existUserId,
};
