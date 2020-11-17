<template>
  <div>
    <!-- 商品分类 -->
    <!-- 引入面包屑 -->
    <vnav />
    <!-- 添加一个添加按钮 -->
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 引入表格表单 -->
    <vtable @edit="edit" />
    <!-- 引入添加页面渲染 -->
    <vadd ref="refadd" @cancel='cancel' :isInfo="isInfo" />
  </div>
</template>

<script>
import vnav from "../../components/el-bread";
import vtable from "./list";
import vadd from "./add";
export default {
  data() {
    return {
      isInfo: {
        isShow: false,
        isTrue: true,
      },
    };
  },
  components: {
    vnav,
    vtable,
    vadd,
  },
  methods:{
      //点击按钮出现添加框事件。
      add(){
          this.isInfo.isShow=true;
          this.isInfo.isTrue=true;
      },
      //取消事件
      cancel(e){
          this.isInfo.isShow=e;
      },
      //编辑事件。
      edit(e){
        //   console.log(e,'id吗');
          this.isInfo.isShow=true;
          this.isInfo.isTrue=false;

          this.$refs.refadd.look(e);
      }
  }
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>