import express from 'express';
const router = express.Router();

import Orders from '../models/orders.js';
import { verifyWeb3Payment, checkAddress } from '../web3/web3util.js'
import { sendEmail } from '../utils/emailutil.js'

// 获取所有订单
router.get('/', async (req, res) => {
  try {
    const orders = await Orders.getAll();
    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 根据ID获取订单
router.get('/id/:id', async (req, res) => {
  try {
    const order = await Orders.getById(req.params.id);
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

// 根据Address获取订单
router.get('/address/:address/:type', async (req, res) => {
  try {
    const orders = await Orders.getByAddress(req.params.address, req.params.type);
    res.json({
      success: true,
      data: orders
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
    const { ins_id, wallet_adr, duration, share, money, total, hash, email } = req.body;

    // 校验hash值
    const result = await verifyWeb3Payment(hash, wallet_adr, checkAddress, total);
    const paystatus = result ? 1 : 0;
    await Orders.create({ ins_id, wallet_adr, duration, share, money, total, hash, email, paystatus });

    if (result) {
      sendEmail(email, "购买成功", "");
    }
    
    if (result) {
      res.json({
        success: true,
        message: "Create Success"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Create Failed"
      });
    }
  } catch (error) {
    console.log("===================error==================", error)
    res.status(500).json({
      success: false,
      message: "Create Failed"
    });
  }
});

export default router;