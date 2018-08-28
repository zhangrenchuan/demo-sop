<template>
  <div class="dashboard-editor-container">
    <div class="title1">欢迎使用声动XX平台</div>
    <div class="p">您可以在这里阅读一些使用指南, 现就目前开放的功能进行简述。</div>
    <p class="p">目前开放以下功能:</p>
    <div class="quote">
      <ul class="ul">
        <li class="li">账户管理</li>
        <ul class="ul">
          <li class="li">账户信息</li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-admin',
    data() {
      return {};
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        sessionStorage.removeItem('contentPage');
        sessionStorage.removeItem('sonicPage');
        sessionStorage.removeItem('pushPage');
      });
    },
    methods: {}
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    margin: 50px;
  }
  .title1 {
    color: #3c3c3c;
    font-size: 1.7em;
    line-height: 1.6em;
    margin: .8em 0 .6em 0;
  }
  .p {
    word-wrap: break-word;
    font-weight: bold;
    margin: 1.5em 0;
    color: #3c3c3c;
    line-height: 1.8;
  }
  .b {
    color: #000000;
    font-weight: bold;
  }
  .quote {
    box-sizing: border-box;
    margin: 1.6em 0;
    padding: 0 0 0 1.2em;
    border-left: 0.4em solid #dddddd;
    color: #888888;
    min-height: 20px;
    line-height: 1.8;
    &>ul .ul {
      &>li {
        list-style: none;
        font-size: 15px;
      }
    }
  }
  .ul {
    padding: 5px 25px;
    margin: 0;
    list-style-type: disc;
  }
  .li {
    color: #3c3c3c;
  }
</style>
