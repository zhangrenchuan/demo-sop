<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
      <el-footer class="el-footer" style="height: 44px">{{$store.getters.globalWebsiteConfig.copyright}} {{$store.getters.globalWebsiteConfig.version}}</el-footer>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components';
import ResizeMixin from './mixin/ResizeHandler';

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
