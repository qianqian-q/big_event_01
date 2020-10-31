$(function () {
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + '-' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    var q = {
        pagenum: 1,  //页码值         
        pagesize: 2,	  //每页显示多少条数据  
        cate_id: "",   //文章分类的 Id
        state: "",
    }

    var layer = layui.layer

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 分页
                renderPage(res.total)
            }
        })
    }

    var form = layui.form

    initTable()
    initcate()
    // 2.初始化分类
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
    // 4.筛选功能
    $('#form_cate').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        // 初始化文章列表
        initTable()
    })

    // 5.渲染分页
    var laypage = layui.laypage;
    function renderPage(total) {
        // 执行一个 laypage 实例
        laypage.render({
            elem: 'pageBox',
            count: total,    //数据总数
            limit: q.pagesize,//每页显示的条数。
            curr: q.pagenum, //当前页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 触发 jump :分页初始化的时候,页码改变的时候
            jump: function (obj, first) {
                q.pagenum = obj.curr;   //obj.curr 得到当前页，以便向服务端请求对应页的数据。
                q.pagesize = obj.limit; //obj.curr 得到每页显示的条数 
                //首次不执行
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 6.删除
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    initTable()
                    layer.msg('删除文章成功')
                }
            })
            layer.close(index);
        });
    })

})