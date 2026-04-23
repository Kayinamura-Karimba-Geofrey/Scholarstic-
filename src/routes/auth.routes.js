import {Hono} from 'hono';
import { register,login } from '../controllers/auth.controller.js';

export const authRoutes = new Hono();

authRoutes.post('/register', register)
authRoutes.post('/login', login)