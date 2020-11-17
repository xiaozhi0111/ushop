<template>
  <div>
    <el-dialog
      :title="addInfo.isTrue ? '添加管理员' : '修改管理员'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      width="30%"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="所属角色"
          prop="roleid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import {getUserList,getUserAdd,getUserInfo,getUserEdit} from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      formLabelWidth: "80px",
      form: {
        roleid: "",//角色编号
        username: "",//管理员名称
        password: "",//密码
        status: 1,//状态1正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        roleid:[
          {required:true,message:'请选择',trigger:'blur'},
        ]
      },
    };
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.getRoleList();
      this.getUserList();
    }
  },
  computed: {
    //获取角色列表
    ...mapGetters({
      roleList: "role/getRoleList",
      userList:'user/getUserList',
    }),
  },
  methods: {
    //调取行动。
    ...mapActions({
      getRoleList: "role/getRoleListActions",
      getUserList:'user/getUserListActions',
      getUserCount:'user/getUserCountActions',
    }),
    //重置方法。
    reset() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //取消方法，
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    add() {
      //console.log(this.form);
      getUserAdd(this.form).then((res) => {
        // console.log(res,'响应');
        // console.log(this.form,'响应');
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口。
          this.getUserList();//页面的渲染。
          this.getUserCount();//获取总数，更新页数。
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //上级调用的方法。
    look(uid) {
      // console.log(uid,'是id吗');
      // 调取获取一条信息的接口。
      getUserInfo({ uid }).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          this.form = res.data.list; //将拿到的数据渲染在更改的页面上。
          this.form.uid = uid;
        }
      });
    },
    update() {
      //调取接口。实现更新数据的操作。
      getUserEdit(this.form).then((res) => {
        //   console.log(res,'响应');
        if (res.data.code == 200) {
          this.$message.success(res.data.msg); //成功提示信息。
          this.getUserList(); //重新获取一下数据
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