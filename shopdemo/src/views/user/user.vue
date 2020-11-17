<template>
  <div>
    <!-- 引用面包屑组件。 -->
    <elbread />
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add" plain size="small">添加</el-button>
    <!-- 引入列表表格 -->
    <v-table @edit="edit" />
    <!-- 引入添加页面 -->
    <v-add ref="vadd" @cancel="cancel" :addInfo='addInfo' />
  </div>
</template>

<script>
import elbread from "../../components/el-bread";
import vTable from './list';
import vAdd from './add';
export default {
  data(){
    return {
      addInfo:{
        isShow:false,
        isTrue: true,
      }
    }
  },
  components: {
    elbread,vTable,vAdd,
  },
  methods:{
    add(){
      this.addInfo.isShow=true;
      this.addInfo.isTrue=true;
    },
    cancel(e){
      this.addInfo.isShow=e;
    },
    edit(e){
      this.addInfo.isShow=true;
      this.addInfo.isTrue=false;
      // console.log(e,'id数据');
      this.$refs.vadd.look(e);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-button
  margin-bottom 10px
</style>