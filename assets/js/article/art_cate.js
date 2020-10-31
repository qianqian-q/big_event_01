$(function () {
    // 1.文章类别列表展示 渲染
    initArtCateList()
    // 封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {

                // 传的是对象，用的是对象的属性
                var Str = template('tpl-art-cate', res)
                $('tbody').html(Str)
            }
        })
    }

    var indexAdd = null
    // 2.点击添加文章类别
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 3.事件委托  新增文章分类
    var layer = layui.layer
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                // 添加成功了 重新渲染
                initArtCateList()
                layer.msg('添加分类成功')
                layer.close(indexAdd)
            }
        })
    })

    // 4.修改展示表单
    var indexEdit = null
    var form = layui.form
    // 2.点击编辑文章类别
    $('tbody').on('click', '#btnEditCate', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        // 获取id发送 ajax请求
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    // 5.修改--提交
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message)
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })
    // 6.删除
    $('tbody').on('click','#btnDeleteCate',function(){
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, 
        function(index){
            //do something
            $.ajax({
                url:'/my/article/deletecate/'+id,
                success:function(res) {
                    if(res.status!==0) return layer.msg(res.message);
                    layer.msg(res.message)
                    initArtCateList()
                    layer.close(index);
                }
            })
          }); 
    })




})