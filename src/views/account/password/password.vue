<template>
  <div id="openPassword" v-cloak>
    <h2 id="page-title">密码管理</h2>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 18px">修改密码</span>
        <div class="sub-title">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</div>
      </div>
      <div style="width: 500px;">
        <el-form :model="linksForm" :rules="rules" ref="linksForm" label-width="150px" label-position="right" class="demo-ruleForm">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input v-model="linksForm.oldPassword" placeholder="请填写原密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="linksForm.newPassword" placeholder="请填写新密码" type="password"></el-input>
          </el-form-item >
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input v-model="linksForm.checkPass" placeholder="请填写确认密码" type="password"></el-input>
          </el-form-item >
          <el-form-item>
            <el-button class="modify-btn" @click="submitForm('linksForm')" :loading="buttonLoading">保存</el-button>
            <el-button class="modify-btn-ash" @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { changePassWord } from '../../../api/account';
  import { removeToken } from '../../../utils/auth';
  import { validateSpace, validateLen, validateSymbol } from '../../../utils/validate';
  import { errCodeMsg } from '../../../utils/errCodeMsg';

  export default {
    name: 'openPassword',
    data() {
      const validatePass = (rule, value, callback) => {
        const msg = (!validateSpace(value) && '请再次填写密码') ||
                    (value !== this.linksForm.newPassword && '两次输入的密码不一致');
        if (msg) return callback(new Error(msg));
        callback();
      };
      const validateTitle = (rule, value, callback) => {
        const msg = (!validateSpace(value) && '请填写密码') ||
                    (!validateLen(value, 6) && '输入的密码不可少于6位数') ||
                    (!validateSymbol(value) && '存在非法字符，请修改后重新输入');
        if (msg) return callback(new Error(msg));
        callback();
      };
      return {
        buttonLoading: false,
        linksForm: {
          oldPassword: '', // 旧密码
          newPassword: '', // 新密码
          checkPass: '', // 确认密码
          platform: 'open'
        },
        rules: {
          oldPassword: [{ required: true, validator: validateTitle, trigger: 'blur' }],
          newPassword: [{ required: true, validator: validateTitle, trigger: 'blur' }],
          checkPass: [{ required: true, validator: validatePass, trigger: 'change' }]
        }
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        sessionStorage.removeItem('contentPage');
        sessionStorage.removeItem('sonicPage');
        sessionStorage.removeItem('pushPage');
      });
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            changePassWord(this.linksForm).then((data) => {
              if (data.code === 'SUCCESS') {
                this.$message.warning('密码已修改，请重新登录');
                removeToken();
                this.$router.push('Login');
              }
            }, (err) => {
              err.error.errCode = (err.error.errCode === 'PASSWORD_ORIGINAL_NO_MATCH') ? 'U10002' : err.error.errCode;
              errCodeMsg(err, this);
            });
          } else {
            this.$message.error('请填写完整再保存');
            return false;
          }
        });
      },
      back() {
        this.$confirm('此操作将退出编辑并返回账户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('info');
          this.$message({
            type: 'warning',
            message: '密码管理编辑页已关闭'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          });
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #openPassword {
    padding: 20px;
    h2 {
      margin-top: 0;
    }
    h5 {
      margin-bottom: 20px;
    }
  }
</style>
