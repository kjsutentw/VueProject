<template>
  <el-dialog
    title="提示"
    :visible.sync="linkDialogVisible"
    width="30%">
    <el-steps :active="objStatus" finish-status="success">
      <el-step title="发起预算表单" ></el-step>
      <el-step title="已审批，待同意" ></el-step>
      <el-step title="执行中" ></el-step>
      <el-step title="已完成" ></el-step>
    </el-steps>
    <el-button @click="linkDialogVisible = false">取 消</el-button>
  </el-dialog>
</template>

<script>
  export default {
    name: 'elBudgetFormStep',
    data() {
      return {
        linkDialogVisible: false,
        objStatus: 0
      }
    },
    methods:{
      linkClick(status){
        switch(status){
          case "00013":
            this.objStatus=1;
            break;
          case "00019":
            this.objStatus=2;
            break;
          case "00255":
            this.objStatus=3;
            break;
          case "00655":
            this.objStatus=4;
            break;
        }

        if(status!='00963'){
          this.linkDialogVisible=true;
        }
      }

    }
  }
</script>

<style scoped>

</style>
