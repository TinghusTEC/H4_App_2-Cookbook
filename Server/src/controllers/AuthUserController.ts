import { Request, Response } from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
} from '../repositories/AuthUserRepository';
import { CreateUserDto } from '../models/AuthUserModel';

export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const getUserByEmailHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;

    const user = await getUserByEmail(email);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user); // Only returns id and displayName
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayName }: CreateUserDto = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Email is already in use' });
      return;
    }

    const user = await createUser({ email, password, displayName });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, password, displayName }: Partial<CreateUserDto> = req.body;

    const existingUser = await getUserById(id);
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (email) {
      const userWithEmail = await getUserByEmail(email);
      if (userWithEmail && userWithEmail.id !== id) {
        res.status(400).json({ error: 'Email is already in use' });
        return;
      }
    }

    const updatedUser = await updateUser(id, { email, password, displayName });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await getUserById(id);
    if (!existingUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    await deleteUser(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};