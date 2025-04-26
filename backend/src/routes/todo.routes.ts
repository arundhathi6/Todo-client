import { Router } from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { catchAsync } from '../utils/catchAsync';

const router = Router();

router.use(catchAsync(authenticate)); // DON'T wrap this with catchAsync!

router.post('/', catchAsync(createTodo));
router.get('/', catchAsync(getTodos));
router.put('/:id', catchAsync(updateTodo));
router.delete('/:id', catchAsync(deleteTodo));

export default router;
