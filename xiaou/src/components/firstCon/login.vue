<template>
  <div>
    <!-- <h3>登录页</h3> -->
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
      right-text="注册"
      @click-right="$router.push('/register')"
    >
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="toLogin">
      <van-field
        v-model="userInfo.phone"
        name="电话号"
        label="电话号"
        :rules="[{ required: true, message: '请输入你的电话号' }]"
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
      <div>
        <van-button class="btn" @click="$router.push('/register')" type="warning"
          >未注册，先去注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { goLogin } from "../../utils/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    toLogin() {
      // console.log("ddd");
      goLogin(this.userInfo).then((res) => {
        // console.log(res,'登录成功');
        if (res.data.code == 200) {
          sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
          this.$router.push("/mine");
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.btn{
  margin-left:30%;
}
</style>