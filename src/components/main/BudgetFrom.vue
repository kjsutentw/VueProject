<template>

  <el-popover
    placement="right"
    width="800"
    trigger="click"
    v-model="addFromVisable"
  >

    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item >
        项目类别:<el-input  style="width: 15%" v-model="sizeForm.projectType"></el-input>
        填报部门:
        <el-select v-model="sizeForm.department" placeholder="请选择申报部门">
          <el-option label="部门一" value="部门一"></el-option>
          <el-option label="部门二" value="部门二"></el-option>
        </el-select>
        课题负责人:<el-input  style="width: 15%" v-model="sizeForm.projectLeader"></el-input>
      </el-form-item>
      <el-form-item >
        项目名称:<el-input  style="width: 15%" v-model="sizeForm.projectName"></el-input>
        项目编号:<el-input  style="width: 15%" v-model="sizeForm.projectId"></el-input>
      </el-form-item>
      <el-form-item >
        设备费:<el-input  style="width: 15%" v-model="sizeForm.equipmentFee"></el-input>
        材料费:<el-input  style="width: 15%" v-model="sizeForm.materialCost"></el-input>
        会议费:<el-input  style="width: 15%" v-model="sizeForm.conferenceFee"></el-input>


      </el-form-item>
      <el-form-item>
        差旅费:<el-input  style="width: 15%" v-model="sizeForm.travelFee"></el-input>
        专业课题建设费:<el-input  style="width: 15%" v-model="sizeForm.professionalClassFee"></el-input>
        版面费:<el-input  style="width: 15%" v-model="sizeForm.pageFee"></el-input>

      </el-form-item>
      <el-form-item>
        劳务费:<el-input  style="width: 15%" v-model="sizeForm.labourServicesFee"></el-input>
        专家咨询费:<el-input  style="width: 15%" v-model="sizeForm.expertConsultationFee"></el-input>
        资料费:<el-input  style="width: 15%" v-model="sizeForm.dataFee"></el-input>

      </el-form-item>

      <el-form-item>
        资源库、软件建设费:<el-input  style="width: 15%" v-model="sizeForm.resourceBaseFee"></el-input>
        其他费用:<el-input  style="width: 15%" v-model="sizeForm.otherFee"></el-input>
        经费合计:<el-input  style="width: 15%" v-model="sizeForm.sumFee" ></el-input>
      </el-form-item>


      <el-form-item >
       <h   v-for="(val,index) in Fieldinput" :key="index">{{val.name}}
       <el-input style="width: 15%" v-model="val.value" ></el-input>
         <p v-if="(index+1)%3==0"></p>
       </h>
      </el-form-item>




      <el-form-item  size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="clearFrom">取消</el-button>
        <el-button  @click="SubmitTest">赋值测试</el-button>
      </el-form-item>
    </el-form>

    <el-button slot="reference">添加预算表单</el-button>
  </el-popover>




</template>

<script>


  export default {
    name: "BudgetFrom",
    data () {
      return {
        addFromVisable: false,
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
          "conferenceFee": "",
          "professionalClassFee": "",
          "pageFee": "",
          "labourServicesFee": "",
          "dataFee": "",
          "resourceBaseFee": "",
          "otherFee": "",
          "sumFee": "",
          "travelFee": "",
          "expertConsultationFee": "",
          "createUser":""
        }
      };
    },
    created: function() {

      this.$axios
        .post('/budget/queryFieldAll', {
        })
        .then(successResponse => {
          if (successResponse.data.code == 200) {
            this.Fieldinput=successResponse.data.data;
          }
        })
        .catch(failResponse => {
          console.log(data.msg);
        })


    },
    methods: {
      onSubmit () {
        var obj = JSON.parse(sessionStorage.getItem("userinfo"));
        this.sizeForm.createUser=obj.username;
        var budgetfromData = this.sizeForm;
        var extenData=this.Fieldinput;
        this.$axios
          .post('/budget/addfrom', {
            budgetfromData:budgetfromData,
            extenData:extenData
          })
          .then(successResponse => {
            if (successResponse.data.code == 200) {
              this.$message({
                message: '添加预算成功!',
                type: 'success'
              });
              this.clearFrom();
            }
          })
          .catch(failResponse => {
            console.log(data.msg);
          })
      },
      SubmitTest () {
        var ranid = parseInt(Math.random() * 1000000000 + 1);
        this.sizeForm = {
          "projectType": "400",
          "department": "200",
          "projectLeader": "陆涛",
          "projectName": "test项目数据",
          "projectId": ranid,
          "equipmentFee": 200,
          "materialCost": 200,
          "conferenceFee": 200,
          "professionalClassFee": 200,
          "pageFee": 200,
          "labourServicesFee": 200,
          "dataFee": 200,
          "resourceBaseFee": 200,
          "otherFee": 200,
          "sumFee": 3000,
          "expertConsultationFee": 200,
          "travelFee": 200
        }
      },
      clearFrom () {
        this.sizeForm = {
          "projectType": "",
          "department": "",
          "projectLeader": "",
          "projectName": "",
          "projectId": "",
          "equipmentFee": "",
          "materialCost": "",
          "conferenceFee": "",
          "professionalClassFee": "",
          "pageFee": "",
          "labourServicesFee": "",
          "dataFee": "",
          "resourceBaseFee": "",
          "otherFee": "",
          "sumFee": "",
          "travelFee": "",
          "expertConsultationFee": ""
        }
        this.addFromVisable = false
      }

    }

  }



</script>

<style scoped>

</style>
