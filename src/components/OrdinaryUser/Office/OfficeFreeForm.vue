<template>
  <el-popover
    placement="right"
    width="800"
    trigger="click"
    v-model="addFromVisable"
  >

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

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

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="addFromVisable=false">关闭</el-button>
      </el-form-item>
    </el-form>

    <el-button slot="reference">添加预算表单</el-button>
  </el-popover>

</template>

<script>
  export default {
    name: 'OfficeFreeForm',
    data() {
      return {
        ruleForm: {
          name: '',
          count: '',
          department: '',
          unitPrice: '',
          price: '',
          feeExplain: '',
          memo: '',
          createUser:''

        },
        addFromVisable:false
        ,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onSubmit(){
        this.ruleForm.createUser = JSON.parse(sessionStorage.getItem("userinfo")).username;
        console.log(this.ruleForm)
        this.$axios
          .post('/budget/officeForm/addfrom',this.ruleForm)
          .then(successResponse => {
            if (successResponse.data.code == 200) {
              this.$message({
                message: '添加预算成功!',
                type: 'success'
              });
              this.resetForm(this.ruleForm);
              this.addFromVisable=false;
            }
          })
          .catch(failResponse => {
            console.log(data.msg);
          })
      }
    }
  }
</script>

<style scoped>

</style>
