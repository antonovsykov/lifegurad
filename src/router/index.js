import { createRouter, createWebHistory } from 'vue-router'
// 导入组件
import LifeHome from '../components/LifeHome.vue'
import LifeDocx from '../components/LifeDocx.vue'
import LifeClaims from '../components/LifeClaims.vue'
import LifeBlog from '../components/LifeBlog.vue'
import MyAccount from '../components/MyAccount.vue'
import MyPolicy from '../components/MyPolicy.vue'
import ClaimApply from '../components/ClaimApply.vue'

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: LifeHome
  },
  {
    path: '/details',
    name: 'Details',
    component: LifeDocx
  },
  {
    path: '/claims',
    name: 'Claims',
    component: LifeClaims
  },
  {
    path: '/blog',
    name: 'Blog',
    component: LifeBlog
  },
  {
    path: '/account',
    name: 'MyAccount',
    component: MyAccount
  },
  {
    path: '/policy',
    name: 'MyPolicy',
    component: MyPolicy
  },
  {
    path: '/apply',
    name: 'ClaimApply',
    component: ClaimApply
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 history 模式
  routes
})

export default router