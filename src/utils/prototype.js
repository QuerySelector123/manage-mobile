/**
 * @name: 注册原型方法
 * @author: xulujin
 * @msg:
 * @param {*}
 * @return {*}
 * @createTime 2021/3/24 15:23
 */

// 日期原型方法: 返回季度 int 类型值
Date.prototype.getQuarter = function () {
  var month = this.getMonth();
  if (month < 3) {
    return 1;
  } else if (month < 6) {
    return 2;
  } else if (month < 9) {
    return 3;
  } else if (month < 12) {
    return 4;
  }
};

// 数组原型方法: 找出数组中的对象值，返回布尔值
Array.prototype.objectIncludes = function (item) {

  for (let i = 0; i < this.length; i++) {
    item(this[i]);
    return item(this[i]);
  }

};

