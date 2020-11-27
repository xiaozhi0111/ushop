<template>
  <div>
    <div class="footer">
      <div class="footer_list">
        <router-link
          tag="div"
          class="footer_list1"
          activeClass="select"
          to="/home"
        >
          <span class="iconfont icon-shouye"></span>
          <div class="footer_list1_text">首页</div>
        </router-link>

        <router-link
          tag="div"
          class="footer_list1"
          activeClass="select"
          to="/cart"
        >
          <span class="iconfont icon-gouwuche"></span>

          <div class="footer_list1_text">购物车</div>
        </router-link>

        <router-link
          tag="div"
          class="footer_list1"
          activeClass="select"
          to="/mine"
        >
          <span class="iconfont icon-wode2"></span>
          <div class="footer_list1_text">我的</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: -1px;
  left: 0;
  border-top: 1px solid #f1f1f1;
}
.footer .footer_list {
  width: 7.5rem;
  background-color: white;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.footer .footer_list .footer_list1 {
  height: 1rem;
  margin-left: 0.6rem;
  flex: 1;
  text-align: center;
  margin-left: 0;
}

.footer .footer_list .iconfont {
  font-size: 24px;
}
.footer .footer_list .footer_list1 .footer_list1_text {
  margin-top: 0.15rem;
  font-size: 0.2rem;
}

.select {
  color: orangered;
  /* background: orangered; */
}
</style>