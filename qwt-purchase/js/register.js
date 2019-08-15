/**
 * Created by lysp on 2018/7/31.
 */
var defaults = {
    fileType         : ["jpg","png","bmp","jpeg"],   // 上传文件的类型
    fileSize         : 1024 * 1024 * 10                 // 上传文件的大小 10m
};
$(function(){
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;

    $(".user_protocol").click(function () {
        $("#show_user_protocol").modal();
    })
    //企业上传图片
//    上传图片
    document.getElementById('inputfile').onchange = function() {
        console.log("chuant");
        PreviewImage1(this);

        function PreviewImage1(fileObj) {
            console.log(fileObj);
            var imgFile = fileObj.files[0];
            var allowExtention = ".jpg,.bmp,.gif,.jpeg,.png"; //允许上传文件的后缀名
            var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
            var browserVersion = window.navigator.userAgent.toUpperCase();
            if (allowExtention.indexOf(extention) > -1) {
                var update_success=add(imgFile);
                console.log(update_success);
                if(update_success){
                    var fr = new FileReader();
                    fr.onload = function() {
                        var imgs = $(".updateimg");
                        imgs[0].src = fr.result;
                    };
                    fr.readAsDataURL(imgFile);
                }else {
                    $("#fail_register_ask_test").text(imgFile.name +'文件大小不能超过10M');
                    $("#fail_register_Modal").modal();
                }

            }
            else {
                $("#fail_register_ask_test").text("仅支持" + allowExtention + "为后缀名的文件!");
                $("#fail_register_Modal").modal();

                fileObj.value = ""; //清空选中文件
                if (browserVersion.indexOf("MSIE") > -1) {
                    fileObj.select();
                    document.selection.clear();
                }
            }
        }


    };
    function add(file){
        if (file.size >= defaults.fileSize) {
            return false;
        } else {
            // 在这里需要判断当前所有文件中
            $(".company_pic_show").empty();
            var html = "<img class='updateimg' src='' style='width: 100%;height: 100%;'/>";
            $(".company_pic_show").append(html);
            return true;
        }

    }
    $("#username").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit').click();
        }
    })
    $("#password").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit').click();
        }
    })
    $("#Repassword").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit').click();
        }
    })
    $("#telphone").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit').click();
        }
    })
    $("#email").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit').click();
        }
    })
//    个人注册 type=1
    //提交时进行最后一次验证
    $(".form-submit").click(function () {
        var user_name=$("#username").val();
        var password=$("#password").val();
        var tel=$("#telphone").val();
        var emial=$("#email").val();
        //个人注册
        $(".form-list input").trigger("blur");
        var errors_1=$(".error1").length;
        // document.write(error1);
        console.log(errors_1);
        if(errors_1==0){
            if($("#check_id").get(0).checked){
                $.ajax({
                    url:http+"register",
                    type:"POST",
                    beforeSend: function(request) {
                        var cooinfo=getCookie("XSRF-TOKEN");
                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                    },
                    xhrFields:{withCredentials: true},
                    contentType:"application/json;charset=UTF-8",
                    data:JSON.stringify({"phone":tel,"email":emial,"passport":"0","username":user_name,"password":password,"type":1}),
                    success:function (data) {
                        if(data.msg=="SUCCESS"){
                            $("#success_register_Modal").modal();
                            $(".I_know_success").click(function () {
                                window.location.href="login.html";
                            })
                        }else {
                            // console.log(data.error)
                            $("#fail_register_ask_test").text(data.error);
                            $("#fail_register_Modal").modal();
                        }
                    }
                })
            }else {
                $("#fail_register_ask_test").text("请勾选同意《勤务通商城用户注册协议》！");
                $("#fail_register_Modal").modal();
            }


        }else {
            $("#fail_register_ask_test").text("请填写正确的注册信息,注意所填项不能为空!");
            $("#fail_register_Modal").modal();
        }

    })

//上传企业营业执照 企业注册 type=2
    var passport="";
    $(".update_company_info").click(function () {

        var formdata=new FormData();
        formdata.append('file',$("#inputfile")[0].files[0]);
        // console.log($("#inputfile")[0].files[0]);
        if($("#inputfile")[0].files[0]==null){
            $("#fail_register_ask_test").text("请先选择图片！再点击上传");
            $("#fail_register_Modal").modal();
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
                data:formdata,
                dataType:"json",
                processData : false,
                contentType : false,
                success:function (data) {
                    console.log(data)
                    if(data.msg=="SUCCESS"){
                        passport=data.data;
                        $(".company_pic_show img").removeClass("up-opacity");
                        $(".company_pic_show").removeClass("loading");
                        $("#success_update_Modal").modal();

                    }else{
                        $("#fail_register_ask_test").text(data.error);
                        $("#fail_register_Modal").modal();
                    }
                }
            })
        }



    })
    console.log(passport);
    //企业注册
    $("#username1").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit1').click();
        }
    })
    $("#password1").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit1').click();
        }
    })
    $("#Repassword1").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit1').click();
        }
    })
    $("#telphone1").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit1').click();
        }
    })
    $("#email1").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit1').click();
        }
    })
    $("#inputfile").keydown(function () {
        if (event.keyCode == "13") {//keyCode=13是回车键
            $('.form-submit1').click();
        }
    })

    // $(".form-submit1").removeAttr("disabled");
    $(".form-submit1").click(function () {
        var user_name=$("#username1").val();
        var password=$("#password1").val();
        var tel=$("#telphone1").val();
        var emial=$("#email1").val();
        $(".form-list1 input").trigger("blur");
        var errors_2=$(".error2").length;
        console.log(errors_2)
        if(errors_2==0){
            if($("#check_id1").get(0).checked){
                $.ajax({
                    url:http+"register",
                    type:"POST",
                    beforeSend: function(request) {
                        var cooinfo=getCookie("XSRF-TOKEN");
                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                    },
                    xhrFields:{withCredentials: true},
                    contentType:"application/json;charset=UTF-8",
                    data:JSON.stringify({"phone":tel,"email":emial,"passport":passport,"username":user_name,"password":password,"type":2}),
                    success:function (data) {
                        if(data.msg=="SUCCESS"){
                            $("#success_register_Modal").modal();
                            $(".I_know_success").click(function () {
                                window.location.href="login.html";
                            })
                        }else {
                            console.log(data.error)
                            $("#fail_register_ask_test").text(data.error);
                            $("#fail_register_Modal").modal();
                        }
                    }
                })
            }else {
                $("#fail_register_ask_test").text("请勾选同意《勤务通商城用户注册协议》！");
                $("#fail_register_Modal").modal();
            }
        }else {
            $("#fail_register_ask_test").text("请填写正确的注册信息,注意所填项不能为空!");
            $("#fail_register_Modal").modal();
        }
    })


    var re=/^[\u4E00-\u9FA5a-zA-Z0-9_-]+$/;
    var reNum=/[^\d]/g;//纯数字
    var reAllNum = new RegExp('^[0-9]+$');
    var name_length1=0;
    var name_length2=0

//    企业注册
    $("#username1").focus(function(){//当鼠标聚焦
        $('.form-validate1').eq(0).html('<i class="i-def point"></i><span>支持中文、字母、数字、“-”“_”的组合，4-20个字符</span>');
    });

    // 键盘输入
    $('#username1').keyup(function(){
        console.log(re.test(this.value));
        // 含有非法字符
        if(!re.test(this.value)){
            $('.form-validate1').eq(0).html('<i class="i-def error2"></i><span class="feifa">格式错误，仅支持汉字、字母、数字、“-”“_”的组合</span>');
            $('.form-list1').eq(0).css('border','solid 1px #e22');
            $('.form-list1').eq(0).find('.i-status').css('display','none');
        }else{
            // $('.form-list1').eq(0).css('border','solid 1px #ddd');
            $('.form-validate1').eq(0).html('<i class="i-def point"></i><span>支持中文、字母、数字、“-”“_”的组合，4-20个字符</span>');
            $('.form-list1').eq(0).find('.i-status').css('display','none');
        }
    });
    // 鼠标没有聚焦在输入框
    $('#username1').blur(function(){
        name_length2=getLength(this.value);
        // console.log(name_length);
        // 不能为空
        if(this.value==""){
            $('.form-validate1').eq(0).html('<i class="i-def error2"></i><span class="feifa">用户名不能为空</span>');
            $('.form-list1').eq(0).css('border','solid 1px #e22');
            $('.form-list1').eq(0).find('.i-status').css('display','none');
        }
        // 长度超过20个字符
        else if(name_length2>20){
            $('.form-validate1').eq(0).html('<i class="i-def error2"></i><span class="feifa">长度只能在4-20个字符之间 (一个汉字占两个字符)</span>');
            $('.form-list1').eq(0).css('border','solid 1px #e22');
            $('.form-list1').eq(0).find('.i-status').css('display','none');
        }
        // 长度少于4个字符
        else if(name_length2<4){
            $('.form-validate1').eq(0).html('<i class="i-def error2"></i><span class="feifa">长度只能在4-20个字符之间 (一个汉字占两个字符)</span>');
            $('.form-list1').eq(0).css('border','solid 1px #e22');
            $('.form-list1').eq(0).find('.i-status').css('display','none');
        }
        // 不可以为纯数字
        else if(reAllNum.test(this.value)){
            $('.form-validate1').eq(0).html('<i class="i-def error2"></i><span class="feifa">用户不能是纯数字,请重新输入</span>');
            $('.form-list1').eq(0).css('border','solid 1px #e22');
            $('.form-list1').eq(0).find('.i-status').css('display','none');
        }else if(!re.test($(this).val())){
            $('.form-list1').eq(0).find('.i-status').css('display','none');
            $('.form-validate1').eq(0).html('<i class="i-def error2"></i><span class="feifa">格式错误，仅支持汉字、字母、数字、“-”“_”的组合</span>');
            $('.form-list1').eq(0).css('border','solid 1px #e22');
        }
        // 成功之后应该显示的内容
        else{
            $('.form-list1').eq(0).append('<i class="i-status"></i>');
            $('.form-list1').eq(0).css('border','none');
            $('.form-validate1').eq(0).html('');
            $('.form-list1').eq(0).find('.i-status').css('display','block');
        }
    });

    // 设置密码
    var pwd_reg1= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,10}$/;//数字、字母、加字符 6到10
    var pwd_reg2= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{11,20}$/;//数字、字母、加字符 11到20
    var reChar=/[^a-zA-Z]/g;//纯字母
    $('#password1').focus(function(){//鼠标聚焦
        $('.form-validate1').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
    });
    // 键盘输入
    $('#password1').keyup(function(){
        // 匹配至少有两种字符组合6-10,安全性为适中
        if($(this).val().match(pwd_reg1)){
            $('.form-validate1').eq(1).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
            $('.form-list1').eq(1).append('<i class="i-status"></i>');
            $('.form-list1').eq(1).find('.i-status').css('display','block');
        }
        // 匹配至少有两种字符组合11-20,安全性为安全
        else if($(this).val().match(pwd_reg2)){
            $('.form-validate1').eq(1).html('<i class="i-def point3"></i><span>你的密码很安全</span>');
            $('.form-list1').eq(1).append('<i class="i-status"></i>');
            $('.form-list1').eq(1).find('.i-status').css('display','block');
        }
        // 如果为纯数字或者纯字母安全性的判断
        else if(reAllNum.test(this.value)||!reChar.test(this.value)){
            // 纯数字或密码为六位但小于10位安全性为弱
            if(this.value.length>5){
                $('.form-validate1').eq(1).html('<i class="i-def point4"></i><span>有被盗风险,建议使用字母、数字和符号两种及以上组合</span>');
                $('.form-list1').eq(1).append('<i class="i-status"></i>');
                $('.form-list1').eq(1).find('.i-status').css('display','block');
            }
            // 纯数字或密码为十位以上安全性为适中
            if(this.value.length>10){
                $('.form-validate1').eq(1).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
                $('.form-list1').eq(1).append('<i class="i-status"></i>');
                $('.form-list1').eq(1).find('.i-status').css('display','block');
            }
            // 小于六位则不能构成密码
            if(this.value.length<6){
                $('.form-validate1').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
                $('.form-list1').eq(1).find('.i-status').css('display','none');
            }
        }

        else{
            $('.form-validate1').eq(1).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
            $('.form-list1').eq(1).find('.i-status').css('display','none');
        }
    });
    // 密码的失焦的长度判断
    $('#password1').blur(function(){
        // 失焦之后为空时显示的内容
        if($(this).val() == ""){
            console.log('密码');
            $('.form-validate1').eq(1).html('<i class="i-def error2"></i><span class="feifa">密码不能为空</span>');
            $('.form-list1').eq(1).css('border','solid 1px #e22');
            $('.form-list1').eq(1).find('.i-status').css('display','none');
            // $('.form-validate1').eq(1).html('');
            // // $('.form-list1').eq(1).css('border','solid 1px #ddd');
            // $('.form-list1').eq(1).find('.i-status').css('display','none');
        }
        // 失焦时长度小于六时显示的内容
        else if(this.value.length<6){
            $('.form-validate1').eq(1).html('<i class="i-def error2"></i><span class="feifa">长度只能在6-20个字符之间</span>');
            $('.form-list1').eq(1).css('border','solid 1px #e22');
        }
        //7.13失焦时获取确认密码输入，假如输入不为空，则判断两密码是否一致

        else if($("#Repassword1").val()!=""){
            if($(this).val() != $("#Repassword1").val()) {
                $('.form-validate1').eq(2).html('<i class="i-def error2"></i><span class="feifa">两次密码输入不一致</span>');
                $('.form-list1').eq(2).css('border','solid 1px #e22');
            }
            else{
                $('.form-list1').eq(1).css('border','none');
                $('.form-list1').eq(2).css('border','none');
                $('.form-validate1').eq(2).html('');
            }
        }
        else{
            $('.form-list1').eq(1).css('border','none');
        }
    });

    // 确认密码设置
    $('#Repassword1').focus(function(){//鼠标聚焦
        $('.form-validate1').eq(2).html('<i class="i-def point"></i><span>请再次输入密码</span>');
    });
    // 鼠标离开
    $('#Repassword1').blur(function(){
        // 如果再次密码为空时显示的内容
        // console.log($(this.val()));
        if(this.value.length== 0){
            $('.form-validate1').eq(2).html('<i class="i-def error2"></i><span class="feifa">确认密码不能为空</span>');
            $('.form-list1').eq(2).css('border','solid 1px #e22');
            $('.form-list1').eq(2).find('.i-status').css('display','none');
            // $('.form-validate1').eq(2).html('');
            // // $('.form-list1').eq(2).css('border','solid 1px #ddd');
            // $('.form-list1').eq(2).find('.i-status').css('display','none');
        }
        // 判断两次密码是否一致
        else if($(this).val() != $("#password1").val()){
            $('.form-validate1').eq(2).html('<i class="i-def error2"></i><span class="feifa">两次密码输入不一致</span>');
            $('.form-list1').eq(2).css('border','solid 1px #e22');
        }else{
            $('.form-list1').eq(2).css('border','none');
            $('.form-list1').eq(2).append('<i class="i-status"></i>');
            $('.form-list1').eq(2).find('.i-status').css('display','block');
            $('.form-validate1').eq(2).html('');
        }
    });

    // 电话号码的正则表达式判断
    var phone_reg = /^1[3|4|5|7|8]\d{9}$/;
    // 电话号码得到焦点显示的内容
    $('#telphone1').focus(function(){
        $('.form-validate1').eq(3).html('<i class="i-def point"></i><span>请填入正确的手机号</span>');
    });
    // 电话号码失去焦点
    $('#telphone1').blur(function(){
        if ($(this).val() == "") {
            $('.form-validate1').eq(3).html('<i class="i-def error2"></i><span class="feifa">电话不能为空</span>');
            $('.form-list1').eq(3).css('border','solid 1px #e22');
            $('.form-list1').eq(3).find('.i-status').css('display','none');
            // $('.form-validate1').eq(3).html('');
            // $('.form-list1').eq(3).find('.i-status').css('display','none');
        }
        // 电话号码的长度应为11位
        else if($(this).val().length != 11) {
            $('.form-validate1').eq(3).html('<i class="i-def error2"></i><span class="feifa">格式有误</span>');
            $('.form-list1').eq(3).css('border','solid 1px #e22');
            $('.form-list1').eq(3).find('.i-status').css('display','none');
        }
        // 判断输入的是不是手机号码
        else if(!$(this).val().match(phone_reg)) {
            $('.form-validate1').eq(3).html('<i class="i-def error2"></i><span class="feifa">格式有误</span>');
            $('.form-list1').eq(3).css('border','solid 1px #e22');
            $('.form-list1').eq(3).find('.i-status').css('display','none');
        } else {
            $('.form-list1').eq(3).css('border','none');
            $('.form-list1').eq(3).append('<i class="i-status"></i>');
            $('.form-list1').eq(3).find('.i-status').css('display','block');
            // $('.form-validate').eq(3).html('<a href="#">邮箱验证</a>');
        }
    });
    // 邮箱的鼠标得到焦点
    $('#email1').focus(function(){
        $('.form-validate1').eq(4).html('<i class="i-def point"></i><span>你可以用该邮箱找回密码</span>');
    });
    // 验证码框鼠标失去焦点
    $('#email1').blur(function(){
        if ($(this).val() == "") {
            $('.form-validate1').eq(4).html('<i class="i-def error2"></i><span class="feifa">邮箱不能为空</span>');
            $('.form-list1').eq(4).css('border','solid 1px #e22');
            $('.form-list1').eq(4).find('.i-status').css('display','none');
            // $('.form-validate1').eq(4).html('');
            // $('.form-list1').eq(4).find('.i-status').css('display','none');
        }
        else if(!$(this).val().match(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/)){
            $('.form-validate1').eq(4).html('<i class="i-def error2"></i><span class="feifa">格式有误</span>');
            $('.form-list1').eq(4).css('border','solid 1px #e22');
            $('.form-list1').eq(4).find('.i-status').css('display','none');
        }else {
            $('.form-list1').eq(4).css('border','none');
            $('.form-list1').eq(4).append('<i class="i-status"></i>');
            $('.form-list1').eq(4).find('.i-status').css('display','block');
            // $('.form-validate').eq(3).html('<a href="#">邮箱验证</a>');
        }
    });

 //上传企业营业执照
    $("#inputfile").focus(function () {
        $('.form-validate1').eq(5).html('<i class="i-def point"></i><span>请上传正确的企业营业执照</span>');
    });
    $("#inputfile").blur(function () {
        var pic=$(".updateimg").length;
        if (pic==1){
            $(".form-validate1").eq(5).empty();
        }else {
            $('.form-validate1').eq(5).html('<i class="i-def error2"></i><span class="feifa">请上传企业营业执照</span>');
        }
    });



});

// 如果为汉字则占两个字节
function getLength(str){
    console.log(1111);
    return str.replace(/[^\x00-xff]/g,"xx").length;
}
//判断图片大小
function validateUp(file){
    var arrFiles = [];//替换的文件数组
    for(var i = 0, file; file = files[i]; i++){
        //获取文件上传的后缀名
        var newStr = file.name.split("").reverse().join("");
        if(newStr.split(".")[0] != null){
            var type = newStr.split(".")[0].split("").reverse().join("");
            // console.log(type+"===type===");
            if(jQuery.inArray(type, defaults.fileType) > -1){
                // 类型符合，可以上传
                if (file.size >= defaults.fileSize) {
                    $("#fail_modal_content").text(file.name +'文件大小不能超过10M');
                    $("#fail_operation_Modal").modal();
                    // alert(file.size);
                    // alert('您这个"'+ file.name +'"文件大小过大');
                } else {
                    // 在这里需要判断当前所有文件中
                    arrFiles.push(file);
                }
            }else{
                $("#fail_modal_content").text(file.name +'上传类型不符合');
                $("#fail_operation_Modal").modal();
                // alert('您这个"'+ file.name +'"上传类型不符合');
            }
        }else{
            $("#fail_modal_content").text(file.name +'没有类型, 无法识别');
            $("#fail_operation_Modal").modal();
            // alert('您这个"'+ file.name +'"没有类型, 无法识别');
        }
    }
    return arrFiles;
}


