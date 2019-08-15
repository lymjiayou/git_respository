/**
 * Created by lysp on 2018/8/20.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var refund_text_content=""
    var platform_state=""
    var text=''
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
    //获取所有的退货退款申请
    $.ajax({
        url:http+"order/commodity/service?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10&states=6,7,8,9",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                var refund_list=data.data.list;
                console.log(refund_list)
                // refund_list.length=0;
                if(refund_list.length>0){
                    var totalPage =  data.data.totalPage;
                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current);
                        }
                    })
                    for(var i=0;i<refund_list.length;i++){
                        var refund_state=refund_list[i].state;
                        switch (refund_state){
                            case 6:
                                refund_text_content="商品退货退款";
                                platform_state="待处理";
                                text="退货退款编号:"
                                break;
                            case 7:
                                refund_text_content="商品退货退款";
                                platform_state="已退货退款";
                                text="退货退款编号:"
                                break;
                            case 8:
                                refund_text_content="商品退款";
                                platform_state="待处理";
                                text="退款编号:";
                                break;
                            case 9:
                                refund_text_content="商品退款";
                                platform_state="已退款";
                                text="退款编号:";
                                break;

                        }
                        console.log(refund_text_content)
                        var refund_good_list='<tr class="refund_content">'+'<td class="refund_num_info">'+'<span class="content">'+refund_text_content+'</span>'+
                            '<div class="item">'+'<span class="label_info">'+'订单编号:'+'</span>'+'<div class="info">'+refund_list[i].orderId+'</div>'+'</div>'+
                            '<div class="item">'+'<span class="label_info">'+text+'</span>'+'<div class="info">'+refund_list[i].orderCommodityId+'</div>'+'</div>'+
                            '</td>'+'<td class="refund_price_info">'+'<i>'+'￥'+'</i>'+refund_list[i].totalAmount+'</td>'+
                            '<td class="apply_time_info">'+refund_list[i].createTimestamp+'</td>'+'<td class="refund_audit_info">'+platform_state+'</td>'+
                            '<td class="refund_operation">'+'查看'+'</td>'+'</tr>';
                        $(".refund_table_list_box").append(refund_good_list);
                    }
                    //查看退款详情
                    $(".refund_operation").each(function (index,ele) {
                        $(ele).click(function () {
                            console.log(index)
                            $(".order_number").html($(this).parent().find(".refund_num_info").find(".item").find(".info").html());
                            $(".re_good_name").html(refund_list[index].commodityName+" "+refund_list[index].standardName);
                            $(".re_good_num").html(refund_list[index].commodityNumber);
                            $(".re_apply_time").html(refund_list[index].createTimestamp);
                            $(".re_money").html(refund_list[index].totalAmount);
                            $(".re_reason").html(refund_list[index].rejectInfo);
                            $(".operation_state").html($(this).parent().find(".refund_audit_info").html());
                            $("#refund_detail_Modal").modal();

                        })
                    })
                }else {
                    var no_data='<div class="no_data" style="margin-top: 20px">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".refund_table_box").append(no_data);
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

    //按时间搜索
    $("#search_time").click(function () {
        var start_time=$("#start_time").val();
        var end_time=$("#end_time").val();
        $.ajax({
            url:http+"order/commodity/service?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10&startTime="+start_time+"&endTime="+end_time+"&states=6,7,8,9",
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                if(data.msg=="SUCCESS"){
                    $(".no_data").remove();

                    $(".refund_table_list_box").empty();
                    $(".change_page").remove();
                    $(".refund_table_box").after('<div class="pageTest change_page"></div>')
                    var refund_list=data.data.list;
                    console.log(refund_list)
                    // refund_list.length=0;
                    if(refund_list.length>0){
                        var totalPage =  data.data.totalPage;
                        $('.pageTest').page({
                            leng:totalPage,//分页总数
                            activeClass: 'activP' , //active 类样式定义
                            clickBack:function(page){
                                // console.log(page-1)
                                var current=page;
                                change_time_page(current,start_time,end_time);
                            }
                        })
                        for(var i=0;i<refund_list.length;i++){
                            var refund_state=refund_list[i].state;
                            switch (refund_state){
                                case 6:
                                    refund_text_content="商品退货退款";
                                    platform_state="待处理";
                                    text="退货退款编号:"
                                    break;
                                case 7:
                                    refund_text_content="商品退货退款";
                                    platform_state="已处理";
                                    text="退货退款编号:"
                                    break;
                                case 8:
                                    refund_text_content="商品退款";
                                    platform_state="待处理";
                                    text="退款编号:"
                                    break;
                                case 9:
                                    refund_text_content="商品退款";
                                    platform_state="已退款";
                                    text="退款编号:"
                                    break;

                            }
                            console.log(refund_text_content)
                            var refund_good_list='<tr class="refund_content">'+'<td class="refund_num_info">'+'<span class="content">'+refund_text_content+'</span>'+
                                '<div class="item">'+'<span class="label_info">'+'订单编号:'+'</span>'+'<div class="info">'+refund_list[i].orderId+'</div>'+'</div>'+
                                '<div class="item">'+'<span class="label_info">'+text+'</span>'+'<div class="info">'+refund_list[i].orderCommodityId+'</div>'+'</div>'+
                                '</td>'+'<td class="refund_price_info">'+'<i>'+'￥'+'</i>'+refund_list[i].totalAmount+'</td>'+
                                '<td class="apply_time_info">'+refund_list[i].createTimestamp+'</td>'+'<td class="refund_audit_info">'+platform_state+'</td>'+
                                '<td class="refund_operation">'+'查看'+'</td>'+'</tr>';
                            $(".refund_table_list_box").append(refund_good_list);
                        }
                        //查看退款详情
                        $(".refund_operation").each(function (index,ele) {
                            $(ele).click(function () {
                                console.log(index)
                                $(".order_number").html($(this).parent().find(".refund_num_info").find(".item").find(".info").html());
                                $(".re_good_name").html(refund_list[index].commodityName+" "+refund_list[index].standardName);
                                $(".re_good_num").html(refund_list[index].commodityNumber);
                                $(".re_apply_time").html(refund_list[index].createTimestamp);
                                $(".re_money").html(refund_list[index].totalAmount);
                                $(".re_reason").html(refund_list[index].rejectInfo);
                                $(".operation_state").html($(this).parent().find(".refund_audit_info").html());
                                $("#refund_detail_Modal").modal();

                            })
                        })
                    }else {
                        $(".no_data").remove();
                        var no_data='<div class="no_data" style="margin-top: 20px">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                        $(".refund_table_box").append(no_data);
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

    })
})
function change_page(current_page) {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;

    //获取所有的退货退款申请
    $.ajax({
        url:http+"order/commodity/afterSale/all?uid="+u_id+"&sid="+s_id+"&page="+current_page+"&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                $(".refund_table_list_box").empty();
                var refund_list=data.data.list;
                console.log(refund_list)
                if(refund_list.length>0){
                    var totalPage =  data.data.totalPage;
                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current);
                        }
                    })
                    for(var i=0;i<refund_list.length;i++){
                        var refund_state=refund_list[0].state;
                        switch (refund_state){
                            case 6:
                                var refund_text_content="商品退货退款";
                                var platform_state="待处理";
                                break;
                            case 7:
                                var refund_text_content="商品退货退款";
                                var platform_state="已处理";
                                break;
                            case 8:
                                var refund_text_content="商品退款";
                                var platform_state="待处理";
                                break;
                            case 9:
                                var refund_text_content="商品退款";
                                var platform_state="已退款";
                                break;

                        }
                        var refund_good_list='<tr class="refund_content">'+'<td class="refund_num_info">'+'<span class="content">'+refund_text_content+'</span>'+
                            '<div class="item">'+'<span class="label_info">'+'订单编号:'+'</span>'+'<div class="info">'+refund_list[i].orderId+'</div>'+'</div>'+
                            '</td>'+'<td class="refund_price_info">'+'<i>'+'￥'+'</i>'+refund_list[i].totalAmount+'</td>'+
                            '<td class="apply_time_info">'+refund_list[i].createTimestamp+'</td>'+'<td class="refund_audit_info">'+platform_state+'</td>'+
                            '<td class="refund_operation">'+'查看'+'</td>'+'</tr>';
                        $(".refund_table_list_box").prepend(refund_good_list);
                    }
                    //查看退款详情
                    $(".refund_operation").each(function (index,ele) {
                        $(ele).click(function () {
                            $(".order_number").html($(this).parent().find(".refund_num_info").find(".item").find(".info").html());
                            $(".re_good_name").html(refund_list[index].commodityName+" "+refund_list[index].standardName);
                            $(".re_good_num").html(refund_list[index].commodityNumber);
                            $(".re_apply_time").html(refund_list[index].createTimestamp);
                            $(".re_money").html(refund_list[index].totalAmount);
                            $(".re_reason").html(refund_list[index].rejectInfo);
                            $(".operation_state").html($(this).parent().find(".refund_audit_info").html());
                            $("#refund_detail_Modal").modal();

                        })
                    })
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".refund_table_box").append(no_data);
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
}
function change_time_page(time_current_page,start_time,end_time) {
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var refund_text_content=""
    var platform_state=""
    var text=''
    $.ajax({
        url:http+"order/commodity/afterSale/all?uid="+u_id+"&sid="+s_id+"&page="+time_current_page+"&pageSize=10&startTime="+start_time+"&endTime="+end_time,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                $(".refund_table_list_box").empty();

                var refund_list=data.data.list;
                console.log(refund_list)
                // refund_list.length=0;
                if(refund_list.length>0){

                    for(var i=0;i<refund_list.length;i++){
                        var refund_state=refund_list[i].state;
                        switch (refund_state){
                            case 6:
                                refund_text_content="商品退货退款";
                                platform_state="待处理";
                                text="退货退款编号:"
                                break;
                            case 7:
                                refund_text_content="商品退货退款";
                                platform_state="已处理";
                                text="退货退款编号:"
                                break;
                            case 8:
                                refund_text_content="商品退款";
                                platform_state="待处理";
                                text="退款编号:"
                                break;
                            case 9:
                                refund_text_content="商品退款";
                                platform_state="已退款";
                                text="退款编号:"
                                break;

                        }
                        console.log(refund_text_content)
                        var refund_good_list='<tr class="refund_content">'+'<td class="refund_num_info">'+'<span class="content">'+refund_text_content+'</span>'+
                            '<div class="item">'+'<span class="label_info">'+'订单编号:'+'</span>'+'<div class="info">'+refund_list[i].orderId+'</div>'+'</div>'+
                            '<div class="item">'+'<span class="label_info">'+text+'</span>'+'<div class="info">'+refund_list[i].orderCommodityId+'</div>'+'</div>'+
                            '</td>'+'<td class="refund_price_info">'+'<i>'+'￥'+'</i>'+refund_list[i].totalAmount+'</td>'+
                            '<td class="apply_time_info">'+refund_list[i].createTimestamp+'</td>'+'<td class="refund_audit_info">'+platform_state+'</td>'+
                            '<td class="refund_operation">'+'查看'+'</td>'+'</tr>';
                        $(".refund_table_list_box").append(refund_good_list);
                    }
                    //查看退款详情
                    $(".refund_operation").each(function (index,ele) {
                        $(ele).click(function () {
                            console.log(index)
                            $(".order_number").html($(this).parent().find(".refund_num_info").find(".item").find(".info").html());
                            $(".re_good_name").html(refund_list[index].commodityName+" "+refund_list[index].standardName);
                            $(".re_good_num").html(refund_list[index].commodityNumber);
                            $(".re_apply_time").html(refund_list[index].createTimestamp);
                            $(".re_money").html(refund_list[index].totalAmount);
                            $(".re_reason").html(refund_list[index].rejectInfo);
                            $(".operation_state").html($(this).parent().find(".refund_audit_info").html());
                            $("#refund_detail_Modal").modal();

                        })
                    })
                }else {
                    var no_data='<div class="no_data" style="margin-top: 20px">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".refund_table_box").append(no_data);
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