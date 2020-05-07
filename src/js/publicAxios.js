import axios from 'axios'


export default {

getAxios(url,data, type, success)
{
  axios({
    url: url,
    type: type,
    dataType: "json",
    data:data,
    success: success,
    error: function (xhr) {
      console.log("请求出错" + xhr)
    }
  })
}

}
