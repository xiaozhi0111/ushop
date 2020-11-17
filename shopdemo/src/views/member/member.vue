<template>
  <div>
      <!-- 引入面包屑 -->
    <bread />
    <!-- 引入列表表格 -->
    <vtable @edit="edit" />
    <vedit ref="refedit" @cancel="cancel" :isShow="isShow" />
  </div>
</template>

<script>
import bread from '../../components/el-bread';
import vtable from './list';
import vedit from './edit';
export default {    
    data(){
        return {
            isShow:false,
        }
    },
    components:{
        bread,vtable,vedit,
    },
    methods:{
        edit(e){
            this.isShow=true;
            this.$refs.refedit.look(e);
        },
        cancel(e){
            this.isShow=e;
        }
    }
}
</script>

<style>

</style>