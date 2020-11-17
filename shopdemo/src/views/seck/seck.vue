<template>
  <div>
    <!-- 引入面包屑 -->
    <elbread />
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" plain @click="add">添加</el-button>
    <!-- 列表表格视图 -->
    <vtable @edit="edit" />
    <!-- 添加框 -->
    <vadd ref="refedit" @cancel="cancel" :addInfo="addInfo" />
  </div>
</template>

<script>
import elbread from "../../components/el-bread";
import vtable from './list';
import vadd from './add';
export default {
    data(){
        return {
            addInfo:{
                isShow:false,
                isTrue:true,
            }
        }
    },
  components: {
    elbread,vtable,vadd,
  },
  methods:{
      //按钮事件
      add(){
          this.addInfo.isShow=true;
          this.addInfo.isTrue=true;
      },
      //取消事件/
      cancel(e){
          this.addInfo.isShow=e;
      },
      //编辑事件。
      edit(id){
          this.addInfo.isShow=true;
          this.addInfo.isTrue=false;
          this.$refs.refedit.look(id);
      }
  }
};
</script>

<style>
</style>