    const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validRequest } = require("../middlewares/valid-data");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password required").not().isEmpty(),
  ],
  validRequest,
  login
);

module.exports = router;
