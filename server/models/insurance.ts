const db = require('../config/database');

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
}

module.exports = Insurance;