import { response } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../helpers/common.js";

export const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        error: {
          errors: [
            {
              msg: "user or password not exist - status: not found",
            },
          ],
        },
      });

    if (!user.status)
      return res.status(400).json({
        error: {
          errors: [
            {
              msg: "user or password not exist - status: not found",
            },
          ],
        },
      });

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({
        error: {
          errors: [
            {
              msg: "user or password is incorrect",
            },
          ],
        },
      });
    const data = {
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
    };
    const token = await generateToken({ data });
    res.json({ user, token });
  } catch (error) {
    return res.status(500).json({ msg: "contact support" });
  }
};

