import db from '../config/database.js'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

import Orders from '../models/orders.js';
import Insurance from '../models/insurance.js';

class Claims {

  // 获取所有理赔记录
  static async getAll() {
    try {
      const result = await db.query(
        'SELECT * FROM claims order by submit_time desc'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`获取险种列表失败: ${error.message}`);
    }
  }

  // 根据ID获取理赔信息
  static async getById(id) {
    const result = await db.query('SELECT * FROM claims WHERE id = $1', [id]);
    return result.rows[0];
  }

  // 根据address获取里皮信息包含保险内容
  static async getByAddress(address, type) {
    if (type == 'pending') {
      const result = await db.query('SELECT c.*, i.title_en, i.title_zh, o.duration FROM claims c left join insurance i on c.ins_id = i.id left join orders o on c.order_id = o.id Where o.wallet_adr = $1 and c.status = $2 order by c.submit_time desc', [address, 1]);
      return result.rows;
    } else if (type == 'approved') {
      const result = await db.query('SELECT c.*, i.title_en, i.title_zh, o.duration FROM claims c left join insurance i on c.ins_id = i.id left join orders o on c.order_id = o.id Where o.wallet_adr = $1 and c.status > $2 order by c.submit_time desc', [address, 1]);
      return result.rows;
    } else if (type == 'partial') {
      const result = await db.query('SELECT c.*, i.title_en, i.title_zh, o.duration FROM claims c left join insurance i on c.ins_id = i.id left join orders o on c.order_id = o.id Where o.wallet_adr = $1 and c.status = $2 order by c.submit_time desc', [address, 2]);
      return result.rows;
    } else {
      const result = await db.query('SELECT c.*, i.title_en, i.title_zh, o.duration FROM claims c left join insurance i on c.ins_id = i.id left join orders o on c.order_id = o.id Where o.wallet_adr = $1 order by c.submit_time desc', [address]);
      return result.rows;
    }
  }

  // 创建理赔
  static async create({ order_id, reasion, files, paymoney }) {
    try {
      const orderId = uuidv4();
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const order = await Orders.getById(order_id);
      if (order.status == 0) {
        const insurance = await Insurance.getById(order.ins_id);
        const first_money = paymoney / 2;
        const second_money = paymoney / 2;
        const result = await db.query(
          'INSERT INTO claims (id, ins_id, order_id, reasion, files, submit_time, status, first_money, second_money) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
          [orderId, insurance.id, order_id, reasion, files, currentTime, 1, first_money, second_money]
        );
        const status = 1
        await Orders.update({ id: order_id, status })
        return result.rows[0];
      } else {
        throw new Error('yourclaimappliensuccess');
      }
    } catch (error) {
      throw new Error(`创建订单失败: ${error.message}`);
    }
  }

  // 更新第一期理赔记录
  static async updateFirst({ id }) {
    try {
      const claim = Claims.getById(id)
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const result = await db.query(
        'UPDATE claims SET status = $1, first_time=$2 where id = $3',
        [2, currentTime, id]
      );
      const status = 2
      await Orders.update({ id: claim.order_id, status })
      return result;
    } catch (error) {
      throw new Error(`创建订单失败: ${error.message}`);
    }
  }

  // 更新第二期理赔记录
  static async updateSecond({ id }) {
    try {
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const result = await db.query(
        'UPDATE claims SET status = $1, second_time=$2 where id = $3',
        [3, currentTime, id]
      );
      return result;
    } catch (error) {
      throw new Error(`创建订单失败: ${error.message}`);
    }
  }

  // 审核失败
  static async updateFailed({ id }) {
    try {
      const claim = Claims.getById(id)
      const result = await db.query(
        'UPDATE claims SET status = $1 where id = $2',
        [0, id]
      );
      const status = 3
      await Orders.update({ id: claim.order_id, status })
      return result;
    } catch (error) {
      throw new Error(`创建订单失败: ${error.message}`);
    }
  }
}

export default Claims;