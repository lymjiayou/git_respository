/**
 * Created by MY on 2018/9/9.
 */
var http=Http;

$(function () {
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var  wait_pay_tip='<span class="wait_pay_tip">待付款订单24小时不支付将会自动取消</span>'
    // 按照日期搜索订单
    //    日期控件
    $("#start_time").datetimepicker({
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
    });
    $("#end_time").datetimepicker({
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
    });
    //获取所有待付款订单
        $.ajax({
            url:http+"order?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10&state=1",
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (order_list) {
                if(order_list.msg=="SUCCESS"){
                    console.log(order_list)
                    var all_order_list=order_list.data.list;
                    console.log(all_order_list)
                    if(all_order_list.length>0){
                        var totalPage =  order_list.data.totalPage;
                        $('.pageTest').page({
                            leng:totalPage,//分页总数
                            activeClass: 'activP' , //active 类样式定义
                            clickBack:function(page){
                                // console.log(page-1)
                                var current=page;
                                change_page(current);
                            }
                        })
                        $.each(all_order_list,function (index) {
                            // console.log(index)
                            var order_list_info=all_order_list[index].commodities;
                            // console.log(order_list_info)
                            var orders="";
                            var order_state_text="";
                            var order_operation="";
                            // console.log(order_list_info.length)
                            $.each(order_list_info,function (i) {

                                orders+='<div class="order_content">'+'<div class="good_content" commodity_code=i_'+order_list_info[i].commodityCode+' self_id=i_'+order_list_info[i].commodityId+'>'+'<div class="good_pic">'+'<img src='+order_list_info[i].logoPath+' alt="">'+'</div>'+
                                    '<div class="good_name">'+'<span>'+order_list_info[i].commodityName+'</span>'+'</div>'+
                                    '<div class="good_standard">'+'<span>'+order_list_info[i].standardName+'</span>'+'</div>'+'</div>'+
                                    '<div class="good_price">'+'<span class="price">'+order_list_info[i].unitPrice+'</span>'+'</div>'+
                                    '<div class="good_num">'+'<span>'+'X'+'</span>'+'<span class="nums">'+order_list_info[i].commodityNumber+'</span>'+'</div>'+
                                    '<div class="al_price">'+'<span>'+'￥'+'</span>'+'<span class="alprice">'+order_list_info[i].totalAmount+'</span>'+'</div>'+'</div>';
                                order_state_text="待付款";
                                order_operation='<button type="button" class="btn btn-danger cancle_order" order_num=i_'+all_order_list[index].id+'>'+'取消订单'+'</button>'+
                                    '<button type="button" class="btn btn-warning pay_order">'+'支付订单'+'</button>';
                                // console.log(orders)
                            })
                            var order_common='<div class="order_box" pay_way=i_'+all_order_list[index].payWay+' order_id=i_'+all_order_list[index].id+' order_state=i_'+all_order_list[index].state+'>'+'<div class="order_head">'+'<div class="order_time">'+'<span>'+'下单时间:'+'</span>'+
                                '<span class="time">'+all_order_list[index].createTimestamp+'</span>'+'</div>'+'<div class="order_num">'+'<span>'+'订单号:'+'</span>'+'<span class="o_num">'+all_order_list[index].id+'</span>'+wait_pay_tip+'</div>'+'</div>'
                                +'<div class="order_content_big_box">'+'<div class="order_content_box">'+orders+'</div>'+
                                '<div class="order_status">'+'<div class="order_status_text">'+'<span class="o_status">'+order_state_text+'</span>'+'<span class="need_detail">'+
                                '订单详情'+'</span>'+'</div>'+'</div>'+'<div class="order_operation">'+'<div class="order_operation_box">'+order_operation+
                                '</div>'+'</div>'+'</div>'+'</div>';
                            $("#w_pay").append(order_common);


                            //查看是否有符合查询要求的数据
                            var order_content_big_box=$(".order_content_big_box")
                            order_content_big_box.each(function () {
                                var order_height=$(this).height();
                                $(this).find($(".order_status")).css("height",order_height+"px");
                                $(this).find($(".order_operation")).css("height",order_height+"px")
                            })

                        })
                       common_operation()


                    }else {
                        var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                        $("#w_pay").append(no_data);
                    }
                }else {
                    // var data=JSON.parse(order_list);
                    // console.log(data);
                    if(order_list.msg=="NO_LOGIN"){
                        window.location.href="login.html";
                    }else{
                        $("#fail_modal_content").text(order_list.error);
                        $("#fail_operation_Modal").modal();
                    }
                }
            }

        })

    //如果按照时间搜索订单
    $("#search_time").click(function () {
        var start_time=$("#start_time").val();
        var end_time=$("#end_time").val();
        // console.log(typeof (start_time));
        $.ajax({
            url:http+"order?uid="+u_id+"&page=1&pageSize=10&sid="+s_id+"&startTime="+start_time+"&endTime="+end_time+"&state=1",
            type:'get',
            xhrFields:{withCredentials: true},
            success:function (order_list) {
                if(order_list.msg=="SUCCESS"){
                    $("#w_pay").empty();
                    $(".change_page").remove();
                    $("#w_pay").after('<div class="pageTest change_page"></div>')
                    var all_order_list=order_list.data.list;
                    console.log(all_order_list)
                    if(all_order_list.length>0){
                        var totalPage =  order_list.data.totalPage;
                        $('.pageTest').page({
                            leng:totalPage,//分页总数
                            activeClass: 'activP' , //active 类样式定义
                            clickBack:function(page){
                                // console.log(page-1)
                                var current=page;
                                change_time_page(current,start_time,end_time);
                            }
                        })
                        $.each(all_order_list,function (index) {
                            // console.log(index)
                            var order_list_info=all_order_list[index].commodities;
                            // console.log(order_list_info)
                            var orders="";
                            var order_state_text="";
                            var order_operation="";
                            // console.log(order_list_info.length)
                            $.each(order_list_info,function (i) {

                                orders+='<div class="order_content">'+'<div class="good_content" commodity_code=i_'+order_list_info[i].commodityCode+' self_id=i_'+order_list_info[i].commodityId+'>'+'<div class="good_pic">'+'<img src='+order_list_info[i].logoPath+' alt="">'+'</div>'+
                                    '<div class="good_name">'+'<span>'+order_list_info[i].commodityName+'</span>'+'</div>'+
                                    '<div class="good_standard">'+'<span>'+order_list_info[i].standardName+'</span>'+'</div>'+'</div>'+
                                    '<div class="good_price">'+'<span class="price">'+order_list_info[i].unitPrice+'</span>'+'</div>'+
                                    '<div class="good_num">'+'<span>'+'X'+'</span>'+'<span class="nums">'+order_list_info[i].commodityNumber+'</span>'+'</div>'+
                                    '<div class="al_price">'+'<span>'+'￥'+'</span>'+'<span class="alprice">'+order_list_info[i].totalAmount+'</span>'+'</div>'+'</div>';
                                order_state_text="待付款";
                                order_operation='<button type="button" class="btn btn-danger cancle_order" order_num=i_'+all_order_list[index].id+'>'+'取消订单'+'</button>'+
                                    '<button type="button" class="btn btn-warning pay_order">'+'支付订单'+'</button>';
                                // console.log(orders)
                            })
                            var order_common='<div class="order_box" pay_way=i_'+all_order_list[index].payWay+' order_id=i_'+all_order_list[index].id+' order_state=i_'+all_order_list[index].state+'>'+'<div class="order_head">'+'<div class="order_time">'+'<span>'+'下单时间:'+'</span>'+
                                '<span class="time">'+all_order_list[index].createTimestamp+'</span>'+'</div>'+'<div class="order_num">'+'<span>'+'订单号:'+'</span>'+'<span class="o_num">'+all_order_list[index].id+'</span>'+wait_pay_tip+'</div>'+'</div>'
                                +'<div class="order_content_big_box">'+'<div class="order_content_box">'+orders+'</div>'+
                                '<div class="order_status">'+'<div class="order_status_text">'+'<span class="o_status">'+order_state_text+'</span>'+'<span class="need_detail">'+
                                '订单详情'+'</span>'+'</div>'+'</div>'+'<div class="order_operation">'+'<div class="order_operation_box">'+order_operation+
                                '</div>'+'</div>'+'</div>'+'</div>';
                            $("#w_pay").append(order_common);


                            //查看是否有符合查询要求的数据
                            var order_content_big_box=$(".order_content_big_box")
                            order_content_big_box.each(function () {
                                var order_height=$(this).height();
                                $(this).find($(".order_status")).css("height",order_height+"px");
                                $(this).find($(".order_operation")).css("height",order_height+"px")
                            })

                        })
                        common_operation()


                    }else {
                        var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                        $("#w_pay").append(no_data);
                    }
                }else {
                    // var data=JSON.parse(order_list);
                    // console.log(data);
                    if(order_list.msg=="NO_LOGIN"){
                        window.location.href="login.html";
                    }else if(order_list.msg=="FAIL"){
                        $("#fail_modal_content").text(order_list.error);
                        $("#fail_operation_Modal").modal();
                    }
                }

            }
        })

    })

})
function change_page(current_page) {
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var  wait_pay_tip='<span class="wait_pay_tip">待付款订单24小时不支付将会自动取消</span>'
    //获取所有待付款订单
    $.ajax({
        url:http+"order?uid="+u_id+"&sid="+s_id+"&page="+current_page+"&pageSize=10&state=1",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (order_list) {
            if(order_list.msg=="SUCCESS"){
                console.log(order_list)
                $("#w_pay").empty();
                var all_order_list=order_list.data.list;
                console.log(all_order_list)
                if(all_order_list.length>0){
                    $.each(all_order_list,function (index) {
                        // console.log(index)
                        var order_list_info=all_order_list[index].commodities;
                        // console.log(order_list_info)
                        var orders="";
                        var order_state_text="";
                        var order_operation="";
                        // console.log(order_list_info.length)
                        $.each(order_list_info,function (i) {

                            orders+='<div class="order_content">'+'<div class="good_content" commodity_code=i_'+order_list_info[i].commodityCode+' self_id=i_'+order_list_info[i].commodityId+'>'+'<div class="good_pic">'+'<img src='+order_list_info[i].logoPath+' alt="">'+'</div>'+
                                '<div class="good_name">'+'<span>'+order_list_info[i].commodityName+'</span>'+'</div>'+
                                '<div class="good_standard">'+'<span>'+order_list_info[i].standardName+'</span>'+'</div>'+'</div>'+
                                '<div class="good_price">'+'<span class="price">'+order_list_info[i].unitPrice+'</span>'+'</div>'+
                                '<div class="good_num">'+'<span>'+'X'+'</span>'+'<span class="nums">'+order_list_info[i].commodityNumber+'</span>'+'</div>'+
                                '<div class="al_price">'+'<span>'+'￥'+'</span>'+'<span class="alprice">'+order_list_info[i].totalAmount+'</span>'+'</div>'+'</div>';
                            order_state_text="待付款";
                            order_operation='<button type="button" class="btn btn-danger cancle_order" order_num=i_'+all_order_list[index].id+'>'+'取消订单'+'</button>'+
                                '<button type="button" class="btn btn-warning pay_order">'+'支付订单'+'</button>';
                            // console.log(orders)
                        })
                        var order_common='<div class="order_box" pay_way=i_'+all_order_list[index].payWay+' order_id=i_'+all_order_list[index].id+' order_state=i_'+all_order_list[index].state+'>'+'<div class="order_head">'+'<div class="order_time">'+'<span>'+'下单时间:'+'</span>'+
                            '<span class="time">'+all_order_list[index].createTimestamp+'</span>'+'</div>'+'<div class="order_num">'+'<span>'+'订单号:'+'</span>'+'<span class="o_num">'+all_order_list[index].id+'</span>'+ wait_pay_tip+'</div>'+'</div>'
                            +'<div class="order_content_big_box">'+'<div class="order_content_box">'+orders+'</div>'+
                            '<div class="order_status">'+'<div class="order_status_text">'+'<span class="o_status">'+order_state_text+'</span>'+'<span class="need_detail">'+
                            '订单详情'+'</span>'+'</div>'+'</div>'+'<div class="order_operation">'+'<div class="order_operation_box">'+order_operation+
                            '</div>'+'</div>'+'</div>'+'</div>';
                        $("#w_pay").append(order_common);


                        //查看是否有符合查询要求的数据
                        var order_content_big_box=$(".order_content_big_box")
                        order_content_big_box.each(function () {
                            var order_height=$(this).height();
                            $(this).find($(".order_status")).css("height",order_height+"px");
                            $(this).find($(".order_operation")).css("height",order_height+"px")
                        })

                    })
                    common_operation()
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $("#w_pay").append(no_data);
                }

            }else {
                // var data=JSON.parse(order_list);
                // console.log(data);
                if(order_list.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else if(order_list.msg=="FAIL"){
                    $("#fail_modal_content").text(order_list.error);
                    $("#fail_operation_Modal").modal();
                }
            }


        }

    })

}
function change_time_page(time_current_page,start_time,end_time) {
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var  wait_pay_tip='<span class="wait_pay_tip">待付款订单24小时不支付将会自动取消</span>'
    console.log(time_current_page)
    $.ajax({
        url:http+"order?uid="+u_id+"&page="+time_current_page+"&pageSize=10&sid="+s_id+"&startTime="+start_time+"&endTime="+end_time+"&state=1",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (order_list) {
            if(order_list.msg=="SUCCESS"){
                $("#w_pay").empty();
                var all_order_list=order_list.data.list;
                console.log(all_order_list)
                if(all_order_list.length>0){
                    $.each(all_order_list,function (index) {
                        // console.log(index)
                        var order_list_info=all_order_list[index].commodities;
                        // console.log(order_list_info)
                        var orders="";
                        var order_state_text="";
                        var order_operation="";
                        // console.log(order_list_info.length)
                        $.each(order_list_info,function (i) {

                            orders+='<div class="order_content">'+'<div class="good_content" commodity_code=i_'+order_list_info[i].commodityCode+' self_id=i_'+order_list_info[i].commodityId+'>'+'<div class="good_pic">'+'<img src='+order_list_info[i].logoPath+' alt="">'+'</div>'+
                                '<div class="good_name">'+'<span>'+order_list_info[i].commodityName+'</span>'+'</div>'+
                                '<div class="good_standard">'+'<span>'+order_list_info[i].standardName+'</span>'+'</div>'+'</div>'+
                                '<div class="good_price">'+'<span class="price">'+order_list_info[i].unitPrice+'</span>'+'</div>'+
                                '<div class="good_num">'+'<span>'+'X'+'</span>'+'<span class="nums">'+order_list_info[i].commodityNumber+'</span>'+'</div>'+
                                '<div class="al_price">'+'<span>'+'￥'+'</span>'+'<span class="alprice">'+order_list_info[i].totalAmount+'</span>'+'</div>'+'</div>';
                            order_state_text="待付款";
                            order_operation='<button type="button" class="btn btn-danger cancle_order" order_num=i_'+all_order_list[index].id+'>'+'取消订单'+'</button>'+
                                '<button type="button" class="btn btn-warning pay_order">'+'支付订单'+'</button>';
                            // console.log(orders)
                        })
                        var order_common='<div class="order_box" pay_way=i_'+all_order_list[index].payWay+' order_id=i_'+all_order_list[index].id+' order_state=i_'+all_order_list[index].state+'>'+'<div class="order_head">'+'<div class="order_time">'+'<span>'+'下单时间:'+'</span>'+
                            '<span class="time">'+all_order_list[index].createTimestamp+'</span>'+'</div>'+'<div class="order_num">'+'<span>'+'订单号:'+'</span>'+'<span class="o_num">'+all_order_list[index].id+'</span>'+ wait_pay_tip+'</div>'+'</div>'
                            +'<div class="order_content_big_box">'+'<div class="order_content_box">'+orders+'</div>'+
                            '<div class="order_status">'+'<div class="order_status_text">'+'<span class="o_status">'+order_state_text+'</span>'+'<span class="need_detail">'+
                            '订单详情'+'</span>'+'</div>'+'</div>'+'<div class="order_operation">'+'<div class="order_operation_box">'+order_operation+
                            '</div>'+'</div>'+'</div>'+'</div>';
                        $("#w_pay").append(order_common);


                        //查看是否有符合查询要求的数据
                        var order_content_big_box=$(".order_content_big_box")
                        order_content_big_box.each(function () {
                            var order_height=$(this).height();
                            $(this).find($(".order_status")).css("height",order_height+"px");
                            $(this).find($(".order_operation")).css("height",order_height+"px")
                        })

                    })
                    common_operation()
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $("#w_pay").append(no_data);
                }

            }else {
                // var data=JSON.parse(order_list);
                // console.log(data);
                if(order_list.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else{
                    $("#fail_modal_content").text(order_list.error);
                    $("#fail_operation_Modal").modal();
                }
            }

        }
    })

}
function common_operation() {
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    //查看订单详情
    var check_order_detail=$(".need_detail");
    check_order_detail.each(function (index,ele) {
        $(ele).on("click",function () {
            var order_id=$(this).parent().parent().parent().parent().attr("order_id").split("_")[1];
            window.sessionStorage.detail_order_id=order_id;
            window.sessionStorage.order_status=$(this).parent().parent().parent().parent().attr("order_state").split("_")[1];;
            window.location.href="order_detail.html";
        })
    })
    //支付订单 直接跳转到支付界面
    $(".pay_order").each(function (index,ele) {
        $(ele).click(function () {
            var order_list_id=$(this).parent().parent().parent().parent().attr("order_id").split("_")[1];
            window.sessionStorage.pay_order_id=order_list_id;
            window.sessionStorage.pay_way=$(this).parent().parent().parent().parent().attr("pay_way").split("_")[1];
            window.open("submit_pay.html")
        })
    })
    //取消订单
    $(".cancle_order").click(function () {

        $(".order_num_info").text($(this).attr("order_num").split("_")[1]);
        $("#cancle_order_Modal").modal();
        var order_list_id=$(this).parent().parent().parent().parent().attr("order_id").split("_")[1];
        $(".confirm_cancle_order").click(function () {
            var cancle_reason_text=$("input[name=cancle_reason]:checked").val();
            // console.log(cancle_reason_text);
            $.ajax({
                url:http+"order/cancel?uid="+u_id+"&sid="+s_id,
                type:"patch",
                beforeSend: function(request) {
                    var cooinfo=getCookie("XSRF-TOKEN");
                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                },
                xhrFields:{withCredentials: true},
                data:JSON.stringify({"id":order_list_id,"cancelInfo":cancle_reason_text}),   //提交数据
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
    $(".good_content").click(function () {
        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
        var selfID=window.sessionStorage.obj_good_id;
        var commodityCODE=window.sessionStorage.good_commodityCode;
        window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
        // window.open("goods_detail.html");
    })

}