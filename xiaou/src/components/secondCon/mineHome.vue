<template>
  <div>
    <div class="outer">
      <!-- 导航栏 -->
      <van-nav-bar
        @click-left="$router.back()"
        :title="$route.meta.name"
        left-text="返回"
        left-arrow
        right-text="注销"
        @click-right="exit"
      >
      </van-nav-bar>
      <div v-if="flag">
        <div class="mine">
          <div class="mine_img">
            <img src="../../assets/images/mine_images/head.jpg" alt="" />
          </div>
          <div class="mine_text">
            <div class="mine_text1">{{userInfo.nickname}}</div>
            <div class="mine_text2">V1</div>
          </div>
          <div class="mine_box">每日签到</div>
        </div>
        <div class="list">
          <div class="list1">
            <div class="list1_img">
              <img src="../../assets/images/mine_images/icon_1.jpg" alt="" />
            </div>
            <div class="list1_text">全部订单</div>
          </div>
          <div class="list2">
            <div class="list2_img">
              <img src="../../assets/images/mine_images/icon_2.jpg" alt="" />
            </div>
            <div class="list2_text">代付款</div>
          </div>
          <div class="list3">
            <div class="list3_img">
              <img src="../../assets/images/mine_images/icon_3.jpg" alt="" />
            </div>
            <div class="list3_text">待收货</div>
          </div>
        </div>
        <div class="nav">
          <div class="nav1">
            <div class="nav1_img1">
              <img src="../../assets/images/mine_images/icon_4.jpg" alt="" />
            </div>
            <div class="nav1_text">地址管理</div>
            <div class="nav1_img2">
              <img src="../../assets/images/mine_images/right.jpg" alt="" />
            </div>
          </div>
          <div class="nav1">
            <div class="nav1_img1">
              <img src="../../assets/images/mine_images/icon_5.jpg" alt="" />
            </div>
            <div class="nav1_text">我的钱包</div>
            <div class="nav1_text1">200余额</div>
            <div class="nav1_img2">
              <img src="../../assets/images/mine_images/right.jpg" alt="" />
            </div>
          </div>
          <div class="nav1">
            <div class="nav1_img1">
              <img src="../../assets/images/mine_images/icon_6.jpg" alt="" />
            </div>
            <div class="nav1_text">我的优惠劵</div>
            <div class="nav1_img2">
              <img src="../../assets/images/mine_images/right.jpg" alt="" />
            </div>
          </div>
          <div class="nav1">
            <div class="nav1_img1">
              <img src="../../assets/images/mine_images/icon_7.jpg" alt="" />
            </div>
            <div class="nav1_text">我的二维码</div>
            <div class="nav1_img2">
              <img src="../../assets/images/mine_images/right.jpg" alt="" />
            </div>
          </div>
          <div class="nav1">
            <div class="nav1_img1">
              <img src="../../assets/images/mine_images/icon_8.jpg" alt="" />
            </div>
            <div class="nav1_text">我的小伙伴</div>
            <div class="nav1_img2">
              <img src="../../assets/images/mine_images/right.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <van-button
          class="btn"
          @click="$router.push('/login')"
          type="warning"
          >未登录，请先登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: sessionStorage.getItem("userInfo") ? true : false,
      userInfo:'',
    };
  },
  mounted(){
    this.userInfo=sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):'';
    // console.log(this.userInfo);
  },
  methods:{
    exit(){
      sessionStorage.removeItem('userInfo');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.btn {
  margin-left: 30%;
  margin-top: 200px;
}
body {
  background-color: white;
}
.outer {
  width: 7.5rem;
  background-color: white;
  margin: 0 auto;
}
.outer .header {
  width: 7.5rem;
  height: 0.7rem;
  background-color: #f26b11;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.outer .header .header_img {
  margin-top: 0.1rem;
}
.outer .header .iconfont {
  color: #fff;
  margin-left: 0.1rem;
  font-size: 0.4rem;
}
.outer .header .header_text {
  font-size: 0.3rem;
  color: white;
  margin-left: 1.2rem;
  margin-top: 0.15rem;
}
.outer .header .header_circle {
  height: 0.5rem;
  margin-left: 0.8rem;
  display: flex;
  margin-right: 0.3rem;
  margin-top: 0.15rem;
}
.outer .header .header_circle .header_circle1 {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  background-color: white;
  margin-right: 0.1rem;
  margin-top: 0.2rem;
}
.outer .mine {
  width: 7.5rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  background-color: #f26b11;
  display: flex;
}
.outer .mine .mine_img {
  border: 3px solid white;
  border-radius: 50%;
  margin-left: 0.2rem;
}
.outer .mine .mine_img img {
  width: 1.5rem;
  border-radius: 50%;
}
.outer .mine .mine_text {
  margin-left: 0.3rem;
}
.outer .mine .mine_text .mine_text1 {
  font-size: 0.25rem;
  margin-top: 0.6rem;
  color: white;
}
.outer .mine .mine_text .mine_text2 {
  margin-top: 0.1rem;
}
.outer .mine .mine_box {
  width: 1.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  margin-left: 3rem;
  margin-top: 0.6rem;
  color: #f26b11;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  background-color: white;
  border-radius: 0.05rem;
}
.outer .list {
  display: flex;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  color: #626262;
}
.outer .list .list1 {
  margin-left: 0.4rem;
}
.outer .list .list1 .list1_img {
  margin-left: 0.2rem;
}
.outer .list .list1 .list1_img img {
  width: 0.34rem;
}
.outer .list .list1 .list1_text {
  margin-top: 0.1rem;
  font-size: 0.2rem;
}
.outer .list .list2 {
  margin-left: 2.3rem;
}
.outer .list .list2 .list2_img img {
  width: 0.38rem;
}
.outer .list .list2 .list2_text {
  margin-top: 0.1rem;
  font-size: 0.2rem;
  margin-left: -0.1rem;
}
.outer .list .list3 {
  margin-left: 2.4rem;
}
.outer .list .list3 .list3_img img {
  width: 0.34rem;
}
.outer .list .list3 .list3_text {
  margin-top: 0.1rem;
  font-size: 0.2rem;
  margin-left: -0.1rem;
}
.outer .nav .nav1 {
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
  padding-top: 0.4rem;
  margin-right: 0.3rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #f1f1f1;
}
.outer .nav .nav1 .nav1_img1 img {
  width: 0.36rem;
}
.outer .nav .nav1 .nav1_text {
  width: 1.2rem;
  font-size: 0.2rem;
  margin-left: 0.2rem;
}
.outer .nav .nav1 .nav1_img2 {
  margin-left: 4.9rem;
}
.outer .nav .nav1 .nav1_img2 img {
  width: 0.2rem;
}
.outer .nav .nav1:nth-child(2) {
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  border-bottom: 1px solid #f1f1f1;
}
.outer .nav .nav1:nth-child(2) .nav1_img1 img {
  width: 0.36rem;
}
.outer .nav .nav1:nth-child(2) .nav1_text {
  width: 1.2rem;
  font-size: 0.2rem;
  margin-left: 0.2rem;
}
.outer .nav .nav1:nth-child(2) .nav1_text1 {
  width: 0.8rem;
  font-size: 0.2rem;
  margin-left: 4rem;
  color: red;
}
.outer .nav .nav1:nth-child(2) .nav1_img2 {
  margin-left: 0.1rem;
}
.outer .nav .nav1:nth-child(2) .nav1_img2 img {
  width: 0.2rem;
}
</style>