import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store';

function hasPath(url){
  return Store.state.userInfo.menus_url.some(item=>item==url);
}

Vue.use(Router)

export const indexRoutes = [
  {
    path: '/menu',
    component: () => import('@/views/menu/menu'),
    name: '菜单管理',
    beforeEnter:(to,from,next)=>{
      hasPath('/menu')?next():next('/home');
    }
  },
  {
    path: '/role',
    component: () => import('@/views/role/role'),
    name: '角色管理',
    beforeEnter:(to,from,next)=>{
      hasPath('/role')?next():next('/home');
    }
  },
  {
    path: '/user',
    component: () => import('@/views/user/user'),
    name: '管理员管理',
    beforeEnter:(to,from,next)=>{
      hasPath('/user')?next():next('/home');
    }
  },
  {
    path: '/cate',
    component: () => import('@/views/cate/cate'),
    name: '商品分类',
    beforeEnter:(to,from,next)=>{
      hasPath('/cate')?next():next('/home');
    }
  },
  {
    path:'/specs',
    component:()=>import ('@/views/specs/specs'),
    name:'商品规格',
    beforeEnter:(to,from,next)=>{
      hasPath('/specs')?next():next('/home');
    }
  },
  {
    path:'/goods',
    component:()=>import('@/views/goods/goods'),
    name:'商品管理',
    beforeEnter:(to,from,next)=>{
      hasPath('/goods')?next():next('/home');
    }
  },
  {
    path:'/member',
    component:()=>import('@/views/member/member'),
    name:'会员管理',
    beforeEnter:(to,from,next)=>{
      hasPath('/member')?next():next('/home');
    }
  },
  {
    path:'/banner',
    component:()=>import('@/views/banner/banner'),
    name:'轮播图管理',
    beforeEnter:(to,from,next)=>{
      hasPath('/banner')?next():next('/home');
    }
  },
  {
    path:'/seck',
    component:()=>import('@/views/seck/seck'),
    name:'秒杀管理',
    beforeEnter:(to,from,next)=>{
      hasPath('/seck')?next():next('/home');
    }
  }
]
const router= new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home'),
        },
        ...indexRoutes,
        {
          path: '',
          redirect: '/home'
        }
      ]
    },

    {
      path: '*',
      redirect: '/login'
    }
  ]
});

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next();
    return ;
  }
  if(sessionStorage.getItem('userInfo')){
    next();
    return ;
  }
  next('/login');
});


export default router
