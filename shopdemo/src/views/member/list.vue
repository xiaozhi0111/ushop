<template>
  <div>
    <el-table :data="memberList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
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
            @click="edit(item.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
        data(){
            return {
                isShow:false,
            }
        }
    };
  },
  mounted() {
    //页面已加载就加载列表。
    this.getMemberList();
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListActions",
    }),
    edit(uid){
        // console.log(uid,'是我要的id吗');
        this.$emit('edit',uid);
    }
  },
};
</script>

<style>
</style>