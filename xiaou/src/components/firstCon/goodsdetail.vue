<template>
  <div>
    <!-- <h3>商品详情</h3> -->
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <div v-if="!userInfo" class="login" @click="toLogin">
          <van-icon name="" size="18" />登录
        </div>
        <div v-else></div>
      </template>
    </van-nav-bar>
    <!-- 商品详情渲染 -->
    <div class="goods" v-if="goodsDetile">
      <img
        class="goodsImg"
        :src="
          goodsDetile.img
            ? $imgUrl + goodsDetile.img
            : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2813350528,1657210790&fm=11&gp=0.jpg'
        "
        alt=""
      />
      <p class="goodsName">商品名称：{{ goodsDetile.goodsname }}</p>
      <p class="goodsName">价格：￥{{ goodsDetile.price }}</p>
      <p class="goodsName">
        <!-- 计步器 -->
        购买数量：<van-stepper v-model="value" />
      </p>
      <p>商品属性</p>
      <p>
        <span>{{ goodsDetile.specsname }}：</span>
        <van-tag v-for="item in specsAttr" :key="item" type="success">{{
          item
        }}</van-tag>
      </p>
      <div>
        <p>商品详情</p>
        <p v-html="goodsDetile.description"></p>
      </div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button
        @click="goCart(goodsDetile.id)"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { getGoodsDetile,cartAdd } from "../../utils/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsDetile: {},
      value: 1,
      specsAttr: [],
      userInfo: "",
    };
  },
  mounted() {
    //挂载，页面已加载就调用。
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
    this.getGoodsInfoDetile();
  },
  methods: {
    //去登陆
    toLogin() {
      this.$router.push("/login");
    },
    //添加到购物车。
    goCart(id) {
      // console.log(userInfo);
      if (this.userInfo == "") {
        alert("去登录");
      }
      // console.log(this.goodsDetile);
      cartAdd({
        uid:this.userInfo.uid,
        goodsid:this.goodsDetile.id,
        num:this.value
      })
      .then(res=>{
        // console.log(res,'添加购物车数据');
        if(res.data.code==200){
          this.$router.push('/cart');
        }
      });
    },
    //封装一个获取一个商品的方法。
    getGoodsInfoDetile() {
      getGoodsDetile({
        id: this.$route.query.id,
      }).then((res) => {
        // console.log(res,'一个商品数据。');
        if (res.data.code == 200) {
          this.goodsDetile = res.data.list[0];
          // console.log(this.goodsDetile);
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.login {
  color: rgb(107, 107, 250);
}
.goodsImg {
  width: 100%;
  height: 200px;
}
.goods p {
  font-size: 18px;
}
.van-stepper {
  display: inline;
}
</style>