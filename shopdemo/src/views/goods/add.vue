<template>
  <div>
    <el-dialog
      :title="addInfo.isTrue ? '添加商品' : '修改商品'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      width="45%"
      center
      @opened="createEditor"
    >
      <el-form :model="form" ref="rules" :rules="rules">
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
          <el-select v-model="form.second_cateid" placeholder="请选择分类">
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="商品名称"
          prop="goodsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          prop="market_price"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
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
        <el-form-item
          label="商品规格"
          prop="specsid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.specsid"
            @change="changeSpecs(false)"
            placeholder="请选择商品规格"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          prop="specsattr"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.specsattr"
            multiple
            placeholder="请选择规格属性"
          >
            <el-option
              v-for="item in attrArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" v-model="form.description" :label-width="formLabelWidth">
          <div id="editor"></div>
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
//引入富文本编辑器
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      editor: null, //定义一个编辑器容量。
      formLabelWidth: "100px",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 2,
        description: "",
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      secondArr: [], //商品分类二级数据存放。
      attrArr: [], //规格属性值的存放
      rules: {
        goodsname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    if (this.goodsList.length == 0) {
      this.getCateListActions(); //获取分类属性列表。
      this.getSpecsListActions(); //获取规格属性列表
      this.getGoodsListActions();
    }
  },
  computed: {
    //获取列表数据
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      cateList: "cate/getCateList", //商品分类数据
      specsList: "specs/getSpecsList", //规格属性数据。
    }),
  },
  methods: {
    //调取行动。
    ...mapActions({
      getCateListActions: "cate/getCateListActions", //商品分类列表
      getSpecsListActions: "specs/getSpecsListActions", //规格属性列表
      getGoodsListActions: "goods/getGoodsListActions",
      getGoodsCount:'goods/getGoodsCountActions',
    }),
    createEditor() {
      // console.log('创建了吗');
      //实例化富文本
      this.editor = new E("#editor");
      //调用富文本编辑器，create方法
      this.editor.create();
      //设置内容，设置表单描述信息参数。
      this.editor.txt.html(this.form.description);
    },
    //商品分类的级联控制事件。
    changeCate(n) {
      let index = this.cateList.findIndex((item) => {
        return this.form.first_cateid == item.id;
      });
      this.secondArr = this.cateList[index].children;
      if (!n) {
        this.form.second_cateid = "";
      }
    },
    //规格属性的级联控制事件。
    changeSpecs(n) {
      let index = this.specsList.findIndex((item) => {
        return this.form.specsid == item.id;
      });
      this.attrArr = this.specsList[index].attrs;
      if (!n) {
        this.form.specsattr = [];
      }
    },
    //图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {
      this.imgUrl = [];
    },
    //onChange 当图片上传时触发的文件
    onChange(file) {
      //console.log(file, "wenjian");
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
    //重置方法。
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price:0,
        market_price: 0,
        img: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 2,
        description: "",
      };
      this.fileList = [];//清空图片预览。
      this.attrArr = [];//清空规格数据。
      this.secondArr = [];//  清楚二级数据。
      this.$refs['rules'].resetFields();//重置的时候清空掉规则验证。
    },
    //取消方法，
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    add() {
      // console.log(this.form);
      //对form表格信息进行FormData转换处理。
      this.form.description=this.editor.txt.html();
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      file.append("img", this.imgUrl); //将预览的图片存在提交的数据中。
      getGoodsAdd(file).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口。
          this.getGoodsListActions();
          this.getGoodsCount();
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
      getGoodsInfo({ id }).then((res) => {
        // console.log(res, "响应");
        //成功之后的处理。
        if (res.data.code == 200) {
          this.form = res.data.list; //将拿到的数据渲染在更改的页面上。
          this.form.id = id;
          //对获取的照片进行处理显示。进行操作。
          this.fileList = this.form.img
            ? [{ url: this.$imgUrl + this.form.img }]
            : [];
          //对获取的规格属性值进行处理编辑。
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          //重新调取change事件
          this.changeCate(true);
          //防止 规格属性概率问题
          this.changeSpecs(true);
        }
      });
    },
    update() {
      //更新之前对数据进行处理之后操作。
      this.form.img=this.imgUrl?this.imgUrl:this.form.img;
      this.form.description=this.editor.txt.html();
      let data=this.form;
      let file=new FormData();
      for(let i in data){
        file.append(i,data[i]);
      }
      //调取接口。实现更新数据的操作。
      getGoodsEdit(file).then((res) => {
        // console.log(res, "响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg); //成功提示信息。
          this.getGoodsListActions(); //重新获取一下数据
          this.getGoodsCount();
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