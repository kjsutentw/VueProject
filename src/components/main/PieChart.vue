<template>
  <div class="user-room">
    <el-row >
      <el-col :span="14"><div class="grid-content bg-purple"><Bar></Bar></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"><mainTabs></mainTabs></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"><ThreeDateTime></ThreeDateTime></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-tabs v-model="activeName">
            <el-tab-pane label="全年" name="first"><div id="scatterReport" style="width: 300px;height: 400px;"></div></el-tab-pane>
            <el-tab-pane label="高校预算" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="其他预算" name="third">角色管理</el-tab-pane>
          </el-tabs>

        </div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <div style="width: 200px;height:460px ">
            <mainNotice></mainNotice>
          </div>
        </div>
      </el-col>


      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <div style="width: 300px;height:460px ">
            <mainCard01></mainCard01>
            <mainCard02></mainCard02>
          </div>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="grid-content bg-purple-light">
        <Curve></Curve>
        </div>
      </el-col>



    </el-row>


  </div>
</template>

<script>
  import echarts from 'echarts'
  import Curve from './Curve'
  import Bar from './Bar'
  import mainTabs from './mainTabs'
  import ThreeDateTime from '../public/ThreeDateTime'
  import mainCard01 from './mainCard01'
  import mainCard02 from './mainCard02'
  import mainNotice from './mainNotice'
  export default {
    name: 'PieChart',
    components: {Curve,Bar,mainTabs,ThreeDateTime,mainCard01,mainCard02,mainNotice},
    comments:{
      Curve,
      Bar,
      mainTabs,
      ThreeDateTime,
      mainCard01,
      mainCard02,
      mainNotice
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
            top: 20,
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
            // top: 10,
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

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #f9fafc;
  }
  .bg-purple {
    background: #f9fafc;
  }
  .bg-purple-light {
    background: #f9fafc;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
