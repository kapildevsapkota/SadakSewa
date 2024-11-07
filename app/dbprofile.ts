import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sapkota2*',
  database: 'SadakSewa',
});

export default db;
