const express = require('express');
const router = express.Router();

const Insurance = require('../models/insurance');

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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;