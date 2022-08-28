import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware.verifyToken, UserController.getUsers);

router.get('/:id', UserController.getUser);

router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], UserController.CreateUser);

export default router;
