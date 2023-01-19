const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersDelete,
  usersPut,
} = require("../controllers/users.controller");

const { existEmailValid, existUserId } = require("../helpers/db-validators");

const { validRequest } = require("../middlewares/valid-data");

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

module.exports = router;
