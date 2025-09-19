import db from '../config/database.js';

class Insurance {
  // 获取所有险种
  static async getAll() {
    try {
      const result = await db.query(
        'SELECT i.*, e.months,e.times FROM insurance i left join earnings e on i.id = e.ins_id order by i.creat_at asc'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`获取险种列表失败: ${error.message}`);
    }
  }

  // 根据ID获取险种
  static async getById(id) {
    const result = await db.query('SELECT i.*, e.months,e.times FROM insurance i left join earnings e on i.id = e.ins_id WHERE i.id = $1', [id]);
    return result.rows[0];
  }
}

export default Insurance;