/**
 * index
 * Created By WebStorm.
 * author lyon
 * date 2021/6/16
 */


/**
 * @param {string} value - 输入的值
 * @param fixed
 */
function limitInput(value, fixed = 0) {
  let number_only = value;
  if (!fixed) {
    return number_only.replace(/[^\d]/g, '');
  }
  number_only =
    String(value) // 第一步：转成字符串
      .replace(/[^\d^\.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
      .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
      .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
      // .match(/^\d*(\.?\d{0,2})/g)[0] || '';
  let fixedReg = new RegExp(`^\\d*(\\.?\\d{0,${fixed}})`,'g'); // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
  number_only = number_only.match(fixedReg)[0] || '';
  return number_only;
}


// 只允许数据数组，与小数点，传入参数为小数位长度
const enterNumber = {
  bind(el, binding) {
    const fixed = binding.value || 0;
    el.oninput = () => {
      let inputEl = el;
      // 指令作用在 element-input 节点，对应原生 div.el-input (真实input节点的父节点)
      if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        inputEl = el.getElementsByTagName('input')[0];
      }
      let value = inputEl.value;
      inputEl.value = limitInput(value, fixed);
    };
  },
};

export default (Vue) => {
  Vue.directive('enterNumber', enterNumber);
};
