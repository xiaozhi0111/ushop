<template>
  <div>
    <el-dialog
      title="编辑会员"
      :visible.sync="isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="ruleForm" ref="rules" :rules="rules" label-width="100px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="name">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
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
        <el-button @click="update(form)" type="primary">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMemberInfo, getMemberEdit } from "../../util/axios";
export default {
  props: ["isShow"],
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
      ruleForm: {},
      passwordData: "",
      rules: {
        phone: [
          { required: true, message: "请输入电话号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      memberListActions: "member/getMemberListActions",
    }),
    reset() {
      this.form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
      this.$refs['rules'].resstFields();
    },
    cancel() {
      this.$emit("cancel", false);
    },
    look(uid) {
      getMemberInfo({ uid }).then((res) => {
        //   console.log(res,'成功数据');
        if ((res.data.code = 200)) {
          this.form = res.data.list;
          this.form.uid = uid;
          this.passwordData = this.form.password;
        }
      });
    },
    update(form) {
      console.log(this.form, "是我要的id吗");
      if (this.form.password == "") {
        this.form.password = this.passwordData;
      }
      getMemberEdit(form).then((res) => {
        // console.log(res, "成功数据");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.memberListActions();
          this.cancel();
        }
      });
    },
  },
};
</script>

<style>
</style>