/**
 * Created by MY on 2018/10/6.
 */
$(function () {
    var http=Http;
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;

    var param=window.location.search;
    console.log(param);
    $("#change_password").click(function () {
        // var new_password=$("#password").val();
        // var new_password=$("#password").val();
        var new_password=hex_md5($("#password").val());
        var renew_password=hex_md5($("#Repassword").val());
        if(new_password==renew_password){
            var errors=$(".error").length;
            console.log(http+"verifyToken"+param+"&psw="+new_password);
            if(errors==0){
                $.ajax({
                    url:http+"verifyToken"+param+"&psw="+new_password,
                    type:'get',
                    xhrFields:{withCredentials: true},
                    success:function (data) {
                        console.log(data);
                        if(data.msg=="SUCCESS"){
                            $("#success_operation_content").text("密码已重置");
                            $("#success_operation_Modal").modal();
                            $("#success_operation_Modal").on('hide.bs.modal', function () {
                                window.location.href="login.html";
                            })
                            // if(data.code==1){
                            //
                            //
                            // }else {
                            //     $("#fail_operation_content").text(data.data);
                            //     $("#fail_operation_Modal").modal();
                            // }

                        }else {
                            $("#fail_operation_content").text(data.error);
                            $("#fail_operation_Modal").modal();

                        }
                    }
                })
            }
        }

        else{
            $("#success_operation_content").text("输入错误,请重试");
            $("#success_operation_Modal").modal();
        }

    });




    var re=/^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
    var reNum=/[^\d]/g;//纯数字
    var name_length=0;
    // 设置密码
    var pwd_reg1= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,10}$/;//数字、字母、加字符 6到10
    var pwd_reg2= /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{11,20}$/;//数字、字母、加字符 11到20
    var reChar=/[^a-zA-Z]/g;//纯字母
    $('#password').focus(function(){//鼠标聚焦
        $('.form-validate').eq(0).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
    });
    // 键盘输入
    $('#password').keyup(function(){
        // 匹配至少有两种字符组合6-10,安全性为适中
        if($(this).val().match(pwd_reg1)){
            $('.form-validate').eq(0).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
            $('.form-list').eq(0).append('<i class="i-status"></i>');
            $('.form-list').eq(0).find('.i-status').css('display','block');
        }
        // 匹配至少有两种字符组合11-20,安全性为安全
        else if($(this).val().match(pwd_reg2)){
            $('.form-validate').eq(0).html('<i class="i-def point3"></i><span>你的密码很安全</span>');
            $('.form-list').eq(0).append('<i class="i-status"></i>');
            $('.form-list').eq(0).find('.i-status').css('display','block');
        }
        // 如果为纯数字或者纯字母安全性的判断
        else if(!reNum.test(this.value)||!reChar.test(this.value)){
            // 纯数字或密码为六位但小于10位安全性为弱
            if(this.value.length>5){
                $('.form-validate').eq(0).html('<i class="i-def point4"></i><span>有被盗风险,建议使用字母、数字和符号两种及以上组合</span>');
                $('.form-list').eq(0).append('<i class="i-status"></i>');
                $('.form-list').eq(0).find('.i-status').css('display','block');
            }
            // 纯数字或密码为十位以上安全性为适中
            if(this.value.length>10){
                $('.form-validate').eq(0).html('<i class="i-def point2"></i><span>安全强度适中，可以使用三种以上的组合来提高安全强度</span>');
                $('.form-list').eq(0).append('<i class="i-status"></i>');
                $('.form-list').eq(0).find('.i-status').css('display','block');
            }
            // 小于六位则不能构成密码
            if(this.value.length<6){
                $('.form-validate').eq(0).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
                $('.form-list').eq(0).find('.i-status').css('display','none');
            }
        }
        else{
            $('.form-validate').eq(0).html('<i class="i-def point"></i><span>建议使用字母、数字和符号两种及以上的组合，6-20个字符</span>');
            $('.form-list').eq(0).find('.i-status').css('display','none');
            // $('.form-list').eq(0).css('border','none');
        }
    });
    // 密码的失焦的长度判断
    $('#password').blur(function(){
        // 失焦之后为空时显示的内容
        if($(this).val() == ""){
            console.log('密码');
            $('.form-validate').eq(0).html('<i class="i-def error2"></i><span class="feifa">密码不能为空</span>');
            $('.form-list').eq(1).css('border','solid 1px #e22');
            $('.form-list').eq(0).find('.i-status').css('display','none');
            // $('.form-validate1').eq(1).html('');
            // // $('.form-list1').eq(1).css('border','solid 1px #ddd');
            // $('.form-list1').eq(1).find('.i-status').css('display','none');
        }
        // if($(this).val() == ""){
        //     $('.form-validate').eq(0).html('');
        //     // $('.form-list').eq(1).css('border','solid 1px #ddd');
        //     $('.form-list').eq(0).find('.i-status').css('display','none');
        // }
        // 失焦时长度小于六时显示的内容
        else if(this.value.length<6){
            $('.form-validate').eq(0).html('<i class="i-def error"></i><span class="feifa">长度只能在6-20个字符之间</span>');
            $('.form-list').eq(0).css('border','solid 1px #e22');
        }else{
            $('.form-list').eq(0).css('border','none');
        }
    });

    // 确认密码设置
    $('#Repassword').focus(function(){//鼠标聚焦
        $('.form-validate').eq(1).html('<i class="i-def point"></i><span>请再次输入密码</span>');
    });
    // 鼠标离开
    $('#Repassword').blur(function(){
        // 如果再次密码为空时显示的内容
        if($(this).val() == "") {
            $('.form-validate').eq(1).html('<i class="i-def error2"></i><span class="feifa">确认密码不能为空</span>');
            $('.form-list').eq(1).css('border', 'solid 1px #e22');
            $('.form-list').eq(1).find('.i-status').css('display', 'none');
        }
        // if($(this).val() == ""){
        //     $('.form-validate').eq(1).html('');
        //     // $('.form-list').eq(1).css('border','solid 1px #ddd');
        //     $('.form-list').eq(1).find('.i-status').css('display','none');
        // }
        // 判断两次密码是否一致
        else if($(this).val() != $("#password").val()){
            $('.form-validate').eq(1).html('<i class="i-def error"></i><span class="feifa">两次密码输入不一致</span>');
            $('.form-list').eq(1).css('border','solid 1px #e22');
        }else{
            $('.form-list').eq(1).css('border','none');
            $('.form-list').eq(1).append('<i class="i-status"></i>');
            $('.form-list').eq(1).find('.i-status').css('display','block');
            $('.form-validate').eq(1).html('');
        }
    });


})