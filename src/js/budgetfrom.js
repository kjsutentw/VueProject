


export  default {

  getbudgetExtend(a){
    a.$axios
      .post('/budget/queryFieldAll', {
      })
      .then(successResponse => {
        if (successResponse.data.code == 200) {
          return successResponse.data.data;
        }
      })
      .catch(failResponse => {
        console.log(failResponse);
      })

  }

}
