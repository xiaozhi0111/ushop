<template>
  <div>
    <el-dialog
      :title="isInfo.isTrue ? '添加分类' : '编辑分类'"
      :visible.sync="isInfo.isShow"
      :before-close="cancel"
      width="30%"
      center
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="catename" label="分类名称">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
        <el-form-item>
          <el-button type="primary" @click="cancel">取 消</el-button>
          <el-button v-if="isInfo.isTrue" type="primary" @click="add"
            >添 加</el-button
          >
          <el-button v-else type="primary" @click="update">编 辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["isInfo"],
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      cateListActions: "cate/getCateListActions",
    }),
    //重置数据。
    reset() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.fileList=[]
    },
    //取消事件。
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {},

    //onChange 当图片上传时触发的文件
    onChange(file) {
      //   console.log(file, "wenjian");
      this.imgUrl = file.raw;
    },
    //文件上传限制
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //添加事件
    add() {
      //   console.log(this.form);
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      //添加img参数。
      file.append("img", this.imgUrl);
      // console.log(file.get('catename'));//需要通过get来取数据。
      //调取添加接口。
      getCateAdd(file).then((res) => {
        // console.log(res, "成功响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel(); //关闭弹出框。
          this.cateListActions(); //重新获取列表数据
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getCateInfo({ id }).then((res) => {
        // console.log(res,'响应成功');
        if (res.data.code == 200) {
          this.form = res.data.list;
          //当前表单没有id 创建一个id，给确定提交用
          this.form.id = id;
          //因为图片格式不对，对图片格式进行转换之后使用。
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    update() {
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      //如果你新传了图片 this.imgUrl就有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
      this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
      file.append("img", this.imgUrl);
      getCateEdit(file).then((res) => {
        console.log(res, "修改响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹框
          this.cancel();
          //重新获取列表
          this.cateListActions();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>