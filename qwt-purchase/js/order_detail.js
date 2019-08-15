/**
 * Created by lysp on 2018/8/19.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    setTimeout("changeDivStyle();", 100);

    var order_id=window.sessionStorage.detail_order_id;
    var o_status =window.sessionStorage.order_status;
    console.log(o_status);
    $("#order_num").text(order_id);

    // console.log(order_id)
    //获取该订单详情
    $.ajax({
        url:http+"order/"+order_id+"?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data)
            if(data.msg=="SUCCESS"){
                window.sessionStorage.order_status=data.data.state;
                var goods_list=data.data.commodities;
                // var receiver_info=data.data.receiver;
                var invoice_info=data.data.invoice;
                $(".receiver_name_h").text(data.data.receiver);
                // console.log(goods_list);
                $(".receiver_addr").text(data.data.address+data.data.detailAddress);
                $(".receiver_phone").text(data.data.phone);
                if(data.data.customInformation!=null){
                    $(".request").text(data.data.customInformation)
                }else {
                    $(".request").text("无");
                }
                $("#pay_way").text(data.data.payWay);
                switch(data.data.payWay){
                    case 1:
                        $("#pay_way").text("记账一个月");
                        break;
                    case 2:
                        $("#pay_way").text("记账两个月");
                        break;
                    case 3:
                        $("#pay_way").text("记账三个月");
                        break;
                    case 4:
                        $("#pay_way").text("在线支付");
                        break;
                    case 5:
                        $("#pay_way").text("平台预充值支付");
                        break;
                    case 6:
                        $("#pay_way").text("货到付款");
                        break;
                }
                $("#all_price").html("<i>￥</i>"+data.data.unitPrice);
                //发票信息
                // console.log(invoice_info)
                if(invoice_info==null){
                    $(".have_receipt_box").hide()
                    $(".no_receipt_box").show()

                }else {
                    if(invoice_info.invoiceType==0){
                        $(".check_type").text("电子发票");
                    }else {
                        $(".check_type").text("纸质发票");
                    }
                    if(invoice_info.billingType==10){
                        $(".start_check_type").text("普通发票");
                    }else {
                        $(".start_check_type").text("专用发票");
                    }
                    $(".company_name").text(invoice_info.companyName);
                    $(".company_address_tel").text(invoice_info.companyAddress);
                    $(".bank_name").text(invoice_info.bankName);
                    $(".bank_account").text(invoice_info.bankAccount);
                }


            //对于待支付的订单，操作是统一的取消订单
                if(o_status==1){
                    var goods="";
                    for(var i=0;i<goods_list.length;i++){
                        goods+='<div class="order_content">'+'<div class="good_content" commodity_code=i_'+goods_list[i].commodityCode+' self_id=i_'+goods_list[i].commodityId+'>'+'<div class="good_pic">'+
                            '<img src='+goods_list[i].logoPath+' alt="">'+'</div>'+'<div class="good_name">'+'<span>'+goods_list[i].commodityName+'</span>'+'</div>'+
                            '<div class="good_standard">'+'<span>'+goods_list[i].standardName+'</span>'+'</div>'+'</div>'+
                            '<div class="good_price">'+'<span class="price">'+goods_list[i].unitPrice+'</span>'+'</div>'+
                            '<div class="good_num">'+'<span>'+'X'+'</span>'+'<span class="nums">'+goods_list[i].commodityNumber+'</span>'+'</div>'+
                            '<div class="al_price">'+'<span>'+'￥'+'</span>'+'<span class="alprice">'+goods_list[i].totalAmount+'</span>'+'</div>'+'</div>';
                    }
                    var order_common='<div class="order_box" pay_way=i_'+data.data.payWay+' order_id=i_'+data.data.id+'>'+'<div class="order_content_big_box">'+'<div class="order_content_box">'+goods+'</div>'+
                        '<div class="order_status">'+'<div class="order_status_text">'+'<span class="o_status">'+'待付款'+'</span>'+'</div>'+'</div>'+
                        '<div class="order_operation">'+'<div class="order_operation_box">'+'<button type="button" class="btn btn-danger cancle_order">'+
                        '取消订单'+'</button>'+'<button type="button" class="btn btn-warning pay_order">'+'支付订单'+'</button>'+
                        '</div>'+'</div>'+'</div>'+'</div>';
                    $(".order_list").after(order_common);
                    var order_content_big_box=$(".order_content_big_box")
                    $(".order_status").css("height", 120*goods_list.length + "px");
                    $(".order_operation").css("height", 120*goods_list.length + "px")
                    // order_content_big_box.each(function () {
                    //     var order_height = $(this).height();
                    //     $(this).find($(".order_status")).css("height", order_height + "px");
                    //     $(this).find($(".order_operation")).css("height", order_height + "px")
                    // })
                    // $(".receiver_name").text(goods_list[i].receiver);
                    // $(".receiver_addr").html(goods_list[i].address+goods_list[i].detailAddress);
                    // $(".receiver_name").html(goods_list[i].phone);

                }else{//对于其他请款的订单，针对每个商品都可以申请退款
                    // console.log(refund_operation)
                    // console.log(goods_list);
                    for(var i=0;i<goods_list.length;i++){
                        var good_status=goods_list[i].state;
                        console.log(good_status)
                        switch (good_status){
                            case 0:
                                var order_state_text="已取消";
                                var refund_operation='';
                                break;
                            case 2:
                                var order_state_text="待发货";
                                if(data.data.payWay==6){
                                    var refund_operation='';
                                }else {
                                    var refund_operation='<button type="button" class="btn btn-danger apply_refund">'+'申请退款'+'</button>';
                                }
                                break;
                            case 3:
                                var order_state_text="待收货";
                                var refund_operation='<button type="button" class="btn btn-danger apply_refund">'+'申请退款'+'</button>';
                                break;
                            case 4:
                                var order_state_text="待评价";
                                var refund_operation='<button type="button" class="btn btn-danger apply_reject">'+'申请退货'+'</button>';
                                break;
                            case 5:
                                var order_state_text="已完成";
                                var refund_operation='<button type="button" class="btn btn-danger apply_reject">'+'申请退货'+'</button>';
                                break;
                            case 6:
                                var order_state_text="待退货";
                                var refund_operation='';
                                break;
                            case 7:
                                var order_state_text="已退货";
                                var refund_operation='';
                                break;
                            case 8:
                                var order_state_text="退款中";
                                var refund_operation='';
                                break;
                            case 9:
                                var order_state_text="已退款";
                                var refund_operation='';
                                break;
                        }
                        var good='<div class="order_content1" pay_way=i_'+data.data.payWay+' order_id=i_'+data.data.id+'>'+'<div class="good_content1" commodity_code=i_'+goods_list[i].commodityCode+' self_id=i_'+goods_list[i].commodityId+'>'+'<div class="good_pic1">'+'<img src='+goods_list[i].logoPath+' alt="">'+'</div>'+
                            '<div class="good_name1">'+'<span>'+goods_list[i].commodityName+'</span>'+'</div>'+
                            '<div class="good_standard">'+'<span>'+goods_list[i].standardName+'</span>'+'</div>'+'</div>'+
                            '<div class="good_price1">'+'<span class="price1">'+goods_list[i].unitPrice+'</span>'+'</div>'+
                            '<div class="good_num1">'+'<span>'+'X'+'</span>'+'<span class="nums1">'+goods_list[i].commodityNumber+'</span>'+'</div>'+
                            '<div class="al_price1">'+'<span>'+'￥'+'</span>'+'<span class="alprice1">'+goods_list[i].totalAmount+'</span>'+'</div>'+
                            '<div class="order_status1">'+'<span class="o_status1" good_status=i_'+goods_list[i].state+'>'+order_state_text+'</span>'+'</div>'+'<div class="order_operation1" good_id=i_'+goods_list[i].id+'>'
                            +refund_operation+'</div>'+'</div>';
                        $(".order_list").after(good);
                    }
                    $(".order_content1:last").css("border-bottom","1px solid #ddd");

                }
                $(".good_content").click(function () {
                    window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                    window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                    var selfID=window.sessionStorage.obj_good_id;
                    var commodityCODE=window.sessionStorage.good_commodityCode;
                    window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                })
                $(".good_content1").each(function (index,ele) {
                    $(ele).click(function () {
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=window.sessionStorage.obj_good_id;
                        var commodityCODE=window.sessionStorage.good_commodityCode;
                        window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })

                })

                //支付订单 直接跳转到支付界面
                $(".pay_order").each(function (index,ele) {
                    $(ele).click(function () {
                        var order_list_id=$(this).parent().parent().parent().parent().attr("order_id").split("_")[1];
                        window.sessionStorage.pay_order_id=order_list_id;
                        window.sessionStorage.pay_way=$(this).parent().parent().parent().parent().attr("pay_way").split("_")[1];
                        // window.location.href="submit_pay.html";
                        window.open("submit_pay.html")
                    })
                })
                //取消订单
                $(".cancle_order").click(function () {
                    var order_list_id=$(this).parent().parent().parent().parent().attr("order_id").split("_")[1];
                    $(".cancel_id").text(order_list_id);
                    $("#cancle_order_Modal").modal();
                    $(".confirm_cancle_order").click(function () {
                        var cancle_reason_text=$("input[name=cancle_reason]:checked").val();
                        console.log(order_list_id)
                        $.ajax({
                            url:http+"order/cancel?uid="+u_id+"&sid="+s_id,
                            type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                            xhrFields:{withCredentials: true},
                            data:JSON.stringify({"id":order_list_id,"cancelInfo":cancle_reason_text}),   //提交数据
                            contentType:"application/json;charset=UTF-8",
                            success:function (data) {
                                if(data.msg="SUCCESS"){
                                    window.location.href=document.referrer;//返回前一页并刷新
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
                    })
                })
                var refund_reason="";
                //申请退款
                $(".apply_refund").click(function () {
                    var refund_money=$(this).parent().parent().find($(".alprice1")).html()
                    $(".refund_good_money").text(refund_money);
                    $(".refund_money").text(refund_money);
                    $("#apply_refund_Modal").modal();
                    var refund_good_id=$(this).parent().attr("good_id").split("_")[1];
                    console.log(refund_good_id)
                    var that=$(this);
                    $(".confirm_refund_order").click(function () {
                        refund_reason=$("input[name=refund_reason]:checked").val();
                        $.ajax({
                            url:http+"order/commodity/service/refund?uid="+u_id+"&sid="+s_id,
                            type:"POST",
                            beforeSend: function(request) {
                                var cooinfo=getCookie("XSRF-TOKEN");
                                request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                            },
                            xhrFields:{withCredentials: true},
                            data:JSON.stringify({"orderCommodityId":refund_good_id,"rejectInfo":refund_reason}),
                            contentType:"application/json;charset=UTF-8",
                            success:function (data) {
                                console.log(data);
                                if(data.msg=="SUCCESS"){
                                    window.location.reload();
                                }else {
                                    if(data.msg=="NO_LOGIN"){
                                        window.location.href="login.html";
                                    }else{
                                        $("#fail_modal_content").text(data.error);
                                        $("#fail_operation_Modal").modal();
                                    }

                                }
                            }
                        })
                    })

                })

                //申请退货
                $(".apply_reject").click(function () {
                    var reject_money=$(this).parent().parent().find($(".alprice1")).html();
                    $(".reject_good_money").text(reject_money);
                    $(".reject_money").text(reject_money);
                    $("#apply_reject_Modal").modal();
                    var refund_good_id=$(this).parent().attr("good_id").split("_")[1];
                    var that=$(this);
                    $(".confirm_reject_order").click(function () {
                        refund_reason=$("input[name=reject_reason]:checked").val();
                        $.ajax({
                            url:http+"order/commodity/service/reject?uid="+u_id+"&sid="+s_id,
                            type:"POST",
                            beforeSend: function(request) {
                                var cooinfo=getCookie("XSRF-TOKEN");
                                request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                            },
                            xhrFields:{withCredentials: true},
                            data:JSON.stringify({"orderCommodityId":refund_good_id,"rejectInfo":refund_reason}),
                            contentType:"application/json;charset=UTF-8",
                            success:function (data) {
                                console.log(data)
                                if(data.msg=="SUCCESS"){
                                    window.location.reload();
                                }else {
                                    if(data.msg=="NO_LOGIN"){
                                        window.location.href="login.html";
                                    }else{
                                        $("#fail_modal_content").text(data.error);
                                        $("#fail_operation_Modal").modal();
                                    }
                                }
                            }
                        })
                    })


                })

            }else {
                // var data=JSON.parse(data);
                // console.log(data);
                if(data.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else{
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }


    })

})
function changeDivStyle(){
    //获取隐藏框值
    //var o_status = $("#o_status").val();
    var o_status =parseInt(window.sessionStorage.order_status);
    // console.log(o_status);
    // var o_status=4;
    // console.log(o_status)
    if(o_status===1){
        $("#create").css("background","#e45050");
        $("#createText").css("color", "#e45050");

    }else if(o_status===2){
        $("#create").css("background","#e45050");
        $("#createText").css("color", "#e45050");
        $("#finish_pay").css("background", "#e45050");
        $("#finish_pay_Text").css("color", "#e45050");
        $(".line1").css("background","#e45050");
        $(".cancle_order").hide();
        $(".pay_order").hide();
        $(".refund").show();
        $(".o_status").html("待发货");
    }else if(o_status===3){
        $(".track-rcol").show();
        $("#create").css("background","#e45050");
        $("#createText").css("color", "#e45050");
        $("#finish_pay").css("background", "#e45050");
        $("#finish_pay_Text").css("color", "#e45050");
        $('#produce').css("background","#e45050");
        $('#produceText').css("color", "#e45050");
        $(".line1").css("background","#e45050");
        $(".line2").css("background","#e45050");
        $(".cancle_order").hide();
        $(".pay_order").hide();
        $(".confirm").show();
        $(".o_status").html("待收货");
    }else if(o_status===4){
        $(".track-rcol").show();
        $("#create").css("background","#e45050");
        $("#createText").css("color", "#e45050");
        $("#finish_pay").css("background", "#e45050");
        $("#finish_pay_Text").css("color", "#e45050");
        $('#produce').css("background","#e45050");
        $('#produceText').css("color", "#e45050");
        $("#confirm_order").css("background", "#e45050");
        $("#confirm_text").css("color", "#e45050");
        $(".line1").css("background","#e45050");
        $(".line2").css("background","#e45050");
        $(".line3").css("background","#e45050");
        $(".cancle_order").hide();
        $(".pay_order").hide();
        $(".commit").show();
        $(".o_status").html("已完成");
    }else if(o_status>=5){
        $(".track-rcol").show();
        $("#create").css("background","#e45050");
        $("#createText").css("color", "#e45050");
        $("#finish_pay").css("background", "#e45050");
        $("#finish_pay_Text").css("color", "#e45050");
        $('#produce').css("background","#e45050");
        $('#produceText').css("color", "#e45050");
        $("#confirm_order").css("background", "#e45050");
        $("#confirm_text").css("color", "#e45050");
        $("#received").css("background", "#e45050");
        $("#receivedText").css("color", "#e45050");
        $(".line1").css("background","#e45050");
        $(".line2").css("background","#e45050");
        $(".line3").css("background","#e45050");
        $(".line4").css("background","#e45050");
    }

}
