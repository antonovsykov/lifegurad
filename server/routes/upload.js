import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'

const router = express.Router();

// 设置存储引擎
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // 指定上传文件的存储目录
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    // 自定义上传后的文件名
    cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname));
  }
});

// 初始化 multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 限制文件大小为 5MB
});

// 单文件上传
router.post('/single', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('请选择要上传的文件');
  }
  res.send({
    message: '文件上传成功',
    file: req.file
  });
});

export default router;