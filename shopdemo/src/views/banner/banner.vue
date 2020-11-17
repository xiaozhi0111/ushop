<template>
  <div>
    <!-- 引入面包屑 -->
    <vnav />
    <!-- 添加一个添加按钮 -->
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 引入列表表格 -->
    <vtable @edit="edit" />
    <!-- 引入添加 -->
    <vadd ref="refedit" :isInfo="isInfo" @cancel="cancel" />
  </div>
</template>

<script>
import vnav from "../../components/el-bread";
import vtable from './list';
import vadd from './add';
export default {
    data(){
        return {
            isInfo:{
                isShow:false,
                isTrue:true,
            }
        }
    },
  components: {
    vnav,vtable,vadd,
  },
  methods:{
      add(){
          this.isInfo.isShow=true;
          this.isInfo.isTrue=true;
      },
      cancel(e){
          this.isInfo.isShow=e;
      },
      edit(e){
          this.isInfo.isShow=true;
          this.isInfo.isTrue=false;
          this.$refs.refedit.look(e);
      }
  }
};
</script>

<style>
</style>