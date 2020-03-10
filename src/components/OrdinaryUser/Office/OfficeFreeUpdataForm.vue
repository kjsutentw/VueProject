<template>
  <el-dialog title="编辑"  :visible.sync="updateFromVisable"
             width="45%"
             center >

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
        <el-button type="primary" @click="onSubmit()">提交预算</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button @click="updateFromVisable=false">关闭</el-button>
      </el-form-item>
    </el-form>


</el-dialog>

</template>

<script>
  export default {
    name: 'OfficeFreeUpdataForm',
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
          createUser:'',
          status:''

        },
        updateFromVisable:false
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
      onSubmit(){
        this.ruleForm.status="00013";
        this.ruleForm.createUser = JSON.parse(sessionStorage.getItem("userinfo")).username;
        this.$axios
          .post('/officeForm/addfrom',this.ruleForm)
          .then(successResponse => {
            if (successResponse.data.code == 200) {
              this.$message({
                message: '提交预算成功!',
                type: 'success'
              });
              this.resetForm(this.ruleForm);
              this.updateFromVisable=false;
            }
          })
          .catch(failResponse => {
            console.log(data.msg);
          })
      },
      Edit(row,index) {
        console.log(row)
        this.updateFromVisable = true
        this.ruleForm = row

      },
      resetForm(formName) {
       var id=this.ruleForm.id='';
       this.ruleForm={

       }
       this.ruleForm.id=id;
      },


    }
  }
</script>

<style scoped>

</style>
