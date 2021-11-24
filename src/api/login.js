import { post_bip, get_bip } from './index';

export const login = (params) => post_bip('/loginOutSystem/login', params, { timeout: 5000 }); // 登录外部系统相关接口

export const updateMessage = (params) => post_bip('/euicpUser/updateMessage', params); // 更新用户管理

export const selectRoleByPage = (params) => get_bip('/euicpRole/selectByPage', params); // 角色管理-分页查询角色

export const selectUserByPage = (params) => get_bip('/euicpUser/getUserInfo', params); // 用户管理-分页查询用户

export const getUserInfoByToken = (params) => get_bip('/gemdaleEipLogin/getUserInfoByToken', params); // 用户管理-分页查询用户

export const getMenuTree = (params) => get_bip('/menu/getMenuTree', params); // 获取租户下用户有权限的菜单的树形结构
