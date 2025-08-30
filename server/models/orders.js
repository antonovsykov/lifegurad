import db from '../config/database.js'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

class Orders {

  // 获取所有订单
  static async getAll() {
    try {
      const result = await db.query(
        'SELECT * FROM orders order by create_at asc'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`获取险种列表失败: ${error.message}`);
    }
  }

  // 根据ID获取订单
  static async getById(id) {
    const result = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
  }

  // 根据address获取订单包含保险内容
  static async getByAddress(address, type) {
    if (type == 'valid') {
      const checkTime = moment().format('YYYY-MM-DD');
      const result = await db.query('SELECT o.*, i.title_en, i.title_zh, i.brief_en, i.brief_zh, i.bgimg FROM orders o left join insurance i on o.ins_id = i.id WHERE o.wallet_adr = $1 and o.end_time >= $2 order by o.create_at desc', [address, checkTime]);
      return result.rows;
    } else if (type == 'expiring') {
      const startTime = moment().format('YYYY-MM-DD');
      const endTime = moment().add(3, 'days').format('YYYY-MM-DD');
      const result = await db.query('SELECT o.*, i.title_en, i.title_zh, i.brief_en, i.brief_zh, i.bgimg FROM orders o left join insurance i on o.ins_id = i.id WHERE o.wallet_adr = $1 and o.end_time >= $2 and o.end_time <= $3 order by o.create_at desc', [address, startTime, endTime]);
      return result.rows;
    } else {
      const result = await db.query('SELECT o.*, i.title_en, i.title_zh, i.brief_en, i.brief_zh, i.bgimg FROM orders o left join insurance i on o.ins_id = i.id WHERE o.wallet_adr = $1 order by o.create_at desc', [address]);
      return result.rows;
    }
  }

  // 创建订单
  static async create({ ins_id, wallet_adr, duration, share, money, total, hash, email }) {
    try {
      const orderId = uuidv4();
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const endTime = moment().add(duration, 'months').format('YYYY-MM-DD HH:mm:ss');
      const result = await db.query(
        'INSERT INTO orders (id, ins_id, wallet_adr, duration, share, money, total, hash, email, status,start_time, end_time, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
        [orderId, ins_id, wallet_adr, duration, share, money, total, hash, email, 0, currentTime, endTime, currentTime]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`创建订单失败: ${error.message}`);
    }
  }

  // 修改订单
  static async update({ id, status }) {
    try {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const result = await db.query(
        'UPDATE orders SET status = $1, update_at=$2 where id = $3',
        [status, currentTime, id]
      );
      return result;
    } catch (error) {
      throw new Error(`创建订单失败: ${error.message}`);
    }
  }
}

export default Orders;