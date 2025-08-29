# 基于Node镜像创建构建环境
FROM node:18-alpine AS builder
 
# 设置工作目录
WORKDIR /app
 
# 复制`package.json`和`package-lock.json`（如果有）
COPY package*.json ./
 
# 安装项目依赖
RUN npm install
 
# 复制项目文件和目录到工作目录
COPY . .
 
# 构建Vue 3应用
RUN npm run build

# 删除node_modules以减小镜像体积
RUN rm -rf node_modules

# 清理构建中生成的临时文件
RUN rm -rf /app/src /app/public /app/*.js 

# 构建运行环境
FROM node:18-alpine as base

# 设置工作目录
WORKDIR /app/server

# 复制构建好的文件，这里假设构建输出到dist目录，根据实际调整
COPY --from=builder /app/dist /app/dist

# 赋值构建文件
COPY --from=builder /app/package*.json ./

#安装所需依赖
RUN npm install --production

COPY ./server .
 
# 暴露8080端口
EXPOSE 8080

# 启动服务
CMD ["node", "server.js"]
