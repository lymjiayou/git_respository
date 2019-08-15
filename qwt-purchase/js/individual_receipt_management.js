/**
 * Created by lysp on 2018/9/5.
 */
/**
 * Created by lysp on 2018/9/4.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var invoice_type="";
    var invoice_state="";
    var Invoice="";
    var look="";
    var invoice_id_attr=""
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

    //获取所有的发票
    $.ajax({
        url:http+"order/invoice?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                console.log(data);
                var invoice_list=data.data.list;
                console.log(invoice_list)
                // invoice_list.length=0
                if(invoice_list.length>0){
                    $(".no_data").remove()
                    var totalPage =  data.data.totalPage;
                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current);
                        }
                    })
                    for(var i=0;i<invoice_list.length;i++){
                        // console.log(i)
                        Invoice=invoice_list[i];
                        if(Invoice!=null){
                            var invoiceType=Invoice.invoiceType;
                            var billingStatus=Invoice.billingStatus;
                            var look="查看";
                            invoice_id_attr=Invoice.id;
                            // invoice_id=i_'+invoice_list[i].invoice[0].id+'

                            switch(invoiceType){
                                case 0:
                                    invoice_type="电子发票";
                                    break;
                                case 1:
                                    invoice_type="纸质发票";
                                    break;
                            }
                            switch(billingStatus){
                                case 20:
                                    invoice_state="开票中";
                                    break;
                                case 21:
                                    invoice_state="已开票";
                                    break;
                            }
                        }else {
                            invoice_type="";
                            invoice_state="不开票";
                            look="";
                            invoice_id_attr=""
                        }
                        // console.log(invoice_state)
                        var invoice='<tr class="receipt_content">'+'<th class="receipt_list_num">'+invoice_list[i].orderId+'</th>'+
                            '<th class="receipt_list_time">'+invoice_list[i].createTimestamp +'</th>'+'<th class="receipt_type">'+invoice_type+'</th>'+
                            '<th class="receipt_status">'+invoice_state+'</th>'+'<th class="receipt_operation" invoice_id=i_'+invoice_id_attr+'>'+look+'</th>'+'</tr>';
                        $(".receipt_list_box").append(invoice);
                    }
                    $(".receipt_operation").each(function (index,ele) {
                        $(ele).click(function () {
                            var that=$(this);
                            var invoice_id=that.attr("invoice_id").split("_")[1];
                            // console.log(invoice_id);
                            $.ajax({
                                url:http+"order/invoice/"+invoice_id+"?uid="+u_id+"&sid="+s_id,
                                type:"get",
                                xhrFields:{withCredentials: true},
                                success:function (data) {
                                    if(data.msg=="SUCCESS"){
                                        console.log(data)
                                        var single_invoice_info=data.data
                                        $(".order_num").html(single_invoice_info.orderId);
                                        $(".re_type").html(that.parent().find(".receipt_type").html());
                                        $(".re_state").html(that.parent().find(".receipt_status").html());
                                        console.log(single_invoice_info.billingType)
                                        if(single_invoice_info.billingType==10){
                                            $(".kai_type").html("普通发票");
                                        }else {
                                            $(".kai_type").html("专用发票");
                                        }
                                        console.log(single_invoice_info.companyName)
                                        $(".re_company").html(single_invoice_info.companyName)
                                    }
                                }
                            })
                            $("#receipt_detail_Modal").modal();
                        })
                    });
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".receipt_box").append(no_data);
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
        var start_time=$("#start_time").val();
        var end_time=$("#end_time").val();
        $.ajax({
            url:http+"order/invoice?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10&startTime="+start_time+"&endTime="+end_time,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                if(data.msg=="SUCCESS"){
                    $(".receipt_list_box").empty();
                    $(".change_page").remove();
                    $(".receipt_content_box").append('<div class="pageTest change_page"></div>');
                    var invoice_list=data.data.list;
                    console.log(invoice_list)
                    // invoice_list.length=0
                    if(invoice_list.length>0){
                        $(".no_data").remove();
                        var totalPage =  data.data.totalPage;
                        $('.pageTest').page({
                            leng:totalPage,//分页总数
                            activeClass: 'activP' , //active 类样式定义
                            clickBack:function(page){
                                var current=page;
                                change_time_page(current,start_time,end_time);
                            }
                        })
                        for(var i=0;i<invoice_list.length;i++){
                            // console.log(i)
                            Invoice=invoice_list[i];
                            if(Invoice!=null){
                                var invoiceType=Invoice.invoiceType;
                                var billingStatus=Invoice.billingStatus;
                                var look="查看";
                                invoice_id_attr=Invoice.id;
                                // invoice_id=i_'+invoice_list[i].invoice[0].id+'

                                switch(invoiceType){
                                    case 0:
                                        invoice_type="电子发票";
                                        break;
                                    case 1:
                                        invoice_type="纸质发票";
                                        break;
                                }
                                switch(billingStatus){
                                    case 20:
                                        invoice_state="开票中";
                                        break;
                                    case 21:
                                        invoice_state="已开票";
                                        break;
                                }
                            }else {
                                invoice_type="";
                                invoice_state="不开票";
                                look="";
                                invoice_id_attr=""
                            }
                            // console.log(invoice_state)
                            var invoice='<tr class="receipt_content">'+'<th class="receipt_list_num">'+invoice_list[i].orderId+'</th>'+
                                '<th class="receipt_list_time">'+invoice_list[i].createTimestamp +'</th>'+'<th class="receipt_type">'+invoice_type+'</th>'+
                                '<th class="receipt_status">'+invoice_state+'</th>'+'<th class="receipt_operation" invoice_id=i_'+invoice_id_attr+'>'+look+'</th>'+'</tr>';
                            $(".receipt_list_box").append(invoice);
                        }
                        $(".receipt_operation").each(function (index,ele) {
                            $(ele).click(function () {
                                var that=$(this);
                                var invoice_id=that.attr("invoice_id").split("_")[1];
                                // console.log(invoice_id);
                                $.ajax({
                                    url:http+"order/invoice/"+invoice_id+"?uid="+u_id+"&sid="+s_id,
                                    type:"get",
                                    xhrFields:{withCredentials: true},
                                    success:function (data) {
                                        if(data.msg=="SUCCESS"){
                                            var single_invoice_info=data.data
                                            $(".order_num").html(single_invoice_info.orderId);
                                            $(".re_type").html(that.parent().find(".receipt_type").html());
                                            $(".re_state").html(that.parent().find(".receipt_status").html());
                                            if(single_invoice_info.billingType==10){
                                                $(".kai_type").html("普通发票");
                                            }else {
                                                $(".kai_type").html("纸质发票");
                                            }
                                            $(".re_company").html(single_invoice_info.companyName)
                                        }
                                    }
                                })
                                $("#receipt_detail_Modal").modal();
                            })
                        });
                    }else {
                        $(".no_data").remove();
                        var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                        $(".receipt_box").append(no_data);
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
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var invoice_type="";
    var invoice_state=""
    var Invoice="";
    var look="";
    var invoice_id_attr=""
    console.log(222);

    //获取所有的发票
    $.ajax({
        url:http+"order/invoice?uid="+u_id+"&sid="+s_id+"&page="+current_page+"&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                $(".receipt_list_box").empty();
                var invoice_list=data.data.list;
                console.log(invoice_list)
                if(invoice_list.length>0){
                    console.log(111)
                    for(var i=0;i<invoice_list.length;i++){
                        Invoice=invoice_list[i];
                        console.log(Invoice)
                        if(Invoice!=null){
                            // console.log(233);
                            var invoiceType=Invoice.invoiceType;
                            var billingStatus=Invoice.billingStatus;
                            var look="查看";
                            invoice_id_attr=Invoice.id;
                            // invoice_id=i_'+invoice_list[i].invoice[0].id+'

                            switch(invoiceType){
                                case 0:
                                    invoice_type="电子发票";
                                    break;
                                case 1:
                                    invoice_type="纸质发票";
                                    break;
                            }
                            switch(billingStatus){
                                case 20:
                                    invoice_state="开票中";
                                    break;
                                case 21:
                                    invoice_state="已开票";
                                    break;
                            }
                        }else {
                            invoice_type="";
                            invoice_state="不开票";
                            look="";
                            invoice_id_attr=""
                        }
                        // console.log(invoice_state)
                        var invoice='<tr class="receipt_content">'+'<th class="receipt_list_num">'+invoice_list[i].orderId+'</th>'+
                            '<th class="receipt_list_time">'+invoice_list[i].createTimestamp +'</th>'+'<th class="receipt_type">'+invoice_type+'</th>'+
                            '<th class="receipt_status">'+invoice_state+'</th>'+'<th class="receipt_operation" invoice_id=i_'+invoice_id_attr+'>'+look+'</th>'+'</tr>';
                        $(".receipt_list_box").append(invoice);
                        console.log(invoice);
                    }
                    $(".receipt_operation").each(function (index,ele) {
                        $(ele).click(function () {
                            var that=$(this);
                            var invoice_id=that.attr("invoice_id").split("_")[1];
                            // console.log(invoice_id);
                            $.ajax({
                                url:http+"order/invoice/"+invoice_id+"?uid="+u_id+"&sid="+s_id,
                                type:"get",
                                xhrFields:{withCredentials: true},
                                success:function (data) {
                                    if(data.msg=="SUCCESS"){
                                        var single_invoice_info=data.data
                                        $(".order_num").html(single_invoice_info.orderId);
                                        $(".re_type").html(that.parent().find(".receipt_type").html());
                                        $(".re_state").html(that.parent().find(".receipt_status").html());
                                        if(single_invoice_info.billingType==10){
                                            $(".kai_type").html("普通发票");
                                        }else {
                                            $(".kai_type").html("纸质发票");
                                        }
                                        $(".re_company").html(single_invoice_info.companyName)
                                    }
                                }
                            })
                            $("#receipt_detail_Modal").modal();
                        })
                    });
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".receipt_box").append(no_data);
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
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var invoice_type="";
    var invoice_state=""
    var Invoice="";
    var look="";
    var invoice_id_attr=""
    $.ajax({
        url:http+"order/invoice?uid="+u_id+"&sid="+s_id+"&page="+time_current_page+"&pageSize=10&startTime="+start_time+"&endTime="+end_time,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                $(".receipt_list_box").empty();
                var invoice_list=data.data.list;
                console.log(invoice_list)
                // invoice_list.length=0
                if(invoice_list.length>0){
                    for(var i=0;i<invoice_list.length;i++){
                        // console.log(i)
                        Invoice=invoice_list[i];
                        if(Invoice!=null){
                            var invoiceType=Invoice.invoiceType;
                            var billingStatus=Invoice.billingStatus;
                            var look="查看";
                            invoice_id_attr=Invoice.id;
                            // invoice_id=i_'+invoice_list[i].invoice[0].id+'

                            switch(invoiceType){
                                case 0:
                                    invoice_type="电子发票";
                                    break;
                                case 1:
                                    invoice_type="纸质发票";
                                    break;
                            }
                            switch(billingStatus){
                                case 20:
                                    invoice_state="开票中";
                                    break;
                                case 21:
                                    invoice_state="已开票";
                                    break;
                            }
                        }else {
                            invoice_type="";
                            invoice_state="不开票";
                            look="";
                            invoice_id_attr=""
                        }
                        // console.log(invoice_state)
                        var invoice='<tr class="receipt_content">'+'<th class="receipt_list_num">'+invoice_list[i].orderId+'</th>'+
                            '<th class="receipt_list_time">'+invoice_list[i].createTimestamp +'</th>'+'<th class="receipt_type">'+invoice_type+'</th>'+
                            '<th class="receipt_status">'+invoice_state+'</th>'+'<th class="receipt_operation" invoice_id=i_'+invoice_id_attr+'>'+look+'</th>'+'</tr>';
                        $(".receipt_list_box").append(invoice);
                    }
                    $(".receipt_operation").each(function (index,ele) {
                        $(ele).click(function () {
                            var that=$(this);
                            var invoice_id=that.attr("invoice_id").split("_")[1];
                            // console.log(invoice_id);
                            $.ajax({
                                url:http+"order/invoice/"+invoice_id+"?uid="+u_id+"&sid="+s_id,
                                type:"get",
                                success:function (data) {
                                    if(data.msg=="SUCCESS"){
                                        var single_invoice_info=data.data
                                        $(".order_num").html(single_invoice_info.orderId);
                                        $(".re_type").html(that.parent().find(".receipt_type").html());
                                        $(".re_state").html(that.parent().find(".receipt_status").html());
                                        if(single_invoice_info.billingType==10){
                                            $(".kai_type").html("普通发票");
                                        }else {
                                            $(".kai_type").html("纸质发票");
                                        }
                                        $(".re_company").html(single_invoice_info.companyName)
                                    }
                                }
                            })
                            $("#receipt_detail_Modal").modal();
                        })
                    });
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".receipt_box").append(no_data);
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