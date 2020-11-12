import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../layout/Index.vue'
import local from '@/utils/local.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        meta: { title: '后台首页' },
        component: () =>
          import(/* webpackchunkName: "login" */ '../views/dashboard/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    // 懒加载
    component: () =>
      import(/* webpackchunkName: "login" */ '../views/login/Index.vue')
  }
]
const syncRouter = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        meta: { title: '后台首页', icon: 'icon-ai-home' },
        visible: true,
        component: () =>
          import(/* webpackchunkName: "login" */ '../views/dashboard/Index.vue')
      },
      {
        path: '/order',
        meta: { title: '订单管理', icon: 'icon-dingdan' },
        visible: true,
        // 懒加载
        component: () =>
          import(/* webpackchunkName: "login" */ '../views/order/Index.vue'),
        redirect: '/order/Manage',
        children: [
          {
            path: '/order/Manage',
            visible: true,
            // 懒加载
            meta: { title: '订单详情' },
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/order/OrderManage.vue'
              )
          },
          {
            path: '/order/update/:id',
            meta: { title: '修改订单' },
            // 设置props 为true 可以通过props 获取传来的参数
            props: true,
            visible: false,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/order/UpdateOrder.vue'
              )
          }
        ]
      },
      {
        path: '/product',
        meta: { title: '商品管理', icon: 'icon-shangpin' },
        visible: true,
        // 懒加载
        component: () =>
          import(/* webpackchunkName: "login" */ '../views/product/Index.vue'),
        redirect: '/product/list',
        children: [
          {
            path: '/product/list',
            meta: { title: '商品列表' },
            visible: true,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/product/ProductList.vue'
              )
          },
          {
            path: '/product/add',
            meta: { title: '商品添加' },
            visible: true,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/product/ProductAdd.vue'
              )
          },
          {
            path: '/product/cate',
            meta: { title: '商品分类' },
            visible: true,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/product/ProductCate.vue'
              )
          }
        ]
      },
      {
        path: '/store',
        // 懒加载
        meta: { title: '管理店铺', icon: 'icon-shop' },
        component: () =>
          import(/* webpackchunkName: "login" */ '../views/store/Index.vue'),
        redirect: '/store/storeManage',
        visible: true,
        children: [
          {
            path: '/store/storeManage',
            meta: { title: '店铺管理' },
            visible: true,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/store/StoreManage.vue'
              )
          }
        ]
      },
      {
        path: '/account',
        component: () =>
          import(/* webpackchunkName: "login" */ '../views/account/Index.vue'),
        meta: { title: '账号管理', role: ['super', 'normal'], icon: 'icon-zhanghao' },
        visible: true,
        redirect: '/account/index',
        children: [
          {
            path: '/account/index',
            meta: { title: '账号列表', role: ['super'] },
            visible: true,
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/account/AccountList.vue'
              )
          },
          {
            path: '/account/add',
            meta: { title: '账号添加', role: ['super'] },
            visible: true,
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/account/AddAccount.vue'
              )
          },
          {
            path: '/account/updatePwd',
            meta: { title: '修改密码' },
            visible: true,
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/account/UpdatePwd.vue'
              )
          },
          {
            path: '/account/myCenter',
            meta: { title: '个人中心' },
            visible: false,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/account/MyCenter.vue'
              )
          }
        ]
      },
      {
        path: '/saleAccount',
        meta: { title: '销售统计', role: ['super'], icon: 'icon-xiaoshoubaobiao' },
        redirect: '/saleAccount/GoodsAccount',
        visible: true,
        // 懒加载
        component: () =>
          import(
            /* webpackchunkName: "login" */ '../views/saleAccount/Index.vue'
          ),
        children: [
          {
            path: '/saleAccount/goodsAccount',
            meta: { title: '商品统计' },
            visible: true,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/saleAccount/GoodsAccount.vue'
              )
          },
          {
            path: '/saleAccount/orderAccount',
            meta: { title: '订单统计' },
            visible: true,
            // 懒加载
            component: () =>
              import(
                /* webpackchunkName: "login" */ '../views/saleAccount/OrderAccount.vue'
              )
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    meta: { title: '404页面' },
    visible: false,
    // 懒加载
    component: () =>
      import(/* webpackchunkName: "login" */ '../views/dashboard/Page404.vue')
  },
  {
    path: '/*',
    meta: { title: '404页面' },
    visible: false,
    // 懒加载
    component: () =>
      import(/* webpackchunkName: "login" */ '../views/dashboard/Page404.vue')
  }
]
const router = new VueRouter({
  routes
})

export default router

/*
  导航守卫
*/
router.beforeEach((to, from, next) => {
  const token = local.get('token')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

// 解决导航重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 动态路由
createRouter()
export function createRouter() {
  const role = local.get('role')
  if (!role) return
  const finalRouter = calRouter(syncRouter[0].children, role)
  syncRouter[0].children = finalRouter
  router.addRoutes(syncRouter)

  const cMenu = calMenu(finalRouter)
  local.set('cMenu', JSON.stringify(cMenu))
}
// 计算路由
function calRouter(path, role) {
  return path.filter(item => {
    // console.log(item)
    if (hasPermission(item, role)) {
      if (item.children && item.children.length > 0) {
        item.children = calRouter(item.children, role)
      }
      return true
    } else {
      return false
    }
  })
}

// 计算菜单
function calMenu(router) {
  return router.filter(item => {
    if (item.visible) {
      if (item.children && item.children.length > 0) {
        item.children = calMenu(item.children)
      }
      return true
    } else {
      return false
    }
  })
}

// 鉴权
function hasPermission(item, role) {
  if (item.meta && item.meta.role) {
    return item.meta.role.includes(role)
  } else {
    return true
  }
}
