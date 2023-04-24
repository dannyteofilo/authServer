import { Router } from "express";
import { check } from "express-validator";
import { usersGet, usersPost, usersDelete, usersPut } from "../controllers/users.controller.js";
import { existEmailValid, existUserId } from "../helpers/db-validators.js";
import { validRequest } from "../middlewares/valid-data.js";

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "is an id invalid").isMongoId(),
    check("id").custom(existUserId),
  ],
  validRequest,
  usersPut
);

router.post(
  "/",
  [
    check("password", "the password must have at least 6 letters").isLength({
      min: 6,
    }),
    check("email").custom(existEmailValid),
  ],
  validRequest,
  usersPost
);

router.delete(
  "/:id",
  [
    check("id", "is an id invalid").isMongoId(),
    check("id").custom(existUserId),
  ],
  validRequest,
  usersDelete
);

export default router;
