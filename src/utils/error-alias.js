/*
 * @Author: your name
 * @Date: 2021-08-23 19:55:17
 * @LastEditTime: 2021-08-26 08:56:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lackmaterial-web\src\utils\error-alias.js
 */
// 错误信息别名
export const errorAliasMap = {
  'Failed to execute query': '执行查询失败',
  'Network Error': '网络连接失败',
  'timeout of': '网络连接超时'
};

// 获取报错别名
const keys = Object.keys(errorAliasMap);
export function getErrorAlias(message) {
  const key = keys.find((item) => message.includes(item));
  return key ? errorAliasMap[key] : '';
}
