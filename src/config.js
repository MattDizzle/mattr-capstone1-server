module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin:new123@localhost/poll_data',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
};