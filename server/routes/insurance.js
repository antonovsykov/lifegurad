import express from 'express';
const router = express.Router();

import Insurance from '../models/insurance.js';

// 获取所有保险
router.get('/', async (req, res) => {
  try {
    const insurances = await Insurance.getAll();
    res.json({
      success: true,
      data: insurances,
      count: insurances.length
    });
  } catch (error) {
    console.log("=================", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;