<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" >搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini">重置</el-button>
      </el-form-item>

      <!--增删改查的按钮--->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="open=true"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdate"
            :disabled="single"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-popconfirm
            @onConfirm="handleDelete()"
            confirmButtonText='确定删除'
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="删除"
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            slot="reference"
            :disabled="multiple"
          >删除</el-button>
          </el-popconfirm>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="info"
            icon="el-icon-upload2"
            size="mini"
          >导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
          >导出</el-button>
        </el-col>
      </el-row>





      <!--显示数据的表格-->
      <el-table   :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column label="续建" align="center" prop="conBuild" />
        <el-table-column label="年份" align="center" prop="formYear"  />
        <el-table-column label="设备金额" align="center" prop="equipmentFee" />
        <el-table-column label="装饰金额" align="center" prop="renovation"  />
        <el-table-column label="设计费" align="center" prop="designFee" width="120" />
        <el-table-column label="其他费用" align="center" prop="otherFee"/>
        <el-table-column label="合计费用" align="center" prop="sumFee"/>
        <el-table-column label="备注" align="center" prop="memo"/>
        <el-table-column label="创建时间" align="center" prop="createTime" width="160"/>
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" v-if="scope.row.status=='00011'" >草稿</el-link>
            <el-link type="primary" v-if="scope.row.status=='00013'" @click="linkClick(scope.row.status)">未审批</el-link>
            <el-link type="primary" v-if="scope.row.status=='00019'" @click="linkClick(scope.row.status)">已审批</el-link>
            <el-link type="primary" v-if="scope.row.status=='00963'" @click="linkClick(scope.row.status)">退回</el-link>
            <el-link type="primary" v-if="scope.row.status=='00655'" @click="linkClick(scope.row.status)">已完成</el-link>
            <el-link type="primary" v-if="scope.row.status=='00255'" @click="linkClick(scope.row.status)">执行</el-link>
            <el-button size="mini"  v-if="scope.row.status=='00011'">编辑</el-button>
            <el-button size="mini"v-if="scope.row.status=='00013'" >撤回</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index,scope.row.id)" v-if="scope.row.status=='00011'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--用户数据-->
      <el-dialog :title="title" :visible.sync="open" width="780px">
        <el-form :model="bean" ref="bean" :inline="true" label-width="70px">

          <el-row>
          <el-col :span="12">
          <el-form-item label="续建" prop="conBuild">
            <el-input
              v-model="bean.conBuild"
              placeholder="请输入续建"
              clearable
              size="small"
              style="width: 240px"
            />
          </el-form-item>
            </el-col>



            <el-col :span="12">
          <el-form-item label="年份" prop="formYear">
            <el-date-picker  type="year" placeholder="选择日期" v-model="bean.formYear" style="width: 100%;"></el-date-picker>
          </el-form-item>
            </el-col>



          </el-row>


          <el-col :span="12">
          <el-form-item label="设备金额" prop="equipmentFee">
            <el-input
              v-model="bean.equipmentFee"
              placeholder="请输入设备金额"
              type="number"
              clearable
              size="small"
              style="width: 240px"
            />
          </el-form-item>
          </el-col>

            <el-col :span="12">
          <el-form-item label="装修金额" prop="renovation">
            <el-input
              v-model="bean.renovation"
              placeholder="请输入装修金额"
              type="number"
              clearable
              size="small"
              style="width: 240px"
            />
          </el-form-item>
            </el-col>




          <el-col :span="12">
          <el-form-item label="设计费" prop="designFee">
            <el-input
              v-model="bean.designFee"
              placeholder="请输入设计费"
              type="number"
              clearable
              size="small"
              style="width: 240px"
            />
          </el-form-item>
          </el-col>

          <el-col :span="12">
          <el-form-item label="其他费用" prop="otherFee">
            <el-input
              v-model="bean.otherFee"
              placeholder=""
              clearable
              type="number"
              size="small"
              style="width: 240px"
            />
          </el-form-item>
          </el-col>


          <el-col :span="12">
          <el-form-item label="合计" prop="sumFee">
            <el-input
              v-model="bean.sumFee"
              placeholder="合计"
              clearable
              size="small"
              type="number"
              style="width: 240px"
            />
          </el-form-item>
          </el-col>

          <el-col :span="12">
          <el-form-item label="备注" prop="memo">
            <el-input
              v-model="bean.memo"
              placeholder="备注"
              clearable
              size="small"
              style="width: 240px"
            />
          </el-form-item>
          </el-col>

        </el-form>


        <div slot="footer" class="dialog-footer" style="">
          <el-button type="primary" @click="submitForm(undefined)">确 定</el-button>
          <el-button @click=" open=false">取 消</el-button>
        </div>


      </el-dialog>
      <FormStep ref="step"></FormStep>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>

    </el-row>


  </div>
</template>

<script>

  import AES from '../../../js/secret'
  import FormStep from '../../public/elBudgetFormStep'
export default {
  name: "Table",
  components: {FormStep},
  data() {
    return {
      open: false,
      title:"新增预算",
      //表格数据
      tableData:[],
      currentPage:1,
      pagesize:10,
      totalItems: 0,
      rowObeject:undefined,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      bean:{
        id:undefined,
        conBuild:"",
        formYear:"",
        equipmentFee:"",
        renovation:"",
        designFee:"",
        otherFee:"",
        sumFee:"",
        memo:"",
        ext:"",
        createTime:"",
        status:"",
        createUser:""
     },
      createUser:""

    }
    },
    methods:{
      /** 提交按钮 */
      submitForm: function(id) {

            if (this.bean.id != undefined) {
              this.$axios
                .post('/budget/lbBudget/updatefrom',this.bean)
                .then(successResponse => {
                  if (successResponse.data.code == 200) {
                    this.$message({
                      message: '修改预算成功!',
                      type: 'success'
                    });
                    this.clearFrom();
                    this.open=false;
                    this.query(this.currentPage,this.pagesize);
                  }else {
                    this.$message({
                      message: successResponse.data.msg,
                      type: 'error'
                    });
                  }
                })
                .catch(failResponse => {
                  this.$message({
                    message: '添加失败',
                    type: 'error'
                  });
                })

            } else {
              this.$axios
                .post('/budget/lbBudget/addfrom',this.bean)
                .then(successResponse => {
                  if (successResponse.data.code == 200) {
                    this.$message({
                      message: '添加预算成功!',
                      type: 'success'
                    });
                    //清理数据，关闭窗口
                    this.clearFrom();
                    this.open=false;
                    this.query(1,10);
                  }else {
                    this.$message({
                      message: successResponse.data.msg,
                      type: 'error'
                    });
                  }
                })
                .catch(failResponse => {
                  this.$message({
                    message: '添加失败',
                    type: 'error'
                  });
                })
            }


          },
      query(currentPage,pagesize){

        this.$axios
          .get('/budget/lbBudget/select',{
            params:{
              username:this.bean.createUser,
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
            }else {
              this.tableData=[]
            }

          }
        })
          .catch(failResponse => {
            console.log(failResponse);
          })

      },
      clearFrom(){
        this.bean=[]
        this.rowObeject=undefined;
      },
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id);
        this.single= selection.length != 1;
        this.multiple = !selection.length;


      },
      linkClick(status){

        this.$refs.step.linkClick(status);


      },
      handleDelete() {
        console.log(this.ids)

        this.$axios
          .post('/budget/lbBudget/delete/form',{
            ids:this.ids
          }).then(datasuccessRsp => {
          if (datasuccessRsp.data.code ==200) {
            this.msgSuccess("删除成功!");
            this.query(this.currentPage,this.pagesize)
          }
        })
          .catch(failResponse => {
            console.log(failResponse);
          })

      },
      handleUpdate(){

        var id=this.ids[0];
        console.log(id)
        this.title="修改预算";
        this.$axios
          .get('/budget/budget/lbBudget/selectByid',{
            params:{
              id:id,
            }
          }).then(datasuccessRsp => {
          if (datasuccessRsp.data.code ==200) {
            var rsp=datasuccessRsp.data.data.data;
            var b=AES.decrypt(rsp);
            if(b!=""&&b!=null){
              this.bean=b;
              this.open=true;
            }else {
              this.rowObeject=undefined;
            }

          }
        })
          .catch(failResponse => {
            console.log(failResponse);
          })
      },
      queryByid(id){
        this.$axios
          .get('/budget/budget/lbBudget/selectByid',{
            params:{
              id:id,
            }
          }).then(datasuccessRsp => {
          if (datasuccessRsp.data.code ==200) {
            var rsp=datasuccessRsp.data.data.data;
            var b=AES.decrypt(rsp);
            if(b!=""&&b!=null){
              this.bean=this.rowObeject;
              this.open=true;
            }else {
              this.rowObeject=undefined;
            }

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
        this.currentPage=val;
        this.query(this.currentPage,this.pagesize)

      },

   },
   created () {

   },
  mounted: function () {
    this.createUser=JSON.parse(sessionStorage.getItem("userinfo")).username;
    this.bean.createUser =this.createUser;
    this.query(1,10);
  }

}
</script>


<style scoped="css">


   .mb8 {
     margin-bottom: 8px;
   }



</style>
