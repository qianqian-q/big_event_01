$(function () {

    // 昵称校验
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return  "昵称长度1-6位之间";
            }
        }
    })
    var layer = layui.layer
    // 获取用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res) {
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                // 把信息渲染到form表单
                console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }
    $('#btnReset').on('click',function(e){
        // 阻止表单默认行为,阻止重置
        e.preventDefault()
        // 从新用户渲染 不然会回到占位符的初始值
        initUserInfo()
    })

    // 修改用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res) {
                console.log(res);
                if(res.status!==0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }

        })
    })


})
