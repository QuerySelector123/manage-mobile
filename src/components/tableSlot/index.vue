<!--
 * @Author: xulujin
 * @Date: 2021-08-24 15:12:19
 * @LastEditTime: 2021-08-25 09:42:10
 * @Description: 插槽表格
-->

<template>
  <div class="tableSlot" :style="`height:${height}`">
    <el-table height="100%" :data="tableOption.tableData" :stripe="true">
      <el-table-column v-for="(item, index) in tableOption.headerList" :key="String(index)" :prop="item.prop" :label="item.label" :align="item.align">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'tableSlot',
  props: {
    tableOption: {
      type: Object,
      default: () => {},
    },
    height: {
      type: String,
      default: '100%',
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style lang='scss'>
.tableSlot {
  .el-table__body-wrapper {
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  & > .el-table {
    background-color: transparent;
    tr,
    th {
      background-color: transparent;
      border-color: transparent;
      color: #fff;
    }
    table th,
    table td {
      border-bottom: none;
    }
    &::before {
      background-color: transparent;
    }

    .el-table__header-wrapper {
      th {
        font-size: 18px;
        font-weight: normal;
        background-color: #4e6da0;
        padding: 24px 0;
      }
    }
    .el-table__body {
      width: 100% !important;
    }
    .el-table__body-wrapper {
      td {
        font-size: 18px;
        padding: 20px 0;
        font-weight: normal;
      }
      .el-table__row--striped td {
        background-color: rgba(28, 57, 104, 0.6);
      }
    }
  }
  // table hover颜色
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(204, 204, 204, 0.15);
    cursor: pointer;
  }
}
</style>

