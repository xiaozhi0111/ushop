<template>
  <div>
    <div class="shop">
      <!-- 导航栏 -->
      <van-nav-bar
        @click-left="$router.back()"
        :title="$route.meta.name"
        left-text="返回"
        left-arrow
      >
      </van-nav-bar>
      <div class="shopping">
        <div
          class="shopping_list"
          v-show="cartData.length > 0"
          v-for="item in cartData"
          :key="item.id"
        >
          <div class="shopping_list_img1 img111">
            <input type="checkbox" @change="onecheck" v-model="item.checked" />
          </div>
          <van-swipe-cell>
            <van-card
              :price="item.price"
              :title="item.goodsname"
              class="goods-card"
              :thumb="
                item.img
                  ? $imgUrl + item.img
                  : 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=37258251,3415933327&fm=111&gp=0.jpg'
              "
            >
            </van-card>
            <!-- 添加数量的增加没能实现 -->
            <!-- <template #center class="shopping_list_num">
              <div class="shopping_list_num1" @click="sub(item.id)">-</div>
              <div class="shopping_list_num2">{{ item.num }}</div>
              <div class="shopping_list_num3" @click="add(item.id)">+</div>
            </template> -->
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </div>
        <div class="empty" v-show="cartData.length < 1">
          购物车空空如也，赶紧去加购物车吧！
        </div>
      </div>
      <div class="jieguo">
        <div class="jieguo1">
          <div class="jieguo1_circle">
            <input type="checkbox" @change="allcheck" v-model="checkAll" />
          </div>
          <div class="jieguo1_text">全选</div>
        </div>
        <div class="jieguo2">
          <div class="jieguo2_text1">
            总计：<span>{{ allprice }}元</span>
          </div>
          <div class="jieguo2_text2">不含运费，以优惠&yen;0.00</div>
        </div>
        <router-link to="/enter">
          <div class="jieguo3">去结算（2件）</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { cartList } from "../../utils/axios";
export default {
  data() {
    return {
      checkAll: false,
      manageflag: false,
      delflag: false,
      userInfo: "",
      cartData: [],
    };
  },
  computed: {
    //计算属性
    //计算总金额。
    allprice() {
      let sum = 0;
      this.cartData.map((item) => {
        if (item.checked == true) {
          sum += item.num * item.price;
        }
      });
      return sum;
    },
  },
  mounted() {
    //页面加载，触发函数。
    // console.log(JSON.parse(sessionStorage.getItem("userInfo")));
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : [];
    if (this.userInfo == "") {
      alert("去登录");
    }
    this.getcartData();
  },
  methods: {
    //封装一个方法获取购物车列表。
    getcartData() {
      // console.log(this.userInfo);
      cartList({
        uid: this.userInfo.uid,
      }).then((res) => {
        console.log(res, "购物车数据");
        if (res.data.code == 200) {
          this.cartData = res.data.list;
        }
      });
    },
    //删除购物车。
    del(index) {
      index--;
      this.cartData.splice(index, 1);
    },
    //全选控制单选。
    allcheck() {
      // console.log(this.checkAll);
      this.cartData.map((item) => {
        // console.log(this.checkAll);
        return (item.checked = this.checkAll);
      });
    },
    //单选控制多选
    onecheck() {
      this.checkAll = this.cartData.every((item) => item.checked);
    },
    //增加数量函数
    add(i) {
      // console.log(this.cartData);
      i--;
      this.cartData[i].num++;
    },
    //减少数量。
    sub(i) {
      // console.log(this.cartData);
      i--;
      if (this.cartData[i].num <= 1) {
        alert("想买的东西数量不能少于1哦！");
      } else {
        this.cartData[i].num--;
      }
    },
  },
};
</script>

<style scoped>
.van-swipe-cell {
  width: 100%;
}
.van-card__content {
  width: 100px;
  /* color: red; */
}
.goods-card {
  margin: 0;
  /* background-color: gray; */
}

.delete-button {
  height: 100%;
}
.shop {
  width: 7.5rem;
  background-color: white;
  margin: 0 auto;
}
.shop .header {
  width: 7.5rem;
  height: 0.7rem;
  background-color: #f26b11;
  padding-top: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.shop .header .header_img {
  margin-top: 0.1rem;
}
.shop .header .iconfont {
  color: #fff;
  margin-left: 0.1rem;
  font-size: 0.4rem;
}
.shop .header .header_text {
  font-size: 0.3rem;
  color: white;
  margin-left: 1.2rem;
  margin-top: 0.15rem;
}
.shop .header .header_circle {
  height: 0.5rem;
  margin-left: 0.8rem;
  display: flex;
  margin-right: 0.3rem;
  margin-top: 0.1rem;
}
.shop .header .header_circle .header_circle1 {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  background-color: white;
  margin-right: 0.1rem;
  margin-top: 0.2rem;
}
.shop .shopping {
  width: 7.5rem;
  margin-top: 0.4rem;
  margin-bottom: 2.5rem;
}
.shop .empty {
  width: 7.5rem;
  height: 9.3rem;
  background: #ddd;
  font-size: 20px;
  line-height: 5rem;
  text-align: center;
  color: red;
}
.shop .shopping .manage {
  width: 7.2;
  height: 0.6rem;
  font-size: 16px;
  /* background: red; */
  text-align: right;
  padding-right: 0.3rem;
}
.shop .shopping .shopping_list {
  width: 7.2rem;
  height: 1.9rem;
  padding-left: 0.3rem;
  margin-bottom: 0.4rem;
  box-shadow: 0 0 0.1rem #ddd;
  display: flex;
}
.shop .shopping .shopping_list .shopping_list_img1 {
  width: 0.3rem;
  height: 0.3rem;
  /* border-radius: 0.15rem; */
  /* border: 0.03rem solid orangered; */
  margin-top: 0.6rem;
}
/* .shop .shopping .shopping_list .img111 {
  background-image: url(../../assets/images/shoping_car_images/select.jpg);
  background-size: 0.17rem 0.13rem;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
} */
.shop .shopping .shopping_list .shopping_list_img2 {
  margin-left: 0.4rem;
  margin-top: 0.4rem;
}
.shop .shopping .shopping_list .shopping_list_img2 img {
  width: 1.02rem;
  height: 0.82rem;
}
.shop .shopping .shopping_list .shopping_list_text {
  margin-left: 0.3rem;
  margin-top: 0.2rem;
}
.shop .shopping .shopping_list .shopping_list_text .shopping_list_text1 {
  font-size: 0.3rem;
  color: #333;
}
.shop .shopping .shopping_list .shopping_list_text .shopping_list_text2 {
  font-size: 0.25rem;
  color: #b7b7b7;
  margin-top: 0.2rem;
}
.shop .shopping .shopping_list .shopping_list_text .shopping_list_text3 {
  font-size: 0.3rem;
  color: #e7383d;
  margin-top: 0.2rem;
}
.shop .shopping .shopping_list .shopping_list_num {
  width: 2rem;
  height: 0.6rem;
  margin-left: 0.7rem;
  margin-top: 0.9rem;
  border: 1px solid black;
  border-radius: 0.05rem;
  display: flex;
}
.shop .shopping .shopping_list .shopping_list_num .shopping_list_num1 {
  border-right: 1px solid black;
  font-size: 0.3rem;
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
}
.shop .shopping .shopping_list .shopping_list_num .shopping_list_num2 {
  border-right: 1px solid black;
  font-size: 0.3rem;
  width: 0.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
}
.shop .shopping .shopping_list .shopping_list_num .shopping_list_num3 {
  font-size: 0.3rem;
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
}
.shop .shopping .shopping_list .del {
  padding-left: 0rem;
  width: 0.5rem;
  height: 1.63rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.3rem;
  background: #e43a3d;
  padding-left: 0.15rem;
  padding-right: 0.15rem;
  margin-left: 0.1rem;
}
.shop .jieguo {
  background-color: white;
  position: fixed;
  bottom: 1.13rem;
  width: 7.5rem;
  height: 1.12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.shop .jieguo .jieguo1 {
  margin-left: 0.3rem;
  display: flex;
}
.shop .jieguo .jieguo1 .jieguo1_circle {
  width: 0.3rem;
  height: 0.3rem;
  /* border: 1px solid orangered; */
  border-radius: 50%;
  /* background-image: url(../../assets/images/shoping_car_images/select.jpg); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0.17rem, 0.13rem;
}
.shop .jieguo .jieguo1 .jieguo1_text {
  margin-left: 0.2rem;
}
.shop .jieguo .jieguo2 {
  text-align: right;
}
.shop .jieguo .jieguo2 .jieguo2_text1 {
  margin-left: 0rem;
}
.shop .jieguo .jieguo2 .jieguo2_text1 span {
  color: red;
}
.shop .jieguo .jieguo2 .jieguo2_text2 {
  margin-top: 0.2rem;
  color: #989898;
}
.shop .jieguo .jieguo3 {
  width: 2.4rem;
  height: 1.12rem;
  line-height: 1.12rem;
  text-align: center;
  font-size: 0.3rem;
  color: white;
  background-color: orangered;
}
</style>