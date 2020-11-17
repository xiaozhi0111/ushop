<template>
  <div>
    <h3>我是home</h3>
    <div id="main"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "本周销量排行",
      },
      tooltip: {},
      legend: {
        data: ["橘子","香蕉","梨","柚子","橙子","苹果"],
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六","周日"],
      },
      yAxis: {},
      series: [
        {
          name: "橘子",
          type: "line",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "香蕉",
          type: "line",
          data: [220, 382, 591, 634, 790, 930, 1010]
        },
        {
          name: "梨",
          type: "line",
          data: [150, 232, 301, 754, 490, 630, 410]
        },
        {
          name: "柚子",
          type: "line",
          data: [320, 332, 501, 334, 890, 330, 920]
        },
        {
          name: "橙子",
          type: "line",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        },
        {
          name: "苹果",
          type: "line",
          data: [579, 520, 636, 610, 710, 520,666],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style scoped>
#main {
  width: 1000px;
  height: 450px;
  /* border: 1px solid gray; */
  padding-left: 100px;
  margin-top: 20px;
}
</style>