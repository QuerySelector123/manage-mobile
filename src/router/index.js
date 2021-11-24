import Vue from 'vue';
import VueRouter from 'vue-router';
import mapRoutes from './routes';
import { setWaterMark } from '@/utils/water.js';
import { format } from 'date-fns';


Vue.use(VueRouter);


let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));



const routes = [...mapRoutes];
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
const router = new VueRouter({
  mode: 'hash',
  routes
});

// 在进入一个路由之前，判断一下，该路由是否存在于权限路由列表里面
router.beforeEach((to, from, next) => {
  // 权限路由部分

  // let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
  let isLogin = true;

  if (!isLogin) {
    if (to.path === '/loadings') {
      next();
    } else {
      if (to.path !== '/login') {
        next({
          path: '/login',
          // query: { redirect: to.fullPath } // 将目的路由地址存入login的query中
        });
      } else {
        if (to.meta.requiredAuth) {
          next('/login')
        } else {
          next()
        }
      }
    }
  } else {
    // setWaterMark(format(new Date(), 'yyyy-MM-dd'), sessionStorage.getItem('userName'));
    // window.addEventListener('resize', () => {
    //   setWaterMark(format(new Date(), 'yyyy-MM-dd'), sessionStorage.getItem('userName'));
    // });

    next()
  }
});

export default router;
