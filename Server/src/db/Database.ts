import { Pool } from 'pg';
import { initializeDatabase } from './DatabaseInitializer';
import { config } from '../config/config';

const poolConfig = {
  host: config.db.host,
  port: config.db.port,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database,
};

console.log('PostgreSQL Pool Config:', poolConfig);

const pool = new Pool(poolConfig);

export const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');

    await initializeDatabase(pool);

    await pool.query(`
      INSERT INTO app_status (status_message)
      VALUES ('App started and connected successfully.');
    `);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit if the database connection fails
  }
};

export const getPool = () => pool;