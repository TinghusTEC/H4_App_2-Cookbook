import { getPool } from '../db/Database';

export const getRecentAppStatuses = async (limit: number) => {
  const pool = getPool();
  const result = await pool.query(`
    SELECT * FROM app_status
    ORDER BY created_at DESC
    LIMIT $1;
  `, [limit]);
  return result.rows;
};

export const insertAppStatus = async (statusMessage: string) => {
  const pool = getPool();
  await pool.query(`
    INSERT INTO app_status (status_message)
    VALUES ($1);
  `, [statusMessage]);
};