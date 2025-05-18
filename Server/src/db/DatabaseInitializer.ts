import { Pool } from 'pg';
import { createAppStatusTable } from './migrations/createAppStatusTable';
import { createUsersTable } from './migrations/createUsersTable';

export const initializeDatabase = async (pool: Pool) => {
  console.log('Initializing database...');

  try {
    // Run all migrations
    await createAppStatusTable(pool);
    await createUsersTable(pool);

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};