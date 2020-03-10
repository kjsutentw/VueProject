<template>
  <view-page>
    <!-- 左按钮区 -->
    <template slot="left-field">
      <BudgetFrom></BudgetFrom>
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
      <el-button type="primary" icon="el-icon-refresh" @click="query(1,10)">刷新</el-button>




      <input class="file" name="file" type="file" accept="xlsx" @change="upload"/>

      <el-button type="success" icon="el-icon-upload2" @click="exportToExcel()">导出</el-button><br>


    </template>
    <!-- 表格区 -->
    <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column
        prop="projectId"
        label="预算唯一编号"
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
        label="经费合计"
      width="140">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.status=='00011'" >草稿</el-link>
          <el-link type="primary" v-if="scope.row.status=='00013'" @click="linkClick(scope.row.status)">未审批</el-link>
          <el-link type="primary" v-if="scope.row.status=='00019'" @click="linkClick(scope.row.status)">已审批</el-link>
          <el-link type="primary" v-if="scope.row.status=='00963'" @click="linkClick(scope.row.status)">退回</el-link>
          <el-link type="primary" v-if="scope.row.status=='00655'" @click="linkClick(scope.row.status)">已完成</el-link>
          <el-link type="primary" v-if="scope.row.status=='00255'" @click="linkClick(scope.row.status)">执行</el-link>
          <el-button size="mini" @click="handleEdit(scope.row,scope.$index)"  v-if="scope.row.status=='00011'">编辑</el-button>
          <el-button size="mini"v-if="scope.row.status=='00013'" @click="recall(scope.row.projectId,scope.row)">撤回</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row.projectId)" v-if="scope.row.status=='00011'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <BudgetFromUpdata ref="mychild"></BudgetFromUpdata>
    <FormStep ref="step"></FormStep>

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
  import ViewPage from '../main/ViewPage'
  import BudgetFrom from '../main/BudgetFrom'
  import AES from '../../js/secret'
  import BudgetFromUpdata from '../main/BudgetFromUpdata'
  import FormStep from '../public/elBudgetFormStep'
    export default {
      name: "OrdinaryDataTable",
      components: {
        ViewPage,
        BudgetFrom,
        BudgetFromUpdata,
        FormStep
      },
      data() {
        return {
          username:"",
          currentPage:1,
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
        this.username=obj.username;

      },
      methods:{
        upload(e){

          let file = e.target.files[0];
          let param = new FormData(); //创建form对象
          param.append('file',file);//通过append向form对象添加数据
          param.append('username', this.username)
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头

          this.$axios.post('/budget/upload', param, config).then(datasuccessRsp => {
            if (datasuccessRsp.data.code ==200) {
              this.$message.success({
                message: '导入成功!'
              });

            }else {
              this.$message.error({
                message: datasuccessRsp.data.msg
              });
            }
          }).catch(failResponse => {
            console.log(failResponse);
          })



        },
        handleEdit(row, index) {
          this.$refs.mychild.Edit(row,index);
        },
        handleDelete(index,punid) {

          this.$axios
            .post('/budget/delete/form', {
              punid:punid
            }).then(datasuccessRsp => {
            if (datasuccessRsp.data.code ==200) {
              this.tableData.splice(index, 1)
            }
          })
            .catch(failResponse => {
              console.log(failResponse);
            })

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

          var senddata={"currentPage":currentPage,"pagesize":pagesize,"username":this.username};
          this.$axios
            .post('/budget/or/select', {
              senddata
            }).then(datasuccessRsp => {
            if (datasuccessRsp.data.code ==200) {
              var rsp=datasuccessRsp.data.data.data;
              console.log("" +
                "返回的数据:"+rsp);
              var b=AES.decrypt(rsp);
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
        recall(punid,row){

          this.$axios
            .post('/budget/update/status', {
              punid:punid,
              status:"00011"
            }).then(datasuccessRsp => {
            if (datasuccessRsp.data.code ==200) {
              row.status='00011';
              this.query(this.currentPage,this.pagesize);
            }
          })
            .catch(failResponse => {
              console.log(failResponse);
            })
        },
        exportToExcel(){
          //excel数据导出
          require.ensure([], () => {
            const {
              export_json_to_excel
            } = require('../../js/Export2Excel');
            const tHeader = ['项目类型','部门', '项目负责人', '项目名','项目编号', '设备费', '材料费','会议费','差旅费'
            ,'专业课程费','纸张费','劳务费','专家咨询费','资料费','资源费','其它费用','总和'
            ];
            const filterVal = ['projectType', "department", "projectLeader","projectName","projectId","equipmentFee","materialCost",
              "conferenceFee","travelFee","professionalClassFee","pageFee","labourServicesFee","expertConsultationFee",
              "dataFee","resourceBaseFee","otherFee",'sumFee'];

            const list = this.tableData;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '列表excel');
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
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
