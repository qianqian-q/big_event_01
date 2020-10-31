$(function () {
    // 初始化分类
    var layer = layui.layer
    var form = layui.form
    initcate()
    function initcate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(resmessage);
                // 赋值,渲染
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#chooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 5.设置图片
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0]
        if (file == undefined) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 6.设置状态
    var state = '已发布'
    /* $('#btnsave1').on('click',function(){
        state = '已发布'
    }) */
    $('#btnsave2').on('click', function () {
        state = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        // 创建fd对象
        var fd = new FormData(this)
        fd.append('state', state)
        console.log(fd);
        
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       
                fd.append('cover_img',blob)
                console.log(...fd);
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData:false,
            success:function(res) {
                if(res.status!==0) return layer.msg(res.message)
                layer.msg('发布文章成功')
                // 跳转
                // location.href = '/article/art_list.html'
                setTimeout(function(){
                    window.parent.document.getElementById("art_list").click()
                },1500)
                
            }
        })
    }
})