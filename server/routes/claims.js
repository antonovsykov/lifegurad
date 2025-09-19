import express from 'express';
const router = express.Router();

import Claims from '../models/claims.js';

// 获取所有理赔信息
router.get('/', async (req, res) => {
  try {
    const claims = await Claims.getAll();
    res.json({
      success: true,
      data: claims,
      count: claims.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 根据ID获取理赔记录
router.get('/id/:id', async (req, res) => {
  try {
    const claim = await Claims.getById(req.params.id);
    res.json({
      success: true,
      data: claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 根据Address获取理赔信息
router.get('/address/:address/:type', async (req, res) => {
  try {
    const claims = await Claims.getByAddress(req.params.address, req.params.type);
    res.json({
      success: true,
      data: claims
    });
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
    const { order_id, reasion, files, paymoney } = req.body;
    await Claims.create({ order_id, reasion, files, paymoney });
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