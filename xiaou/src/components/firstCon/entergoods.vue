<template>
  <div>
    <div class="outer">
      <div class="header">
        <div class="header_img">
          <span class="iconfont icon-zuojiantou" @click="$router.back()"></span>
        </div>
        <div class="header_text">确认订单</div>
        <div class="header_circle">
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
          <div class="header_circle1"></div>
        </div>
      </div>
      <div class="people">
        <div class="people_left">
          <div class="people_left1">
            <div class="people_left1_text1">收货人：<span>{{userInfo.nickname}}</span></div>
            <div class="people_left1_text2">{{userInfo.phone}}</div>
          </div>
          <div class="people_left2">
            收货地址：北京市海淀区银泉路清林苑6号楼z中共优就业总部3层
          </div>
        </div>
        <div class="people_right">
          <img src="../../assets/images/order/arrow.jpg" alt="" />
        </div>
      </div>
      <div class="shopping">
        <div class="shopping1">
          <div class="shopping1_img">
            <img src="../../assets/images/shoping_car_images/shop.jpg" alt="" />
          </div>
          <div class="shopping1_text">
            <div class="shopping1_text1">欧莱雅面霜</div>
            <div class="shopping1_text2">规格：<span>50g</span></div>
          </div>
          <div class="shopping1_text3"><span>&yen;</span>123.00</div>
        </div>
        <div class="shopping2">
          <div class="shopping2_text">购买数量：</div>
          <div class="shopping2_text1">-</div>
          <div class="shopping2_text2">1</div>
          <div class="shopping2_text3">+</div>
        </div>
        <div class="shopping3">
          <div class="shopping3_text">配送方式</div>
          <div class="shopping3_text1">XX快递</div>
        </div>
        <div class="shopping_empty"></div>
        <div class="shopping3">
          <div class="shopping3_text">优惠券</div>
          <div class="shopping3_text1">无可用</div>
        </div>
        <div class="shopping4">
          <div class="shopping4_text">使用积分</div>
          <div class="shopping4_text1">输入积分</div>
          <div class="shopping4_text2">使用</div>
          <div class="shopping4_text3">可用<span>50</span>积分</div>
        </div>
        <div class="shopping_empty"></div>
        <div class="shopping5">
          <div class="shopping5_text">商品金额</div>
          <div class="shopping5_text1">&yen;68.00</div>
        </div>
        <div class="shopping5">
          <div class="shopping5_text">运费</div>
          <div class="shopping5_text1">+&yen;0.00</div>
        </div>
        <div class="shopping5">
          <div class="shopping5_text">优惠券</div>
          <div class="shopping5_text1">-&yen;0.00</div>
        </div>
        <div class="shopping5">
          <div class="shopping5_text">会员优惠</div>
          <div class="shopping5_text1">-&yen;0.00</div>
        </div>
        <div class="zhilubin">
          <div class="shopping5_text">积分抵扣</div>
          <div class="shopping5_text1">-&yen;0.00</div>
        </div>
        <div class="shopping_all">
          <div class="shopping_all_text">实付金额：</div>
          <div class="shopping_all_price">
            &nbsp;&nbsp;&nbsp;&nbsp;&yen;68.00
          </div>
        </div>
        <div class="btn">提交订单</div>
      </div>
    </div>
    <v-nav />
  </div>
</template>

<script>
export default {
  data(){
    return {
      userInfo:[],
    }
  },
  mounted(){
    this.userInfo=sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):[];
  }
};
</script>

<style scoped>
.outer {
  width: 7.5rem;
  margin: 0 auto;
}
.outer .header {
  width: 7.5rem;
  height: 0.7rem;
  background-color: #f26b11;
  padding-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
}
.outer .header .header_img{
  margin-top: -.05rem;
}
.outer .header .iconfont{
  color: #fff;
  margin-left: .1rem;
  font-size: .4rem;
}
.outer .header .header_text {
  font-size: 0.3rem;
  color: white;
  margin-left: 1.2rem;
}
.outer .header .header_circle {
  margin-left: 0.8rem;
  display: flex;
  margin-right: 0.3rem;
}
.outer .header .header_circle .header_circle1 {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  background-color: white;
  margin-right: 0.1rem;
}
.outer .people {
  background-color: white;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.outer .people .people_left .people_left1 {
  display: flex;
  justify-content: space-between;
}
.outer .people .people_left .people_left1 .people_left1_text1 {
  font-size: 0.25rem;
  margin-left: 0.3rem;
}
.outer .people .people_left .people_left1 .people_left1_text2 {
  font-size: 0.25rem;
}
.outer .people .people_left .people_left2 {
  font-size: 0.25rem;
  margin-top: 0.2rem;
  margin-left: 0.3rem;
  height: 0.8rem;
  line-height: 0.4rem;
}
.outer .people .people_right {
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}
.outer .people .people_right img {
  width: 0.19rem;
  height: 0.26rem;
}
.outer .shopping .shopping1 {
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
}
.outer .shopping .shopping1 .shopping1_img {
  margin-left: 0.3rem;
}
.outer .shopping .shopping1 .shopping1_img img {
  width: 1.02rem;
  height: 0.82rem;
}
.outer .shopping .shopping1 .shopping1_text {
  margin-left: 0.3rem;
}
.outer .shopping .shopping1 .shopping1_text .shopping1_text1 {
  font-size: 0.2rem;
}
.outer .shopping .shopping1 .shopping1_text .shopping1_text2 {
  font-size: 0.2rem;
  color: #cccccc;
  margin-top: 0.1rem;
}
.outer .shopping .shopping1 .shopping1_text3 {
  font-size: 0.3rem;
  color: #e7343a;
  margin-left: 3.2rem;
}
.outer .shopping .shopping2 {
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  padding-bottom: 0.2rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  border-bottom: 1px solid #f0f0f0;
}
.outer .shopping .shopping2 .shopping2_text {
  font-size: 0.2rem;
  color: #999999;
}
.outer .shopping .shopping2 .shopping2_text1 {
  width: 0.64rem;
  height: 0.54rem;
  border: 1px solid #515151;
  border-radius: 0.05rem;
  font-size: 0.3rem;
  line-height: 0.54rem;
  text-align: center;
  margin-left: 3.2rem;
}
.outer .shopping .shopping2 .shopping2_text2 {
  width: 0.84rem;
  height: 0.54rem;
  border: 1px solid #515151;
  border-radius: 0.05rem;
  font-size: 0.3rem;
  line-height: 0.54rem;
  text-align: center;
  margin-left: 0.1rem;
}
.outer .shopping .shopping2 .shopping2_text3 {
  width: 0.64rem;
  height: 0.54rem;
  border: 1px solid #515151;
  border-radius: 0.05rem;
  font-size: 0.3rem;
  line-height: 0.54rem;
  margin-left: 0.1rem;
  text-align: center;
}
.outer .shopping .shopping3 {
  display: flex;
  margin: 0.3rem 0.3rem;
  justify-content: space-between;
}
.outer .shopping .shopping3 .shopping3_text {
  font-size: 0.2rem;
}
.outer .shopping .shopping3 .shopping3_text1 {
  font-size: 0.2rem;
}
.outer .shopping .shopping_empty {
  width: 7.5rem;
  height: 0.1rem;
  background-color: #f1f1f1;
}
.outer .shopping .shopping4 {
  display: flex;
  align-items: center;
  margin: 0.3rem 0.3rem;
  border-top: 1px solid #f1f1f1;
  background-color: white;
  height: 1rem;
  line-height: 1rem;
}
.outer .shopping .shopping4 .shopping4_text {
  font-size: 0.2rem;
}
.outer .shopping .shopping4 .shopping4_text1 {
  height: 0.8rem;
  line-height: 0.8rem;
  border: 1px solid #d7d7d7;
  color: #d7d7d7;
  margin-left: 1.5rem;
  font-size: 0.2rem;
  border-radius: 0.1rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.outer .shopping .shopping4 .shopping4_text2 {
  height: 0.82rem;
  line-height: 0.82rem;
  background-color: #f26b11;
  border-radius: 0.1rem;
  color: white;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  margin-left: 0.1rem;
  font-size: 0.2rem;
}
.outer .shopping .shopping4 .shopping4_text3 {
  color: #979797;
  margin-left: 0.6rem;
  font-size: 0.2rem;
}
.outer .shopping .shopping4 .shopping4_text3 span {
  color: #e53730;
}
.outer .shopping .shopping5 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.3rem;
  padding: 0.1rem 0;
}
.outer .shopping .shopping5 .shopping5_text {
  font-size: 0.2rem;
  color: #969696;
}
.outer .shopping .shopping5 .shopping5_text1 {
  font-size: 0.2rem;
  color: #dd363d;
}
.outer .shopping .zhilubin {
  width: 7.1rem;
  height: 0.4rem;
  margin: 0.3rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  justify-content: space-between;
}
.outer .shopping .zhilubin .shopping5_text {
  font-size: 0.2rem;
  color: #969696;
}
.outer .shopping .zhilubin .shopping5_text1 {
  font-size: 0.2rem;
  color: #dd363d;
  margin-right: 0.2rem;
}
.outer .shopping .shopping_all {
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  display: flex;
}
.outer .shopping .shopping_all .shopping_all_text {
  font-size: 0.35rem;
  margin-left: 4rem;
}
.outer .shopping .shopping_all .shopping_all_price {
  font-size: 0.35rem;
  color: #dd363d;
}
.outer .shopping .btn {
  width: 3.55rem;
  height: 1.1rem;
  background-color: #f26b11;
  margin: 0.6rem 2rem;
  font-size: 0.3rem;
  line-height: 1.1rem;
  text-align: center;
  color: white;
  border-radius: 0.1rem;
  margin-bottom: 1.5rem;
}
</style>