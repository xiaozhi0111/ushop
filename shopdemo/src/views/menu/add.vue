<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
      before-close 属性	关闭前的回调，会暂停 Dialog 的关闭
      opened	Dialog 打开动画结束时的回调
      close	Dialog 关闭的回调
      closed	Dialog 关闭动画结束时的回调
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <!-- <el-input v-model="form.icon" autocomplete="off"></el-input> -->
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.path"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="add('form')" type="primary" v-if="addInfo.isAdd"
          >添加</el-button
        >
        <el-button @click="update('form')" type="primary" v-else>确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口。
import { getMenuAdd, getMenuInfo, getMenuEdit } from "../../util/axios";
//引入封装好的二级路由。在这里是一个被导出的对象，在这里遍历渲染。
import { indexRoutes } from "../../router";
//引入辅助性函数。
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],//接收数据的props属性。
  data() {
    return {
      form: {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      //规则校验的数据。
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      formLabelWidth: "120px",//宽度。
      indexRoutes: indexRoutes,//引入的二级路由对象数据，
      iconList: [//图标的列表
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
    };
  },
  computed: {//计算属性
    ...mapGetters({
      menuList: "menu/getMenuList",//解析axios封装好的模块中的数据，供页面进行渲染。
    }),
  },
  methods: {
    //重置函数，清空页面的数据。进行下次输入。
    reset() {
      this.form = {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",//解析axios封装好的引过来的数据、、在这解析出来的是方法，一般在页面加载之后都执行触发，
    }),
    //封装look方法，根据传过来的id获取一条数据，
    look(id) {
      //调取getMenuInfo接口，获取一条数据，
      getMenuInfo({ id }).then((res) => {
        // console.log(res,'响应成功');
        if (res.data.code == 200) {
          //将获取的数据进行页面的渲染。
          this.form = res.data.list;
          //给要更新的数据附一个变量id
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //取消点击事件。
    cancel() {
      //利用$emit发射一个自定义事件，传值进行修改。
      this.$emit("cancel", false);
      this.reset();//调用重置方法。清空页面数据。
    },
    //添加，更新数据
    update(formName) {
      // console.log('成功');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          //调取接口，
          getMenuEdit(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                this.cancel();
                this.getMenuList();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err, "错误响应");
            });
        } else {
          console("error submit");
          return false;
        }
      });
    },

    //添加事件函数。
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          //调取接口
          getMenuAdd(this.form)
            .then((res) => {
              //   console.log(res, "响应成功");
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            })
            .catch((err) => {
              console.log(err, "响应错误");
            });
        } else {
          console("error submit");
          return false;
        }
      });
    },
    //封装函数，实现添加页面中的联动，一个选择，下边跟着发生改变。
    changeMenu() {
      // console.log(this.form.pid,'联动');
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
};
</script>

<style lang="stylus" scoped></style>