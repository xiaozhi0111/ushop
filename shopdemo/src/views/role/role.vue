<template>
  <div>
    <!-- <h3>我是角色管理</h3> -->
    <elbread />
    <!-- 添加一个按钮 -->
    <el-button @click="add" type="primary" size="small" plain>添加</el-button>
    <!-- 添加表格组件 -->
    <v-table @edit="edit" />
    <!-- 添加之后的页面渲染 -->
    <v-add ref='vadd' @cancel="cancel" :addInfo="addInfo" />
  </div>
</template>

<script>
import elbread from "../../components/el-bread";
import vTable from "./list";
import vAdd from "./add";
export default {
  data() {
    return {
      addInfo:{
        isShow:false,
        isTrue: true
      }
    };
  },
  components: {
    elbread,
    vTable,
    vAdd,
  },
  methods: {
    //添加方法
    add() {
      this.addInfo.isShow=true;
      this.addInfo.isTrue=false;
    },
    //取消方法。
    cancel(e){ 
      this.addInfo.isShow=e;
    },
    edit(e){
      // console.log(e);
      // console.log(this.$refs.vadd);
      this.addInfo.isShow=true;
      this.addInfo.isTrue=false;
      this.$refs.vadd.look(e);
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-bottom: 10px;
}
</style>