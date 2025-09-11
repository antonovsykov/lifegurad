import db from '../config/database.js'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

class Blog {

  // 获取所有博客分页
  static async getAll(page, limit) {
    try {
      const result = await db.query(
        'SELECT * FROM blog order by create_at desc LIMIT $1 OFFSET $2', [limit, (page-1) * limit]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`获取博客列表失败: ${error.message}`);
    }
  }

  // 获取所有博客总条数
  static async getAllCount() {
    try {
      const result = await db.query(
        'SELECT COUNT(*) AS total FROM blog '
      );
      return parseInt(result.rows[0].total, 10);
    } catch (error) {
      throw new Error(`获取博客列表失败: ${error.message}`);
    }
  }

  // 获取所有发布博客
  static async getRelease() {
    try {
      const result = await db.query(
        'SELECT * FROM blog where status = 1 order by create_at desc'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`获取博客列表失败: ${error.message}`);
    }
  }

  // 根据ID获取博客
  static async getById(id) {
    const result = await db.query('SELECT * FROM blog WHERE id = $1', [id]);
    return result.rows[0];
  }

  // 创建博客
  static async create({ title, description, picture, pic_alt, content, status }) {
    try {
      const blogId = uuidv4();
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const result = await db.query(
        'INSERT INTO blog (id, title, description, picture, pic_alt, content, status, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [blogId, title, description, picture, pic_alt, content, status, currentTime]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`创建博客失败: ${error.message}`);
    }
  }

  // 修改博客
  static async update({ id, title, description, picture, pic_alt, content, status }) {
    try {
      const result = await db.query(
        'UPDATE blog SET title = $1, description = $2, picture = $3, pic_alt = $4, content = $5, status = $6 where id = $7',
        [title, description, picture, pic_alt, content, status, id]
      );
      return result;
    } catch (error) {
      throw new Error(`修改订单失败: ${error.message}`);
    }
  }

  // 修改博客
  static async delete(id) {
    try {
      const result = await db.query(
        'DELETE FROM blog where id = $1', [id]
      );
      return result;
    } catch (error) {
      throw new Error(`创建订单失败: ${error.message}`);
    }
  }
}

export default Blog;