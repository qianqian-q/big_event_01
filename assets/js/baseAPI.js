// 开发环境服务器地址
// 请求的根路径
var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
  // 1.
  options.url = baseURL + options.url

  //对需要权限的接口配置信息
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || ""
    }
  }
  // 3.拦截响应 判断身份认证信息
  options.complete = function(res) {
    var obj = res.responseJSON;
    if(obj.status == 1 && obj.message == "身份认证失败！"){
      localStorage.removeItem("token")
      location.href = "/login.html"
    }
  }

})