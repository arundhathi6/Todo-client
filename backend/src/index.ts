import express from 'express';
import cors from 'cors';
import { signup, login, logout } from './controllers/auth.controller';
import { createTodo, getTodos, updateTodo, deleteTodo } from './controllers/todo.controller';
import { authenticate } from './middlewares/auth.middleware';

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", signup);
app.post("/login", login);
app.post("/logout", logout);

// todo routers
app.post("/todo", authenticate, createTodo);
app.get("/todo", authenticate, getTodos);
app.put("/todo/update", authenticate, updateTodo);
app.put("/todo/delete", authenticate, deleteTodo);

export default app;
