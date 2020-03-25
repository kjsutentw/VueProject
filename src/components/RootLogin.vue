<template>
  <div class="login">
  <el-form class="login-container" label-position="left"
           label-width="0px" >
    <h3 class="login_title">审批人员或系统管理员登陆</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号:"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码:"></el-input>
    </el-form-item>


    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登陆</el-button>
    </el-form-item>


  </el-form>

 </div>
</template>

<script>

  export default {
    name: 'RootLogin',
    data(){
      return{
        loginForm: {
          username: '',
          password: ''
        }


      }
    },
    methods:{
      login () {
        var submitdata=this.loginForm;
        this.$axios
          .post('/user/login', {
            submitdata: submitdata
          })
          .then(successResponse => {
            if (successResponse.data.code ==200) {


              sessionStorage.setItem("token", 'true');

              var userInfo=successResponse.data.data;
              sessionStorage.setItem("userinfo", JSON.stringify(userInfo));//存入的是一个字符串
              //普通用户进入这个
              if(userInfo.userAuthority=="ordinary"){
                this.$message({
                  message: '您登陆的是普通用户账号!',
                  type: 'error'
                });
                this.$router.push({path: "/"});
              }else {
                if(userInfo.userAuthority=="Approver"){
                  this.$router.push({path: "/index"});
                }else if(userInfo.userAuthority=="root") {

                }



              }


            }else {
              this.$message.error({
                message: successResponse.data.msg
              });
            }
          })
          .catch(failResponse => {
            console.log(failResponse);
          })
      }


    }
  }
</script>

<style scoped>

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/login-background.jpg");
    background-size: cover;
  }

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
    color: #505458;
  }
</style>
