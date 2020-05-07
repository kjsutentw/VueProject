<template>
  <view-page>
    <!-- 左按钮区 -->
    <template slot="left-field">
      <OfficeFreeForm></OfficeFreeForm>
    </template>
    <!-- 搜索框 -->
    <template slot="search-field">
      <el-input type="number" suffix-icon="el-icon-search" v-model="select_key" placeholder="请输入搜索内容" ></el-input>
    </template>



    <!-- 右按钮区 -->
    <template slot="right-field">
      <el-button type="primary" icon="el-icon-refresh" @click="query(1,10)">刷新</el-button>


      <input class="file" name="file" type="file" accept="xlsx" @change="upload"/>

      <el-button type="success" icon="el-icon-upload2">导出</el-button><br>


    </template>
    <!-- 表格区 -->
    <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column
        prop="name"
        label="品名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="count"
        label="数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="price"
        label="预算金额">
      </el-table-column>
      <el-table-column
        prop="department"
        label="填报部门">
      </el-table-column>
      <el-table-column
        prop="feeExplain"
        label="说明">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="备注"
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
          <el-button size="mini"v-if="scope.row.status=='00013'" @click="recall(scope.row.id,scope.row)">撤回</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row.projectId)" v-if="scope.row.status=='00011'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <OfficeFreeUpdataForm ref="mychild"></OfficeFreeUpdataForm>
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
  import ViewPage from '../../main/ViewPage'
  import OfficeFreeForm from './OfficeFreeForm'
  import OfficeFreeUpdataForm from './OfficeFreeUpdataForm'
  import AES from '../../../js/secret'
  import FormStep from '../../public/elBudgetFormStep'
  export default {
    name: 'OfficeExpensesDataTable',
    components: {
      FormStep,
      OfficeFreeUpdataForm,
      OfficeFreeForm,
      ViewPage
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
        tableData:[]


      }
    },methods:{

      opinionClick(row){

      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {


      },
      query(currentPage,pagesize){

        this.$axios
          .get('/budget/officeForm/select',{
            params:{
              username:this.username,
              currentPage: currentPage,
              pagesize:pagesize
            }
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
          .post('/budget/officeForm/update/status?'+'punid='+punid+'&'+'status=00011').then(datasuccessRsp => {
          if (datasuccessRsp.data.code ==200) {
            row.status='00011';
            this.query(this.currentPage,this.pagesize);
          }
        })
          .catch(failResponse => {
            console.log(failResponse);
          })
      }
      ,
      upload(){

      },
      handleEdit(row,index){
        this.$refs.mychild.Edit(row,index);
      }
    },
    mounted: function () {
      this.username = JSON.parse(sessionStorage.getItem("userinfo")).username;
      this.query(1,10)
    }




  }
</script>

<style scoped>

</style>
