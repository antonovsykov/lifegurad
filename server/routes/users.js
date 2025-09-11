import express from 'express';
import bcrypt from 'bcryptjs';
const router = express.Router();

import Users from '../models/users.js';

// 根据Address获取理赔信息
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getByAddress(username);
    // 验证
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({
        success: true,
        data: user
      });
    } else {
      res.status(500).json({
        success: false,
        message: "用户名或密码错误"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 创建理赔记录
router.post('/', async (req, res) => {
  try {
    const { order_id, reasion, files } = req.body;
    await Claims.create({ order_id, reasion, files });
    res.json({
      success: true,
      message: "Create Success"
    });
  } catch (error) {
    console.log("===================error==================", error)
    res.status(500).json({
      success: false,
      message: "Create Failed"
    });
  }
});

// 更新理赔记录
router.post('/status', async (req, res) => {
  try {
    const { id, status } = req.body;
    if (status == 0) {
      await Claims.updateFailed({ id });
    } else if (status == 2) {
      await Claims.updateFirst({ id });
    } else if (status == 3) {
      await Claims.updateSecond({ id })
    }
    res.json({
      success: true,
      message: "Update Success"
    });
  } catch (error) {
    console.log("===================error==================", error)
    res.status(500).json({
      success: false,
      message: "Update Failed"
    });
  }
});

export default router;