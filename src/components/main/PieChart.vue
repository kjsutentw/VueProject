<template>
  <div class="user-room">

    <PanelGroup></PanelGroup>

    <LineChart></LineChart>

    <el-row >
      <el-col :span="8"><div class="grid-content bg-purple"> <PieChart02></PieChart02></div></el-col>
      <el-col :span="9"><div class="grid-content bg-purple-light"><BarChart02></BarChart02></div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple-light"><mainTabs></mainTabs></div></el-col>
    </el-row>


  </div>
</template>

<script>
  import echarts from 'echarts'
  import Curve from './Curve'
  import Bar from './Bar'
  import mainTabs from './mainTabs'
  import ThreeDateTime from '../public/ThreeDateTime'
  import mainNotice from './mainNotice'
  import PanelGroup from './PanelGroup'
  import PieChart02 from  '../public/PieChart'
  import BarChart02 from  '../public/BarChart'
  import LineChart from '../public/LineChart'
  export default {
    name: 'PieChart',
    components: {PanelGroup, Curve,Bar,mainTabs,ThreeDateTime,mainNotice,PieChart02,BarChart02,LineChart},
    comments:{
      Curve,
      Bar,
      mainTabs,
      ThreeDateTime,
      mainNotice,
      PanelGroup,
      PieChart02,
      BarChart02,
      LineChart
    },
    data () {
      return {
        activeName: 'first'
      };
    }, methods: {
      drawScatter (id) {
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          title: {
            text: '数据来源',
            subtext:'每项数据',
            left: 'center',
            top: 50,
            textStyle: {
              fontStyle:'italic'//标题字体
            }
          },
          tooltip: {
            show: true,// 是否显示提示,true/false,默认true
            trigger: "item",// 触发类型, item/axis/none
            backgroundColor: 'rgba(0,0,0,.5)',// 提示框背景
            borderWidth: 1, // 提示框边框大小
            padding: 10,// 提示框内边距
            borderColor: '#ff0000',// 提示框边框颜色
            formatter: "{a} <br/>{b}: {c} ({d}%)",// 提示格式，支持回调函数
            textStyle: {
              color: '#0DB9DF', // 提示文字样式
              fontStyle: 'normal', // 提示文字风格，normal,italic,oblique
              fontWeight: 'normal', // 提示文字粗细， normal,bold,bolder,lighter,100~900
              fontFamily: 'sans-serif', //提示文字字体， 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
              fontSize: 14, //字体大小
              lineHeight: 28, //字体行高
              rich: {
                a: {
                  lineHeight: 28 // 没有设置则继承textStyle的 `lineHeight`，
                }
              }
            }, formatter: function(params) {
              var res = "";
              res = `<span style="color:#fff;padding: 10px;line-height: 28px;">${params.name}</span><br />
    <span style="color:#0DB9DF;padding: 10px;line-height: 28px;">${ params.percent}%</span>
    <span style="color:#FC6961;padding: 10px;line-height: 28px;">${params.value} 元</span>`;
              return res;
            }
          },
          legend: {
            orient: "horizontal", // horizontal/vertical,默认horizontal
            // x: "left", // x方向位置,left/right
            // y: 'bottom', // y方向位置,top/bottom
            left: 'center', // 距离左边的位置、距离 (值可以是'left', 'center', 'right'，或者具体的数值)
            // right: 10,
            top: 60,
            bottom: 30,
            itemGap: 10, // 间隔。横向布局时为水平间隔，纵向布局时为纵向间隔
            itemWidth: 50, //图形宽度
            itemHeight: 10, //图形高度
            padding: 10, // 图例内边距。
            textStyle: {
              fontSize: 16, // 字体大小
              color: "#999EE0" // 字体颜色
            },
            formatter: function (params) { // 格式化图例，支持字符串模板和回调函数
              console.log(params) // 多个参数时可以格式化格式
              return params
            },
            data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
          },
          series: [
            {
              name: "访问来源",
              type: "pie", // 图标的类型
              radius: ["40%", "60%"], // 饼图的范围
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: "直接访问"},
                {value: 310, name: "邮件营销"},
                {value: 234, name: "联盟广告"},
                {value: 135, name: "视频广告"},
                {value: 1548, name: "搜索引擎"}
              ]
            }
          ]
        })
      }
    },
      mounted () {
        this.$nextTick(function () {
          this.drawScatter("scatterReport");
        });
      }


  }


</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;


  }



</style>


