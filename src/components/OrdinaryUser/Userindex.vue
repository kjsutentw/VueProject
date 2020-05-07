<template>
  <div style="background-color: #EBEBEB;min-height:800px">
    <div style="width:100%;background-color: #636363; overflow: hidden">
            <span class="demonstration" style="float:left;padding-top:10px;color:white;margin-left:1%">
                个人预算中心
            </span>
      <span class="demonstration" style="float:left;padding:5px;color:white;margin-left:2%;width:15%">
                <el-input
                  placeholder="请输入"
                  icon="search"
                  v-model="searchCriteria"
                  :on-icon-click="handleIconClick">
                </el-input>
            </span>
      <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown>
                  <span class="el-dropdown-link" style="color:white">
                    {{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
                </el-dropdown>

            </span>


    </div>

    <div style="margin-top:5px">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height:800px" @select="handleSelect">
              <el-submenu index="1">
                <template slot="title">我的预算办理列表</template>
                <el-menu-item index="1-1">专业建设项目明细</el-menu-item>
                <el-menu-item index="1-2">办公费用明细</el-menu-item>
                <el-menu-item index="1-3">科研项目明细</el-menu-item>
                <el-menu-item index="1-4">实验室费用明细</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">大数据模块</template>
                <el-menu-item index="2-1">监控</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20">


          <div style="margin-top:10px">
            <router-view></router-view>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
    export default{
        name: "Userindex",
      data(){
        return {
          searchCriteria: '',
          breadcrumbItems: ['导航一'],
          username:''
        }
      },
      methods:{
        handleIconClick(ev) {
          console.log(ev);
        },
        handleSelect(key, keyPath){
        switch(key){
          case '1-1':
            this.$router.push('/ordinarytable');
            break;
          case '1-2':
            this.$router.push('/officeFreeTable');
            break;
          case '1-4':
            this.$router.push('/laboratory');
            break;

        }
      }
      ,logout(){
          sessionStorage.setItem("token", 'false');
          sessionStorage.setItem("userinfo", '');
          this.$router.push("/");
        }
        ,init(){

          var obj = JSON.parse(sessionStorage.getItem("userinfo"));
          this.username=obj.username;
        }


      },
      mounted: function () { this.init() }

    }
</script>

<style scoped>

</style>
