<template>
  <div>
    <!-- <h3>列表页</h3> -->
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 商品列表显示 -->
    <van-card
      @click="goDetail(item.id)"
      v-for="item in goodsList"
      :key="item.id"
      :price="item.price"
      :title="item.goodsname"
      :thumb="
        item.img ? $imgUrl + item.img : 'https://img.yzcdn.cn/vant/ipad.jpeg'
      "
    />
  </div>
</template>

<script>
import { getGoods } from "../../utils/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsList: "",
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    //封装一个获取商品列表数据的方法
    getGoodsList() {
      getGoods({
        fid: this.$route.query.id,
      }).then((res) => {
        // console.log(res, "一类商品数据");
        if (res.data.code == 200) {
          this.goodsList = res.data.list;
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    goDetail(id){
        this.$router.push({
            path:'/detail',
            query:{
                id,
            }
        });
    }
  },
};
</script>

<style lang="" scoped>
</style>