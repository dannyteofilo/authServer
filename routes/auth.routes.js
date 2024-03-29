import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controller.js";
import { validRequest } from "../middlewares/valid-data.js";

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

export default router;
