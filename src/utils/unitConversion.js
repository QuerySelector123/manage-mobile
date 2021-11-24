/**
 * 单位换算插件
 * @description
 * @function unitConversion // 对外暴露使用的函数
 * @param {string} unit 传入的需要换算的单位
 * @param {number} number 传入的需要换算的数字
 */

/**
 * @example
 * unitConversion(10000,'元') // 得到一个数组[1.00,'万']
 * unitConversion(100000000,'元') // 得到一个数组[1.00,'亿']
 * ...以此类推
 */

// 单位换算函数
function unitConvert(num, moneyUnits, dividend, numType) {
  var moneyUnits = moneyUnits;
  var dividend = dividend;
  var curentNum = num;
  var curentUnit = moneyUnits[0];

  for (var i = 0; i < moneyUnits.length; i++) {
    curentUnit = moneyUnits[i]; //转换单位
    if (strNumSize(curentNum) <= 4) {
      // 9999以下都是单位都是元
      break;
    }

    curentNum = curentNum / dividend; //转换数字
  }
  var m = [];

  // 如果为负数
  if (numType == 'negative') {
    m.push(Number('-' + curentNum));
  } else {
    m.push(curentNum);
  }

  m.push(curentUnit);
  return m;
}
// 处理改数值得到准确的数值和长度（因为有可能是个字符串有小数，length就需要处理）
function strNumSize(tempNum) {
  var stringNum = tempNum.toString();
  var index = stringNum.indexOf('.');
  var newNum = stringNum;

  if (index != -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}

// 在此处写入需要换算的单位
let units = ['元', '平方米', '元/m²'];
let toConversions = [
  ['元', '万元', '亿元', '万亿元', '亿亿元'],
  ['平方米', '万平方米', '亿平方米', '万亿平方米', '亿亿平方米'],
  ['元/m²', '万元/m²', '亿元/m²', '万亿元/m²', '亿亿元/m²']
];

function unitConversion(number, unit) {
  if (number >= 0) {
    if (typeof number == 'number') {
      for (let i = 0; i < units.length; i++) {
        if (unit == units[i]) {
          if (number) {
            return unitConvert(number, toConversions[i], 10000, 'positive');
          } else if (number == 0) {
            return [0, toConversions[i][0]];
          }
        }
      }
      if (units.indexOf(unit) < 0) {
        console.error("'" + unit + "' 这个单位还不能进行换算,请拓展插件函数!");
      }
    } else {
      // console.warn('最好传递一个数字类型的值进行转换!');
    }
  } else if (number < 0) {
    number = Number(String(number).replace('-', ''));
    if (typeof number == 'number') {
      for (let i = 0; i < units.length; i++) {
        if (unit == units[i]) {
          if (number) {
            return unitConvert(number, toConversions[i], 10000, 'negative');
          } else if (number == 0) {
            return [0, toConversions[i][0]];
          }
        }
      }

      if (units.indexOf(unit) < 0) {
        console.error("'" + unit + "' 这个单位还不能进行换算,请拓展插件函数!");
      }
    } else {
      // console.warn('最好传递一个数字类型的值进行转换!');
    }
  } else {
    // console.error('格式不正确或使用方法不正确!');
  }
}

export { unitConversion };
