<template>
  <div class="login">
    <!-- <h3>我是登录页</h3> -->
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
    >
      <h3>欢迎登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goLogin('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getUserLogin} from '../util/axios';
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      //规则验证
      rules: {
        //用户名验证
        username: [
          //必填项验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          //字符验证
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        //密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoActions']),
    goLogin(formName) {
      // console.log(this.$refs[formName], "formDOM");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //登录逻辑
          //调取登录接口
          getUserLogin(this.loginForm)
          .then(res=>{
            console.log(res,'登录');
            if(res.data.code==200){
              this.$message.success(res.data.msg);
              // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list));
              this.changeUserInfoActions(res.data.list);
              this.$router.push('/index');
            }else{
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
.login {
  width: 100%;
  height: 100vh;
  background: $firstBgColor;
  .el-form {
    background $secondBgColor;
    border-radius 30px
    padding: 30px;
    width: 400px;
    height: 250px;
    border: 1px solid gray;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -140px;
    margin-left: -230px;

    h3 {
      text-align: center;
      margin-bottom: 20px;
    }

    .el-form-item {
      text-align: center;
      margin-left: -50px;

      .el-button {
        margin-left: -50px;
        margin-top: 20px;
      }
    }
  }
}
</style>