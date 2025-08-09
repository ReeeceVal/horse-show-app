import express from 'express';
import 'dotenv/config';
import { Pool } from 'pg';   // <-- inline import

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
});

const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'api' });
});

app.get('/api/health/db', async (_req, res) => {
    try {
        const { rows } = await pool.query('select now() as ts, current_database() as db');
        res.json({ status: 'ok', db_time: rows[0].ts, database: rows[0].db });
    } catch (err) {
        console.error('DB health error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
