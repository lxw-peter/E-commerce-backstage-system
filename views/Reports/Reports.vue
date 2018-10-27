<template>
<div class="reports">
    <!-- 导航条 -->
  <el-row>
    <el-col :span="24">   
      <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <div class="box"></div>
</div>
</template>
<script>
import {statistics} from "../../src/api/index.js"
import echarts from 'echarts'
export default {
  data() {
    return {
      data: ''
    }
  },
  created() {
    this.init()
  },
 
  methods: {
    init(){
      // 基于销量
      statistics(1).then( res => {
          console.log(res);
          if (res.meta.status === 200){
            this.data = res.data
            this.myEchart(this.data)
          }
      })
      // 基于时间
      // statistics(2).then( res => {
      //     console.log(res);
      //     this.data = res.data
      //     this.myEchart(this.data)
      // })
    },
    myEchart(data){
      var myChart = echarts.init(document.querySelector('.box'), 'dark');
      // myChart.title = '坐标轴刻度与标签对齐';
      myChart.setOption({
        // color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line',      // 默认为直线，可选为：'line' | 'shadow'
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: data.legend,
        xAxis : data.xAxis,
        yAxis : data.yAxis,
        series : data.series
      }) 
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 600px;
}
</style>