/**
 * Created by lysp on 2018/9/5.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    var on_account=""

    $("#bill_choose_month").datetimepicker({
        format: 'yyyy-mm',
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  0,
        autoclose: 1,
        todayHighlight: 1,
        startView: 3, //这里就设置了默认视图为年视图
        minView: 3, //设置最小视图为年视图
        forceParse: 0,
    });
    $.ajax({
        url:http+"info",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
           var type=data.data.type;
           if(type==1){
               $(".company_info").hide()
           }else {
               $(".company_info").show()
           }
        }
    })

    $.ajax({
        url:http+"order/bill?page=1&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data)
            if(data.msg=="SUCCESS"){
                console.log(data);
                var bill_list=data.data.list;
                // bill_list.length=0
                console.log(bill_list)
                if(bill_list.length>0){
                    var totalPage =data.data.totalPage;

                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current);
                        }
                    })
                    //以订单中的商品为单位逐条列出
                    // var num=0;
                    for(var i=0;i<bill_list.length;i++){
                        // if (bill_list[i].state==-1){
                        //     i++;
                        //     continue;
                        // }else {
                            var order_time=bill_list[i].createTimestamp;
                            var order_num=bill_list[i].id;
                            var commodities=bill_list[i].commodities;
                            var pay_way=bill_list[i].payWay;
                            on_account=account(pay_way)

                            // var num=i+1;
                            for(var j=0;j<commodities.length;j++){
                                var commodity_state="";

                                switch (commodities[j].state){
                                    case  -2:
                                        commodity_state="已删除";
                                        break;
                                    // case  -1:
                                    //     commodity_state="服务器端错误订单";
                                    //     break;
                                    case  0:
                                        commodity_state="已取消订单";
                                        break;
                                    case  1:
                                        commodity_state="待付款";
                                        break;
                                    case  2:
                                        commodity_state="待发货";
                                        break;
                                    case  3:
                                        commodity_state="待收货";
                                        break;
                                    case  4:
                                        commodity_state="待评价";
                                        break;
                                    case  5:
                                        commodity_state="已完成";
                                        break;
                                    case  6:
                                        commodity_state="退货中";
                                        break;
                                    case  7:
                                        commodity_state="已退货";
                                        break;
                                    case  8:
                                        commodity_state="退款中";
                                        break;
                                    case  9:
                                        commodity_state="已退款";
                                        break;

                                }
                                // var senquence=num+num*(j+1);
                                // num++;
                                // console.log(num)
                                var bill='<tr>'+'<td>'+order_time+'</td>'+'<td>'+order_num+'</td>'+
                                    '<td>'+commodities[j].commodityName+'</td>'+'<td>'+'个'+'</td>'+'<td>'+commodities[j].commodityNumber+'</td>'+
                                    '<td>'+commodities[j].unitPrice+'</td>'+'<td>'+commodities[j].totalAmount+'</td>'+'<td>'+commodity_state+'</td>'+'<td class="company_info">'+on_account+'</td>'+'</tr>';
                                $("#my_bill_list").append(bill);
                            }
                        // }

                    }

                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".bill_list").append(no_data);
                }

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
    $("#search_time").click(function () {
        var year=$("#bill_choose_month").val().split("-")[0];
        var day=$("#bill_choose_month").val().split("-")[1];
        var days=mGetDate(year,day)
        var start_time=$("#bill_choose_month").val().concat("-01");
        var end_time=$("#bill_choose_month").val().concat("-"+days);
        $.ajax({
            url:http+"order/bill?page=1&pageSize=10&startTime="+start_time+"&endTime="+end_time,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                if(data.msg=="SUCCESS"){
                    $("#my_bill_list").empty();
                    $(".change_page").remove();
                    console.log(data);
                    var bill_list=data.data.list;
                    // bill_list.length=0
                    if(bill_list.length>0){
                        $(".no_data").remove();
                        $(".change_page").remove();
                        $(".bill_list").after('<div class="pageTest change_page"></div>');
                        var totalPage =data.data.totalPage;
                        $('.pageTest').page({
                            leng:totalPage,//分页总数
                            activeClass: 'activP' , //active 类样式定义
                            clickBack:function(page){
                                // console.log(page-1)
                                var current=page;
                                change_time_page(current,start_time,end_time);
                            }
                        })
                        //以订单中的商品为单位逐条列出
                        // var num=0;
                        for(var i=0;i<bill_list.length;i++){
                            // if(bill_list[i].state==-1){
                            //     i++;
                            //     continue;
                            // }else {
                                var order_time=bill_list[i].createTimestamp;
                                var order_num=bill_list[i].id;
                                var commodities=bill_list[i].commodities;
                                var pay_way=bill_list[i].payWay;
                                on_account=account(pay_way)
                                // var num=i+1;
                                for(var j=0;j<commodities.length;j++){
                                    var commodity_state="";
                                    switch (commodities[j].state){
                                        case  -2:
                                            commodity_state="已删除";
                                            break;
                                        // case  -1:
                                        //     commodity_state="服务器端错误订单";
                                        //     break;
                                        case  0:
                                            commodity_state="已取消订单";
                                            break;
                                        case  1:
                                            commodity_state="待付款";
                                            break;
                                        case  2:
                                            commodity_state="待发货";
                                            break;
                                        case  3:
                                            commodity_state="待收货";
                                            break;
                                        case  4:
                                            commodity_state="待评价";
                                            break;
                                        case  5:
                                            commodity_state="已完成";
                                            break;
                                        case  6:
                                            commodity_state="退货中";
                                            break;
                                        case  7:
                                            commodity_state="已退货";
                                            break;
                                        case  8:
                                            commodity_state="退款中";
                                            break;
                                        case  9:
                                            commodity_state="已退款";
                                            break;

                                    }
                                    // var senquence=num+num*(j+1);
                                    // num++;
                                    // console.log(num)
                                    var bill='<tr>'+'<td>'+order_time+'</td>'+'<td>'+order_num+'</td>'+
                                        '<td>'+commodities[j].commodityName+'</td>'+'<td>'+'个'+'</td>'+'<td>'+commodities[j].commodityNumber+'</td>'+
                                        '<td>'+commodities[j].unitPrice+'</td>'+'<td>'+commodities[j].totalAmount+'</td>'+'<td>'+commodity_state+'</td>'+'<td>'+on_account+'</td>'+'</tr>';
                                    $("#my_bill_list").append(bill);
                                }
                            // }

                        }

                    }else {
                        $(".no_data").remove()
                        var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                        $(".bill_list").append(no_data);
                    }

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

    })
})
function change_page(current_page) {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    // console.log(typeof (current_page))
    var http=Http;
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    var on_account=""
    $.ajax({
        url:http+"order/bill?page="+current_page+"&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                console.log(data);
                var bill_list=data.data.list;
                $("#my_bill_list").empty();
                if(bill_list.length>0){
                    //以订单中的商品为单位逐条列出
                    // var num=0;
                    for(var i=0;i<bill_list.length;i++){
                        // if (bill_list[i].state==-1){
                        //     i++;
                        //     continue;
                        // }else {
                            var order_time=bill_list[i].createTimestamp;
                            var order_num=bill_list[i].id;
                            var commodities=bill_list[i].commodities;
                            var pay_way=bill_list[i].payWay;
                            on_account=account(pay_way)

                            for(var j=0;j<commodities.length;j++){
                                var commodity_state="";
                                switch (commodities[j].state){
                                    case  -2:
                                        commodity_state="已删除";
                                        break;
                                    // case  -1:
                                    //     commodity_state="临时订单";
                                    //     break;
                                    case  0:
                                        commodity_state="取消订单";
                                        break;
                                    case  1:
                                        commodity_state="待付款";
                                        break;
                                    case  2:
                                        commodity_state="待发货";
                                        break;
                                    case  3:
                                        commodity_state="待收货";
                                        break;
                                    case  4:
                                        commodity_state="待评价";
                                        break;
                                    case  5:
                                        commodity_state="已完成";
                                        break;
                                    case  6:
                                        commodity_state="退货中";
                                        break;
                                    case  7:
                                        commodity_state="已退货";
                                        break;
                                    case  8:
                                        commodity_state="退款中";
                                        break;
                                    case  9:
                                        commodity_state="已退款";
                                        break;

                                }
                                // var senquence=num*(j+1);
                                // num++;
                                // console.log(num)
                                var bill='<tr>'+'<td>'+order_time+'</td>'+'<td>'+order_num+'</td>'+
                                    '<td>'+commodities[j].commodityName+'</td>'+'<td>'+'个'+'</td>'+'<td>'+commodities[j].commodityNumber+'</td>'+
                                    '<td>'+commodities[j].unitPrice+'</td>'+'<td>'+commodities[j].totalAmount+'</td>'+'<td>'+commodity_state+'</td>'+'<td>'+on_account+'</td>'+'</tr>';
                                $("#my_bill_list").append(bill);

                            }
                        // }

                    }

                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".bill_list").append(no_data);
                }

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
}
function change_time_page(time_current_page,start_time,end_time) {
    var http=Http;
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    var on_account=""
    $.ajax({
        url:http+"order/bill?page="+time_current_page+"&pageSize=10&startTime="+start_time+"&endTime="+end_time,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                $("#my_bill_list").empty();
                console.log(data);
                var bill_list=data.data.list;
                // bill_list.length=0
                if(bill_list.length>0){
                    //以订单中的商品为单位逐条列出
                    // var num=0;
                    for(var i=0;i<bill_list.length;i++){
                        // if(bill_list[i].state==-1){
                        //     i++
                        // }else {
                            var order_time=bill_list[i].createTimestamp;
                            var order_num=bill_list[i].id;
                            var commodities=bill_list[i].commodities;
                            var pay_way=bill_list[i].payWay;
                            on_account=account(pay_way);
                            // var num=i+1;
                            for(var j=0;j<commodities.length;j++){
                                var commodity_state="";
                                switch (commodities[j].state){
                                    case  -2:
                                        commodity_state="已删除";
                                        break;
                                    // case  -1:
                                    //     commodity_state="临时订单";
                                    //     break;
                                    case  0:
                                        commodity_state="取消订单";
                                        break;
                                    case  1:
                                        commodity_state="待付款";
                                        break;
                                    case  2:
                                        commodity_state="待发货";
                                        break;
                                    case  3:
                                        commodity_state="待收货";
                                        break;
                                    case  4:
                                        commodity_state="待评价";
                                        break;
                                    case  5:
                                        commodity_state="已完成";
                                        break;
                                    case  6:
                                        commodity_state="退货中";
                                        break;
                                    case  7:
                                        commodity_state="已退货";
                                        break;
                                    case  8:
                                        commodity_state="退款中";
                                        break;
                                    case  9:
                                        commodity_state="已退款";
                                        break;

                                }
                                // var senquence=num+num*(j+1);
                                // num++;
                                // console.log(num)
                                var bill='<tr>'+'<td>'+order_time+'</td>'+'<td>'+order_num+'</td>'+
                                    '<td>'+commodities[j].commodityName+'</td>'+'<td>'+'个'+'</td>'+'<td>'+commodities[j].commodityNumber+'</td>'+
                                    '<td>'+commodities[j].unitPrice+'</td>'+'<td>'+commodities[j].totalAmount+'</td>'+'<td>'+commodity_state+'</td>'+'<td>'+on_account+'</td>'+'</tr>';
                                $("#my_bill_list").append(bill);
                            // }
                        }

                    }

                }else {
                    $(".no_data").remove()
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".bill_list").append(no_data);
                }

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
}
function mGetDate(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
}
function account(payway) {

    switch (payway){
        case 1:
            return "记账一个月";
            break;
        case 2:
            return "记账两个月";
            break;
        case 3:
            return "记账三个月";
            break;
        default:
            return ""
    }
}
