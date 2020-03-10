<template>

  <el-dialog title="审批"  :visible.sync="editFormVisible"
             width="65%"
             center >

  <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
    <el-form-item >
      项目类别:<el-input  style="width: 15%" v-model="sizeForm.projectType"></el-input>
      填报部门:
      <el-select v-model="sizeForm.department" placeholder="请选择申报部门">
        <el-option label="部门一" value="部门一"></el-option>
        <el-option label="部门二" value="部门二"></el-option>
      </el-select>
      课题负责人:<el-input  style="width: 15%" v-model="sizeForm.projectLeader"></el-input>
      项目名称:<el-input  style="width: 15%" v-model="sizeForm.projectName"></el-input>

    </el-form-item>
    <el-form-item >
      项目编号:<el-input  :disabled="true" style="width: 15%" v-model="sizeForm.projectId"></el-input>
      设备费:<el-input  style="width: 15%" v-model="sizeForm.equipmentFee"></el-input>
      材料费:<el-input  style="width: 15%" v-model="sizeForm.materialCost"></el-input>
      会议费:<el-input  style="width: 15%" v-model="sizeForm.conferenceFee"></el-input>


    </el-form-item>
    <el-form-item>
      差旅费:<el-input  style="width: 15%" v-model="sizeForm.travelFee"></el-input>
      专业课题建设费:<el-input  style="width: 15%" v-model="sizeForm.professionalClassFee"></el-input>
      版面费:<el-input  style="width: 15%" v-model="sizeForm.pageFee"></el-input>
      劳务费:<el-input  style="width: 15%" v-model="sizeForm.labourServicesFee"></el-input>
    </el-form-item>
    <el-form-item>

      专家咨询费:<el-input  style="width: 15%" v-model="sizeForm.expertConsultationFee"></el-input>
      资料费:<el-input  style="width: 15%" v-model="sizeForm.dataFee"></el-input>
      资源库、软件建设费:<el-input  style="width: 15%" v-model="sizeForm.resourceBaseFee"></el-input>
      其他费用:<el-input  style="width: 15%" v-model="sizeForm.otherFee"></el-input>
    </el-form-item>

    <el-form-item>
      经费合计:<el-input  style="width: 25%" v-model="sizeForm.sumFee"></el-input>
    </el-form-item>

    <el-form-item >
      <h   v-for="(val,index) in Fieldinput" :key="index">{{val.name}}
        <el-input style="width: 15%" v-model="val.fieldValue" ></el-input>
        <p v-if="(index+1)%3==0"></p>
      </h>
    </el-form-item>




    <el-form-item label="办理意见" prop="desc">
      <el-input type="textarea"  rows="12" cols="15" v-model="formOpinion"></el-input>
    </el-form-item>

    <el-form-item label="附件材料" >
      <el-input  type="file"  style="width: 30%"  ></el-input>
      审批人:<el-input  type="text"  style="width: 30%" v-model="userName"></el-input>
    </el-form-item>

    <el-form-item  size="large">
      <el-button type="primary" v-on:click="UpdataSubmit">通过</el-button>
      <el-button type="warning">退回</el-button>
      <el-button @click.native="editFormVisible = false" >取消</el-button>
    </el-form-item>


  </el-form>




  </el-dialog>

</template>



<script>

  import AESsecret from '../../../js/secret.js'
  export default{
    name: "ShowForm",
    data() {
      return {
        editFormVisible:false,
        formOpinion:"",//审批意见
        userName:"",
        Fieldinput:[

        ],
        sizeForm: {
          "projectType": "",
          "department": "",
          "projectLeader": "",
          "projectName": "",
          "projectId": "",
          "equipmentFee": "",
          "materialCost": "",
          "conferenceFee":"" ,
          "professionalClassFee":"",
          "pageFee":"",
          "labourServicesFee":"",
          "dataFee":"" ,
          "resourceBaseFee":"" ,
          "otherFee":"" ,
          "sumFee":"" ,
          "travelFee":"" ,
          "expertConsultationFee":"",
          "createTime":"",
          "createUser":"",
          "status":""
        }
      };
    },
    methods: {
      UpdataSubmit() {
        this.sizeForm.status="00013";
        var data=this.sizeForm;
        this.$axios
          .post('/budget/updatafrom', {
            data
          })
          .then(successResponse => {
            if (successResponse.data.code ==200) {
              this.sizeForm={}
              this.$message({
                message: '修改成功!',
                type: 'success'
              });
              this.editFormVisible=false
            }
          })
          .catch(failResponse => {
            console.log(data.msg);
          })
      },
      Edit(row,userName){
        this.editFormVisible=true
        this.sizeForm =row
        this.userName=userName;

        this.title=this.sizeForm.createUser;

        this.$axios
          .post('/budget/selectExtend/bypid', {
            pid:row.projectId
          })
          .then(successResponse => {
            if (successResponse.data.code ==200) {
              var b=AESsecret.decrypt(successResponse.data.data.data);
              console.log(b.data)
              this.Fieldinput=b.data;

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

</style>
