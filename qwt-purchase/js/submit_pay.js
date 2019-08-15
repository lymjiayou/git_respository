/**
 * Created by lysp on 2018/9/6.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var order_id=window.sessionStorage.pay_order_id;
    var payWay_num=window.sessionStorage.pay_way;
    var way_name="";
    console.log(payWay_num);
    if(payWay_num==5){
        $("#on_line_pay").hide();
        $("#submit_recharge_pay").show();
    }else {
        $("#on_line_pay").show();
        $("#submit_online_pay").show();
    }
    console.log(order_id);
    // //get购物车数量
    // $.ajax({
    //     type:"get",
    //     url:"http://120.78.188.220:8080/purchase/cart/count?uid="+u_id+"&sid="+s_id,
    //     success:function (num) {
    //         var shopcar_num=num.data;
    //         $(".shop_car_num").val(shopcar_num);
    //     }
    // })
    //显示订单信息
    $(".do_not_pay").click(function () {
        window.location.href="individual_order_list.html";
    })
    $.ajax({
        url:http+"order/"+order_id+"?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                console.log(data);
                var order_info=data.data;
                $(".total_price").text(order_info.lastPrice);
                $(".order_num_text").text(order_id);
                if(order_info.payWay==5){
                    $("#pay_way").text("平台预充值支付");
                }else if(order_info.payWay==4){
                    $("#pay_way").text("在线支付");
                }

            }else {
                // var obj_data=JSON.parse(data);
                // console.log(obj_data);
                if(data.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else {
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }
    })
    //选择在线支付方式
    $(".choose_li li").click(function () {
        $(this).css("border","2px solid #52A452").siblings().css("border","2px solid #f2f2f2");
        way_name=$(this).attr("way_name");
    });
    $("#submit_online_pay").click(function () {
        //支付宝支付
        if(way_name=="zhi"){
            $("#online_check_Modal").modal();
            // console.log(http+"ali/pay/"+order_id+"?uid="+u_id+"&sid="+s_id);
            window.open(http+"ali/pay/"+order_id+"?uid="+u_id+"&sid="+s_id);
        }else if(way_name=="wei"){
            //微信支付
            window.sessionStorage.wei_pay_money='';
            window.location.href="wechat_pay.html";

        }else {
            $("#fail_modal_content").text("请选择支付方式！");
            $("#fail_operation_Modal").modal();
        }
    });
    //查看是否支付成功
    $(".pay_success").click(function () {
        $(this).attr("data-dismiss","modal");
        $.ajax({
            url:http+"ali/query/"+order_id+"?uid="+u_id+"&sid="+s_id,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                console.log(data);
                if(data.msg=="SUCCESS"){
                    if(data.data==true){
                        $(".update_text").text("支付成功！");
                        $("#success_update_Modal").modal();
                        $('#success_update_Modal').on('hide.bs.modal',function() {
                            window.open("individual_order_list.html");
                            window.close();
                            // window.location.href="../index.html";
                        });
                    }else {
                        $(".ask_text").text("支付失败！");
                        $("#fail_pay_Modal").modal();
                        $('#fail_pay_Modal').on('hide.bs.modal',function() {
                            // window.location.reload();
                        });
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
    });
    $(".pay_fail").click(function () {
        $(this).attr("data-dismiss","modal");
    })
    //预充值订单支付
        $("#submit_recharge_pay").click(function () {
            $.ajax({
                url:http+"order/"+order_id+"/pay?uid="+u_id+"&sid="+s_id,
                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                xhrFields:{withCredentials: true},
                // contentType:"application/json;charset=UTF-8",
                // data:JSON.stringify({"id":order_id}),
                success:function (data) {
                    console.log(data)
                    if(data.msg=="SUCCESS"){
                        if (payWay_num==5){
                            $("#success_update_Modal").modal();
                            $("#success_update_Modal").on('hide.bs.modal',function () {
                                window.open("individual_order_list.html");
                                window.close();
                            });
                        }

                    }else {
                        if(data.msg=="NO_LOGIN"){
                            window.location.href="login.html";
                        }else {
                            $(".recharge_text").text(data.error);
                            $("#recharge_Modal").modal();
                            $("#recharge_Modal").on('hide.bs.modal',function () {
                                window.open("individual_recharge.html");
                                window.close();
                            });
                        }

                    }

                }
            })
        })
    //头部下拉菜单
    $(".top_shortcut .fl").mouseenter(function () {
        $(".top_shortcut .dt").addClass("current_bg");
        $(".top_shortcut .dd").show(100);
    }).mouseleave(function () {
        $(".top_shortcut  .dt").removeClass("current_bg");
        $(".top_shortcut .dd").hide(100);
    });
    $(".my_qwt_box").mouseenter(function () {
        $(".my_qwt_box .my_qwt").addClass("current_bg");
        $(".my_qwt_box .my_qwt_info").show(100);
    }).mouseleave(function () {
        $(".my_qwt_box .my_qwt").removeClass("current_bg");
        $(".my_qwt_box .my_qwt_info").hide(100);
    });
    $(".my_service_box").mouseenter(function () {
        $(".my_service_box .my_service").addClass("current_bg");
        $(".my_service_box .my_service_info").show(100);
    }).mouseleave(function () {
        $(".my_service_box .my_service").removeClass("current_bg");
        $(".my_service_box .my_service_info").hide(100);
    });
});