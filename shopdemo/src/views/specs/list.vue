<template>
  <div>
    <el-table :data="specsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="item">
          <div>
            <el-tag
              v-for="attrName in item.row.attrs"
              :key="attrName"
              type="info"
              >{{ attrName }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="specsSize"
      :total="specsCount"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
// import {} from '../../util/axios';
import { mapGetters, mapActions } from "vuex";
//引入接口，进行调用。
import { getSpecsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    //页面已加载就执行。
    this.getSpecsList(); //获取管理员列表。
    this.getSpecsCount();
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount: "specs/getSpecsCount",
      specsSize: "specs/getSpecsSize",
    }),
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListActions",
      getSpecsCount: "specs/getSpecsCountActions",
      getSpecsPage: "specs/getSpecsPageActions",
    }),
    //编辑方法。
    edit(id) {
      // console.log(id, "是id吗");
      this.$emit("edit", id);
    },
    //修改页数方法。
    changePage(e) {
      // console.log(e, "页码");
      this.getSpecsPage(e);
    },
    //删除事件
    del(id) {
      // console.log({id}, "id吗");
      getSpecsDelete({id}).then(res=>{
        if(res.data.code==200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getSpecsCount();
        }
      }).catch(err=>{
        console.log(err,'错误');
      });
      // getSpecsDelete({ id }).then((res) => {
      //   console.log(res, "响应数据");
      //   if (res.data.code == 200) {
      //     console.log(res, "数据删除成功");
      //     this.$message.success(res.data.msg);
      //     this.getSpecsList(); //重新调取渲染页面数据。
      //     this.getSpecsCount(); //重新获取总的数据。
      //   }
      // });
    },
  },
};
</script>

<style scoped>
.el-pagination {
  float: right;
  margin: 20px 30px 0 0;
}
</style>