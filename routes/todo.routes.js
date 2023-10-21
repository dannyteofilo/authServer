import { Router } from "express";
import { check } from "express-validator";
import {
  todosGet,
  todosPost,
  todoDelete,
  todoPut,
} from "../controllers/todo.controller.js";
import { existTodoId } from "../helpers/db-validators.js";
import { validRequest } from "../middlewares/valid-data.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, todosGet);

router.put(
  "/:id",
  [
    check("id", "is an id invalid").isMongoId(),
    check("id").custom(existTodoId),
  ],
  verifyToken,
  validRequest,
  todoPut
);

router.post(
  "/",
  [
    check("title", "the title must have at least 6 letters").isLength({
      min: 6,
    }),
  ],
  verifyToken,
  validRequest,
  todosPost
);

router.delete(
  "/:id",
  [
    check("id", "is an id invalid").isMongoId(),
    check("id").custom(existTodoId),
  ],
  validRequest,
  todoDelete
);

export default router;
