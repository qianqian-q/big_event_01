$(function () {
    // 1.
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    /*2. 自定义表单验证规则 */
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd1 = $('.reg-box input[name=password]').val()
            if (pwd1 !== value) {
                return '两次密码不一致！'
            }
        },
    })

    // 3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    // return alert(res.message)
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                $('#form_reg')[0].reset()
                $('#link_login').click()
            }
        })
        
    })

    // 4.登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.message;
                layer.message
                console.log(res.token);
                console.log('1');
                localStorage.setItem('token', res.token)
                console.log(res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })

})