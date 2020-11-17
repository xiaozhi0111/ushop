<template>
  <div>
    <el-table
      :data="bannerList"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="轮播图主题" width="180">
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
import { mapGetters, mapActions } from "vuex";
import {getBannerDelete} from '../../util/axios';
export default {
  data() {
    return {};
  },
  mounted() {
    this.getBannerListActions();
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerList",
    }),
  },
  methods: {
    ...mapActions({
      getBannerListActions: "banner/getBannerListActions",
    }),
    edit(id){
        // console.log(id,'是我要的id吗');
        this.$emit('edit',id);
    },
    del(id){
        // console.log(id,'我要的id吗');
        getBannerDelete({id})
        .then(res=>{
            // console.log(res,'成功数据');
            if(res.data.code==200){
                this.$message.success(res.data.msg);
                this.getBannerListActions();//重新获取列表数据。
            }else{
                this.$message.error(res.data.msg);
            }
        });
    }
  },
};
</script>

<style scoped>
.img {
  width: 80px;
}
</style>