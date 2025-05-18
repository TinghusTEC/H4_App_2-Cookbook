import { Pool } from 'pg';
import { createAppStatusTable } from './migrations/createAppStatusTable';

export const initializeDatabase = async (pool: Pool) => {
  console.log('Initializing database...');

  try {
    // Run all migrations
    await createAppStatusTable(pool);

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};