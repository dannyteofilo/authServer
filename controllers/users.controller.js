const { response, request } = require("express");
const User = require("../models/user");
const bcryptJs = require("bcryptjs");
const {generateToken}=require('../helpers/common')

const usersGet = async (req = request, res = response) => {
  const { limit, from } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({ total, users });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encriptar password
  const salt = bcryptJs.genSaltSync();
  user.password = bcryptJs.hashSync(password, salt);

  // save
  await user.save();
  const data = {
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
  }
  const token = await generateToken({ data })
  res.json({user,token });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;
  // Todo Validar contra base de datos
  if (password) {
    //Encriptar password
    const salt = bcryptJs.genSaltSync();
    rest.password = bcryptJs.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, rest);
  res.json(userDB);
};

const usersDelete = async (req, res = response) => {
  // const user=await User.findByIdAndDelete(id)
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
