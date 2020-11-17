<template>
  <div>
    <!-- 面包屑 -->
    <elbread />
    <!-- 添加按钮 -->
    <el-button @click="isAdd" type="primary" size="small" plain>添加</el-button>
    <!-- 表格渲染 -->
    <vtable @edit="edit" />
    <!-- 弹框列表 -->
    <v-dialog ref="dialog" @cancel="cancel" :addInfo="addInfo" />
  </div>
</template>

<script>
//引入各个组件。
import elbread from "../../components/el-bread";
import vtable from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd:true,
      },
    };
  },
  components: {//组件
    elbread,
    vtable,
    vDialog,
  },
  methods: {
    //编辑方法。
    edit(e) {
      // console.log(e,'4444');
      this.addInfo.isShow=true;//控制页面出现。
      this.addInfo.isAdd=false;//控制页面中的添加，或者更新。
      // console.log(this.$refs.dialog);
      this.$refs.dialog.look(e);//利用ref属性，进行对子属性，方法的调用。
    },
    //添加事件的方法，
    isAdd() {
      this.addInfo.isShow = true;//控制页面出现。
      this.addInfo.isAdd=true;//控制页面中的添加，或者更新。
    },
    //取消方法，是子发射的之后触发的事件。
    cancel(e) {
      this.addInfo.isShow = e;//接收参数之后进行操作。
    },
  },
};
</script>

<style lang="stylus" scoped></style>