import express from 'express';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// 获取当前文件的绝对路径（相当于 CommonJS 的 __filename）
const __filename = fileURLToPath(import.meta.url);

// 获取当前目录的绝对路径（相当于 CommonJS 的 __dirname）
const __dirname = dirname(__filename);


const app = express();

// 解析命令行参数来获取端口号
const portArgIndex = process.argv.findIndex(arg => arg.toLowerCase() === '--port');
const port = portArgIndex >= 0 ? parseInt(process.argv[portArgIndex + 1], 10) : 8080;

// 使用cors中间件，允许所有源访问
app.use(cors());

app.use(express.json());

// 配置路由
import insuranceRoutes from './routes/insurance.js';
import ordersRoutes from './routes/orders.js';
import claimsRoutes from './routes/claims.js';
import uploadRoutes from './routes/upload.js';
import userRoutes from './routes/users.js';
import blogRoutes from './routes/blog.js';

// 使用路由
app.use('/api/insurance', insuranceRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);

// 设置静态文件目录
app.use('/uploads', express.static('uploads'));

// 先定义 /api 相关的路由
app.use('/api', (req, res, next) => {
  next();
});

// 使用 history 中间件，用于支持 Vue Router 的 history 模式
app.use(history());

// 静态托管 Vue 构建后的 dist 目录
app.use(express.static(path.join(__dirname, 'dist')));

// 处理所有 GET 请求，返回 index.html（交由 Vue Router 处理）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动服务器，监听指定的端口号
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});