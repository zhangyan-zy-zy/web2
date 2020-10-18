$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "请输入1-6位的字符"
            }
        }
    })

    initUserinfo()
    var layer = layui.layer;
    // 获取用户信息
    function initUserinfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 获取表单数值
                form.val('userinfo', res.data)
            }
        })
    }


    // 重置表单信息
    $('#btnreset').on('click', function (e) {
        e.preventDefault();
        initUserinfo()
    })



    // 进行信息修改的提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
              layer.msg('修改用户信息成功！')
              window.parent.getMessage()
            }
        })
    })
})