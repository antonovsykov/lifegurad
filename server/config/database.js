import './config.js';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 9875,
  max: 20, // 连接池最大连接数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// 测试数据库连接
pool.on('connect', () => {
  console.log('连接到 PostgreSQL 数据库');
});

pool.on('error', (err) => {
  console.error('数据库连接错误:', err);
});

export default {
  query: (text, params) => pool.query(text, params),
  pool
};