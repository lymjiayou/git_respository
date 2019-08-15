/**
 * Created by lysp on 2018/8/28.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    //获得用户信息
    $.ajax({
        url:http+"info?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data)
            if(data.msg=="SUCCESS"){
                var user_info=data.data;
                console.log(user_info)
                $(".user_name").html(user_info.username);
                $(".property_balance").html("<i>￥</i>"+user_info.balance);

                $(".user_touxiang_box").click(function () {
                    window.location.href="individual_user_info.html";
                })
                if(user_info.headSculpture!=null){
                    $(".img-circle").attr("src",user_info.headSculpture);
                }else {
                    $(".img-circle").attr("src","../images/touxiang.png");
                }

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
    //获取已结算待结算 已结算1 待结算0
    $.ajax({
        url:http+"order/costs?uid="+u_id+"&sid="+s_id+"&payState=1",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data)
            $(".property_cost").html("<i>￥</i>"+data.data);
        }
    })
    $.ajax({
        url:http+"order/costs?uid="+u_id+"&sid="+s_id+"&payState=0",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            $(".property_wait_cost").html("<i>￥</i>"+data.data);
        }
    })
    //获取订单信息
    $.ajax({
        url:http+"order/all?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=3",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            if(data.msg=="SUCCESS"){
                console.log(data);
                var order_list=data.data.list;
                if(order_list.length>0){
                    for(var i=0;i<order_list.length;i++){
                        var commodity_info=order_list[i].commodities[0];
                        var order_state=order_list[i].state;
                        // console.log(order_state);
                        // var order_state_text="";
                        //判断当前订单属于哪种状态
                        switch (order_state){

                            case 1: //待付款
                                var order_state_text="待付款";
                                break;
                            case 2:
                                var order_state_text="待发货";
                                break;
                            case 3:
                                var order_state_text="待收货";
                                break;
                            case 4:
                                var order_state_text="待评价";
                                break;
                            case 5:
                                var order_state_text="已完成";
                                break;
                        }
                        var show_order='<div class="order_box" order_id=i_'+order_list[i].id+' order_state=i_'+order_list[i].state+'>'+'<div class="order_content">'+'<div class="good_content" commodity_code=i_'+commodity_info.commodityCode+' self_id=i_'+commodity_info.commodityId+'>'+
                            '<div class="good_pic">'+'<img src='+commodity_info.logoPath +' alt="">'+'</div>'+
                            '<div class="good_name">'+'<span>'+commodity_info.commodityName+'</span>'+'</div>'+
                            '<div class="good_standard">'+'<span>'+commodity_info.commodityName+'</span>'+'</div>'+'</div>'+
                            '<div class="al_price">'+'<span>'+'￥'+'</span>'+'<span class="alprice">'+commodity_info.totalAmount+'</span>'+
                            '</div>'+'<div class="order_time">'+'<span>'+order_list[i].createTimestamp+'</span>'+'</div>'+
                            '<div class="order_status">'+'<span class="o_status">'+order_state_text+'</span>'+'<a href="#" class="need_pay_detail">'+'订单详情'+'</a>'+
                            '</div>'+'</div>'+'</div>';
                        $(".list_content_box").append(show_order);
                    }
                    //查看订单详情
                    var check_order_detail=$(".need_pay_detail");
                    check_order_detail.each(function (index,ele) {
                        $(ele).on("click",function () {
                            var order_id=$(this).parent().parent().parent().attr("order_id").split("_")[1];
                            window.sessionStorage.detail_order_id=order_id;
                            window.sessionStorage.order_status=$(this).parent().parent().parent().attr("order_state").split("_")[1];
                            window.location.href="order_detail.html";
                        })

                    })
                    $(".good_content").click(function () {
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=window.sessionStorage.obj_good_id;
                        var commodityCODE=window.sessionStorage.good_commodityCode;
                        window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);

                    })
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".list_content_box").append(no_data);
                }

            }
        }
    })
    //获取购物车信息
    $.ajax({
        url:http+"cart?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            console.log(data)
            if(data.msg=="SUCCESS"){
                var shopcar_list=data.data.commodities;
                console.log(shopcar_list);
                if(shopcar_list.length>0){
                    if(shopcar_list.length>=5){
                        for (var i=0;i<5;i++){
                            var shop_car_content_5='<div class="order_box" self_id=i_'+shopcar_list[i].commodity.id+' commodity_code=i_'+shopcar_list[i].commodity.commodityCode+'>'+'<div class="order_content">'+'<div class="good_content">'+
                                '<div class="good_pic">'+'<img src='+shopcar_list[i].commodity.logoPath+' alt="">'+'</div>'+
                                '<div class="good_name">'+'<span>'+shopcar_list[i].commodity.commodityName+'</span>'+'</div>'+
                                '<button type="button" class="btn btn-warning look_good" self_id=i_'+shopcar_list[i].commodity.commodityId+' commodity_code=i_'+shopcar_list[i].commodity.commodityCode+'>'+'查看'+'</button>'+'</div>'+'</div>'+'</div>';
                            $(".shop_car_content_box").append(shop_car_content_5);
                        }
                    }else {
                        for (var i=0;i<shopcar_list.length;i++){
                            var shop_car_content='<div class="order_box" self_id=i_'+shopcar_list[i].commodity.id+' commodity_code=i_'+shopcar_list[i].commodity.commodityCode+'>'+'<div class="order_content">'+'<div class="good_content">'+
                                '<div class="good_pic">'+'<img src='+shopcar_list[i].commodity.logoPath+' alt="">'+'</div>'+
                                '<div class="good_name">'+'<span>'+shopcar_list[i].commodity.commodityName+'</span>'+'</div>'+
                                '<button type="button" class="btn btn-warning look_good" self_id=i_'+shopcar_list[i].commodity.commodityId+' commodity_code=i_'+shopcar_list[i].commodity.commodityCode+'>'+'查看'+'</button>'+'</div>'+'</div>'+'</div>';
                            $(".shop_car_content_box").append(shop_car_content);
                        }
                    }

                    var look_good=$(".look_good");
                    look_good.each(function (index,ele) {
                        $(ele).click(function () {
                            window,sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                            window.sessionStorage.obj_good_id=$(this).parent().parent().parent().attr("self_id").split("_")[1];
                            var selfID=window.sessionStorage.obj_good_id;
                            var commodityCODE=window.sessionStorage.good_commodityCode;
                            window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                        })
                    })
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".shop_car_content_box").append(no_data);
                }

            }else {if(data.msg=="NO_LOGIN"){
                window.location.href="login.html";
            }else{
                $("#fail_modal_content").text(data.error);
                $("#fail_operation_Modal").modal();
            }}
        }
    })
})