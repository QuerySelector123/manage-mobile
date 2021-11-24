/*
 * @Author: your name
 * @Date: 2021-09-27 11:17:59
 * @LastEditTime: 2021-10-14 11:31:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \manage-mobile\src\router\dynamicRoutes.js
 */
const dynamicRoute = [{
    menuUrl: '/home/income',
    menuCode: 'income',
    path: '/home/income',
    component: require('@/views/home/income').default,
    meta: {
        requiredAuth: true,
    },
},
{
    menuUrl: '/home/cost',
    menuCode: 'cost',
    path: '/home/cost',
    component: require('@/views/home/cost').default,
    meta: {
        requiredAuth: true,
    },
},
{
    menuUrl: '/home/overview',
    menuCode: 'overview',
    path: '/home/overview',
    component: require('@/views/home/overview').default,
    meta: {
        requiredAuth: true,
    },
},
{
    menuUrl: '/home/operation',
    menuCode: 'operation',
    path: '/home/operation',
    component: require('@/views/home/operation').default,
    meta: {
        requiredAuth: true,
    }
},
{
    menuUrl: '/home/sales',
    menuCode: 'sales',
    path: '/home/sales',
    component: require('@/views/home/sales').default,
    meta: {
        requiredAuth: true,
    },
},
{
    menuUrl: '/home/guarantee',
    menuCode: 'guarantee',
    path: '/home/guarantee',
    component: require('@/views/home/guarantee').default,
    meta: {
        requiredAuth: true,
    },
},


]

export default dynamicRoute;