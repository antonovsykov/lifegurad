import express from 'express';
const router = express.Router();

import Blog from '../models/blog.js';

// 获取所有博客
router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const blogs = await Blog.getAll(page, limit);
    const count = await Blog.getAllCount();
    res.json({
      success: true,
      data: blogs,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 根据ID获取博客
router.get('/id/:id', async (req, res) => {
  try {
    const blog = await Blog.getById(req.params.id);
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 获取发布博客
router.get('/release', async (req, res) => {
  try {
    const blogs = await Blog.getRelease();
    res.json({
      success: true,
      data: blogs,
      count: blogs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 创建博客
router.post('/', async (req, res) => {
  try {
    const { title, description, picture, pic_alt, content, status } = req.body;
    await Blog.create({ title, description, picture, pic_alt, content, status });
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

// 修改博客
router.put('/', async (req, res) => {
  try {
    const { id, title, description, picture, pic_alt, content, status } = req.body;
    await Blog.update({ id, title, description, picture, pic_alt, content, status });
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

// 删除博客
router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.delete(id);
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

export default router;