import { response, request } from "express";
import Todo from "../models/todo.js";

export const todosGet = async (req = request, res = response) => {
  const { limit, from } = req.query;

  const [total, todos] = await Promise.all([
    Todo.countDocuments({ state: true }),
    Todo.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({ total, todos });
};

export const todosPost = async (req, res = response) => {
  const { title, completed } = req.body;
  const todo = new Todo({ title, completed });

  // save
  await todo.save();
  res.json({ todo });
};

export const todoPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id,...rest } = req.body;
  // Todo Validar contra base de datos

  const todoDB = await Todo.findByIdAndUpdate(id, rest);
  res.json(todoDB);
};

export const todoDelete = async (req, res = response) => {
  // const user=await User.findByIdAndDelete(id)
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, { status: false });
  res.json(todo);
};
