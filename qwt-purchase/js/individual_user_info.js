/**
 * Created by lysp on 2018/8/21.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var user_tel="";
    var user_eamil="";
    var user_interest=""
    var isclick=0;
    var company_isclick=0;


    document.getElementById('company_pic').onchange = function() {
        console.log($(this));
        PreviewImage2(this);

        // add1();
        // var head_img = this.files[0];
        // var fr_head = new FileReader();
        // fr_head.onload = function() {
        //     var head_img = $(".update_head_img");
        //     // head_img[0].attr("src",fr_head.result)
        //     head_img[0].src = fr_head.result;
        //     // console.log(head_img[0].src);
        // };
        // fr_head.readAsDataURL(head_img);
    };
    function PreviewImage2(fileObj) {
        console.log(fileObj);
        console.log(fileObj.files[0]);
        var allowExtention = ".jpg,.bmp,.gif,.jpeg,.png"; //允许上传文件的后缀名
        var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
        var browserVersion = window.navigator.userAgent.toUpperCase();

        if (allowExtention.indexOf(extention) > -1) {


            if(fileObj.files[0].size<=1024*1024*10){
                add2();
                var imgFile = fileObj.files[0];
                var fr = new FileReader();
                fr.onload = function() {
                    var imgs = $(".updateimg");
                    // console.log(imgs.length)
                    imgs[0].src = fr.result;
                };
                fr.readAsDataURL(imgFile);
            }
            else{
                $("#fail_modal_content").text("文件大小不能超过10M");
                $("#fail_operation_Modal").modal();
            }

        }

        else {
            $("#fail_modal_content").text("仅支持" + allowExtention + "为后缀名的文件!");
            $("#fail_operation_Modal").modal();

            fileObj.value = ""; //清空选中文件
            if (browserVersion.indexOf("MSIE") > -1) {
                fileObj.select();
                document.selection.clear();
            }
        }
    }


    function add2(){
        $(".company_pic_show").empty();
        var html = "<img class='updateimg' src='' style='width: 100%;height: 100%;'/>";
        $(".company_pic_show").append(html);
        $(".updateimg").zoomify();
    }
    //获得用户信息
    $.ajax({
        url:http+"info?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                var type=data.data.type;
                if(type==1){
                    $(".company_info").hide();
                    $(".person_item").show();
                }else {
                    $(".company_info").show();
                    $(".person_item").hide()
                }
                console.log(data.data);
                $(".user_name").html(data.data.username);
                $(".user_phone").val(data.data.phone);
                $(".user_email").val(data.data.email);
                if(data.data.field!=null){
                    console.log(1111)
                    var choosen_interest=data.data.field.split(" ");
                    console.log(choosen_interest);
                    //获取兴趣分类信息
                    $.ajax({
                        url:http+"category",
                        type:'get',
                        xhrFields:{withCredentials: true},
                        success:function (data) {
                            console.log(data)
                            var interest_list=''
                            for(var i=0;i<data.data.length;i++){
                                for(var j=0;j<choosen_interest.length;j++){
                                    // console.log(choosen_interest[j])
                                    if(data.data[i].categoryName==choosen_interest[j]){
                                        interest_list='<div class="interest choose_interest">'+data.data[i].categoryName+'</div>';
                                        break;
                                        // break终止整个循环  continue结束本次循环，开始下一个循环

                                    }else {
                                        interest_list='<div class="interest no_choose_interest">'+data.data[i].categoryName+'</div>';
                                    }
                                }
                                $(".interest_box").append(interest_list)
                            }
                            // 选择兴趣分类
                            var ins=$(".interest_box").children();
                            // console.log(ins)
                            ins.each(function (index,ele) {
                                $(ele).click(function () {
                                    if($(this).hasClass('no_choose_interest')){
                                        $(this).removeClass('no_choose_interest').addClass('choose_interest');
                                    }else if($(this).hasClass('choose_interest')){
                                        $(this).removeClass('choose_interest').addClass('no_choose_interest');
                                    }
                                })
                            })

                            var interest_height=$(".interest_box").height();
                            $(".interest_item").css("height",interest_height+"px");
                        }

                    })
                }else {
                    $.ajax({
                        url:http+"category",
                        type:'get',
                        xhrFields:{withCredentials: true},
                        success:function (data) {
                            console.log(data)

                            var interest_list=''
                            for(var i=0;i<data.data.length;i++){
                                interest_list='<div class="interest no_choose_interest">'+data.data[i].categoryName+'</div>';
                                $(".interest_box").append(interest_list)
                            }
                            // 选择兴趣分类
                            var ins=$(".interest_box").children();
                            // console.log(ins)
                            ins.each(function (index,ele) {
                                $(ele).click(function () {
                                    if($(this).hasClass('no_choose_interest')){
                                        $(this).removeClass('no_choose_interest').addClass('choose_interest');
                                    }else if($(this).hasClass('choose_interest')){
                                        $(this).removeClass('choose_interest').addClass('no_choose_interest');
                                    }
                                })
                            })

                            var interest_height=$(".interest_box").height();
                            $(".interest_item").css("height",interest_height+"px");
                        }

                    })
                }

                if(data.data.passport!="0"){
                    $(".company_pic_show").empty();
                    var html = "<img class='updateimg' src="+data.data.passport+" style='width: 100%;height: 100%;'/>";
                    $(".company_pic_show").append(html);
                    $(".updateimg").zoomify();
                }
                if(data.data.headSculpture!=null){
                    $(".head_pic_show").empty();
                    var html = "<img class='update_head_img' src="+data.data.headSculpture+" style='width: 100%;height: 100%;'/>";
                    $(".head_pic_show").append(html);
                    $(".update_head_img").zoomify();
                }else {
                    $(".head_pic_show").empty();
                    var html = "<img class='update_head_img' src='../images/touxiang.png' style='width: 100%;height: 100%;'/>";
                    $(".head_pic_show").append(html);
                    $(".update_head_img").zoomify();
                }

                    //修改用户信息
                    $(".save_edit").click(function () {
                        console.log(company_isclick);
                        if($("#company_pic")[0].files[0]!=null && company_isclick==0){
                            $("#fail_modal_content").text("请先确认上传图片再进行保存");
                            $("#fail_operation_Modal").modal();
                        }
                        else {
                            user_tel = $(".user_phone").val();
                            user_eamil = $(".user_email").val();
                            if ($(".choose_interest").length > 0) {
                                for (var i = 0; i < $(".choose_interest").length; i++) {
                                    if (i == $(".choose_interest").length - 1) {
                                        user_interest += $(".choose_interest").eq(i).text();
                                    } else {
                                        user_interest += $(".choose_interest").eq(i).text() + " ";
                                    }
                                }
                            } else {
                                user_interest = '';
                            }
                            var info_errors = $(".warn").length;
                            console.log(info_errors)
                            if (info_errors == 0) {
                                console.log(2222222)
                                $.ajax({
                                    url: http + "info?uid=" + u_id + "&sid=" + s_id,
                                    type: "patch", beforeSend: function (request) {
                                        var cooinfo = getCookie("XSRF-TOKEN");
                                        console.log(cooinfo);
                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                    xhrFields: {withCredentials: true},
                                    contentType: "application/json;charset=UTF-8",
                                    data: JSON.stringify({
                                        "phone": user_tel,
                                        "email": user_eamil,
                                        "passport": data.data.passport,
                                        "field": user_interest
                                    }),
                                    success: function (data) {
                                        console.log(data)
                                        if (data.msg == "SUCCESS") {
                                            console.log(data)
                                            $("#success_edit_Modal").modal();
                                            $("#success_edit_Modal").on('hide.bs.modal', function () {
                                                window.location.reload();
                                            })
                                        } else {
                                            if (data.msg == "NO_LOGIN") {
                                                window.location.href = "login.html";
                                            }
                                            else if (data.msg == "FAIL") {
                                                $("#fail_modal_content").text(data.error);
                                                $("#fail_operation_Modal").modal();
                                                $("#fail_operation_Modal").on('hide.bs.modal', function () {
                                                    window.location.reload();
                                                })

                                            }
                                        }
                                    }

                                })
                            }
                        }
                    })


            }else {
                if(data.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else if(data.msg=="FAIL"){
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }
    })
     //图片格式
    // document.getElementById('company_pic').onchange = function() {
    //     console.log("chuant");
    //     PreviewImage1(this);
    //
    //     function PreviewImage1(fileObj) {
    //         console.log(fileObj);
    //         var imgFile = fileObj.files[0];
    //         var allowExtention = ".jpg,.bmp,.gif,.jpeg,.png"; //允许上传文件的后缀名
    //         var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
    //         var browserVersion = window.navigator.userAgent.toUpperCase();
    //         if (allowExtention.indexOf(extention) > -1) {
    //
    //         }
    //         else {
    //             console.log("格式错误")
    //             $("#fail_modal_content").text("仅支持" + allowExtention + "为后缀名的文件!");
    //             $("#fail_operation_Modal").modal();
    //
    //             fileObj.value = ""; //清空选中文件
    //             if (browserVersion.indexOf("MSIE") > -1) {
    //                 fileObj.select();
    //                 document.selection.clear();
    //             }
    //         }
    //     }
    //
    //
    // };



    //若修改了企业营业执照
    var company_pic_url="";
    $(".company_confirm_update").click(function () {
        company_isclick=1;
        var formData=new FormData();
        formData.append('file',$("#company_pic")[0].files[0]);
        if($("#company_pic")[0].files[0]==null){
            $("#fail_modal_content").text("请先选择图片！再点击上传");
            $("#fail_operation_Modal").modal();
        }else {
            $(".company_pic_show img").addClass("up-opacity");
            $(".company_pic_show").addClass("loading");
            $.ajax({
                url:http+"image/upload",
                type:"put",
                beforeSend: function(request) {
                    var cooinfo=getCookie("XSRF-TOKEN");
                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                },
                data:formData,
                dataType:"json",
                xhrFields:{withCredentials: true},
                processData : false,
                contentType : false,
                success:function (data){
                    if(data.msg=="SUCCESS"){
                        $(".company_pic_show img").removeClass("up-opacity");
                        $(".company_pic_show").removeClass("loading");
                        $("#success_update_Modal").modal();
                        company_pic_url=data.data;
                        $(".save_edit").click(function () {
                            user_tel=$(".user_phone").val();
                            user_eamil=$(".user_email").val();
                            user_interest=$(".choose_interest").text();
                            $.ajax({
                                url:http+"info?uid="+u_id+"&sid="+s_id,
                                xhrFields:{withCredentials: true},
                                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                contentType:"application/json;charset=UTF-8",
                                data:JSON.stringify({"phone":user_tel,"email": user_eamil,"passport":company_pic_url,"field":user_interest}),
                                success:function (data) {
                                    if(data.msg=="SUCCESS"){
                                        console.log(data)
                                        $("#success_edit_Modal").modal();
                                        $("#success_edit_Modal").on('hide.bs.modal', function () {
                                            window.location.reload();
                                        })
                                    }else {
                                        if(data.msg=="NO_LOGIN"){
                                            window.location.href="login.html";
                                        }else if(data.msg=="FAIL"){
                                            $("#fail_modal_content").text(data.error);
                                            $("#fail_operation_Modal").modal();
                                        }
                                    }
                                }

                            })

                        })
                    }else {
                        if(data.msg=="NO_LOGIN"){
                            window.location.href="login.html";
                        }else if(data.msg=="FAIL"){
                            $("#fail_modal_content").text(data.error);
                            $("#fail_operation_Modal").modal();
                        }

                    }
                }
            })
        }


    })
    //上传头像
    //    上传图片
    document.getElementById('head_pic').onchange = function() {
        // console.log($(this));
        PreviewImage1(this);

        // add1();
        // var head_img = this.files[0];
        // var fr_head = new FileReader();
        // fr_head.onload = function() {
        //     var head_img = $(".update_head_img");
        //     // head_img[0].attr("src",fr_head.result)
        //     head_img[0].src = fr_head.result;
        //     // console.log(head_img[0].src);
        // };
        // fr_head.readAsDataURL(head_img);
    };
    function PreviewImage1(fileObj) {
        console.log(fileObj);
        console.log(fileObj.files[0]);
        var allowExtention = ".jpg,.bmp,.gif,.jpeg,.png"; //允许上传文件的后缀名
        var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
        var browserVersion = window.navigator.userAgent.toUpperCase();
        if (allowExtention.indexOf(extention) > -1) {
            if(fileObj.files[0].size<=1024*1024*10){
                add1();
                var head_img = fileObj.files[0];
                var fr_head = new FileReader();
                fr_head.onload = function() {
                    var head_img = $(".update_head_img");
                    // head_img[0].attr("src",fr_head.result)
                    head_img[0].src = fr_head.result;
                    // console.log(head_img[0].src);
                };
                fr_head.readAsDataURL(head_img);
            }
            else{
                $("#fail_modal_content").text("文件大小不能超过10M");
                $("#fail_operation_Modal").modal();
            }

        }
        else {
            $("#fail_modal_content").text("仅支持" + allowExtention + "为后缀名的文件!");
            $("#fail_operation_Modal").modal();

            fileObj.value = ""; //清空选中文件
            if (browserVersion.indexOf("MSIE") > -1) {
                fileObj.select();
                document.selection.clear();
            }
        }
    }

    function add1(){
        $(".head_pic_show").empty();
        var html = "<img class='update_head_img' src='' style='width: 100%;height: 100%;'/>";
        $(".head_pic_show").append(html);
        $(".update_head_img").zoomify();
    }
//修改头像
    var head_pic_url="";


    $(".submit_head").click(function () {
        console.log("点击保存");
        if($("#head_pic")[0].files[0]==null) {
            $("#fail_modal_content").text("请先选择图片！上传后再保存");
            $("#fail_operation_Modal").modal();
        }
        else if(isclick==0){
            $("#fail_modal_content").text("请先确认上传后再保存");
            $("#fail_operation_Modal").modal();
        }
    });
    $(".head_confirm_update").click(function () {
        var formdata=new FormData();
        formdata.append('file',$("#head_pic")[0].files[0]);
        console.log($("#head_pic")[0].files[0])
        if($("#head_pic")[0].files[0]==null){
            $("#fail_modal_content").text("请先选择图片！再点击上传");
            $("#fail_operation_Modal").modal();
        }else {
            $(".head_pic_show img").addClass("up-opacity");
            $(".head_pic_show").addClass("loading");
            $.ajax({
                url:http+"image/upload",
                type:"put",
                beforeSend: function(request) {
                    var cooinfo=getCookie("XSRF-TOKEN");
                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                },
                xhrFields:{withCredentials: true},
                data:formdata,
                dataType:"json",
                processData : false,
                contentType : false,
                success:function (data) {
                    isclick=1;
                    console.log(data);
                    if(data.msg=="SUCCESS"){
                        $(".head_pic_show img").removeClass("up-opacity");
                        $(".head_pic_show").removeClass("loading");
                        $("#success_update_Modal").modal();
                        // console.log(data)
                        head_pic_url=data.data;
                        $(".submit_head").click(function () {
                            $.ajax({
                                url:http+"info?uid="+u_id+"&sid="+s_id,
                                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                contentType:"application/json;charset=UTF-8",
                                // data:JSON.stringify({"phone":user_tel,"email": user_eamil,"passport":company_pic_url,"field":user_interest}),
                                data:JSON.stringify({headSculpture:head_pic_url}),
                                xhrFields:{withCredentials: true},
                                success:function (data) {
                                    console.log(data)
                                    if(data.msg=="SUCCESS"){
                                        // console.log(data)
                                        $("#success_edit_Modal").modal();
                                        $("#success_edit_Modal").on('hide.bs.modal', function () {
                                            window.location.reload();
                                        })
                                    }else {
                                        if(data.msg=="NO_LOGIN"){
                                            window.location.href="login.html";
                                        }else if(data.msg=="FAIL"){
                                            $("#fail_modal_content").text(data.error);
                                            $("#fail_operation_Modal").modal();
                                        }
                                    }
                                }
                            })
                        })
                    }else {
                        if(data.msg=="NO_LOGIN"){
                            window.location.href="login.html";
                        }else if(data.msg=="FAIL"){
                            $("#fail_modal_content").text(data.error);
                            $("#fail_operation_Modal").modal();
                        }

                    }
                }
            })
        }



    });
    //修改密码
    $(".submit_password").click(function () {
        var old_pass=hex_md5($(".old_password").val());
        var new_pass=hex_md5($(".new_password").val());
        var confirm_new_pass=$(".confirm_password").val();
        //记录当前变淡输入是否出错
        $("#change_password input").trigger("blur");
        var errors=$(".error").length;
        console.log(errors);
        if(errors==0){
            //当没有错误时调用修改密码的api
            // console.log(new_pass+confirm_new_pass);
            $.ajax({
                url:http+"password?uid="+u_id+"&sid="+s_id,
                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                contentType:"application/json;charset=UTF-8",
                data:JSON.stringify({"oldPassword":old_pass,"newPassword":new_pass}),
                xhrFields:{withCredentials: true},
                success:function (data) {
                    console.log(data)
                    if(data.msg=="SUCCESS"){
                        $(".edit_text").text("修改密码成功");
                        $("#success_edit_Modal").modal();
                        $("#success_edit_Modal").on('hide.bs.modal', function () {
                            window.location.href="login.html";
                        })

                    }else{
                        if(data.msg=="NO_LOGIN"){
                            window.location.href="login.html";
                        }else if(data.msg=="FAIL"){
                            $("#fail_modal_content").text(data.error);
                            $("#fail_operation_Modal").modal();
                        }
                    }
                }
            })
        }else {
            $("#fail_modal_content").text("请填写正确的修改密码信息，所填项不能为空！");
            $("#fail_operation_Modal").modal();
        }

    })
//    日期控件
    $("#datetimestart").datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        minView:'month',
        weekStart: 0, //一周从哪一天开始
        todayBtn: true, //如果此值为true 或 "linked"，则在日期时间选择器组件的底部显示一个 "Today" 按钮用以选择当前日期。如果是true的话，"Today" 按钮仅仅将视图转到当天的日期，如果是"linked"，当天日期将会被选中。
        autoclose: true,
        endDate:new Date(),
        initialDate: new Date(),
        todayHighlight: 1,//如果为ture高亮当前日期
        startView: 2,//日期时间选择器打开之后首先显示的视图 2表示月视图
        forceParse: false,
        showMeridian: true,
    })

    //修改用户信息的表单验证
    // 电话号码的正则表达式判断
    // var phone_reg =/^1(3[0-9]|5[0-35-9]|8[0235-9])\\d{8}$/;
    var phone_reg =/^1[3|4|5|7|8]\d{9}$/;
    // 电话号码失去焦点

    $('#telphone').blur(function(){
        var that=$(this);
        if ($(this).val() == "") {
            $(".info_warn").eq(0).html('<div class="warn">手机号不能为空</div>');
            // that.css('border','solid 1px #e22');
        }
        // 电话号码的长度应为11位
        else if($(this).val().length != 11) {
            $(".info_warn").eq(0).html('<div class="warn">手机号长度不正确！</div>');
            // that.css('border','solid 1px #e22');
        }
        // 判断输入的是不是手机号码
        else if(!$(this).val().match(phone_reg)) {
            console.log(222)
            $(".info_warn").eq(0).html('<div class="warn">手机号格式有误！</div>');
            // that.css('border','solid 1px #e22');
        } else {
            $(".info_warn").eq(0).html('');
            // that.css('border','1px solid #ccc');
        }
    });

    // 邮箱框鼠标失去焦点
    $('#email').blur(function(){
        if ($(this).val() == "") {
            $(".info_warn").eq(1).html('<div class="warn">邮箱不能为空！</div>');
        }
        else if(!$(this).val().match(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/)){
            $(".info_warn").eq(1).html('<div class="warn">邮箱格式不正确！</div>');
        }else {
            $(".info_warn").eq(1).html('');
        }
    });

//修改密码
    // 数字、字母（不分大小写）、汉字、下划线
    // 4-20个字符
    // a-z A-Z 0-9 统统用\w表示
    // 汉字 unicode \u4e00-\u9fa5
    //var re=/[^\w\u4e00-\u9fa5]/g;//数字、字母（不分大小写）、汉字、下划线
    var re=/^[\u4E00-\u9FA5A-Za-z0-9_]+$/;//数字、字母（不分大小写）、汉字、下划线
    var reNum=/[^\d]/g;//纯数字
    var name_length=0;
    // 设置密码
    var pwd_reg1= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,10}$/;//数字、字母、加字符 6到10
    var pwd_reg2= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{11,20}$/;//数字、字母、加字符 11到20
    var reChar=/[^a-zA-Z]/g;//纯字母

    // 键盘输入

    $('.new_password').focus(function(){//鼠标聚焦
        $('.form-validate').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
    });
    $('.new_password').keyup(function(){
        // 匹配至少有两种字符组合6-10,安全性为适中
        if($(this).val().match(pwd_reg1)){
            $('.form-validate').eq(1).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
            $('.info').eq(1).append('<i class="i-status"></i>');
            $('.info').eq(1).find('.i-status').css('display','block');
        }
        // 匹配至少有两种字符组合11-20,安全性为安全
        else if($(this).val().match(pwd_reg2)){
            $('.form-validate').eq(1).html('<i class="i-def point3"></i><span>你的密码很安全</span>');
            $('.info').eq(1).append('<i class="i-status"></i>');
            $('.info').eq(1).find('.i-status').css('display','block');
        }
        // 如果为纯数字或者纯字母安全性的判断
        else if(!reNum.test(this.value)||!reChar.test(this.value)){
            // 纯数字或密码为六位但小于10位安全性为弱
            if(this.value.length>5){
                $('.form-validate').eq(1).html('<i class="i-def point4"></i><span>有被盗风险,建议使用字母、数字和符号两种及以上组合</span>');
                $('.info').eq(1).append('<i class="i-status"></i>');
                $('.info').eq(1).find('.i-status').css('display','block');
            }
            // 纯数字或密码为十位以上安全性为适中
            if(this.value.length>10){
                $('.form-validate').eq(1).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
                $('.info').eq(1).append('<i class="i-status"></i>');
                $('.info').eq(1).find('.i-status').css('display','block');
            }
            // 小于六位则不能构成密码
            if(this.value.length<6){
                $('.form-validate').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
                $('.info').eq(1).find('.i-status').css('display','none');
            }
        }
        else{
            $('.form-validate').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
            $('.info').eq(1).find('.i-status').css('display','none');
        }
    });
    // 密码的失焦的长度判断
    $('.new_password').blur(function(){

        // 失焦之后为空时显示的内容
        if($(this).val() == ""){
            $('.form-validate').eq(1).html('<i class="i-def error"></i><span class="feifa">新密码不能为空</span>');
            // $('.form-validate').eq(1).html('');
            // $('.info').eq(1).css('border','solid 1px #ddd');
            $('.info').eq(1).find('.i-status').css('display','none');
        }
        // 失焦时长度小于六时显示的内容
        else if(this.value.length<6){
            $('.form-validate').eq(1).html('<i class="i-def error"></i><span class="feifa">长度只能在6-20个字符之间</span>');
            // $('.info').eq(1).css('border','solid 1px #e22');
        }
        //失焦时获取确认密码输入，假如输入不为空，则判断两密码是否一致
        else if($(".confirm_password").val()!=""){
            if($(this).val() != $(".confirm_password").val()){
            $('.form-validate').eq(2).html('<i class="i-def error"></i><span class="feifa">两次密码输入不一致</span>');
            }

        }
        else{
            $('.info').eq(2).append('<i class="i-status"></i>');
            $('.info').eq(2).find('.i-status').css('display','block');
            $('.form-validate').eq(2).html('');
        }
    });

    // 确认密码设置
    $('.confirm_password').focus(function(){//鼠标聚焦
        $('.form-validate').eq(2).html('<i class="i-def point"></i><span>请再次输入密码</span>');
    });
    // 鼠标离开
    $('.confirm_password').blur(function(){
        // 如果再次密码为空时显示的内容
        if($(this).val() == ""){
            // $('.form-validate').eq(2).html('');
            $('.form-validate').eq(2).html('<i class="i-def error"></i><span class="feifa">确认密码不能为空</span>');
            // $('.info').eq(2).css('border','solid 1px #ddd');
            $('.info').eq(2).find('.i-status').css('display','none');
        }
        // 判断两次密码是否一致
        else if($(this).val() != $(".new_password").val()){
            $('.form-validate').eq(2).html('<i class="i-def error"></i><span class="feifa">两次密码输入不一致</span>');
            // $('.info').eq(2).css('border','solid 1px #e22');
        }else{
            // $('.info').eq(2).css('border','solid 1px #ddd');
            $('.info').eq(2).append('<i class="i-status"></i>');
            $('.info').eq(2).find('.i-status').css('display','block');
            $('.form-validate').eq(2).html('');
        }
    });



// 选择兴趣分类
    var ins=$(".interest_box").children();
    // console.log(ins)
    ins.each(function (index,ele) {
        $(ele).click(function () {
            if($(this).hasClass('no_choose_interest')){
                $(this).removeClass('no_choose_interest').addClass('choose_interest');
            }else if($(this).hasClass('choose_interest')){
                $(this).removeClass('choose_interest').addClass('no_choose_interest');
            }
        })
    })
})


