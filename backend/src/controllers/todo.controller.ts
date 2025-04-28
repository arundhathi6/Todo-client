import { Request, Response } from "express";
import { Todo } from "../models/todo.model"; // or wherever your model is

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = (req as any).user.userId;
    const todo = new Todo({
      title,
      description,
      dueDate,
      status,
      owner: userId,
    });
    await todo.save();

    res.status(201).json(todo);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating todo" });
    return;
  }
};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const todos = await Todo.find({ owner: userId });
    res.status(200).json(todos);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching todos" });
    return;
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const todoId = req.params.id;
    const updated = await Todo.findOneAndUpdate(
      { _id: todoId, owner: userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(updated);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating todo" });
    return;
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const todoId = req.params.id;
    const deleted = await Todo.findOneAndDelete({ _id: todoId, owner: userId });

    if (!deleted) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json({ message: "Todo deleted" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting todo" });
    return;
  }
};
