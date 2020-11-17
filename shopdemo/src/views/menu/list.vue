<template>
  <div>
    <!--     el-table 属性
    default-expand-all	是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    tree-props	渲染嵌套数据的配置选项
    row-key	行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。 -->
    <el-table
      :data="menuList"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编辑" width="90"> </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="90">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助函数。
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口。
import {getMenuDelete} from '../../util/axios'
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMenuList();
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //编辑事件
    edit(id){
      // console.log('gogeo');
      this.$emit('edit',id);
    },
    //删除事件。
    del(id) {
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getMenuDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getMenuList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>