<template>
  <div class="outer">
    <div class="header">
      <img src="../../assets/images/cart_logo.jpg" alt="" />
      <router-link to="/search">
        <input type="text " placeholder="搜索商品" />
      </router-link>
      <div class="header_circle">
        <div class="header_circle1"></div>
        <div class="header_circle1"></div>
        <div class="header_circle1"></div>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li v-for="item in listList" :key="item.id">{{ item.name }}</li>

        <a href="#">
          <span class="iconfont icon-jiantou9"></span>
        </a>
      </ul>
    </div>
    <div class="big_img">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="blue">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
          <!-- {{item.img}} -->
          <img
            class="img"
            :src="
              item.img
                ? $imgUrl + item.img
                : 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3782128483,794367969&fm=26&gp=0.jpg'
            "
            alt=""
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="small_icon">
      <!-- 宫格展示 -->
      <van-grid :border="false" :column-num="4">
        <van-grid-item text="限时抢购">
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <span class="gridTitle">限时抢购</span>
        </van-grid-item>
        <van-grid-item text="积分商城">
          <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
          <span class="gridTitle">积分商城</span>
        </van-grid-item>
        <van-grid-item text="联系我们">
          <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
          <span class="gridTitle">联系我们</span>
        </van-grid-item>
        <van-grid-item to="/sort" text="商品分类">
          <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
          <span class="gridTitle">商品分类</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="time1">
      <div class="time1_empty"></div>
      <div class="time1_left">
        <div class="time1_left_fir">
          <img src="../../assets/images/index_images/timer.jpg" alt="" />
          <span>限时秒杀</span>
        </div>
        <div class="time1_left_sec">每天零点登场 好货秒不停</div>
        <div class="time1_left_thi">
          <div class="time1_left_thi1">02</div>
          <div class="time1_left_thi2">:</div>
          <div class="time1_left_thi1">16</div>
          <div class="time1_left_thi2">:</div>
          <div class="time1_left_thi1">45</div>
          <div class="time1_left_thi3">
            <img src="../../assets/images/index_images/bg.jpg" alt="" />
            <span>秒杀</span>
          </div>
        </div>
        <div class="time1_left_for">
          <img src="../../assets/images/index_images/shop_5.jpg" alt="" />
          <div class="time1_left_for_price"><span>&yen;</span>14.8</div>
        </div>
      </div>
      <div class="time1_right">
        <div class="time1_right_left">
          <div class="time1_right_left_text1">
            品牌上新
            <span>折</span>
          </div>
          <div class="time1_right_left_text2">每日9点 抢大牌</div>
          <div class="time1_right_left_text3">
            <img src="../../assets/images/index_images/brand.jpg" alt="" />
          </div>
        </div>
        <div class="time1_right_right">
          <img src="../../assets/images/index_images/shop_1.jpg" alt="" />
        </div>
        <div class="time1_right_bot">
          <div class="time1_right_bot1">
            <div class="time1_right_bot1_text1">每日十件</div>
            <div class="time1_right_bot1_text2">只为你选好货</div>
            <div class="time1_right_bot1_img">
              <img src="../../assets/images/index_images/shop_2.jpg" alt="" />
            </div>
          </div>
          <div class="time1_right_bot1">
            <div class="time1_right_bot1_text1">拼啊</div>
            <div class="time1_right_bot1_text2">超级好价拼团</div>
            <div class="time1_right_bot1_img1">
              <img src="../../assets/images/index_images/shop_3.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="guanggao">
      <img src="../../assets/images/index_images/bar.jpg" alt="" />
    </div>
    <div class="shop">
      <!-- tab标签页 -->
      <van-tabs type="card">
        <van-tab title="热搜榜">
          <van-card
            @click="toDetile(item.id)"
            v-for="item in hotsList"
            :key="item.id"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          />
        </van-tab>
        <van-tab title="新品榜">
          <van-card
            @click="toDetile(item.id)"
            v-for="item in newsList"
            :key="item.id"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          />
        </van-tab>
        <van-tab title="商品榜">
          <van-card
            @click="toDetile(item.id)"
            v-for="item in goodsList"
            :key="item.id"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          />
        </van-tab>
      </van-tabs>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { getBannerList, getIndexGoods } from "../../utils/axios";
import Swiper from "swiper";
export default {
  data() {
    return {
      listList: [
        {id: 1,name: "推荐",},
        { id: 2, name: "女装" },
        { id: 3, name: "鞋包" },
        { id: 4, name: "居家" },
        { id: 5, name: "母婴儿童" },
        { id: 6, name: "美食" },
      ],
      bannerList: [],
      hotsList: [],
      newsList: [],
      goodsList: [],
    };
  },
  mounted() {
    this.getBannerData();
    this.getGoodsInfo();
  },
  methods: {
    //封装一个方法，获取轮播图数据。
    getBannerData() {
      let swiper = new Swiper(".swiper-container");
      getBannerList().then((res) => {
        // console.log(res, "轮播图数据");
        if (res.data.code == 200) {
          this.bannerList = res.data.list;
        } else {
        }
      });
    },
    //获取商品数据方法。
    getGoodsInfo() {
      getIndexGoods().then((res) => {
        // console.log(res,"商品数据");
        this.hotsList = res.data.list[0].content; //最热商品。
        this.newsList = res.data.list[1].content; //新品数据
        this.goodsList = res.data.list[2].content; //所有商品
      });
    },
    //点击跳转商品详情页。
    toDetile(e) {
      // console.log(e, "是你吗");
      this.$router.push({
        path: "/detail",
        query: {
          id: e,
        },
      });
    },
  },
};
</script>

<style scoped>
body {
  background-color: black;
  -webkit-touch-callout: none;
}
.outer {
  width: 7.5rem;
  background-color: #f1f1f1;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header {
  position: relative;
  width: 7.5rem;
  height: 0.7rem;
  background-color: white;
  margin: 0 auto;
  padding-top: 0.2rem;
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}
.outer .header img {
  width: 2rem;
  height: 0.5rem;
  margin-left: 0.2rem;
}
.outer .header input {
  width: 2.7rem;
  height: 0.4rem;
  background-color: #eeeeee;
  border-radius: 0.1rem;
  margin-left: 1rem;
  margin-top: 0.05rem;
}
.outer .header input::-webkit-input-placeholder {
  font-size: 0.2rem;
  text-align: center;
}
.outer .header .header_text {
  font-size: 0.2rem;
  position: absolute;
  right: 2.6rem;
  top: 0.35rem;
}
.outer .header .header_circle {
  height: 0.5rem;
  margin-left: 0.8rem;
  display: flex;
}
.outer .header .header_circle .header_circle1 {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.1rem;
  margin-top: 0.2rem;
}
.outer .nav {
  width: 7.5rem;
  height: 0.75rem;
  background-color: white;
  margin-top: 0.7rem;
}
.outer .nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.outer .nav ul li:nth-child(1) {
  color: deeppink;
  border-bottom: 2px solid red;
}
.outer .nav ul li {
  height: 0.55rem;
  font-size: 0.3rem;
  margin-left: 0.2rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  padding-top: 0.33rem;
}
.outer .nav ul a {
  height: 0.5rem;
  line-height: 0.75rem;
  font-size: 0.3rem;
  padding-right: 0.1rem;
}
.outer .nav ul li:hover {
  background-color: deeppink;
  color: white;
}
.outer .big_img {
  width: 7.5rem;
  height: 2.9rem;
  background-color: white;
}
.outer .big_img img {
  padding-top: 0.05rem;
  width: 7.5rem;
  height: 2.91rem;
}
.outer .small_icon {
  width: 7.5rem;
  height: 1.8rem;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
}
.outer .time1 {
  width: 7.5rem;
  height: 4.7rem;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
}
.outer .time1 .time1_empty {
  width: 7.5rem;
  height: 0.2rem;
  background-color: #f1f1f1;
}
.outer .time1 .time1_left {
  width: 3.55rem;
  margin-left: 0.2rem;
}
.outer .time1 .time1_left .time1_left_fir {
  display: flex;
}
.outer .time1 .time1_left .time1_left_fir img {
  width: 0.33rem;
}
.outer .time1 .time1_left .time1_left_fir span {
  font-size: 0.3rem;
  margin-left: 0.1rem;
  color: deeppink;
}
.outer .time1 .time1_left .time1_left_sec {
  color: #b9b9b9;
  font-size: 0.2rem;
  margin-top: 0.1rem;
}
.outer .time1 .time1_left .time1_left_thi {
  margin-top: 0.1rem;
  display: flex;
}
.outer .time1 .time1_left .time1_left_thi .time1_left_thi1 {
  font-size: 0.3rem;
  background-color: black;
  width: 0.45rem;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  color: white;
  border-radius: 0.05rem;
}
.outer .time1 .time1_left .time1_left_thi .time1_left_thi2 {
  font-size: 0.3rem;
  height: 0.45rem;
  width: 0.2rem;
  line-height: 0.45rem;
  text-align: center;
}
.outer .time1 .time1_left .time1_left_thi .time1_left_thi3 {
  margin-top: 0.05rem;
  margin-left: 0.3rem;
  position: relative;
}
.outer .time1 .time1_left .time1_left_thi .time1_left_thi3 img {
  width: 0.96rem;
}
.outer .time1 .time1_left .time1_left_thi .time1_left_thi3 span {
  position: absolute;
  top: 0.05rem;
  left: 0.2rem;
  font-size: 0.3rem;
  padding-top: 0.05rem;
}
.outer .time1 .time1_left .time1_left_for {
  margin-top: 0.3rem;
  position: relative;
}
.outer .time1 .time1_left .time1_left_for img {
  width: 2.36rem;
  height: 2rem;
  margin-left: 0.3rem;
}
.outer .time1 .time1_left .time1_left_for .time1_left_for_price {
  width: 0.8rem;
  height: 0.8rem;
  background-color: #fe3078;
  color: white;
  font-size: 0.3rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  left: 2.4rem;
  bottom: 0.2rem;
}
.outer .time1 .time1_right {
  width: 3.54rem;
  display: flex;
  flex-wrap: wrap;
}
.outer .time1 .time1_right .time1_right_left {
  border-left: 1px solid #f0f0f0;
}
.outer .time1 .time1_right .time1_right_left .time1_right_left_text1 {
  margin-left: 0.2rem;
  font-size: 0.3rem;
  color: deeppink;
}
.outer .time1 .time1_right .time1_right_left .time1_right_left_text1 span {
  font-size: 0.2rem;
  color: white;
  background-color: deeppink;
  padding-top: 0.1rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  border-radius: 0.04rem;
}
.outer .time1 .time1_right .time1_right_left .time1_right_left_text2 {
  font-size: 0.2rem;
  color: #c6c6c6;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}
.outer .time1 .time1_right .time1_right_left .time1_right_left_text3 {
  margin-left: 0.2rem;
  margin-top: 0.35rem;
}
.outer .time1 .time1_right .time1_right_left .time1_right_left_text3 img {
  width: 0.93rem;
  height: 0.32rem;
}
.outer .time1 .time1_right .time1_right_right img {
  margin-left: 0.2rem;
  width: 1.28rem;
  height: 1.78rem;
}
.outer .time1 .time1_right .time1_right_bot {
  border-top: 1px solid #f0f0f0;
  display: flex;
}
.outer .time1 .time1_right .time1_right_bot .time1_right_bot1 {
  width: 1.9rem;
  border-left: 1px solid #f0f0f0;
}
.outer
  .time1
  .time1_right
  .time1_right_bot
  .time1_right_bot1
  .time1_right_bot1_text1 {
  font-size: 0.3rem;
  color: deeppink;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}
.outer
  .time1
  .time1_right
  .time1_right_bot
  .time1_right_bot1
  .time1_right_bot1_text2 {
  font-size: 0.2rem;
  color: #c6c6c6;
  margin-top: 0.1rem;
  margin-left: 0.2rem;
}
.outer
  .time1
  .time1_right
  .time1_right_bot
  .time1_right_bot1
  .time1_right_bot1_img {
  margin-top: 0.1rem;
  margin-left: 0.6rem;
}
.outer
  .time1
  .time1_right
  .time1_right_bot
  .time1_right_bot1
  .time1_right_bot1_img
  img {
  width: 0.64rem;
  height: 1.02rem;
}
.outer
  .time1
  .time1_right
  .time1_right_bot
  .time1_right_bot1
  .time1_right_bot1_img1 {
  margin-top: 0.2rem;
  margin-left: 0.4rem;
}
.outer
  .time1
  .time1_right
  .time1_right_bot
  .time1_right_bot1
  .time1_right_bot1_img1
  img {
  width: 1.04rem;
  height: 0.88rem;
}
.outer .guanggao img {
  width: 7.5rem;
  height: 1.87rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.outer .shop {
  background-color: white;
  margin-bottom: 1.5rem;
}

/* 新加的 */
.my-swipe {
  width: 100%;
  height: 170px;
  /* border: 1px solid thistle; */
}
.van-tabs {
  margin-top:5px;
}
.gridTitle{
  font-size: 14px;
  margin-top: 5px;
}
</style>