import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
    console.error('Unexpected PG pool error:', err);
});

export default pool;
