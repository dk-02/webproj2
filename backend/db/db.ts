import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_HOST,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;