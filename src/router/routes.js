/*
 * @Author: your name
 * @Date: 2021-10-14 11:26:43
 * @LastEditTime: 2021-10-14 11:38:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\router\routes.js
 */
/**
 * @name: authRoute假数据，用于模拟后台返回的路由数据来匹配菜单显示
 * @author: xulujin
 * @msg:
 * @param {*}
 * @return {routeData}
 * @createTime 2021/3/12 11:20
 */
import dynamicRoutes from './dynamicRoutes'

const mockRoute = [
  {
    path: '/',
    redirect: '/home/income',
    show: false,
  },
  {
    menuUrl: '/login',
    menuCode: 'login',
    path: '/login',
    component: require('@/views/login').default,
    show: false
  },
  {
    component: require('@/views/noAuth').default,
    menuCode: 'noAuth',
    menuUrl: '/noAuth',
    name: 'noAuth',
    path: '/noAuth',
    show: false,
    meta: { requiredAuth: true }
  },
  {
    menuUrl: '/loading',
    menuCode: 'loading',
    path: '/loading',
    component: require('@/views/loading').default,
    show: false
  },
  {
    menuUrl: '/performance',
    menuCode: 'performance',
    path: '/performance',
    component: require('@/views/performance').default,
    meta: {
      requiredAuth: true,
    },
  },
  {
    menuUrl: '/home',
    menuCode: 'home',
    path: '/home',
    component: require('@/views/home').default,
    meta: { requiredAuth: true },
    redirect: '/home/urgrentMaterialBoard',
    children: dynamicRoutes,
  },
  {
    menuCode: 'noAuth',
    menuUrl: '/noAuth',
    name: '*',
    path: '*',
    redirect: '/noAuth',
    show: false
  }
];

export default mockRoute;
