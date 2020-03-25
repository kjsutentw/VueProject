<template>

  <el-dialog title="审批"  :visible.sync="editOfficeFormVisible"
             width="65%"
             center >

  <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="品名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="count">
      <el-input v-model="ruleForm.count"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="unitPrice">
      <el-input v-model="ruleForm.unitPrice"></el-input>
    </el-form-item>
    <el-form-item label="预算金额" prop="price">
      <el-input  v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="填报部门" prop="department">
      <el-select v-model="ruleForm.department" placeholder="请选择活动区域">
        <el-option label="信息工程学院" value="信息工程学院"></el-option>
        <el-option label="高博软件" value="高博软件"></el-option>
        <el-option label="管理学院" value="管理学院"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="说明" prop="feeExplain">
      <el-input type="textarea" v-model="ruleForm.feeExplain"></el-input>
    </el-form-item>

    <el-form-item label="备注" prop="memo">
      <el-input type="textarea" v-model="ruleForm.memo"></el-input>
    </el-form-item>

    <el-form-item label="办理意见" prop="desc">
      <el-input type="textarea"  rows="12" cols="15" v-model="formOpinion"></el-input>
    </el-form-item>

    <el-form-item label="附件材料" >
      <el-input  type="file"  style="width: 30%"  ></el-input>
      审批人:<el-input  type="text"  style="width: 30%" v-model="userName"></el-input>
    </el-form-item>

    <el-form-item  size="large">
      <el-button type="primary" v-on:click="UpdataSubmit">通过</el-button>
      <el-button type="warning" @click="returnForm()" >退回</el-button>
      <el-button @click.native="editOfficeFormVisible = false" >取消</el-button>
    </el-form-item>


  </el-form>

  </el-dialog>

</template>

<script>
  export default {
    name: 'ShowOfficeForm',
    data() {
      return {
        ruleForm: {
          id:'',
          name: '',
          count: '',
          department: '',
          unitPrice: '',
          price: '',
          feeExplain: '',
          memo: '',
          createUser: ''
        },
        userName:'',
        formOpinion:'',
        editOfficeFormVisible: false

      }
    }, methods: {
      UpdataSubmit() {
        this.$axios
          .post('/budget/sumbitForm', {
            id:this.ruleForm.id,
            projectType:'办公费用',
            option:this.formOpinion,
            consenter:this.userName
          })
          .then(successResponse => {
            if (successResponse.data.code ==200) {
              this.sizeForm={}
              this.$message({
                message: '提交成功!',
                type: 'success'
              });
              this.editOfficeFormVisible=false
              this.$emit('query');
            }
          })
          .catch(failResponse => {
            console.log(failResponse);
          })
      },
      returnForm(){
        this.$axios
          .post('/budget/returnForm', {
            id:this.ruleForm.id,
            projectType:'办公费用'
          })
          .then(successResponse => {
            if (successResponse.data.code ==200) {
              this.sizeForm={}
              this.editOfficeFormVisible=false
              this.$emit('query');
            }
          })
          .catch(failResponse => {
            console.log(failResponse);
          })
      },
      Edit(row,userName){
        this.editOfficeFormVisible=true
        this.ruleForm =row
        this.userName=userName;

        this.title=this.sizeForm.createUser;


      }

    }
  }
</script>

<style scoped>

</style>
