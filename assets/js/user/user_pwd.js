$(function () {
    var form = layui.form;
    var layer=layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            if (value === $('[name = oldPwd]').val()) {
                return "新旧密码一致"
            }
        },

        repwd: function (value) {
            if (value !== $('[name =newPwd]').val()) {
                return "密码应该一致"
            }
        }
    })



    // 发起重置密码框的请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('重置密码失败')
                }
                layer.msg('更新密码成功！');
                $('.layui-form')[0].reset()
            }
        })
    })
})