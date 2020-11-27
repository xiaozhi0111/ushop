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
    <!-- 列表数据部分 -->
    <div class="outer">
      <!-- 左边的选择栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in cateList"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <!-- 右边的数据显示部分。 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item
          :to="'/list?id=' + item.id"
          v-for="item in cateChildren"
          :key="item.id"
        >
          <van-image
            :src="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/apple-1.jpg'
            "
          />
          <span class="title">{{ item.catename }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCateTree } from "../../utils/axios";
export default {
  data() {
    return {
      activeKey: 0,
      cateList: [],
      cateChildren: [],
    };
  },
  mounted() {
    this.getCateData();
  },
  methods: {
    //封装一个获取分类数据方法。
    getCateData() {
      getCateTree().then((res) => {
        // console.log(res, "分类数据");
        if (res.data.code == 200) {
          this.cateList = res.data.list;
          this.cateChildren = res.data.list[this.activeKey].children;
        }
      });
    },
    //单机切换分类信息。
    onChange() {
      // console.log("aaa");
      this.cateChildren=this.cateList[this.activeKey].children;
    },
  },
};
</script>

<style lang="" scoped>
.outer{
display: flex;
}
.van-grid{
    flex:1
}
.title{
    font-size: 14px;
}
</style>