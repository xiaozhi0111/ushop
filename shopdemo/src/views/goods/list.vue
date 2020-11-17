<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="商品市场"> </el-table-column>
      <el-table-column prop="img" label="图片" width="150px">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否新品" width="60px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否热卖" width="60px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="70px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170px">
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
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="goodsSize"
      :total="goodsCount"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {getGoodsDelete} from '../../util/axios';
export default {
  data() {
    return {};
  },
  mounted() {
    //页面已加载就加载列表。
    this.getGoodsList();
    this.getGoodsCount();
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount:'goods/getGoodsCount',
      goodsSize:'goods/getGoodsSize',
    }),
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListActions",
      getGoodsCount:'goods/getGoodsCountActions',
      getGoodsPage:'goods/getGoodsPageActions',
    }),
    changePage(e){
      this.getGoodsPage(e);
    },
    edit(id){
      this.$emit('edit',id);
    },
    del(id){
      getGoodsDelete({id})
      .then(res=>{
        // console.log(res,'删除数据成功');
        if(res.data.code==200){
          this.$message.success(res.data.msg);
          this.getGoodsList();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
  },
};
</script>

<style scoped>
.img{
  width: 80px;
}
.el-pagination {
  float: right;
  margin: 20px 30px 0 0;
}
</style>