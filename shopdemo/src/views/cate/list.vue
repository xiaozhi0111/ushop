<template>
  <div>
    <el-table
      :data="cateList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button
            type="primary"
            plain
            size="small"
            @click="edit(item.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" plain size="small" @click="del(item.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCateDelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    //页面加载触发事件
    this.cateListActions();
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
    edit(id) {
      this.$emit("edit", id);
    },
    //删除事件。
    del(id) {
      getCateDelete({id})
      .then(res=>{
          console.log(res,'响应成功');
        if(res.data.code==200){
            this.$message.success(res.data.msg);
            this.cateListActions();//重新获取列表。
        }
      })
    },
  },
};
</script>

<style scoped>
.img {
  width: 80px;
}
</style>