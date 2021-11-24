/**
 * @name: 全局变量注册
 * @author: xulujin
 * @msg: 全局变量规范：
 *      1.使用全部大写加下划线隔开;
 *      2.写好注释说明是作何用处;
 * @param {*}
 * @return {*}
 * @Date: 2021-05-11 11:01:17
 */

export let globalData = {
  // echart图颜色
  ECHART_COLOR_RED: "#C01904", // 红色
  ECHART_COLOR_BLUE: "#4572C5",// 深蓝色
  ECHART_COLOR_BLUE1: "#5080BD", // 蓝色
  ECHART_COLOR_GREY: "#ACACAC",// 灰色
  ECHART_COLOR_ORANGE: "#FF8839",// 橙色
  ECHART_COLOR_YELLOW: "#FFA337", // 黄色

  // echart字体颜色
  ECHART_FONTCOLOR_RED: "#FF1C00", // 亮红色
  ECHART_FONTCOLOR_RED1: "#C01904", // 红色
  ECHART_FONTCOLOR_BLUE1: "#4F80BD", // 蓝色
  ECHART_FONTCOLOR_BLACK: "#000000", // 黑色
  ECHART_FONTCOLOR_GREY: "#848484", // 灰色
  ECHART_FONTCOLOR_ORANGE: "#FF8839", // 橙色
  ECHART_FONTCOLOR_YELLOW: "#FC7214", // 黄色
  ECHART_FONTCOLOR_WHITE: "#FFF", // 白色

  ECHART_LINEWIDTH: 3, // echarts线的宽度
  ECHART_AXIS_COLOR: '#464557', // echarts 轴线和字的颜色

  // 表格数据
  TABLE_HEADER_COLOR_BLUE: '#295ac2',

  LINKCOLOR: '#4881ff',

  // portal 文件上传链接拼接
  FILE_UPLOAD_URL: `${process.env.VUE_APP_URL_IP + process.env.VUE_APP_URL_DEVELOPMENT_bip.replace('/', '')}/file/pictureUpload`,
}
