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
        prop="userCreate"
        label="创建者"
        width="180">
      </el-table-column>

      <el-table-column
        prop="punid"
        label="项目编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="projectType"
        label="项目类别">
      </el-table-column>
      <el-table-column
        prop="sumFee"
        label="预算合计">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.status=='00013'" @click="opinionClick(scope.row)">待审批</el-link>
          <el-link type="primary" v-if="scope.row.status=='00019'" @click="linkClick(scope.row.status)">已审批</el-link>
          <el-link type="primary" v-if="scope.row.status=='00255'" @click="linkClick(scope.row.status)">执行中</el-link>
          <el-link type="primary" v-if="scope.row.status=='00963'">退回</el-link>
          <el-link type="primary" v-if="scope.row.status=='00655'" @click="linkClick(scope.row.status)" >已完成</el-link>

        </template>
      </el-table-column>
    </el-table>
    <FormStep  ref="step"></FormStep>

    <FormShow @queryinit="queryinit" ref="formShow"></FormShow>
    <FormShowOffice @queryinit="queryinit" ref="formShowOffice"></FormShowOffice>
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
  import FormShowOffice from './approver/ShowOfficeForm'
    export default {
      name: "DataTable",
      components: {
        ViewPage,
        FormStep,
        FormShow,
        FormShowOffice
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
            value: 'punid',
            label: '项目编号'
          }, {
            value: 'projectType',
            label: '项目类型'
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
         * 点击待审批时调用组件方法，显示组件和传入
         * @
         */
        opinionClick(row){

         this.queryProByid(row.punid,row.projectType);


        },
        queryinit(){
          this.query(1,10);
        },
        handleSizeChange(val) {
          this.pagesize=val;
          this.query(this.currentPage,this.pagesize)
        },
        handleCurrentChange(val) {
          this.currentPage=val;
          this.query(this.currentPage,this.pagesize)

        },
        query(currentPage,pagesize){

          this.$axios
            .get('/budget/selectAll/byStatus?'+'currentPage='+currentPage+'&'+'pageSize='+pagesize+'&status=00013').then(datasuccessRsp => {
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
        },
        queryProByid(id,projectType){
          this.$axios
            .get('/budget/selectData?'+'id='+id+'&'+'type='+projectType+'').then(datasuccessRsp => {
            if (datasuccessRsp.data.code ==200) {
              var rsp=datasuccessRsp.data.data.data;
              console.log("" +
                "返回的数据:"+rsp);
              var b=AESsecret.decrypt(rsp);
              console.log(b)
              if(b!=""&&b!=null){
                if(projectType=='专业建设预算'){
                  this.$refs.formShow.Edit(b,this.userName,this.sizeForm);
                }else  if(projectType=='办公费用'){
                  this.$refs.formShowOffice.Edit(b,this.userName,this.sizeForm);
                }
              }else {
                this.tableData=[]
              }

            }
          })
            .catch(failResponse => {
              console.log(failResponse);
            })
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
