<template>
  <div>
    <!-- 引入面包屑 -->
    <bread />
    <!-- 引入添加按钮 -->
    <el-button type="primary" size="small" plain @click="add">添加</el-button>
    <!-- 引入列表表格 -->
    <vtable @edit="edit" />
    <!-- 引入添加框 -->
    <vadd ref="refadd" @cancel="cancel" :addInfo="addInfo" />
  </div>
</template>

<script>
import bread from "../../components/el-bread";
import vtable from "./list";
import vadd from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isTrue: true,
      },
    };
  },
  components: {
    bread,
    vtable,
    vadd,
  },
  methods:{
    add(){
      this.addInfo.isShow=true;
      this.addInfo.isTrue=true;
    },
    cancel(e){
      this.addInfo.isShow=e;
    },
    edit(id){
      this.addInfo.isShow=true;
      this.addInfo.isTrue=false;
      this.$refs.refadd.look(id);
    }
  }
};
</script>

<style>
</style>