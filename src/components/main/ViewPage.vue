<template>
  <el-container>
    <el-header>
      <el-row>
        <!-- 左按钮区 -->
        <el-col :span="2">
          <slot name="left-field"></slot>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="3">
          <slot name="search-field"></slot>
        </el-col>
        <!-- 过滤条件区 -->
        <el-col :span="9">
          <slot name="filter-field"></slot>
        </el-col>
        <!-- 右按钮区 -->
        <el-col :span="9">
          <slot name="right-field"></slot>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <!-- 表格区 -->
      <slot></slot>
    </el-main>
  </el-container>

</template>

<script>
    export default {
        name: "ViewPage"
    }
</script>

<style >

</style>
