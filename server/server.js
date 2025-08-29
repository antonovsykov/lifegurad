const express = require('express');
const cors = require('cors');
const app = express();

// 解析命令行参数来获取端口号
const portArgIndex = process.argv.findIndex(arg => arg.toLowerCase() === '--port');
const port = portArgIndex >= 0 ? parseInt(process.argv[portArgIndex + 1], 10) : 8080;

// 使用cors中间件，允许所有源访问
app.use(cors());

app.use(express.json());

// 配置路由
const insuranceRoutes = require('./routes/insurance');
const ordersRoutes = require('./routes/orders');

// 使用路由
app.use('/api/insurance', insuranceRoutes);
app.use('/api/orders', ordersRoutes);

// 设置静态文件目录
app.use(express.static('../dist'));

// 处理所有的GET请求，将其都重定向到index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// 启动服务器，监听指定的端口号
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});