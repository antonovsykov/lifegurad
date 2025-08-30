const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class Orders {
  // 获取所有订单
  static async getAll() {
    try {
      const result = await db.query(
        'SELECT * FROM insurance orders by creat_at asc'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`获取险种列表失败: ${error.message}`);
    }
  }

  // 根据ID获取产品
  static async getById(id) {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  // 创建订单
  static async create({ ins_id, wallet_adr, share, total, hash, email, month }) {
    try {
      const orderId = uuidv4();
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const endTime = moment().add(month, 'months').format('YYYY-MM-DD HH:mm:ss');
      const result = await db.query(
        'INSERT INTO orders (id, ins_id, wallet_adr, share, total, hash, email, start_time, endTime, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [orderId, ins_id, wallet_adr, share, total, hash, email, currentTime, endTime, currentTime]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`创建学生失败: ${error.message}`);
    }
  }
}

module.exports = Orders;