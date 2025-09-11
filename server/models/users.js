import db from '../config/database.js'

class Users {

  // 根据用户名获取用户i想你洗
  static async getByAddress(username) {
    const result = await db.query('SELECT * FROM users where username = $1', [username]);
    return result.rows[0];
  }

}

export default Users;