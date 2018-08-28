<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    components: {},
    created() {
      this.getBreadcrumb();
    },
    data() {
      return {
        levelLast: null
      };
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews;
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        const first = matched[0];
        if (first && first.name !== 'dashboard') {
          matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched);
        }
        this.levelLast = matched[matched.length - 1];
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main {
    padding-bottom: 40px;
    overflow: hidden;
    min-height: calc(100% - (50px + 40px)); // 中间内容最小高度 = 100% - （顶栏 + 底栏）
  }
  .navigation{
    padding-top:25px;
    padding-left: 35px;
    margin-top: 0;
  }

</style>
