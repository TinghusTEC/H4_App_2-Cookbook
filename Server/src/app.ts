import express from 'express';
import cors from 'cors';
import AppStatusRoutes from './routes/AppStatusRoutes';
import AuthUserRoutes from './routes/AuthUserRoutes';
import HelloWorldRoutes from './routes/HelloWorldRoutes';
import { connectToDatabase } from './db/Database';

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

// Register routes
app.use('/api', HelloWorldRoutes);
app.use('/api/app-status', AppStatusRoutes);
app.use('/api/users', AuthUserRoutes);

export default app;