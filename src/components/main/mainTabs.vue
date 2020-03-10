<template>
  <div style="width: 300px;height: 400px;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="今日" name="first">demo1</el-tab-pane>
      <el-tab-pane label="本周" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="本月" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="全年" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'mainTabs',
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>

</style>
