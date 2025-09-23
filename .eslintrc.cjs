module.exports = {
  root: true,
  // 1. 环境配置：明确支持 ES6+、浏览器、Node、TypeScript
  env: {
    browser: true,
    node: true,
    es2020: true, // 注意：用 es2020 而非 es2021（部分旧版 ESLint 对 es2021 支持不完整）
    es6: true,    // 显式开启 ES6 支持，解决 ImportDeclaration 错误
    'vue/setup-compiler-macros': true // 支持 Vue3 <script setup> 宏（如 defineProps）
  },
  // 2. 解析器配置：优先处理 .vue 文件，内部再分 .js/.ts
  parser: 'vue-eslint-parser', // 处理 .vue 文件的 SFC 结构
  parserOptions: {
    // 2.1 处理 .vue 中 <script> 部分的解析器
    parser: {
      // .ts 文件用 TypeScript 解析器
      ts: '@typescript-eslint/parser',
      // .js 文件用 ESLint 默认解析器（或 babel-eslint，若用 Babel）
      js: 'espree',
      // 其他文件默认用 TypeScript 解析器
      '<template>': 'espree'
    },
    // 2.2 核心配置：解决 Invalid ecmaVersion 错误
    ecmaVersion: 2020, // 推荐用 2020（兼容性更好，覆盖大部分 ES6+ 特性）
    sourceType: 'module', // 明确是 ES Module（支持 import/export）
    // 2.3 支持的 ES 特性（可选，增强兼容性）
    ecmaFeatures: {
      modules: true, // 允许使用 ES 模块
      jsx: false     // 若不用 JSX，设为 false
    }
  },
  // 3. 插件配置：引入 Vue 和 TypeScript 的 ESLint 插件
  plugins: [
    'vue',                  // Vue 官方插件（处理 .vue 文件）
    '@typescript-eslint'    // TypeScript 官方插件（处理 .ts 文件）
  ],
  // 4. 继承规则：确保规则与解析器匹配
  extends: [
    'eslint:recommended',                          // ESLint 基础推荐规则
    'plugin:vue/vue3-essential',                   // Vue3 核心规则
    'plugin:vue/vue3-recommended',                 // Vue3 推荐规则
    'plugin:@typescript-eslint/recommended',       // TypeScript 推荐规则
    'plugin:@typescript-eslint/eslint-recommended' // TypeScript 基础规则
  ],
  // 5. 自定义规则：解决具体错误
  rules: {
    // 解决 defineProps 未定义错误
    'no-undef': 'off',
    // 允许单单词组件名（如 PdfViewer）
    'vue/multi-word-component-names': 'off',
    // 允许 console（开发环境）
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // TypeScript 规则：关闭不必要的严格检查（可选，根据项目调整）
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  // 6. 文件匹配：明确哪些文件需要 lint，哪些不需要
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // 只对 TypeScript 文件应用 TS 规则
      rules: {
        'no-undef': 'off' // TypeScript 有自己的类型检查，关闭 ESLint 的 undef 检查
      }
    },
    {
      files: ['*.vue'], // 对 .vue 文件单独配置
      rules: {
        'vue/script-setup-uses-vars': 'error' // 防止 <script setup> 中变量未使用错误
      }
    }
  ],
  // 7. 忽略文件：避免 lint  node_modules、dist 等目录
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'public/',
    '*.config.js', // 忽略配置文件（如 vue.config.js）
    '*.d.ts'       // 忽略 TypeScript 声明文件
  ]
};