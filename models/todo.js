import { Schema, model } from "mongoose";

const Todochema = Schema({
  title: String,
  completed: Boolean,
});

Todochema.methods.toJSON = function () {
  const { __v, _id, ...todo } = this.toObject();
  todo.uid = _id;
  return todo;
};

export default model("Todo", Todochema);
