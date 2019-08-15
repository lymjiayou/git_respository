/**
 * Created by MY on 2018/10/2.
 */
$(function () {
 // var http="http://129.28.67.53/qinwutong/";
 //    var http="http://120.78.188.220/qinwutong/";
    var http=Http;


    $("#password1").keydown(function() {

        if (event.keyCode == "13") {//keyCode=13是回车键

            $('#btn_login1').click();

        }
    });
    $("#username1").keydown(function() {

        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#btn_login1').click();
        }
    });
    $("#password2").keydown(function() {

        if (event.keyCode == "13") {//keyCode=13是回车键

            $('#btn_login2').click();

        }
    });
    $("#username2").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('#btn_login2').click();
        }
    });

    //个人登录界面实现登陆
    $("#btn_login1").click(function () {
        //1.取到输入框的数据
        var user1=$("#username1").val();
        var pwd1=hex_md5($("#password1").val());
        if(user1 == "" || $("#password1").val()== ""){
            console.log(1111);
            $(".modal-body").html("用户名或密码不能为空！")
            $("#login_verify_Modal").modal()
        }else {
            $.ajax({
                url:http+"login",
                data:JSON.stringify({"username":user1,"password":pwd1}),   //提交数据
                type:"POST",
                beforeSend: function(request) {
                    var cooinfo=getCookie("XSRF-TOKEN");
                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                    },//提交方式
                xhrFields:{withCredentials: true},
                async:false,
//                         dataType:"json", //返回类型设置为jsonp 为了解决跨域问题
                contentType:"application/json;charset=UTF-8",
                success:function (data) {
                    console.log(data)
                    if(data.msg=="SUCCESS"){
                        if(data.data.type==2){
                            $(".login_fail").show();
                            $(".login_fail_text1").text("您的账号为企业账号,请在企业入口登录!");
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
                                }
                            })

                        }else {
                            // window.sessionStorage.obj_user = JSON.stringify(data);
                            window.location.href="../index.html";
                        }

                    }else {
                        console.log(1233)
                        $(".modal-body").html(data.error)
                        $("#login_verify_Modal").modal()
                        $(".login_fail").show();
                        $(".login_fail_text1").text(data.error)
                    }

                    // if (data.msg=="FAIL"){
                    //     $(".modal-body").html(data.error);
                    //     $("#login_verify_Modal").modal();
                    //     $(".login_fail").show();
                    //     $(".login_fail_text1").text(data.error)
                    // }else {
                    //
                    //     if(data.data.type==2){
                    //         $(".login_fail").show();
                    //         $(".login_fail_text1").text("您的账号为企业账号,请在企业入口登录!")
                    //     }else if(data.data.certified==0){
                    //         $(".login_fail").hide();
                    //         $(".modal-body").html("您的登录账号正在审核中")
                    //         $("#login_verify_Modal").modal()
                    //         $("#login_verify_Modal").on('hide.bs.modal', function () {
                    //             window.sessionStorage.obj_user = JSON.stringify(data);
                    //             window.location.href="../index.html";
                    //         })
                    //     }else if(data.data.certified==1){
                    //         window.sessionStorage.obj_user = JSON.stringify(data);
                    //         window.location.href="../index.html";
                    //     }else if(data.data.certified==2){
                    //         $(".login_fail").hide();
                    //         $(".modal-body").html("您的登录账号未通过审核，如有需要，请联系勤务通平台管理员")
                    //         $("#login_verify_Modal").modal();
                    //         $("#login_verify_Modal").on('hide.bs.modal', function () {
                    //             window.sessionStorage.obj_user = JSON.stringify(data);
                    //             window.location.href="../index.html";
                    //         })
                    //
                    //     }
                    //
                    // }
                }
            });
        }


        //   2.验证数据，从数据库调数据 用ajax


    });
    //企业登录
    $("#btn_login2").click(function () {
        //1.取到输入框的数据
        var user2=$("#username2").val();

        var pwd2=hex_md5($("#password2").val());
        if(user2 == "" ||  $("#password2").val()== ""){
            $(".modal-body").html("用户名或密码不能为空！")
            $("#login_verify_Modal").modal()
            // alert("用户名或密码不能为空！");
            // return false;
        }else {
            $.ajax({
                url:http+"login",
                data:JSON.stringify({"username":user2,"password":pwd2}),   //提交数据
                type:"POST",
                beforeSend: function(request) {
                    var cooinfo=getCookie("XSRF-TOKEN");
                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                    },//提交方式
                contentType:"application/json;charset=UTF-8",
                xhrFields:{withCredentials: true},
                success:function (data) {
                    console.log(data);
                    if(data.msg=="SUCCESS"){
                        if(data.data.type==1){
                            $(".login_fail").show();
                            $(".login_fail_text2").text("您的账号为个人账号,请在个人入口登录!");
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
                                }
                            })

                        }else {
                            // window.sessionStorage.obj_user = JSON.stringify(data);
                            window.location.href="../index.html";
                        }

                    }else {
                        $(".modal-body").html(data.error)
                        $("#login_verify_Modal").modal()
                        $(".login_fail").show();
                        $(".login_fail_text2").text(data.error)
                    }
                    // if (data.msg=="FAIL"){
                    //     $(".modal-body").html(data.error)
                    //     $("#login_verify_Modal").modal()
                    //     $(".login_fail").show();
                    //     $(".login_fail_text2").text(data.error);
                    // }else {
                    //     console.log(data.data.certified)
                    //     if(data.data.type==1){
                    //         $(".login_fail").show();
                    //         $(".login_fail_text2").text("您的账号为个人账号,请在个人入口登录!");
                    //         // $(".modal-body").html("您的账号为个人账号,请在个人入口登录!")
                    //         // $("#login_verify_Modal").modal();
                    //     }else if(data.data.certified==0){
                    //         $(".login_fail").hide();
                    //         $(".modal-body").html("您的登录账号正在审核中")
                    //         $("#login_verify_Modal").modal();
                    //         $("#login_verify_Modal").on('hide.bs.modal', function () {
                    //             window.sessionStorage.obj_user = JSON.stringify(data);
                    //             window.location.href="../index.html";
                    //         })
                    //     }else if(data.data.certified==1){
                    //         // console.log(data);
                    //         $(".login_fail").hide();
                    //         window.sessionStorage.obj_user = JSON.stringify(data);
                    //
                    //         window.location.href="../index.html";
                    //     }else if(data.data.certified==2){
                    //         $(".login_fail").hide();
                    //         $(".modal-body").html("您的登录账号未通过审核，如有需要，请联系勤务通平台管理员")
                    //         $("#login_verify_Modal").modal();
                    //         $("#login_verify_Modal").on('hide.bs.modal', function () {
                    //             window.sessionStorage.obj_user = JSON.stringify(data);
                    //             window.location.href="../index.html";
                    //         })
                    //
                    //     }
                    // }
                }
            })
        }

        console.log(user2);
        console.log(pwd2);
        //   2.验证数据，从数据库调数据 用ajax


    });
////选择登录方式的标签页
//            $('#myTab a').click(function (e) {
//                e.preventDefault()
//                $(this).tab('show')
//            });
//            设置自适应
    if($(window).width()< 1000){
        $(".login_pic_box").hide();
    };
});