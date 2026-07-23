const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initialize() {
  const sql = fs.readFileSync(path.join(__dirname, '../database/stockcontrol.sql'), 'utf8');
  try {
    await pool.query(sql);
    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error inicializando la base de datos:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initialize();
