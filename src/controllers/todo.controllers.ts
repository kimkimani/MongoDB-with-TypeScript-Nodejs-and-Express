// todo.controller.ts

import { Request, Response } from "express";
import { Todo } from "../models/todo.models";
import { StatusCodes } from "http-status-codes";

class TodoController {
  // create a todo
  createTodo = async (req: Request, res: Response) => {
    const { title, body } = req.body;

    if (!title || !body) {
      throw new Error("Title and Body must be provided.");
    }

    const newTodo = await Todo.create(req.body);
    res.status(StatusCodes.CREATED).json({ todo: newTodo, msg: "Todo has been created!" });
  };

  // get all todos
  getTodos = async (req: Request, res: Response) => {
    const todos = await Todo.find({}).sort('-createdAt');

    if (todos?.length === 0) {
      throw new Error("Todo list is empty!");
    }

    res.status(StatusCodes.OK).json({ todos, msg: "All Todos have been fetched!" });
  };

  // get a single todo
  getSingleTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await Todo.findById({ _id: id });

    if (!todo) {
      throw new Error("Requested todo not found!");
    }

    res.status(StatusCodes.OK).json({ todo, msg: "Success" });
  };

  // update todo
  updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate({ _id: id }, req.body, { new: true });

    if (!updatedTodo) {
      throw new Error("Requested todo not found!");
    }

    res.status(StatusCodes.OK).json({ todo: updatedTodo, msg: "Todo has been updated" });
  };

  // delete todo
  deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete({ _id: id });

    if (!deletedTodo) {
      throw new Error("Requested todo not found!");
    }

    res.status(StatusCodes.OK).json({ todo: deletedTodo, msg: "Todo has been deleted" });
  };
}

export const todoController = new TodoController();
