<template>
  <view-page  v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading">
    <!-- 左按钮区 -->

    <template slot="left-field">
      <el-tag type="success" size="medium">用户权限设置</el-tag>
    </template>

    <template slot="filter-field2">
      您的权限等级为:{{userinfo.userAuthority}}
    </template>

    <!-- 搜索框 -->
    <template slot="search-field">
      <el-input suffix-icon="el-icon-search" v-model="select_key" placeholder="请输入搜索内容" ></el-input>
    </template>
    <!-- 过滤条件区 -->
    <template slot="filter-field">
      <el-select v-model="filterType" placeholder="选择类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

    </template>



    <template slot="addAndDelete-field">

      <el-button round @click="goField">增加/删除预算表单字段<i class="el-icon-upload el-icon--right"></i></el-button>

    </template>

    <!-- 右按钮区 -->
    <template slot="right-field">
    <el-button type="primary"  icon="el-icon-refresh" @click="select(1,10)">刷新</el-button>
  </template>

    <!-- 表格区 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userAuthority"
        label="用户权限">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row,scope.$index)">编辑</el-button>

          <el-popconfirm
            @onConfirm="handleDelete(scope.$index)"
            confirmButtonText='确定删除'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="删除"
          >
            <el-button
              slot="reference" type="danger"
              >删除</el-button>
          </el-popconfirm>


        </template>
      </el-table-column>
    </el-table>

    <UserUpdateField ref="updatefield"></UserUpdateField>

    <!-- 分页底部 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems">
    </el-pagination>




  </view-page>

</template>

<script>
  import Vue from 'vue'
  import ViewPage from './UserViewPage'
  import AESsecret from '../../..//js/secret.js'
  import ThreeDateTime from '../../public/ThreeDateTime'
  import UserUpdateField from './UserUpdateField'

    export default {
      name: "UserTable",
      components: {
        ThreeDateTime,
        ViewPage,
        UserUpdateField
      },
      data() {
        return {
          currentPage:1,
          loading: false,
          pagesize:10,
          totalItems:0,
          select_key:'',
          data_select: '',
          tableData:[],
          hideIcon:false,
          userinfo:{
            id:'',
            username:'',
            memo:'',
            userAuthority:'',
            createTime:''
          },
          filterType: '',
          options: [{
            value: 'userUnid',
            label: '用户编号'
          }, {
            value: 'userName',
            label: '用户名'
          }]

        }
      },
      created: function() {



      },
      methods:{
        handleSizeChange(val) {
          this.pagesize=val;
          this.select(this.currentPage,this.pagesize)
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage=val;
          this.select(this.currentPage,this.pagesize)

        },
        select(currentPage,pagesize){
          this.loading=true;

          var senddata={"currentPage":currentPage,"pagesize":pagesize};
          this.$axios
            .post('/user/selectpage', {
              senddata
            }).then(datasuccessRsp => {
            if (datasuccessRsp.data.code ==200) {
              var rsp=datasuccessRsp.data.data.data;
              console.log("" +
                "返回的数据:"+rsp);
              var b=AESsecret.decrypt(rsp);
              if(b!=""&&b!=null){
                this.tableData=b.data;
                this.totalItems=datasuccessRsp.data.count;

              }else {
                this.tableData=[]
              }

            }
          })
            .catch(failResponse => {
              console.log(failResponse);

            })

          setTimeout(() =>{
            this.loading=false;
          },800);


        },
        handleDelete(index){
          console.log("删除")
          this.tableData.splice(index, 1)
        },
        goField(){

          if(this.userinfo.userAuthority=="root"||this.userinfo.userAuthority=="Approver"){
            this.$refs.updatefield.Edit();
          }else {
            this.$message({
              type:'error',
              message: '您的权限不够',
              center: true,
              offset:250
            });
          }



        }

      },
      watch:{

      },
      mounted: function () {

        this.select(1,10);
        //初始化个人信息
        this.userinfo=JSON.parse(sessionStorage.getItem("userinfo"));
      }


    }
</script>

<style scoped>

</style>
