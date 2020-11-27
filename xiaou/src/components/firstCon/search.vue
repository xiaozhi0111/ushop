<template>
  <div>
      <div class="outer">
        <div class="header">
            <div class="header_img">
              <span class="iconfont icon-zuojiantou" @click="$router.back()"></span>
            </div>
            <div class='header_img1'><img src="../../assets/images/cart_logo.jpg" alt=""></div>
            <div class="header_circle">
                <div class="header_circle1"></div>
                <div class="header_circle1"></div>
                <div class="header_circle1"></div>
            </div>
        </div>
        <div class="search">
            <input type="text">
            <div class="search_text">
                <img src="../../assets/images/list_images/search.jpg" alt="">
                <div class="search_text1">搜索商品</div>
            </div>
        </div>
        <div class="goods">
            <div class="goods_img"><img src="../../assets/images/list_images/pic.jpg" alt=""></div>
            <div class="goods_text">
                <div class="goods_text1">阿道夫修护滋养洗发香乳 洗发水 持久留香 520ml*2瓶 旗舰店正装换新升级版</div>
                <div class="goods_text2">&yen;123.00</div>
                <div class="goods_text3">3625条评论</div>
            </div>
        </div>
        <div class="goods">
            <div class="goods_img"><img src="../../assets/images/list_images/pic.jpg" alt=""></div>
            <div class="goods_text">
                <div class="goods_text1">阿道夫修护滋养洗发香乳 洗发水 持久留香 520ml*2瓶 旗舰店正装换新升级版</div>
                <div class="goods_text2">&yen;123.00</div>
                <div class="goods_text3">3625条评论</div>
            </div>
        </div>
        <div class="goods">
            <div class="goods_img"><img src="../../assets/images/list_images/pic.jpg" alt=""></div>
            <div class="goods_text">
                <div class="goods_text1">阿道夫修护滋养洗发香乳 洗发水 持久留香 520ml*2瓶 旗舰店正装换新升级版</div>
                <div class="goods_text2">&yen;123.00</div>
                <div class="goods_text3">3625条评论</div>
            </div>
        </div>
        <div class="goods">
            <div class="goods_img"><img src="../../assets/images/list_images/pic.jpg" alt=""></div>
            <div class="goods_text">
                <div class="goods_text1">阿道夫修护滋养洗发香乳 洗发水 持久留香 520ml*2瓶 旗舰店正装换新升级版</div>
                <div class="goods_text2">&yen;123.00</div>
                <div class="goods_text3">3625条评论</div>
            </div>
        </div>
    
      <v-nav />
    </div>
  </div>
</template>

<script>
// import vNav from '../../common/nav';
export default {
// components:{
//   vNav
// }
}
</script>

<style scoped>
body {
  background-color: white;
}
.outer {
  width: 7.5rem;
  background-color: white;
  margin: 0 auto;
}
.outer .header {
  width: 7.5rem;
  height: 0.7rem;
  background-color: white;
  padding-top: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.outer .header .header_img{
  margin-top: .2rem;
}
.outer .header .iconfont{
  color: black;
  margin-left: .1rem;
  font-size: .4rem;
}
.outer .header .header_img1 {
  margin-left: 0.6rem;
}
.outer .header .header_img1 img {
  width: 2.06rem;
  height: 0.5rem;
}
.outer .header .header_circle {
  height: 0.5rem;
  margin-left: 0.8rem;
  display: flex;
  margin-right: 0.3rem;
  margin-top: 0.15rem;
}
.outer .header .header_circle .header_circle1 {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.1rem;
  margin-top: 0.2rem;
}
.outer .search {
  width: 6.5rem;
  height: 0.8rem;
  background-color: #f26b11;
  margin-left: 0.5rem;
  margin-top: 0.2rem;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 0.8rem;
  position: relative;
}
.outer .search .search_text {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
}
.outer .search .search_text img {
  width: 0.26rem;
  height: 0.27rem;
  margin-top: 0.3rem;
  margin-left: 2.5rem;
}
.outer .search .search_text .search_text1 {
  font-size: 0.25rem;
  color: white;
  margin-left: 0.3rem;
}
.outer .goods {
  border-bottom: 1px solid #dddddd;
  display: flex;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.outer .goods .goods_img img {
  width: 1.47rem;
  height: 1.6rem;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.outer .goods .goods_text {
  margin-top: 0.4rem;
  margin-left: 0.6rem;
}
.outer .goods .goods_text .goods_text1 {
  font-size: 0.25rem;
  margin-right: 0.4rem;
}
.outer .goods .goods_text .goods_text2 {
  color: red;
  font-size: 0.2rem;
  margin-top: 0.2rem;
}
.outer .goods .goods_text .goods_text3 {
  color: #989898;
  font-size: 0.15rem;
  margin-top: 0.2rem;
}
.outer .goods:nth-child(6) {
  margin-bottom: 1.5rem;
}

</style>