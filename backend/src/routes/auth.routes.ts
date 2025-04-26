import { Router } from 'express';
import { signup, login, logout } from '../controllers/auth.controller';
import { catchAsync } from '../utils/catchAsync';

const router = Router();

router.post('/signup', catchAsync(signup));
router.post('/login', catchAsync(login));
router.post('/logout', catchAsync(logout));

export default router;
