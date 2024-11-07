import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'sapkota2*',
  database: 'SadakSewa',
});

export default {
  query: async (sql: string, params: any[]) => {
    const [results] = await pool.execute(sql, params);
    return results;
  },
};
