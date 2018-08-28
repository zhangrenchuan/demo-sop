<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <div id="login-left">
        <div id="login-name">
          XXXXX平台
          DEMODEMO
          DEMO
        </div>
        <div class="text-center">
          2018 {{$store.getters.globalWebsiteConfig.title}} {{$store.getters.globalWebsiteConfig.version}}
        </div>
      </div>
      <div id="login-right">
        <div id="title">Sign In</div>
        <el-form-item prop="username" :class="{'entry-error': !isUser}">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"/>
        </el-form-item>
        <el-form-item prop="password" id="psd-el" :class="{'entry-error': !isPassword}">
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on" placeholder="password"/>
        </el-form-item>
        <el-button type="primary" style="width:152px;margin-bottom:30px;" :loading="loading"
                   @click.native.prevent="handleLogin">登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { errCodeMsg } from '../../utils/errCodeMsg';
import { validateSpace, validateLen, validateEmail } from '../../utils/validate';

export default {
  name: 'login',
  data() {
    const UserName = (rule, value, callback) => {
      const msg = (!validateSpace(value) && '请输入平台账号') ||
                  (!validateEmail(value) && '请输入正确的账号格式');
      this.isUser = !msg;
      if (msg) return callback(new Error(msg));
      callback();
    };
    const PassWord = (rule, value, callback) => {
      const msg = (!validateSpace(value) && '请输入密码') ||
                  (!validateLen(value, 6) && '密码不少于6位数');
      this.isPassword = !msg;
      if (msg) return callback(new Error(msg));
      callback();
    };
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: UserName }],
        password: [{ required: true, trigger: 'blur', validator: PassWord }]
      },
      loading: false,
      passwordType: 'password',
      isUser: true,
      isPassword: true
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' });
          }, err => {
            err.error.errCode = (err.error.errCode === 'E10001') ? 'U10001' : err.error.errCode; // 用户名或密码错误
            errCodeMsg(err, this);
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $login_image: image-url('login'); // 传入图片父级目录可获得完整图片地址

  .login-container {
    @include relative;
    height: 100vh;
    background: url("#{$login_image}login_big_bg.jpg") 0 0 no-repeat {
      size: cover;
    }
    .login-form {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 776px;
      height: 527px;
      padding: 35px 35px 15px 35px;
      margin: auto;
      background: url("#{$login_image}login_form_bg.png") 0 0 no-repeat {
        size: 100%;
      }
      #login-left {
        float: left;
        padding-top: 82px;
      }
      #login-name {
        position: relative;
        width: 166px;
        height: 98px;
        /*background: url("#{$login_image}login_name_bg.png") 0 0 no-repeat{
          size: 100%;
        }
        */
        font-size: 18px; color: #fff;
        font-weight: bold;
        letter-spacing: 2.5px;
        line-height: 25px;
        font-family: "Microsoft YaHei";
        &:before {
          content: '';
          position: absolute;
          top: -16px;
          left: 2px;
          width: 16px;
          height: 3px;
          background: #FFF;
        }
      }
      #login-right {
        float: right;
        width: 330px;
      }
      #title {
        margin: 65px 0 41px 40px;
        font-size: 24px;
        color: #231F20;
        font-weight: 600;
      }
      .text-center {
        position: relative;
        margin-top: 178px;
        vertical-align: middle;
        color: #FFF;
        font-size: 14px;
        &:before {
          content: '';
          position: absolute;
          top: -56px;
          left: 0;
          width: 31px;
          height: 31px;
          background: url("#{$login_image}login_icon_bg.png") 0 0 no-repeat {
            size: 100%;
          }
        }
      }
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
