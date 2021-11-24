<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getMenuTree } from '@/api/login';
export default {
  name: 'app',
  data() {
    return {
      formLabelAlign: {
        // name: "",
        // password: "",
        authPassCode: 'admin',
        credential: 'admin',
      },
      isReload: true,
    };
  },
  created() {
    this.getMenuTree();
  },
  mounted() {},
  methods: {
    linkTo() {
      this.reload();
    },
    getMenuTree() {
      if (this.$store.state.general.token) {
        getMenuTree({ appCode: '1010000000' }).then((res) => {
          this.$store.commit('general/setAuthRoute', JSON.stringify(res.data));
        });
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.mt {
  margin-top: 8px;
}
.mb {
  margin-bottom: 8px;
}
body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
}
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
