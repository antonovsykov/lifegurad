import { defineConfig } from '@vue/cli-service'
import TerserPlugin from 'terser-webpack-plugin'

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
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          }
        })
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
    
    // 2. 新增配置：PDF 文件处理（解决解析错误 + 统一资源路径）
    config.module
      .rule('pdf') // 自定义规则名，识别 PDF 文件
      .test(/\.pdf$/) // 匹配所有 .pdf 后缀的文件
      .use('url-loader') // 使用 url-loader 处理 PDF
      .loader('url-loader')
      .options({
        limit: 10 * 1024, // 10KB 阈值：小于 10KB 转 base64，大于则输出为文件
        // 输出路径：与图片保持一致，统一放到 dist/assets/pdf/ 目录（更规整）
        name: 'assets/pdf/[name].[contenthash:8].[ext]',
        esModule: false // 兼容 Vue 模板中直接引用（避免路径前加 [object Module]）
      })
      .end(); // 结束当前规则配置

    // 配置 CSS 输出路径
    // config.plugin('extract-css')
    //   .tap(args => {
    //     args[0].filename = 'assets/[name].[contenthash:8].css';
    //     args[0].chunkFilename = 'assets/[name].[contenthash:8].css';
    //     return args;
    //   });
  }
})
