import { Request, Response } from 'express';
import {Todo} from '../models/todo.model'; // or wherever your model is

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = (req as any).user.id;

    const todo = new Todo({ title, description, dueDate, status, owner: userId });
    await todo.save();

    return res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating todo' });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const todos = await Todo.find({ owner: userId });
    return res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const todoId = req.params.id;
    const updated = await Todo.findOneAndUpdate({ _id: todoId, owner: userId }, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: 'Todo not found' });
    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const todoId = req.params.id;
    const deleted = await Todo.findOneAndDelete({ _id: todoId, owner: userId });

    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    return res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting todo' });
  }
};
