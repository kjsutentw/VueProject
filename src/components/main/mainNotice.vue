<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="公告" name="first">demo1</el-tab-pane>
    <el-tab-pane label="热门" name="second">配置管理</el-tab-pane>
  </el-tabs>

</template>

<script>
  export default {
    name: 'mainNotice',
    data() {
      return {
        activeName: 'first'
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
