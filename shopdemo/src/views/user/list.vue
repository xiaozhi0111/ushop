<template>
  <div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="userSize"
      :total="userCount"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
// import {} from '../../util/axios';
import { mapGetters, mapActions } from "vuex";
//引入接口，进行调用。
import { getUserDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    //页面已加载就执行。
    this.getUserList(); //获取管理员列表。
    this.getUserCount();
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount: "user/getUserCount",
      userSize: "user/getUserSize",
    }),
  },
  methods: {
    ...mapActions({
      getUserList: "user/getUserListActions",
      getUserCount: "user/getUserCountActions",
      getUserPage: "user/getUserPageActions",
    }),
    //编辑方法。
    edit(uid) {
      this.$emit("edit", uid);
    },
    //修改页数方法。
    changePage(e) {
      // console.log(e, "页码");
      this.getUserPage(e);
    },
    //删除事件
    del(uid) {
      // console.log(uid,'uid吗');
      getUserDelete({ uid }).then((res) => {
        // console.log(res,'响应数据');
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserList(); //重新调取渲染页面数据。
          this.getUserCount(); //重新获取总的数据。
        }
      });
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