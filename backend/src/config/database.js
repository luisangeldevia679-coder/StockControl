const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL || '';
const isSupabaseConnection = /supabase\.co|supabase\.com/i.test(connectionString);

if (!connectionString) {
  console.warn('DATABASE_URL is not set. Add your Supabase connection string to backend/.env');
}

const pool = new Pool({
  connectionString,
  ssl: connectionString && (isSupabaseConnection || process.env.NODE_ENV === 'production')
    ? { rejectUnauthorized: false }
    : false
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
