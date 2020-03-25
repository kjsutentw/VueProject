<template>
  <div id="showchart" style="width: 600px;height: 460px;"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'CurveChart2',
    data() {
      return {
        charts: '',
        opinionData: ["0","300", "213", "4123", "413", "5123","2423"]
      }
    },
    methods: {
      drawLine(id) {
        this.echarts.setOption({
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['expected', 'actual']
          },
          series: [{
            name: 'expected', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: this.opinionData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
            {
              name: 'actual',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: this.opinionData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      }

    },
    //调用
    mounted() {

    },
    created () {
      this.drawLine('showchart');
    }
  }
</script>

<style scoped>

</style>
