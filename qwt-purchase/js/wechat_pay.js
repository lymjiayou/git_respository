/**
 * Created by MY on 2018/11/5.
 */
$(function () {
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var order_id=window.sessionStorage.pay_order_id;
    var time=""
    console.log(order_id);
    //用定时器检测是否支付成功

        $.ajax({
            url:http+"order/"+order_id+"?uid="+u_id+"&sid="+s_id,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                if(data.msg=="SUCCESS"){
                    console.log(data);
                    var order_info=data.data;
                    $(".we_total_price").text(order_info.lastPrice);
                }else {
                    // var data=JSON.parse(data);
                    // console.log(data);
                    if(data.msg=="NO_LOGIN"){
                        window.location.href="login.html";
                    }else if(data.msg=="FAIL"){
                        $("#fail_modal_content").text(data.error);
                        $("#fail_operation_Modal").modal();
                    }
                }
            }
        })


    //展示二维码
    $(".scan_text").before('<img id="scan_pic" src='+http+"wch/pay/"+order_id+"?uid=" + u_id + "&sid=" + s_id+' alt="">');

    time=setInterval(function () {
        $.ajax({
            url:http+"wch/query/"+order_id+"?uid="+u_id+"&sid="+s_id,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                console.log(data);
                if(data.msg=="SUCCESS"){
                    if(data.data==true){
                        console.log(data);
                        stop(time);
                        $(".update_text").text("支付成功！");
                        $("#success_update_Modal").modal();
                        $('#success_update_Modal').on('hide.bs.modal',function() {
                            window.open("individual_order_list.html");
                            window.close();
                        });
                    }else if(data.data==false){
                        // stop(time);
                        // $(".ask_text").text("支付失败！");
                        // $("#fail_pay_Modal").modal();
                        // $('#fail_pay_Modal').on('hide.bs.modal',function() {
                        //     window.location.reload();
                        // });
                    }else {

                    }
                }else {
                    if(data.msg=="NO_LOGIN"){
                        window.location.href="login.html";
                    }else {
                        $("#fail_modal_content").text(data.error);
                        $("#fail_operation_Modal").modal();
                    }
                }

            }
        })
    },1000)

})
function stop(time) {
    clearInterval(time);
}
