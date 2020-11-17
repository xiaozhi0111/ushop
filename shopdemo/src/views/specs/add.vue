<template>
  <div>
    <el-dialog
      :title="addInfo.isTrue ? '添加商品规格' : '修改商品规格'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="规格名称"
          prop="specsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inputW"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" type="primary" @click="addAttr"
            >新增规格属性</el-button
          >
          <el-button v-else type="danger" @click="delAttr(index)"
            >删除</el-button
          >
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
import { mapActions } from "vuex";
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      formLabelWidth: "80px",
      //定义一个规格属性数组
      arrAttr: [
        {
          value: "",
        },
      ],
      //表单对象
      form: {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {
    //调取行动。
    ...mapActions({
      getSpecsList: "specs/getSpecsListActions",
      getSpecsCount: "specs/getSpecsCountActions",
    }),
    //添加规格属性表格。
    addAttr() {
      if (this.arrAttr.length < 5) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.error("不能再添加了");
      }
    },
    //删除规格属性表格。
    delAttr(e) {
      // console.log(e,'索引');
      this.arrAttr.splice(e, 1);
    },
    //重置方法。
    reset() {
      this.form = {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      };
      // console.log(this.form);
      this.arrAttr = [{ value: "" }];
    },
    //取消方法，
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    add() {
      //表单中的attrs获取不到数据，所以讲arrAttr中的数据转化之后存在attrs中。
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      // console.log(this.form);
      getSpecsAdd(this.form).then((res) => {
        // console.log(res,'响应');
        // console.log(this.form,'响应');
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口。
          this.getSpecsList(); //页面的渲染。
          this.getSpecsCount(); //获取总数，更新页数。
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //上级调用的方法。
    look(id) {
      // console.log(id, "是id吗");
      // 调取获取一条信息的接口。
      getSpecsInfo({ id }).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          //对拿到的数据进行修改之后页面的渲染。
          let data = res.data.list[0];
          // console.log(data);
          this.form = data;
          data.attrs.map((item, index) => {
            if (index == 0) {
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item,
              });
            }
          });
        }
      });
    },
    update() {
      //调取接口。实现更新数据的操作。
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      getSpecsEdit(this.form).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          // console.log(res);
          this.$message.success(res.data.msg); //成功提示信息。
          this.getSpecsList(); //重新获取一下数据
          this.getSpecsCount();
          this.cancel(); //调取关闭页面方法。
        } else {
          // this.$message.error(res.data.msg); //失败提示信息
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.inputW {
  width: 70%;
}
</style>