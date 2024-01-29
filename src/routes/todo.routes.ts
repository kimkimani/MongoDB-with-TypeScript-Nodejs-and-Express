import express from "express";
import { todoController } from "../controllers/todo.controllers";

const router = express.Router();

router.route('/').post(todoController.createTodo).get(todoController.getTodos);

router.route('/:id').get(todoController.getSingleTodo).patch(todoController.updateTodo).delete(todoController.deleteTodo);

export default router