<template>
  <div>
      <!-- 引入面包屑 -->
      <bread />
      <!-- 引入一个添加按钮 -->
      <el-button type="primary" plain size="small" @click='add'>添加</el-button>
      <!-- 引入列表表格 -->
      <vtable @edit="edit" />
      <!-- 引入添加界面 -->
      <vadd ref="refadd" @cancel="cancel" :addInfo="addInfo" />
  </div>
</template>

<script>
import bread from '../../components/el-bread';
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
    components:{
        bread,vtable,vadd
    },
    methods:{
        //添加事件
        add(){
            this.addInfo.isShow=true;
            this.addInfo.isTrue=true;
        },
        cancel(e){
            this.addInfo.isShow=e;
        },
        //编辑事件。
        edit(id){
            // console.log(this.$refs.refadd);
            this.addInfo.isShow=true;
            this.addInfo.isTrue=false;
            this.$refs.refadd.look(id);
        }
    }
}
</script>

<style scoped>
.el-button{
    margin-bottom: 20px;
}
</style>