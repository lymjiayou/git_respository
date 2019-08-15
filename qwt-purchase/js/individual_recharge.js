/**
 * Created by lysp on 2018/9/4.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var amount="";
    var recharge_orderId="";
    var pay_way=""
    var way_name="";
    // $(".charge_agin").each(function (index,ele) {
    //     $(ele).on("click",function () {
    //         var judge=$(this).attr("pay_way").split("_")[1];
    //         if(judge==1){
    //             window.sessionStorage.wei_pay_money=78;
    //             window.sessionStorage.pay_order_id=recharge_orderId;
    //             window.location.href="wechat_recharge_pay.html";
    //         }
    //
    //     })
    // });



    $(".charge_agin").click(function() {
        var am=$(".re_money").val();
        var id=$(".re_num").val();

        // window.location.href="../mall_html/wechat_recharge_pay.html";
        window.sessionStorage.wei_pay_money=am;
        window.sessionStorage.pay_order_id=id;
        window.location.href="wechat_recharge_pay.html";
    });

    // $(".charge_agin").click(function() {
    // var judge=0;//微信
    //     $("#amount").val("");
    //     if($("#amount").val()=="") {
    //         $(".recharge_warn").eq(0).remove();
    //     }
    // $("#recharge_ways_Modal").modal();
    // if(judge==0){
    //     //清空错误
    //     $(".recharge_warn").remove();
    //     $("#amount").val("");
    //     $(".amount_box").show();
    //     //选中微信框
    //     $("li.way_pic+li").css("border", "2px solid #5bc0de").siblings().css("border", "2px solid #f2f2f2");
    //     way_name = "wei";
    //
    //
    // }
    //
    // // $(".way_pic").click(function () {
    // //
    // //     //清空错误
    // //     $(".recharge_warn").remove();
    // //     $("#amount").val("");
    // //     $(".amount_box").show();
    // //     $("li.way_pic+li").css("border", "2px solid #5bc0de").siblings().css("border", "2px solid #f2f2f2");
    // //     way_name = $(this).attr("way_name");
    // // });
    //
    // });
    //
    // $(".confirm_recharge_way").click(function () {
    //     if($(".recharge_warn").length==0) {
    //             if (way_name == "wei") {
    //                 var amount=parseInt($("#amount").val());
    //                 //微信充值
    //
    //                 var amount = $("#amount").val("");
    //                 $(this).attr("data-dismiss", "modal");
    //                 window.sessionStorage.wei_pay_money = amount;
    //                 window.sessionStorage.pay_order_id = "944128020190814150810630";
    //                 window.location.href = "wechat_recharge_pay.html";
    //             }
    //
    //     }
    // });
    $(".detail").click(function() {
        var judge=1;
        if (judge == 1) {
            // console.log(111)

                $(".recharge_state").text("未支付");

            $(".recharge_trade").text("支付宝交易号:");

                $(".recharge_trade_info").text("无");



            // $(".recharge_id").text(recharge_list[index].id);
            // $(".recharge_create_time").text(recharge_list[index].createTimestamp);
            // $(".recharge_pay_money").text(recharge_list[index].amount);

        } else {
            if (recharge_list[index].pay == true) {
                $(".recharge_state").text("已支付");
            } else {
                $(".recharge_state").text("未支付");
            }
            $(".recharge_trade").text("微信交易号:");
            if (recharge_list[index].tradeNo == null) {
                $(".recharge_trade_info").text("无");
            }
            else {
                $(".recharge_trade_info").text(recharge_list[index].tradeNo);
            }
            // $(".recharge_id").text(recharge_list[index].id);
            // $(".recharge_create_time").text(recharge_list[index].createTimestamp);
            // $(".recharge_pay_money").text(recharge_list[index].amount);
        }
        $("#recharge_detail_Modal").modal();
    });




























    $.ajax({
        url:http+"info?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            console.log(data)
            if(data.msg=="SUCCESS"){
                $(".my_money").html("<i>￥</i>"+data.data.balance);
            }else {
                // var obj_data=JSON.parse(data);
                // console.log(obj_data);
                if(data.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else if(data.msg=="FAIL"){
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }
    })
    //充值列表
    $.ajax({
        url:http+"recharge?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                var recharge_list=data.data.list;
                // console.log(recharge_list)
                if(recharge_list.length>0){
                    var totalPage =  data.data.totalPage;
                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current);
                        }
                    })
                    for(var i=0;i<recharge_list.length;i++){
                        if (recharge_list[i].payWay==1){
                            pay_way="支付宝";
                        }
                        else if(recharge_list[i].payWay==0){
                            pay_way="微信";
                        }
                        var recharge_content='<tr class="recharge_content">'+'<th class="re_num">'+recharge_list[i].id+'</th>'+
                            '<th class="re_time">'+recharge_list[i].updateTimestamp+'</th>'+'<th class="re_pay_way">'+pay_way+'</th>'+
                            '<th class="re_money">'+recharge_list[i].amount+'</th>'+'<th class="re_operation">'+'<span class="detail" pay_way=i_'+recharge_list[i].payWay+'>'+
                                '查看'+'</span>'+'</th>'+'</tr>';
                        $(".recharge_list_box").append(recharge_content);
                    }
                    $(".detail").each(function (index,ele) {
                        $(ele).on("click",function () {

                            var judge=$(this).attr("pay_way").split("_")[1];
                            if(judge==1){
                                // console.log(111)
                                if(recharge_list[index].pay==true){
                                    $(".recharge_state").text("已支付");
                                }else {
                                    $(".recharge_state").text("未支付");
                                }
                                $(".recharge_trade").text("支付宝交易号:");
                                if(recharge_list[index].tradeNo==null){
                                    $(".recharge_trade_info").text("无");
                                }
                                else{
                                    $(".recharge_trade_info").text(recharge_list[index].tradeNo);
                                }

                                $(".recharge_id").text(recharge_list[index].id);
                                $(".recharge_create_time").text(recharge_list[index].createTimestamp);
                                $(".recharge_pay_money").text(recharge_list[index].amount);

                            }else {
                                if(recharge_list[index].pay==true){
                                    $(".recharge_state").text("已支付");
                                }else {
                                    $(".recharge_state").text("未支付");
                                }
                                $(".recharge_trade").text("微信交易号:");
                                if(recharge_list[index].tradeNo==null){
                                    $(".recharge_trade_info").text("无");
                                }
                                else{
                                    $(".recharge_trade_info").text(recharge_list[index].tradeNo);
                                }
                                $(".recharge_id").text(recharge_list[index].id);
                                $(".recharge_create_time").text(recharge_list[index].createTimestamp);
                                $(".recharge_pay_money").text(recharge_list[index].amount);
                            }
                            $("#recharge_detail_Modal").modal();
                        })
                    })
                }
                else {
                        var no_data='<div class="no_data" style="margin-top: 20px">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                        $(".recharge_list").after(no_data);
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
    })
    $("#recharge").click(function () {
        $("#amount").val("");
        if($("#amount").val()=="") {
            $(".recharge_warn").eq(0).remove();
        }
        $("#recharge_ways_Modal").modal();
        $(".way_pic").each(function (index,ele) {
            $(ele).click(function () {
                //清空错误
                $(".recharge_warn").remove();
                $("#amount").val("");
                $(".amount_box").show();
                $(this).css("border","2px solid #5bc0de").siblings().css("border","2px solid #f2f2f2");
                way_name=$(this).attr("way_name");

            })
        })

    });
    $(".confirm_recharge_way").click(function () {
        console.log(way_name)
        console.log($(".recharge_warn").length)
        if($(".recharge_warn").length==0){
            if($("#amount").val()==""){
                // console.log(22)
                $("#fail_modal_content").text("请选择支付方式及输入支付金额再确定!");
                $("#fail_operation_Modal").modal();
            }else {
                if(way_name=="zhi"){
                    //支付宝充值
                    $(this).attr("data-dismiss","modal");
                    amount=$("#amount").val();
                    // window.open(http+"ali/recharge?uid="+u_id+"&sid="+s_id+"&money="+amount);
                    $.ajax({
                        url:http+"recharge?uid="+u_id+"&sid="+s_id,
                        type:"POST",
                        beforeSend: function(request) {
                            var cooinfo=getCookie("XSRF-TOKEN");
                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                        },
                        xhrFields:{withCredentials: true},
                        contentType:"application/json;charset=UTF-8",
                        data:JSON.stringify({"amount":amount,"payWay":1}),
                        success:function (data) {
                            console.log(data)
                            if(data.msg=="SUCCESS"){
                                // console.log(11)
                                recharge_orderId=data.data;
                                $("#online_check_Modal").modal();
                                // console.log(http+"ali/recharge/"+recharge_orderId+"?uid="+u_id+"&sid="+s_id);
                                window.open(http+"ali/recharge/"+recharge_orderId+"?uid="+u_id+"&sid="+s_id);
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
                }else if(way_name="wei"){
                    //    微信充值
                    $(this).attr("data-dismiss","modal");
                    amount=$("#amount").val();
                    // window.sessionStorage.wei_pay_money=amount;
                    // // window.sessionStorage.pay_order_id=recharge_orderId;
                    // window.location.href="wechat_recharge_pay.html";
                    $.ajax({
                        url:http+"recharge?uid="+u_id+"&sid="+s_id,
                        type:"POST",
                        beforeSend: function(request) {
                            var cooinfo=getCookie("XSRF-TOKEN");
                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                        },
                        xhrFields:{withCredentials: true},
                        contentType:"application/json;charset=UTF-8",
                        data:JSON.stringify({"amount": amount,"payWay":0}),
                        success:function (data) {
                            console.log(data)
                            if(data.msg=="SUCCESS"){
                                recharge_orderId=data.data;
                                console.log(amount)
                                window.sessionStorage.wei_pay_money=amount;
                                window.sessionStorage.pay_order_id=recharge_orderId;
                                window.location.href="wechat_recharge_pay.html";
                                // window.open("wechat_recharge_pay.html")

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
            }
        }

    });
    //充值表单验证
    $("#amount").focus(function () {
        $(".recharge_tip").remove();
    })
    $("#amount").blur(function () {
        if(!$(this).val().match(/^[1-9]\d*$/)){
            $(".recharge_warn").remove();
            $(this).after('<span class="recharge_warn"><i>*</i>充值金额错误！</span>')
        }else if(parseInt($(this).val())>100000000){
            $(".recharge_warn").remove();
            $(this).after('<span class="recharge_warn"><i>*</i>充值金额不能超过100000000！</span>')
        }else {
            $(".recharge_warn").eq(0).remove();
        }
    })
    //支付宝查询是否支付成功
    $(".pay_success").click(function () {
        $(this).attr("data-dismiss","modal");
        $.ajax({
            url:http+"recharge/"+recharge_orderId+"?uid="+u_id+"&sid="+s_id,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                console.log(data);
                if(data.msg=="SUCCESS"){
                    if(data.data.pay==true){
                        $("#success_pay_Modal").modal();
                        $('#success_pay_Modal').on('hide.bs.modal',function() {
                            window.location.reload();
                        });
                    }else {

                        $(".ask_text").text("支付失败！");
                        $("#tip_delete_Modal").modal();
                        $('#tip_delete_Modal').on('hide.bs.modal',function() {
                            window.location.reload();
                        });
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
        })
    });
    $(".pay_fail").click(function (data) {
        $(this).attr("data-dismiss","modal");
        window.location.reload();
    })

})
//模态框关闭
$('body').on('hidden.bs.modal', '.modal', function () {
    console.log("qing")
    $(this).removeData('bs.modal');
});
function change_page(current_page) {
    var http=Http;
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    var pay_way="";

    //充值列表
    $.ajax({
        url:http+"recharge?page="+current_page+"&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            if(data.msg=="SUCCESS"){
                $(".recharge_list_box").empty();
                var recharge_list=data.data.list;
                console.log(recharge_list)
                if(recharge_list.length>0){
                    for(var i=0;i<recharge_list.length;i++){

                        if (recharge_list[i].payWay==1){
                                pay_way="支付宝";
                        }
                        else if(recharge_list[i].payWay==0){
                            pay_way="微信";
                        }

                        var recharge_content='<tr class="recharge_content">'+
                            '<th class="re_num">'+recharge_list[i].id+'</th>'+
                            '<th class="re_time">'+recharge_list[i].updateTimestamp+'</th>'+
                            '<th class="re_pay_way">'+pay_way+'</th>'+
                            '<th class="re_money">'+recharge_list[i].amount+'</th>'+
                            '<th class="re_operation">'+'<span class="detail" pay_way=i_'+recharge_list[i].payWay+'>'+'查看'+'</span>'+'</th>'+
                            '</tr>';
                        $(".recharge_list_box").append(recharge_content);
                    }
                    $(".detail").each(function (index,ele) {
                        $(ele).on("click",function () {
                            var judge=$(this).attr("pay_way").split("_")[1];
                            if(judge==1){
                                console.log(111)
                                $(".recharge_trade").text("支付宝交易号:");
                                if(recharge_list[index].tradeNo==null){
                                    $(".recharge_trade_info").text("无");
                                }
                                else{
                                    $(".recharge_trade_info").text(recharge_list[index].tradeNo);
                                }

                                $(".recharge_id").text(recharge_list[index].id);
                                $(".recharge_create_time").text(recharge_list[index].createTimestamp);
                                $(".recharge_pay_money").text(recharge_list[index].amount);

                            }else {
                                $(".recharge_trade").text("微信交易号:");
                                $(".recharge_trade_info").text(recharge_list[index].transactionId);
                                $(".recharge_id").text(recharge_list[index].id);
                                $(".recharge_create_time").text(recharge_list[index].createTimestamp);
                                $(".recharge_pay_money").text(recharge_list[index].amount);
                            }
                            $("#recharge_detail_Modal").modal();
                        })
                    })
                }else {
                    var no_data='<div class="no_data" style="margin-top: 20px">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".recharge_list").after(no_data);
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
    })
}
