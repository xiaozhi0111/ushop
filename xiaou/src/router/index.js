import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  //mode模式，默认为hash，哈希模式，就是有点丑，打包以后在后台布没有问题，而histroy是不用哈希的，但是布在服务器上会出现问题，刷新会出现文件找不到。
  mode: 'hash',
  routes: [
    {
      path: '/index',
      component: () => import('../components/firstCon/index'),
      children: [
        {
          path: '/home',
          component: () => import('../components/secondCon/home'),
          meta: {
            name: '首页',
          }
        },
        {
          path: '/cart',
          component: () => import('../components/secondCon/shoppingcart'),
          meta: {
            name: '购物车',
          }
        },
        {
          path: '/mine',
          component: () => import('../components/secondCon/mineHome'),
          meta: {
            name: '我的'
          }
        },
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '/enter',
      component: () => import('../components/firstCon/entergoods'),
      meta: {
        name: '确认订单'
      }
    },
    {
      path: '/detail',
      component: () => import('../components/firstCon/goodsdetail'),
      meta: {
        name: '详情'
      }
    },
    {
      path: '/sort',
      component: () => import('../components/firstCon/sort'),
      meta: {
        name: '分类'
      }
    },
    {
      path: '/list',
      component: () => import('@/components/firstCon/list'),
      meta: {
        name: '列表'
      }
    },
    {
      path: '/search',
      component: () => import('../components/firstCon/search'),
      meta: {
        name: '搜索'
      }
    },
    {
      path: '/login',
      component: () => import('@/components/firstCon/login'),
      meta: {
        name: '登录',
      }
    },
    {
      path: '/register',
      component: () => import('@/components/firstCon/register'),
      meta: {
        name: '注册',
      }
    },
    {
      path: "*",
      redirect: 'index'
    }
  ]
});

export default router;
