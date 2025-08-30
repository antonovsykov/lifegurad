import db from '../config/database.js';

class Insurance {
  // 获取所有险种
  static async getAll() {
    try {
      const result = await db.query(
        'SELECT * FROM insurance order by creat_at asc'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`获取险种列表失败: ${error.message}`);
    }
  }

  // 根据ID获取险种
  static async getById(id) {
    const result = await db.query('SELECT * FROM insurance WHERE id = $1', [id]);
    return result.rows[0];
  }
}

export default Insurance;