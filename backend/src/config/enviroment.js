require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'stockcontrol-secret',
  DATABASE_URL: process.env.DATABASE_URL || ''
};
