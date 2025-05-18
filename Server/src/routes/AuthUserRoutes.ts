import { Router } from 'express';
import {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUserByEmailHandler,
  getAllUsersHandler,
} from '../controllers/AuthUserController';

const router = Router();

// Create a new user
router.post('/', createUserHandler);

// Update an existing user
router.put('/:id', updateUserHandler);

// Delete a user
router.delete('/:id', deleteUserHandler);

// Get a user by ID
router.get('/id/:id', getUserByIdHandler);

// Get a user by email
router.get('/email/:email', getUserByEmailHandler);

// Get all users
router.get('/', getAllUsersHandler);

export default router;