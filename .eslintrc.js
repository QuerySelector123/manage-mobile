module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    // 百度地图相关全局参数
    BMap: true,
    BMapLib: true,
    BMAP_NORMAL_MAP: true,
    BMAP_SATELLITE_MAP: true,
    BMAP_HYBRID_MAP: true,
    BMAP_STATUS_SUCCESS: true,
    BMAP_ANCHOR_TOP_RIGHT: true,
    // 高德地图相关全局参数
    AMap: true
  },
  parser: 'vue-eslint-parser',
  extends: ['alloy', 'alloy/vue'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    /**
     * 组件中必须按照 <template>, <script>, <style> 排序
     * @reason 这是官方建议的顺序
     */
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/component-definition-name-casing': 'off',
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: true
      }
    ]
  }
};
