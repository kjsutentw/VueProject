
export default {


/**
 * 创建时间
 * @returns {string}
 */
getNowTime(){
  var mydate = new Date();
  var str = "" + mydate.getFullYear() + "年";
//判断小于是是直接小于10月就可以了
  if(mydate.getMonth()<10){
    str +="0"+ (mydate.getMonth() + 1) + "月";
  }else{
    str += (mydate.getMonth() + 1) + "月";
  }
//判断小于是是直接小于10日就可以了
  if(mydate.getDate()<10){
    str += "0"+mydate.getDate() + "日";
  }else{
    str += mydate.getDate() + "日";
  }
  str += mydate.getHours() + "时";
  str += mydate.getMinutes() + "分";
  str += mydate.getSeconds();
  return str;
},


/**
 * 由时间戳变成文字日期
 */
TimeToString(date){

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();
    return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' +
      (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
      + ':' + (String(second).length > 1 ? second : '0' + second)

}



}
