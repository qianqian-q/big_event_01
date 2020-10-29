$(function(){
    // 获取用户基本信息
    getUserInfo()

    // 退出
    var layer = layui.layer
    $('#btnLogout').on('click',function(){
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            // 删除token
            localStorage.removeItem("token")
            // 跳转
            location.href = '/login.html'
            layer.close(index);
          });
    })
})
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        /* headers:{
            // 重新登录
            Authorization: localStorage.getItem("token")||""
        }, */
        success:function(res){
            console.log(res);
            if(res.status!==0){
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染头部信息
            renderAvatar(res.data)
        },
        
    })
}

function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;"+name)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avata').hide()
    }else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avata').show().html(first)
    }
}