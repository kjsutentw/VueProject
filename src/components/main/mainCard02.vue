<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>预算二</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <span class="wzx_span_title">70%</span>
    <el-progress  :percentage="45" color="#67C23A"></el-progress>
    <el-divider></el-divider>
    <span>同比上升12%</span>
    <span>日环比上升12%</span>
  </el-card>
</template>

<script>
  export default {
    name: 'mainCard02'
  }
</script>

<style scoped>
  .text {
    font-size: 15px;
  }

  .wzx_span_title{
    font-size: 35px;
    color: #67C23A;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 370px;
  }
</style>
