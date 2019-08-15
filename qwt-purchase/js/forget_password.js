/**
 * Created by MY on 2018/10/6.
 */
$(function () {
    var http=Http;
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    // 邮箱的鼠标得到焦点
    $('#email').focus(function(){
        console.log(1423)
        $('.form-validate').html('<i class="i-def point"></i><span>输入注册时的邮箱找回密码</span>');
    });
    // 邮箱框鼠标失去焦点
    $('#email').blur(function(){
        if ($(this).val() == "") {
            $('.form-validate').html('<i class="i-def error1"></i><span class="feifa">邮箱不能为空！</span>');
            $('.form-list').find('.i-status').css('display','none');
        }
        else if(!$(this).val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
            $('.form-validate').html('<i class="i-def error1"></i><span class="feifa">格式有误</span>');
            $('.form-list').css('border','solid 1px #e22');
            $('.form-list').find('.i-status').css('display','none');
        }else {
            $('.form-validate').eq(0).html('');
            $('.form-list').css('border','none');
            $('.form-list').append('<i class="i-status"></i>');
            $('.form-list').find('.i-status').css('display','block');
            // $('.form-validate').eq(3).html('<a href="#">邮箱验证</a>');
        }
    });
    $("#send_email").click(function () {
        var errors1=$(".error1").length;
        if(errors1==0){
            console.log(1111)
            var email_adr=$("#email").val();
            console.log(http+"sendEmailForPassword?email="+email_adr);
            $.ajax({
                url:http+"sendEmailForPassword?email="+email_adr,
                type:'get',
                xhrFields:{withCredentials: true},
                success:function (data) {
                    console.log(data);
                    if(data.msg=="SUCCESS"){
                        $("#success_operation_content").text("邮件发送成功");
                        $("#success_operation_Modal").modal();
                        $("#success_operation_Modal").on('hide.bs.modal', function () {
                            window.location.href="login.html";
                        })
                        // if(data.code==1){
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

    })
})