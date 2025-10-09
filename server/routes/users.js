import express from 'express';
import bcrypt from 'bcryptjs';
const router = express.Router();

import Users from '../models/users.js';

// 根据Address获取理赔信息
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getByAddress(username);
    const bcrpass = bcrypt.encodeBase64("Zhu19870722@");
    console.log("=====================", bcrpass);
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

export default router;