<template>
  <div id="accountInfo" v-cloak>
    <h2 id="page-title">账号信息</h2>
    <el-card class="box-card">
      <div class="msg-box">
        <div slot="header" class="clearfix">
          <span class="title">基本信息</span>
        </div>
        <p><b>帐号</b><span v-text="accountInfo.account"></span></p>
        <p><b>名称</b><span v-text="accountInfo.name"></span></p>
        <p><b>邮箱</b><span v-text="accountInfo.email"></span></p>
        <p><b>联系电话</b><span v-if="accountInfo.areaCode">{{accountInfo.areaCode}}-</span><span style="margin-left: 0" v-text="accountInfo.phoneNo"></span></p>
      </div>
      <div class="msg-box" v-for="(item, index) in accountInfo.relations" :key="index">
        <div slot="header" class="clearfix">
          <span class="title">联系人信息</span>
        </div>
        <p><b>姓名</b><span v-text="item.name"></span></p>
        <p><b>邮箱</b><span v-text="item.email"></span></p>
        <p><b>手机</b><span v-text="item.mobile"></span></p>
      </div>
      <div class="msg-box">
          <div slot="header" class="clearfix">
              <span class="title">授权信息</span>
          </div>
          <p><b>平台授权有效期</b><span v-if="appInfo.platformPeriod.startDate === ''"></span><span v-if="appInfo.platformPeriod.startDate !== ''">{{appInfo.platformPeriod.startDate | formatDate}} - {{appInfo.platformPeriod.endDate | formatDate}}</span></p>
          <p><b>应用数量</b><span v-text="appInfo.appNumLimit"></span></p>
          <p><b>声连码数量</b><span v-text="appInfo.sonicNumLimit"></span></p>
          <p><b>声连码授权有效期</b><span v-if="appInfo.sonicPeriod.startDate === ''"></span><span v-if="appInfo.sonicPeriod.startDate !== ''">{{appInfo.sonicPeriod.startDate | formatDate}} - {{appInfo.sonicPeriod.endDate | formatDate}}</span></p>
          <p><b>状态</b>
            <span v-if="text === ''"></span>
                <el-tag :class="{'enabled-tag': text === '启用', 'disable-tag': text !== '启用'}"
                                        disable-transitions v-if="text !== ''">{{text}}</el-tag>
          </p>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { getAccountInfo } from '../../../api/account';
  import { errCodeMsg } from '../../../utils/errCodeMsg';
  import formatDate from '@/utils/date';

  export default {
    name: 'accountInfo',
    data() {
      return {
        accountInfo: {
          account: '',
          name: '',
          email: '',
          phoneNo: '',
          relations: [{
            name: '',
            email: '',
            mobile: ''
          }]
        },
        appInfo: {
          platformPeriod: {
            startDate: '',
            endDate: ''
          },
          appNumLimit: '',
          sonicNumLimit: '',
          sonicPeriod: {
            startDate: '',
            endDate: ''
          },
          status: ''
        }
      };
    },
    beforeRouteEnter(to, from, next) {
      // Promise.all 會等到數組內的 Promise 都 resolve 後才會繼續跑(then)
      sessionStorage.removeItem('contentPage');
      sessionStorage.removeItem('sonicPage');
      sessionStorage.removeItem('pushPage');
      next(vm => {
        getAccountInfo().then((response) => {
          vm.accountInfo = response.customer;
          vm.appInfo = response.customerPlatform;
        }).catch(error => {
          console.log(error);
          this.$message.error(errCodeMsg('U000'));
        });
      });
    },
    computed: {
      text() {
        let status = '';
        switch (this.appInfo.status) {
          case 'enabled' : status = '启用';
            break;
          case 'disabled' : status = '停用';
            break;
          case 'canceled' : status = '注销';
            break;
          default: status = '';
        }
        return status;
      }
    },
    filters: {
      formatDate(time) {
        const date = new Date(time);
        return formatDate(date, 'yyyy/MM/dd');
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #accountInfo {
    padding: 20px;
    span {
      display: inline-block;
      margin-left: 20px;
    }
    .enabled-tag, .disable-tag {
      margin-left: 15px;
    }
  }
</style>
