import Vue from 'vue'
import { AES, enc, mode, pad } from 'crypto-js'
export default {


  //解密
  decrypt(word){

    var getResultsStr = enc.Hex.parse(word)
    var str = enc.Base64.stringify(getResultsStr)
    var decrypted = AES.decrypt(str, enc.Utf8.parse('20200129!#xm@837'), {iv: enc.Utf8.parse('0231345874954435'), mode: mode.CBC, padding: pad.Pkcs7})
    var results = JSON.parse(decrypted.toString(enc.Utf8))

    return results;

  }


}
