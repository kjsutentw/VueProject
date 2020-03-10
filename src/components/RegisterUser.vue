<template>
  <el-form class="login-container" label-position="left"
           label-width="0px" >
    <h3 class="login_title">系统注册</h3>
    <el-form-item  prop="username" >
      <el-input type="text" v-model="RegistForm.username"
                auto-complete="off" placeholder="用户名:"  ></el-input>
    </el-form-item>

    <el-form-item>
      <el-input type="password" v-model="RegistForm.password"
                auto-complete="off" placeholder="密码:"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="RegistForm.memo"
                auto-complete="off" placeholder="注册时你想说的话:"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="regist">注册</el-button>
    </el-form-item>


  </el-form>
</template>

<script>
  import Time from '../js/time.js'
  export default {
    name: 'RegisterUser',
    data(){
      return{
        RegistForm:{
          username:'',
          password:'',
          createTime:'',
          userAuthority:'',
          memo:''
        }


      }
    },
    methods:{
      regist(){
        this.RegistForm.createTime=Time.getNowTime();
        var submitdata=this.RegistForm;
        console.log(submitdata)
        this.$axios
          .post('/user/register', {
            submitdata
          })
          .then(successResponse => {
            var data=successResponse.data;
            if (successResponse.data.code ==200) {
              this.$message({
                message: '注册成功!',
                type: 'success'
              });
              this.$router.replace({path: '/'})
            }else if(data.code ==400) {
              this.$message.error({
                message: data.msg
              });
            }


          })
          .catch(failResponse => {
            console.log('找不到服务器⊙﹏⊙∥!, 失败!');
          })


      }
    }
  }
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #4169E1;
  }
</style>
