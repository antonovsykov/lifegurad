const express = require('express');
const router = express.Router();

const Orders = require('../models/orders');

// 获取所有订单
router.get('/', async (req, res) => {
  try {
    const insurances = await Orders.getAll();
    res.json({
      success: true,
      data: insurances,
      count: insurances.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 根据ID获取订单
router.get('/:id', async (req, res) => {
  try {
    const order = await Orders.getProductById(req.params.id);
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 创建订单订单
router.post('/', async (req, res) => {
  try {
    const { ins_id, wallet_adr, share, total, hash, email, month } = req.body;
    await Orders.create({ ins_id, wallet_adr, share, total, hash, email, month });
    res.json({
      success: true,
      message: "Create Success"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Create Failed"
    });
  }
});



module.exports = router;