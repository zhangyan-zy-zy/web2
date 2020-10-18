$(function () {
    getMessage();
    // 点击按钮实现退出的功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log(1);
            // 退出token
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

// 获取用户信息
function getMessage() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            // 成功运行函数
            render(res.data);

        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
        //         // 强制清除token的信息
        //         localStorage.removeItem('token');
        //         // 页面跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}


function render(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎  ' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show()
    }

}