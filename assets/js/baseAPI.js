// 开发环境服务器地址
// 请求的根路径
var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(options) {
  options.url = baseURL + options.url
})