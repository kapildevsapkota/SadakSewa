// app/dbApplication.ts
import { createPool } from 'mysql2/promise';

const applicationPool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'sapkota2*',
  database: 'Application',
});

export default {
  query: async (sql: string, params: any[]) => {
    const [results] = await applicationPool.execute(sql, params);
    return results;
  },
};
