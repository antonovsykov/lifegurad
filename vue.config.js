import { defineConfig } from '@vue/cli-service'

export default defineConfig({
  transpileDependencies: true,
  // 生产环境不生成 sourceMap
  productionSourceMap: false,
  // 配置输出文件名（Vue CLI 方式）
  filenameHashing: true, // 默认开启，为文件名添加哈希值

  // Webpack 配置
  configureWebpack: {
    // 代码分割（Webpack 方式，替代 rollupOptions 的 manualChunks）
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          utils: {
            name: 'chunk-utils',
            test: /[\\/]src[\\/]utils[\\/]/,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      },
      // 代码压缩配置（Webpack 方式）
      minimizer: [
        {
          options: {
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true
              }
            }
          }
        }
      ]
    },
    // 输出路径配置
    output: {
      // 入口文件命名
      filename: 'entries/[name].[contenthash:8].js',
      // chunk 文件命名
      chunkFilename: 'chunks/[name].[contenthash:8].js'
    }
  },

  // 配置静态资源路径
  chainWebpack: config => {
    // 配置图片等资源的输出路径
    config.module
      .rule('images')
      .set('generator', {
        filename: 'assets/[name].[contenthash:8][ext]'
      });

    // 配置 CSS 输出路径
    config.plugin('extract-css')
      .tap(args => {
        args[0].filename = 'assets/[name].[contenthash:8].css';
        args[0].chunkFilename = 'assets/[name].[contenthash:8].css';
        return args;
      });
  }
})
