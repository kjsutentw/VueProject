<template>
<div id="bar_main" style="width: 950px;height: 400px;"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Bar',
    data() {
      return {
        charts: '',
        opinionData: ["100", "102", "106", "350", "1100","100", "102", "106", "350", "1100","100", "102"]
      }
    },
    methods: {
      drawLine(id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          title: {
            text: '预算趋势'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['2020年预算柱形图']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            splitLine: {
              show: false
            },
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            splitArea: {
              show: true,
            },
          }],
          series: [{
            name: '预算执行支出金额',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                // 定制显示（按顺序）
                color: function(params) {
                  var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ];
                  return colorList[params.dataIndex]
                }
              },
            },
            data: [32.6, 25.9, 39.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 58.8, 16.0, 32.3]
          }]

        })
      }
    },
    //调用
    mounted() {
      this.$nextTick(function() {
        this.drawLine('bar_main')
      })
    }
  }

</script>

<style scoped>

</style>
