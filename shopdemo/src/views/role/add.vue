<template>
  <div>
    <el-dialog
      :title="addInfo.isTrue ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      width="30%"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="角色名称"
          prop="rolename"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isTrue" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update" type="primary">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      formLabelWidth: "80px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.getMenuList();
    }
  },
  computed: {
    //获取菜单列表
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    //调取行动。
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleListActions",
    }),
    //重置方法。
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      //清空tree结构框。
      this.$refs.tree.setCheckedKeys([]);
    },
    //取消方法，
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    add() {
      //转化menu的数据类型
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      //   console.log(this.form);
      getRoleAdd(this.form).then((res) => {
        // console.log(res,'响应');
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口。
          this.getRoleList();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //上级调用的方法。
    look(id) {
      //调取获取一条信息的接口。
      getRoleInfo({ id }).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          this.form = res.data.list; //将拿到的数据渲染在更改的页面上。
          // console.log(this.form.menus.split(','));

          this.form.menus = this.$refs.tree.setCheckedKeys(
           this.form.menus.split(',')
          );
          this.form.id = id;
        }
      });
    },
    update() {
      //转化menu的数据类型
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      //调取接口。实现更新数据的操作。
      getRoleEdit(this.form).then((res) => {
        //   console.log(res,'响应');
        if (res.data.code == 200) {
          this.$message.success(res.data.msg); //成功提示信息。
          this.getRoleList(); //重新获取一下数据
          this.cancel(); //调取关闭页面方法。
        } else {
          this.$message.error(res.data.msg); //失败提示信息
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>