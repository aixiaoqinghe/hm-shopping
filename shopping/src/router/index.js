import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutIndex from '@/views/layout/index.vue'
import ProDetailIndex from '@/views/prodetail/index.vue'
import SearchIndex from '@/views/search/index.vue'
import SearchListIndex from '@/views/search/list.vue'
import PayIndex from '@/views/pay/index.vue'
import LoginIndex from '@/views/login/index.vue'
import MyOrderIndex from '@/views/myorder/index.vue'

import Home from '@/views/layout/Home.vue'
import Category from '@/views/layout/Category.vue'
import Cart from '@/views/layout/Cart.vue'
import User from '@/views/layout/User.vue'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: LoginIndex },
    {
      path: '/',
      component: LayoutIndex,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: SearchIndex },
    { path: '/searchlist', component: SearchListIndex },
    { path: '/pay', component: PayIndex },
    { path: '/myorder', component: MyOrderIndex },
    { path: '/prodetail/:id', component: ProDetailIndex }

  ]
})

// 所有的路由在真正被访问到之前（解析渲染对应组件页面前），都会先经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面

// 全局前置导航守卫
// to 到哪里去，到哪去的完整路由信息对象（路径，参数）
// from 从拿来来，从哪来，从哪来的完整路由信息对象（路径，参数）
// next(): 是否放行
// (1) next() 直接放行，放行到to要去的路径
// (2) next(路径) 进行拦截，拦截到next里面配置的路径

const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看to.path是否在authUrls中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token是否存在
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
