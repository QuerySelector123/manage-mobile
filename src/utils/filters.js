// 基本过滤器，一般用于过滤一些汉字，如果没有，显示‘--’
let basicFmt = (val) => {
    if (Object.is(val, null) || Object.is(val, undefined) || Object.is(val, NaN) || Object.is(val, '')) {
        return '--';
    } else {
        return val;
    }
};

/**
 * @name: 保留小数过滤器
 * @author: xulujin
 * @msg: 
 * @param {Number} toFixed 保留小数的位数
 * @return {*}
 * @Date: 2021-09-26 10:14:33
 */
let toFixedFmt = (val, toFixed) => {
    if (Object.is(val, null) || Object.is(val, undefined) || Object.is(val, NaN) || Object.is(val, '')) {
        return '--';
    } else {
        return val.toFixed(toFixed) + '%';
    }
}

/**
 * @name: 数值缩小函数
 * @author: xulujin
 * @msg: 
 * @param {Number} numberFmt 数值缩小倍数 如 10000 就是除以 10000
 * @return {*}
 * @Date: 2021-09-26 10:16:49
 */
let rateFmt = (val, numberFmt) => {
    if (Object.is(val, null) || Object.is(val, undefined) || Object.is(val, NaN) || Object.is(val, '')) {
        return '--%';
    } else {
        return (val / numberFmt);
    }
}

/**
 * @name: 添加单位函数
 * @author: xulujin
 * @msg: 
 * @param {String} unit 单位
 * @return {*}
 * @Date: 2021-09-26 10:17:50
 */
let unitFmt = (val, unit) => {
    if (Object.is(val, null) || Object.is(val, undefined) || Object.is(val, NaN) || Object.is(val, '')) {
        return '--';
    } else {
        return val + unit;
    }
}


// 动态单位处理的过滤器，用于动态处理面积单位(m²)
let dynamicFmt = (val) => {
    if (Object.is(val, null) || Object.is(val, undefined) || Object.is(val, NaN) || Object.is(val, '')) {
        return '--';
    } else if (Number(val) > 100000000) {
        return `${(val / 100000000).toFixed(1)}亿m² `;
    } else if (Number(val) > 10000 && Number(val) < 1000000000) {
        return `${(val / 10000).toFixed(1)}万m²`;
    } else {
        return `${val.toFixed(1)}m²`;
    }
};


// 千分位处理
let thousandsFmt = (val) => {
    if (val === undefined) return;
    if (typeof val !== 'string') {
        val = val.toString();
    }
    if (val.length < 4) {
        return val;
    } else {
        val = (val + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
        return val;
    }
};

// 时间处理
import { format } from 'date-fns';
let formatDate = (val, rule) => {
    if (
        Object.is(val, null) ||
        Object.is(val, undefined) ||
        Object.is(val, NaN) ||
        Object.is(val, "")
    ) {
        return "--";
    } else {
        return format(new Date(val), rule);
    }
}

export {
    basicFmt,
    rateFmt,
    toFixedFmt,
    unitFmt,
    dynamicFmt,
    thousandsFmt,
    formatDate,
};