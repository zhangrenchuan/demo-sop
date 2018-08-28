<template>
  <el-scrollbar>
    <div class="web-title">
      <img src="../../../../assets/images/sidebar/app_ico.png" class="web-icon">
      <span class="pl-5">{{$store.getters.globalWebsiteConfig.title}}</span>
    </div>
    <div class="web-nav-title">导航</div>
    <el-menu mode="vertical" :default-active="$route.path">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .web-title {
    font-size: 15px;
    font-weight: bold;
    padding-top: 74px;
    padding-left: 22px;
  }
  .web-nav-title {
    font-size: 12px;
    padding-left: 20px;
    padding-top: 40px;
    padding-bottom: 20px;
  }
  .web-icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    vertical-align: -6px;
  }

</style>
