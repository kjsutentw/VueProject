<template>
  <view-page>
    <!-- 左按钮区 -->
    <template slot="left-field">
      搜索预算表单:
    </template>
    <!-- 搜索框 -->
    <template slot="search-field">
      <el-input type="number" suffix-icon="el-icon-search" v-model="select_key" placeholder="请输入搜索内容" ></el-input>
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


        <el-date-picker
          v-model="data_select"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>

    </template>
    <!-- 右按钮区 -->
    <template slot="right-field">
      <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
    </template>
    <!-- 表格区 -->
    <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column
        prop="createUser"
        label="创建者"
        width="180">
      </el-table-column>

      <el-table-column
        prop="projectLeader"
        label="课题负责人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="projectType"
        label="项目类别">
      </el-table-column>
      <el-table-column
        prop="department"
        label="填报部门">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名称">
      </el-table-column>
      <el-table-column
        prop="equipmentFee"
        label="设备费">
      </el-table-column>
      <el-table-column
        prop="sumFee"
        label="经费合计">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.status=='00013'" @click="opinionClick(scope.row)">待审批</el-link>
          <el-link type="primary" v-if="scope.row.status=='00019'" @click="linkClick(scope.row.status)">已审批</el-link>
          <el-link type="primary" v-if="scope.row.status=='00963'">退回</el-link>
          <el-link type="primary" v-if="scope.row.status=='00655'" @click="linkClick(scope.row.status)" >已完成</el-link>

        </template>
      </el-table-column>
    </el-table>
    <FormStep ref="step"></FormStep>

    <FormShow ref="formShow"></FormShow>
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
  import ViewPage from './ViewPage'
  import AESsecret from '../..//js/secret.js'
  import FormStep from '../public/elBudgetFormStep'
  import FormShow from './approver/ShowForm'
    export default {
      name: "DataTable",
      components: {
        ViewPage,
        FormStep,
        FormShow
      },
      data() {
        return {
          currentPage:1,
          userName:"",
          pagesize:10,
          totalItems: 0,
          flag:false,
          select_key:'',
          data_select: '',
          options: [{
            value: 'projectId',
            label: '项目编号'
          }, {
            value: 'projectType',
            label: '项目类型'
          }, {
            value: 'projectLeader',
            label: '负责老师'
          }],
          filterType: '',
          tableData: [],
          tableDataEnd: [],
          filterTableDataEnd:[],
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          }

        }
      },
      created: function() {

        var obj = JSON.parse(sessionStorage.getItem("userinfo"));
        this.userName=obj.username;

      },
      methods:{

        /**
         * 点击待审批时调用组件方法，显示组件和传入数据
         * @param row 一个表单对象(无扩展字段)
         */
        opinionClick(row){
          this.$refs.formShow.Edit(row,this.userName);
        },
        handleSizeChange(val) {
          this.pagesize=val;
          this.query(this.currentPage,this.pagesize)
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage=val;
          this.query(this.currentPage,this.pagesize)

        },
        query(currentPage,pagesize){

          var senddata={"currentPage":currentPage,"pagesize":pagesize};
          this.$axios
            .post('/budget/select', {
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
        },
        linkClick(status){
          this.$refs.step.linkClick(status);
        }



      },
      watch:{
        'select_key': function(){

          var postdata=this.select_key;
          this.$axios
            .post('/budget/select/byid', {
              "pid":postdata
            })
            .then(successResponse => {
              if (successResponse.data.code ==200) {
                var rsp=successResponse.data.data.data;
                console.log("返回的数据:"+rsp);
                var b=AESsecret.decrypt(rsp);
                if(b!=""&&b!=null){
                  this.tableData=[
                    b
                  ];
                }else {
                  this.tableData=[]
                }

              }
            })
            .catch(failResponse => {
              console.log(failResponse.data.msg);
            })

        }

      },
      mounted: function () { this.query(1,10) }


    }
</script>

<style scoped>

</style>
