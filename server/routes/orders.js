import express from 'express';
const router = express.Router();

import Orders from '../models/orders.js';
import { verifyWeb3Payment, checkAddress } from '../web3/web3util.js'
import { sendEmail } from '../utils/emailutil.js'
import { insEmailTmp } from '../utils/emailtemp.js'
import Insurance from '../models/insurance.js';
import dayjs from 'dayjs';
import moment from 'moment'

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
    const { ins_id, wallet_adr, duration, share, money, total, hash, email, lang } = req.body;

    // 校验hash值
    const result = await verifyWeb3Payment(hash, wallet_adr, checkAddress, total);
    const paystatus = result ? 1 : 0;
    const order = await Orders.create({ ins_id, wallet_adr, duration, share, money, total, hash, email, paystatus });

    if (result) {
      const insurance = await Insurance.getById(ins_id);
      const title = lang == 'zh' ? insurance.title_zh : insurance.title_en;
      const startTime = dayjs(order.start_time).format('YYYY-MM-DD');
      const endTime = dayjs(order.end_time).format('YYYY-MM-DD');
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const html = insEmailTmp(wallet_adr, total, title, startTime, endTime, share, currentTime, lang);
      sendEmail(email, html);
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

// 根据Address获取订单
router.get('/sendemail', async (req, res) => {
  try {
    sendEmail("240892907@qq.com", "<div>123123123</div>")
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;