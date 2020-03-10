<template>
<div id="main" style="width: 600px;height: 460px;"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Curve',
    data() {
      return {
        charts: '',
        opinionData: ["3", "2", "4", "4", "5"]
      }
    },
    methods: {
      drawLine(id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['近七日收益']
          },
          grid: {
            left: '1%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },

          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["1","2","3","4","5"]

          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '近七日收益',
            type: 'line',
            stack: '总量',
            data: this.opinionData,
            smooth:true,
            itemStyle : {
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#1CD8D2' // 0% 处的颜色
                }, {
                  offset: 1, color: '#ffffff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            lineStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#ffffff' // 0% 处的颜色
                },{
                  offset: 0.5, color: '#5865FF' // 0% 处的颜色
                }, {
                  offset: 1, color: '#ffffff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            areaStyle: {}
          }]
        })
      }
    },
    //调用
    mounted() {
      this.$nextTick(function() {
        this.drawLine('main')
      })
    }
  }

</script>

<style scoped>

</style>
