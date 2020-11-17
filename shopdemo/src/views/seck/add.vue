<template>
  <div>
    <el-dialog
      :title="addInfo.isTrue ? '添加活动' : '修改活动'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      width="45%"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="活动名称"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="getDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="一级分类"
          prop="first_cateid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            @change="changeCate(false)"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          prop="second_cateid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.second_cateid"
            @change="changeGoods(false)"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in secondDate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" prop="goodsid" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsDate"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
import {
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
  getGoodsList,
} from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      formLabelWidth: "100px",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      getDate: [],
      secondDate: "",
      goodsDate: "",
      rules: {
        rolename: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.getCateList();
    }
  },
  computed: {
    //获取菜单列表
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    //调取行动。
    ...mapActions({
      getCateList: "cate/getCateListActions",
      getSeckListActions: "seck/getSeckListActions",
    }),
    changeCate(n) {
      let index = this.cateList.findIndex((item) => {
        return this.form.first_cateid == item.id;
      });
      this.secondDate = this.cateList[index].children;
      // console.log(this.secondDate);
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    changeGoods(n) {
      // let index=this.cateList.findIndex(item=>{
      //   return this.form.second_cateid==item.id;
      // });
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        // console.log(res,'成功数据');
        if (res.data.code == 200) {
          this.goodsDate = res.data.list;
        }
      });
      if (!n) {
        this.form.goodsid = "";
      }
    },
    //重置方法。
    reset() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.getDate = [];
    },
    //取消方法，
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    add() {
      //   console.log(this.getDate);
      this.form.begintime = this.getDate[0].getTime();
      this.form.endtime = this.getDate[1].getTime();

      // console.log(this.form);

      getSeckAdd(this.form).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口。
          this.getSeckListActions();
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
      getSeckInfo({ id }).then((res) => {
        console.log(res, "响应");
        //成功之后的处理。
        if (res.data.code == 200) {
          this.form = res.data.list; //将拿到的数据渲染在更改的页面上。
          this.getDate = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          this.form.id = id;
          //清空之前的数据双向绑定。
          this.changeCate(true);
          this.changeGoods(true);
        }
      });
    },
    //编辑更新事件。
    update() {
      //调取接口。实现更新数据的操作。
      getSeckEdit(this.form).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg); //成功提示信息。
          this.getSeckListActions(); //重新获取一下数据
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