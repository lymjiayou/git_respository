/**
 * Created by MY on 2018/11/5.
 */
$(function () {
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var recharge_order_id=window.sessionStorage.pay_order_id;
    var time=""
    var money=window.sessionStorage.wei_pay_money;
    if(recharge_order_id==null){
        window.location.href="login.html";
    }
    $(".we_total_price").text(money);
    // console.log(order_id);
    console.log(money);
    //用定时器检测是否支付成功

    //展示二维码
    // $(".scan_text").before('<img id="scan_pic" src='+http+"wch/recharge?uid="+u_id+"&sid="+s_id+"&orderId="+order_id+' alt="">');
    $(".scan_text").before('<img id="scan_pic" src='+http+"wch/recharge/"+recharge_order_id+"?uid="+u_id+"&sid="+s_id+' alt="">');

    time=setInterval(function () {
        $.ajax({
            url:http+"recharge/"+recharge_order_id+"?uid="+u_id+"&sid="+s_id,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                console.log(data);
                if(data.msg=="SUCCESS"){
                    if(data.data.pay==true){
                        stop(time);
                        $("#success_update_Modal").modal();
                        $('#success_update_Modal').on('hide.bs.modal',function() {
                            window.open("individual_recharge.html");
                            window.close();
                        });
                    }else {

                        // $(".ask_text").text("支付失败！");
                        // $("#fail_pay_Modal").modal();
                        // $('#fail_pay_Modal').on('hide.bs.modal',function() {
                        //     window.location.reload();
                        // });
                    }
                }else {
                    if(data.msg=="NO_LOGIN"){
                        window.location.href="login.html";
                    }else if(data.msg=="FAIL"){
                        $("#fail_modal_content").text(data.error);
                        $("#fail_operation_Modal").modal();
                    }
                }

            }
            // url:http+"recharge/"+order_id+"?uid="+u_id+"&sid="+s_id,
            // type:"get",
            // xhrFields:{withCredentials: true},
            // success:function (data) {
            //     console.log(data);
            //     if(data.data.pay==true){
            //         console.log(data);
            //         stop(time);
            //         $(".update_text").text("支付成功！");
            //         $("#success_update_Modal").modal();
            //         $('#success_update_Modal').on('hide.bs.modal',function() {
            //             window.location.href="../index.html";
            //         });
            //     }else {
            //         stop(time);
            //         $(".ask_text").text("支付失败！");
            //         $("#fail_pay_Modal").modal();
            //         $('#fail_pay_Modal').on('hide.bs.modal',function() {
            //             // window.location.reload();
            //         });
            //     }
            // }
        })
    },1000)

})
function stop(time) {
    clearInterval(time);
}
