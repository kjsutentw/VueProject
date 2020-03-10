<template>

  <el-dialog title="添加表单字段"  :visible.sync="updateFieldVisble"
             width="25%"
             center >


  <el-form  :model="form" label-width="110px">
    <el-form-item label="表单字段名称">
      <el-input v-model="form.Name"></el-input>
    </el-form-item>

    <el-form-item label="数据库字段名称">
      <el-input v-model="form.FieldName"></el-input>
    </el-form-item>

    <el-form-item label="字段类型">
      <el-select v-model="form.FieldType" placeholder="请选择字段类型">
        <el-option label="英文+数字" value="varchar"></el-option>
        <el-option label="数字" value="int"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="字段长度">

        <el-select v-model="form.FieldLength" placeholder="请选择字段类型">
          <el-option label="4" value="4"></el-option>
          <el-option label="16" value="16"></el-option>
          <el-option label="255" value="255"></el-option>
        </el-select>

    </el-form-item>

    <el-form-item label="字段默认值">
      <el-input v-model="form.FieldDefault" ></el-input>
    </el-form-item>

      <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button @click="updateFieldVisble=false">取消</el-button>
    </el-form-item>
  </el-form>


  </el-dialog>
</template>

<script>
  import Time from '../../../js/time.js'
  export default {
    name: 'UserUpdateField',
    data() {
      return {
        updateFieldVisble:false,
        form:{
           FieldName:'',
           FieldType:'',
           FieldLength:'',
           FieldDefault:'',
           createTime:'',
           Name:''
        }
      }
    },
    methods: {
      onSubmit() {
        this.form.createTime=Time.getNowTime();

        var senddata=this.form;
        console.log(senddata)
        this.$axios
          .post('/budget/add/fiedl', {
            senddata
          }).then(datasuccessRsp => {
          if (datasuccessRsp.data.code ==200) {
            this.$message({
              type:'success',
              message: '添加成功',
              center: true,
              offset:250
            });
            this.updateFieldVisble=false;

          }
        })
          .catch(failResponse => {
            this.$message({
              type:'error',
              message: 'failResponse',
              center: true,
              offset:250
            });
          })
      },
      Edit(){
        this.updateFieldVisble=true;

      }


    }
  }
</script>

<style scoped>

</style>
