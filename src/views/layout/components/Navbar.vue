<template>
  <el-menu class="navbar" mode="horizontal" :style="{ backgroundColor: theme }">
    <div class="left-menu">
      <!--用户信息-->
      <div class="user-block">
        <img src="../../../assets/images/user/user_pto.png" class="user-icon">
        <div class="user-info">
          <span class="block user-name">{{$store.getters.name}}</span>
          <span class="block">{{$store.getters.account}}</span>
        </div>
      </div>
    </div>
    <div class="right-menu">
      <a @click="logout" class="logout">退出</a>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      theme: null
    };
  },
  components: {},
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    logout() {
      const title = this.$store.getters.globalWebsiteConfig.title;
      this.$confirm(`是否退出${title}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }).catch(() => {

      });
    }
  },
  created() {
    this.theme = localStorage.defaultTheme || this.$store.state.app.globalWebsiteConfig.defaultTheme;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus{
        outline: none;
      }
      .logout {
        display: inline-block;
        margin-right: 36px;
        color: #fff;
        font-size: 12px;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
        vertical-align: 2px;
      }
      .international{
        vertical-align: top;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }

    .left-menu {
      float: left;
      height: 100%;
      .user-icon {
        float: left;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-left: 25px;
        margin-top: 9px;
      }
      .user-info {
        margin-left: 13px;
        float: left;
        color: #fff;
        font-size: 12px;
        line-height: 12px;
        &>span {
          overflow: hidden;
          max-width: 232px;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      .user-name {
        font-weight: bold;
        padding-top: 10px;
        padding-bottom: 5px;
      }
    }
    .right-menu {
      cursor: pointer;
    }
  }
</style>

