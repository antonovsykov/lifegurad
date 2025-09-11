import { createRouter, createWebHistory } from 'vue-router'

import { useLayoutStore } from '../store/layout'

// 门户页面
import PortalLayout from '../layouts/PortalLayout.vue'
import LifeHome from '../view/portal/LifeHome.vue'
import LifeDocx from '../view/portal/LifeDocx.vue'
import LifeBlog from '../view/portal/LifeBlog.vue'
import LifeBlogDetail from '../view/portal/LifeBlogDetail.vue'
import MyAccount from '../view/portal/MyAccount.vue'
import MyPolicy from '../view/portal/MyPolicy.vue'
import ClaimApply from '../view/portal/ClaimApply.vue'

// 后台管理页面
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminLogin from '../view/admin/AdminLogin.vue'
import AdminHome from '../view/admin/AdminHome.vue'
import AdminDashboard from '../view/admin/AdminDashboard.vue'
import AdminPolicy from '../view/admin/AdminPolicy.vue'
import AdminClaim from '../view/admin/AdminClaim.vue'
import AdminBlog from '../view/admin/AdminBlog.vue'

// 路由规则
const routes = [
  // 门户端路由（使用PortalLayout）
  {
    path: '/',
    component: PortalLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: LifeHome
      },
      {
        path: 'details',
        name: 'Details',
        component: LifeDocx
      },
      {
        path: 'blog',
        name: 'Blog',
        component: LifeBlog
      },
      {
        path: 'blog/:id',
        name: 'BlogEetail',
        component: LifeBlogDetail
      },
      {
        path: 'account',
        name: 'MyAccount',
        component: MyAccount
      },
      {
        path: 'policy',
        name: 'MyPolicy',
        component: MyPolicy
      },
      {
        path: 'apply',
        name: 'ClaimApply',
        component: ClaimApply
      }
    ]
  },
  // 管理端路由（使用AdminLayout）
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'ALogin',
        component: AdminLogin
      },
      {
        path: '/admin/home',
        name: 'AHome',
        component: AdminHome,
        children: [
          {
            path: '/admin/dashboard',
            name: 'ADashboard',
            component: AdminDashboard
          },
          {
            path: '/admin/policy',
            name: 'APolicy',
            component: AdminPolicy
          },
          {
            path: '/admin/claim',
            name: 'AClaim',
            component: AdminClaim
          },
          {
            path: '/admin/blog',
            name: 'ABlog',
            component: AdminBlog
          }
        ]
      },
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),  // 使用 HTML5 history 模式
  routes
})

router.beforeEach((to, from, next) => {
  // 识别刷新的条件：初始加载 + from是初始状态（无name属性或为空对象）
  const layoutStore = useLayoutStore()
  // 管理端路由前缀为 /admin 时切换布局
  if (to.path.startsWith('/admin')) {
    layoutStore.setLayout('admin')
  } else {
    layoutStore.setLayout('portal')
  }
  next()
})

export default router