<template>
  <div>
    <!-- <h3>我是主页</h3> -->
    <el-container>
      <el-header>xxx大型后台管理项目
        <div class="outer">
          欢迎你：{{getUserInfo.username}}
          <el-button type="primary" plain size="small" @click=exit>退出</el-button>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px">
          <vnav />
        </el-aside>
        <el-main>
          <!-- //二级路由的出口。 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vnav from '../components/nav';
import {mapGetters,mapActions} from 'vuex';
export default {
  data(){
    return {
    }
  },
  components:{
    vnav
  },
  // mounted(){
  //   let a=JSON.parse(sessionStorage.getItem('userInfo'));
  //   // console.log(a.username);
  //   this.name=a.username;
  // },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  methods:{
    ...mapActions(['changeUserInfoActions']),
    exit(){
      // sessionStorage.removeItem('userInfo');
      this.changeUserInfoActions(null);
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.el-header
  background gray
  // text-align center
  line-height 60px
  font-size: 25px
  color: $secondBgColor
  .outer{
    float: right;
  }

</style>