import db from '../config/database.js';

class Earnings {

  // 根据险种ID获取对应险种的收益率
  static async getById(ins_id) {
    const result = await db.query('SELECT * FROM earnings WHERE ins_id = $1', [ins_id]);
    return result.rows[0];
  }
}

export default Earnings;