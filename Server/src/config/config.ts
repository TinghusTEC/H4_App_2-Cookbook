import dotenv from 'dotenv';
import path from 'path';

// Dynamically determine the .env file to load
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
const envPath = path.resolve(__dirname, '../../', envFile);

// Load environment variables
dotenv.config({ path: envPath });
console.log(`Environment variables loaded from: ${envPath}`);

// Centralized configuration object
export const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'postgres',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
};