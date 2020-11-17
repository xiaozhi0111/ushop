<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色标号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="状态">
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
            <el-button size="small" type="info" plain @click="edit(item.row.id)">编辑</el-button>
            <el-button size="small" @click="del(item.row.id)" type="danger" plain>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {getRoleDelete} from '../../util/axios';
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log('555');
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListActions",
    }),
    del(id){
      getRoleDelete({id})
      .then(res=>{
        // console.log(res,'响应');
        // console.log(id);
        if(res.data.code==200){
          this.$message.success(res.data.msg);
          this.getRoleListAction();
        }else{
          this.$message.error(res.data.msg);
        }
      });

    },
    edit(id){
        this.$emit('edit',id);
    }
  },
};
</script>

<style lang="stylus" scoped></style>