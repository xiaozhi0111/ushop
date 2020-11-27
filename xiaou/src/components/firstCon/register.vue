<template>
  <div>
      <!-- <h3>注册页</h3> -->
      <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
      right-text="登录"
      @click-right="$router.push('/login')"
    >
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="toRegister">
      <van-field
        v-model="userInfo.phone"
        name="电话号"
        label="电话号"
        :rules="[{ required: true, message: '请输入你的电话号' }]"
      />
      <van-field
        v-model="userInfo.nickname"
        name="昵称"
        label="昵称"
        :rules="[{ required: true, message: '请输入你的昵称' }]"
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        label="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {goRegister} from '../../utils/axios';
import {Toast} from 'vant';
export default {
  data() {
    return {
      userInfo:{
        phone:'',
        nickname:'',
        password:'',
      }
    };
  },
  methods:{
    toRegister(){
      // console.log(this.userInfo,'ddd');
      goRegister(this.userInfo)
      .then(res=>{
        // console.log(res,'注册成功');
        if(res.data.code==200){
          Toast.success(res.data.msg);
          this.$router.push('/login');
        }else{
          Toast.fail(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>