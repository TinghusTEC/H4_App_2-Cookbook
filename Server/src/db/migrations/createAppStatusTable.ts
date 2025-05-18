import { Pool } from 'pg';

export const createAppStatusTable = async (pool: Pool) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_status (
      id SERIAL PRIMARY KEY,
      status_message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};