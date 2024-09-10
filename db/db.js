const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'employee',  
  password: process.env.DB_PASSWORD || 'rootroot',
  port: process.env.DB_PORT || 5432,
});

client.connect()
  .then(() => console.log('Connected to the database!'))
  .catch(err => console.error('Database connection error:', err.stack));

module.exports = client;
