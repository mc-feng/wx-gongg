var fun_aes = require('./crypto-js.js');  //引用AES源码js

var key = fun_aes.CryptoJS.enc.Utf8.parse("abcdef0123456789");
//十六位十六进制数作为秘钥偏移量
var iv = fun_aes.CryptoJS.enc.Utf8.parse('abcdef0123456789');
//秘钥和偏移量后台会给前端
//封装加密
// function Encrypt(data){
//   var srcs = fun_aes.CryptoJS.enc.Utf8.parse(data)
//   var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs,key,{
//     mode: fun_aes.CryptoJS.mode.ECB,
//     padding: fun_aes.CryptoJS.pad.Pkcs7
//   })
//   return encrypted.ciphertext.toString()
// }
// //封装解密
// function Decrypt (data) {
//   var stime = new Data().getTime();
//   var decrypt = fun_aes.CryptoJS.AES.decrypt(data, key, {mode: fun_aes.CryptoJS.mode.ECB, padding: fun_aes.CryptoJS.pad.Pkcs7 });
//   var result = JSON.parse(fun_aes.CryptoJS.enc.Utf8.stringify(decrypt).toString());
//   var etime = new Date().getTime();
//   return result;
// }
//封装加密
function Encrypt(word) {
  var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
  var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { mode: fun_aes.CryptoJS.mode.ECB, padding: fun_aes.CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}
//封装解密
function Decrypt (word) {
  var decrypt = fun_aes.CryptoJS.AES.decrypt(word, key, { mode: fun_aes.CryptoJS.mode.ECB, padding: fun_aes.CryptoJS.pad.Pkcs7 });
  return fun_aes.CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
function formatString(str){
  if (typeof (str) != "string") {
    console.log('去除回车换行空格失败！参数不是字符串类型')
    return;
  }
  // str = str.replace(/\ +/g, "");//去掉空格
  str = str.replace(/[\r\n]/g, "");//去掉回车换行
  return str;
}
//暴露接口
module.exports.Encrypt = Encrypt;
module.exports.Decrypt = Decrypt;
module.exports.formatString = formatString;