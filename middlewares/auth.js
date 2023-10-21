import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("req: ", req.body);
  const token = req.headers.authorization;
  console.log('token: ',token)

  if (!token) {
    return res
      .status(403)
      .send({ message: "Se requiere un token para la autenticación" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETTOPRIVATEKEY);
    const { email, id, restaurantID, role } = decoded;
    req.user = { id, email, restaurantID, role };
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token no válido" });
  }
};
