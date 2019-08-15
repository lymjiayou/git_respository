/**
 * Created by lysp on 2018/9/4.
 */

$(function () {
    var http=Http;
    var jump_to_service=Http_jump_to_service;
    $(".jump_to_service").click(function () {
        window.open(jump_to_service);
    })
//    解析登录成功数据
    //解析json返回的用户名
    // var login_str =""; //获取本地存储的数字对象
    // var obj="";
    // var u_id=0;
    // var s_id=0;
    //一开始是未登录的状态，所以window.sessionStorage.u_id=0
    // window.sessionStorage.u_id="";
    // window.sessionStorage.s_id="";
    $("#exit").click(function () {
        $.ajax({
            type:"POST",
            beforeSend: function(request) {
                var cooinfo=getCookie("XSRF-TOKEN");
                request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
            },//提交方式
            url:http+"logout",
            xhrFields:{withCredentials: true},
            success:function (data) {
                // console.log(data);
                window.location.reload();
            }
        })
        // sessionStorage.removeItem("obj_user"); //localStorage.removeItem("key");//删除名称为“key”的信息。
        // window.sessionStorage.obj_user="";
        // window.sessionStorage.u_id="";
        // window.sessionStorage.s_id="";
        // u_id="";
        // s_id="";

        // console.log(u_id)
        // $("#username").attr("href","login.html").html("你好，请登录");
        // $("#exit").hide()
        // $("#register").show();
        // $(".user_profit").show();
        // $(".shop_car_num").val(0);

    })
    //window.sessionStorage.obj_user==null 表示就没有这个东西
    // if (window.sessionStorage.obj_user==""||window.sessionStorage.obj_user==null) {
    //     console.log("no user!");
    // } else {
    //     login_str= window.sessionStorage.obj_user;
    //     obj = $.parseJSON(login_str); //再将数组转为json
    //     $("#username").attr("href", "#").html(obj.data.username);
    //     $("#register").hide();
    //     $("#exit").show();
    //     window.sessionStorage.u_id=obj.data.id;
    //     window.sessionStorage.s_id=obj.data.session;
    //     u_id=obj.data.id;
    //     s_id=obj.data.session;
    //     //get购物车数量
    //
    // }
    $.ajax({
        type:"get",
        url:http+"cart/count",
        xhrFields:{withCredentials: true},
        success:function (num) {
            console.log(num)
            if(num.msg=="SUCCESS"){
                var shopcar_num=num.data;
                console.log(shopcar_num)
                $(".shop_car_num").val(shopcar_num);
            }

        }
    })
    $.ajax({
        url:http+"info",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                $(".contact_server").click(function () {
                    window.open("http://wpa.qq.com/msgrd?v=3&uin=362867994&site=qq&menu=yes");
                })
                $("#username").attr("href", "individual_index.html").html(data.data.username);
                $("#register").hide();
                $("#exit").show();

            }else {
                $(".shop_car_num").val(0);
                $(".contact_server").click(function () {
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                })
            }
        }
    })

    $("#supermall").click(function () {
        window.sessionStorage.category_id=488;
        window.sessionStorage.first_id=488;
        window.sessionStorage.first_index=15;
        window.sessionStorage.first_name="农副产品";
        window.sessionStorage.second_id="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_id="";
        window.sessionStorage.third_name="";
        window.sessionStorage.search_keywords="";
        window.sessionStorage.brand='';
        window.sessionStorage.brand_name='';

    })

})