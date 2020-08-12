// module.exports = {
//   PORT: process.env.PORT || 8000,
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin:new123@localhost/poll_data',
//   JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
// };

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_KEY: process.env.API_KEY || null,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '106816c9-bcb5-4a05-9d51-4dda16a357c3',
};