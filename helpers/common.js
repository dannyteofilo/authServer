import jwt from "jsonwebtoken";

export const generateToken = ({ data }) => {
  return jwt.sign(data, process.env.SECRETTOPRIVATEKEY, { expiresIn: "4h" });
};

