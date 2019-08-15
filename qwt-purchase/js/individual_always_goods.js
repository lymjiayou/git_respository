/**
 * Created by lysp on 2018/9/4.
 */
$(function () {
    var http=Http;
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    $.ajax({
        url:http+"order/commodity/common?page=1&pageSize=16",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data)
            if(data.msg=="SUCCESS"){
                console.log(data)
                var my_always_goods=data.data.list;
                console.log(my_always_goods);
                // my_always_goods.length=0
                if(my_always_goods.length>0){
                    var totalPage = data.data.totalPage;
                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current);
                        }
                    })
                    for(var i=0;i<my_always_goods.length;i++){
                        var always_good='<li class="goods_info">'+'<div class="row">'+'<div class="col4">'+'<div class="thumbnail">'+
                            '<div class="pic_box" self_id="i_'+my_always_goods[i].commodity.id+'" commodityCode='+my_always_goods[i].commodity.commodityCode+'>'+'<img src='+my_always_goods[i].commodity.logoPath+' alt="">'+'</div>'+
                            '<div class="caption">'+'<h3>'+my_always_goods[i].commodity.commodityName+my_always_goods[i].commodity.standardName+'</h3>'+'<div class="goods_price">'+
                            '<i>'+'¥'+'</i>'+'<span class="price">'+my_always_goods[i].commodity.unitPrice+'</span>'+'<div class="add_car">'+
                            '<button class="btn btn-default" good_id=i_'+my_always_goods[i].commodity.id+'>'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                        $(".goods_list").append(always_good);
                    }
                    $(".btn-default").each(function (index,ele) {
                        $(ele).on("click",function () {
                            var commodityid=$(this).attr("good_id").split("_")[1];
                            console.log(commodityid);
                            //添加购物车
                            $.ajax({
                                url: http+"cart",
                                data:JSON.stringify({"commodityId":commodityid,"commodityNumber":1}),
                                type:"POST",
                                beforeSend: function(request) {
                                    var cooinfo=getCookie("XSRF-TOKEN");
                                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                xhrFields:{withCredentials: true},
                                contentType:"application/json;charset=UTF-8",
                                success:function (data) {
                                    console.log(data)
                                    if (data.msg=="SUCCESS"){
                                        $("#successful_add_Modal").modal();

                                    }else {
                                        // $("#fail_add_Modal").modal();
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



                    })
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".goods_box").append(no_data);
                }

                $(".pic_box").on("click",function () {
                    window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                    window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
                    var selfID=window.sessionStorage.obj_good_id;
                    var commodityCODE=window.sessionStorage.good_commodityCode;
                    window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);

                })
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
    $("#search_name").click(function () {
        var good_name=$(".search_input").val();
        $.ajax({
            url:http+"order/commodity/common?page=1&pageSize=16&keywords="+good_name,
            type:"get",
            xhrFields:{withCredentials: true},
            success:function (data) {
                console.log(data)
                if(data.msg=="SUCCESS"){
                    console.log(data)
                    $(".no_data").remove();
                    $(".goods_list").empty();
                    $(".change_page").remove();
                    $(".goods_box").after('<div class="pageTest change_page"></div>');
                    var my_always_goods=data.data.list;
                    // my_always_goods.length=0
                    if(my_always_goods.length>0){
                        var totalPage = data.data.totalPage;
                        $('.pageTest').page({
                            leng:totalPage,//分页总数
                            activeClass: 'activP' , //active 类样式定义
                            clickBack:function(page){
                                // console.log(page)
                                var current=page;
                                name_change_page(current,good_name);
                            }
                        })
                        for(var i=0;i<my_always_goods.length;i++){
                            var always_good='<li class="goods_info">'+'<div class="row">'+'<div class="col4">'+'<div class="thumbnail">'+
                                '<div class="pic_box" self_id="i_'+my_always_goods[i].commodity.id+'" commodityCode='+my_always_goods[i].commodity.commodityCode+'>'+'<img src='+my_always_goods[i].commodity.logoPath+' alt="">'+'</div>'+
                                '<div class="caption">'+'<h3>'+my_always_goods[i].commodity.commodityName+my_always_goods[i].commodity.standardName+'</h3>'+'<div class="goods_price">'+
                                '<i>'+'¥'+'</i>'+'<span class="price">'+my_always_goods[i].commodity.unitPrice+'</span>'+'<div class="add_car">'+
                                '<button class="btn btn-default" good_id=i_'+my_always_goods[i].commodity.id+'>'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                            $(".goods_list").append(always_good);
                        }
                        $(".btn-default").each(function (index,ele) {
                            $(ele).on("click",function () {
                                var commodityid=$(this).attr("good_id").split("_")[1];
                                console.log(commodityid);
                                //添加购物车
                                $.data({
                                    url: http+"cart",
                                    data:JSON.stringify({"commodityId":commodityid,"commodityNumber":1}),
                                    type:"POST",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                    xhrFields:{withCredentials: true},
                                    contentType:"application/json;charset=UTF-8",
                                    success:function (data) {
                                        console.log(data)
                                        if (data.msg=="SUCCESS"){
                                            $("#successful_add_Modal").modal();

                                        }else {
                                            // $("#fail_add_Modal").modal();
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



                        })
                    }else {
                        var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                        $(".goods_box").append(no_data);
                    }
                    $(".pic_box").on("click",function () {
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
                        // window.open("goods_detail.html");
                        var selfID=window.sessionStorage.obj_good_id;
                        var commodityCODE=window.sessionStorage.good_commodityCode;
                        window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })

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
    $(".search_input").keydown(function (e) {
        if (e.which == 13) {
            var good_name=$(".search_input").val();
            $.ajax({
                url:http+"order/commodity/common?page=1&pageSize=16&keywords="+good_name,
                type:"get",
                xhrFields:{withCredentials: true},
                success:function (data) {
                    console.log(data)
                    if(data.msg=="SUCCESS"){
                        console.log(data)
                        $(".no_data").remove();
                        $(".goods_list").empty();
                        $(".change_page").remove();
                        $(".goods_box").after('<div class="pageTest change_page"></div>');
                        var my_always_goods=data.data.list;
                        // my_always_goods.length=0
                        if(my_always_goods.length>0){
                            var totalPage = data.data.totalPage;
                            $('.pageTest').page({
                                leng:totalPage,//分页总数
                                activeClass: 'activP' , //active 类样式定义
                                clickBack:function(page){
                                    // console.log(page)
                                    var current=page;
                                    name_change_page(current,good_name);
                                }
                            })
                            for(var i=0;i<my_always_goods.length;i++){
                                var always_good='<li class="goods_info">'+'<div class="row">'+'<div class="col4">'+'<div class="thumbnail">'+
                                    '<div class="pic_box" self_id="i_'+my_always_goods[i].commodity.id+'" commodityCode='+my_always_goods[i].commodity.commodityCode+'>'+'<img src='+my_always_goods[i].commodity.logoPath+' alt="">'+'</div>'+
                                    '<div class="caption">'+'<h3>'+my_always_goods[i].commodity.commodityName+my_always_goods[i].commodity.standardName+'</h3>'+'<div class="goods_price">'+
                                    '<i>'+'¥'+'</i>'+'<span class="price">'+my_always_goods[i].commodity.unitPrice+'</span>'+'<div class="add_car">'+
                                    '<button class="btn btn-default" good_id=i_'+my_always_goods[i].commodity.id+'>'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                                $(".goods_list").append(always_good);
                            }
                            $(".btn-default").each(function (index,ele) {
                                $(ele).on("click",function () {
                                    var commodityid=$(this).attr("good_id").split("_")[1];
                                    console.log(commodityid);
                                    //添加购物车
                                    $.data({
                                        url: http+"cart",
                                        data:JSON.stringify({"commodityId":commodityid,"commodityNumber":1}),
                                        type:"POST",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                        xhrFields:{withCredentials: true},
                                        contentType:"application/json;charset=UTF-8",
                                        success:function (data) {
                                            console.log(data)
                                            if (data.msg=="SUCCESS"){
                                                $("#successful_add_Modal").modal();

                                            }else {
                                                // $("#fail_add_Modal").modal();
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



                            })
                        }else {
                            var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                            $(".goods_box").append(no_data);
                        }
                        $(".pic_box").on("click",function () {
                            window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                            window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
                            // window.open("goods_detail.html");
                            var selfID=window.sessionStorage.obj_good_id;
                            var commodityCODE=window.sessionStorage.good_commodityCode;
                            window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                        })

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
    })
})
function change_page(current_page) {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    $.ajax({
        url:http+"order/commodity/common?page="+current_page+"&pageSize=16",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                $(".goods_list").empty();
                var my_always_goods=data.data.list;
                console.log(my_always_goods);
                // my_always_goods.length=0
                if(my_always_goods.length>0){
                    for(var i=0;i<my_always_goods.length;i++){
                        var always_good='<li class="goods_info">'+'<div class="row">'+'<div class="col4">'+'<div class="thumbnail">'+
                            '<div class="pic_box" self_id="i_'+my_always_goods[i].commodity.id+'" commodityCode='+my_always_goods[i].commodity.commodityCode+'>'+'<img src='+my_always_goods[i].commodity.logoPath+' alt="">'+'</div>'+
                            '<div class="caption">'+'<h3>'+my_always_goods[i].commodity.commodityName+my_always_goods[i].commodity.standardName+'</h3>'+'<div class="goods_price">'+
                            '<i>'+'¥'+'</i>'+'<span class="price">'+my_always_goods[i].commodity.unitPrice+'</span>'+'<div class="add_car">'+
                            '<button class="btn btn-default" good_id=i_'+my_always_goods[i].commodity.id+'>'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                        $(".goods_list").append(always_good);
                    }
                    $(".btn-default").each(function (index,ele) {
                        $(ele).on("click",function () {
                            var commodityid=$(this).attr("good_id").split("_")[1];
                            console.log(commodityid);
                            //添加购物车
                            $.ajax({
                                url: http+"cart",
                                data:JSON.stringify({"commodityId":commodityid,"commodityNumber":1}),
                                type:"POST",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                xhrFields:{withCredentials: true},
                                contentType:"application/json;charset=UTF-8",
                                success:function (data) {
                                    console.log(data)
                                    if (data.msg=="SUCCESS"){
                                        $("#successful_add_Modal").modal();

                                    }else {
                                        // $("#fail_add_Modal").modal();
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



                    })
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".goods_box").append(no_data);
                }
                $(".pic_box").on("click",function () {
                    window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                    window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
                    // window.open("goods_detail.html");
                    var selfID=window.sessionStorage.obj_good_id;
                    var commodityCODE=window.sessionStorage.good_commodityCode;
                    window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                })

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
function name_change_page(name_current_page,good_name) {
    var http=Http;
    // var u_id=window.sessionStorage.u_id;
    // var s_id=window.sessionStorage.s_id;
    $.ajax({
        url:http+"order/commodity/common?page="+name_current_page+"&pageSize=16&keywords="+good_name,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data)
            if(data.msg=="SUCCESS"){
                console.log(data)
                $(".goods_list").empty();
                var my_always_goods=data.data.list;
                // my_always_goods.length=0
                if(my_always_goods.length>0){
                    for(var i=0;i<my_always_goods.length;i++){
                        var always_good='<li class="goods_info">'+'<div class="row">'+'<div class="col4">'+'<div class="thumbnail">'+
                            '<div class="pic_box" self_id="i_'+my_always_goods[i].commodity.id+'" commodityCode='+my_always_goods[i].commodity.commodityCode+'>'+'<img src='+my_always_goods[i].commodity.logoPath+' alt="">'+'</div>'+
                            '<div class="caption">'+'<h3>'+my_always_goods[i].commodity.commodityName+my_always_goods[i].commodity.standardName+'</h3>'+'<div class="goods_price">'+
                            '<i>'+'¥'+'</i>'+'<span class="price">'+my_always_goods[i].commodity.unitPrice+'</span>'+'<div class="add_car">'+
                            '<button class="btn btn-default" good_id=i_'+my_always_goods[i].commodity.id+'>'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                        $(".goods_list").append(always_good);
                    }
                    $(".btn-default").each(function (index,ele) {
                        $(ele).on("click",function () {
                            var commodityid=$(this).attr("good_id").split("_")[1];
                            console.log(commodityid);
                            //添加购物车
                            $.ajax({
                                url: http+"cart",
                                data:JSON.stringify({"commodityId":commodityid,"commodityNumber":1}),
                                type:"POST",
                                beforeSend: function(request) {
                                    var cooinfo=getCookie("XSRF-TOKEN");
                                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                xhrFields:{withCredentials: true},
                                contentType:"application/json;charset=UTF-8",
                                success:function (data) {
                                    console.log(data)
                                    if (data.msg=="SUCCESS"){
                                        $("#successful_add_Modal").modal();

                                    }else {
                                        // $("#fail_add_Modal").modal();
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



                    })
                }else {
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".goods_box").append(no_data);
                }

                $(".pic_box").on("click",function () {
                    window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                    window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
                    // window.open("goods_detail.html");
                    var selfID=window.sessionStorage.obj_good_id;
                    var commodityCODE=window.sessionStorage.good_commodityCode;
                    window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                })
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