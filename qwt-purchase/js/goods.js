/**
 * Created by lysp on 2018/8/1.
 */
var name_id=[];
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    categoty();
    var category_id=window.sessionStorage.category_id;
    var first_id=window.sessionStorage.first_id;
    var first_index=window.sessionStorage.first_index;
    var second_id=window.sessionStorage.second_id;
    var second_index=window.sessionStorage.second_index;
    var third_id=window.sessionStorage.third_id;
    var third_index=window.sessionStorage.third_index;
    var first_name=window.sessionStorage.first_name;
    var second_name=window.sessionStorage.second_name;
    var third_name=window.sessionStorage.third_name;
    var search_good_name=window.sessionStorage.search_keywords;
    var brand_URI=window.sessionStorage.brand;
    var brand_name=window.sessionStorage.brand_name;
    console.log(category_id)
    console.log(first_id)
    console.log(second_id)
    console.log(third_id)
    console.log(first_name)
    console.log(second_name)
    console.log(third_name)
    console.log(search_good_name);
    console.log(brand_URI);
    console.log(brand_name);
    //7.13解析URL
    var url = decodeURI(location.search);
    var object = {};
    if(url.indexOf("?") != -1)
    {
        var str = url.substr(1);
        console.log(str);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++)
        {
            object[strs[i].split("=")[0]]=strs[i].split("=")[1]
        }
    }
    if(JSON.stringify(object)=='{}'){
        console.log("没有传入cate_id");
        var category_id="";
    }
    else{
        console.log("有定义")
        if(object.cate!="" &&category_id!=""){
            console.log("obj有值，id=obj")
            category_id =object.cate;
        }

    }

    //根据url找到分类名

    if(typeof (object.cate1)!="undefined"){
        if(object.cate1!=""){
            console.log("1");
            for(i=0;i<name_id.length;i++){
                if( object.cate1==name_id[i].id){
                    var first_name=name_id[i].name;
                    first_id=name_id[i].id;
                }
            }
        }
    }
    if(typeof (object.cate2)!="undefined"){
        if(object.cate2!=""){
            console.log("2");

            for(i=0;i<name_id.length;i++){
                if( object.cate1==name_id[i].id){
                    for(s=0;s<name_id[i].childCategory.length;s++){
                        if( object.cate2==name_id[i].childCategory[s].id){
                            var second_name=name_id[i].childCategory[s].name;
                            second_id=name_id[i].childCategory[s].id;
                        }
                    }
                }
            }
        }
    }
    if(typeof (object.cate3)!="undefined"){
        if(object.cate3!="") {
            console.log("3");
            for (i = 0; i < name_id.length; i++) {
                if (object.cate1 == name_id[i].id) {
                    for (s = 0; s < name_id[i].childCategory.length; s++) {
                        if (object.cate2 == name_id[i].childCategory[s].id) {
                            for (t = 0; t < name_id[i].childCategory[s].childCategory.length; t++) {
                                if (object.cate3 == name_id[i].childCategory[s].childCategory[t].id) {
                                    var third_name = name_id[i].childCategory[s].childCategory[t].name;
                                    third_id= name_id[i].childCategory[s].childCategory[t].id;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(search_good_name==undefined){
        search_good_name="";
    }
    if(first_name==undefined){
        first_name="";
    }
    if(second_name==undefined){
        second_name="";
    }
    if(third_name==undefined){
        third_name="";
    }
    console.log(category_id)
    console.log(first_id)
    console.log(second_id)
    console.log(third_id)
    console.log(first_name)
    console.log(second_name)
    console.log(third_name)



    if(search_good_name!=null){
        $(".search").attr("value",search_good_name);
    }
    
    // console.log(first_name)
    $(".goods_center").click(function () {
        window.sessionStorage.category_id="";
        window.sessionStorage.first_name="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_name="";
        window.sessionStorage.search_keywords="";
        window.sessionStorage.brand='';
        window.sessionStorage.brand_name='';
        _url=location.href.split("?")[0];
        window.location.href=_url;
    });
    //用户直接进入商品页时
    if(first_name==null&&second_name==null&&third_name==null&&search_good_name==null){

        first_name="";
        second_name="";
        third_name="";
        search_good_name="";
        category_id="";
        brand_URI="";
        brand_name="";
    }
    if(first_name!=""&&second_name!=""&&third_name!=""){
        $(".first_category").html(first_name+"&nbsp&nbsp<i>></i>");
        $(".first_category").attr("category_ID","i_"+first_id);
        $(".second_category").html(second_name+"&nbsp&nbsp<i>></i>");
        $(".second_category").attr("category_ID","i_"+second_id);
        $(".third_category").html(third_name+"&nbsp&nbsp<i>></i>");
        $(".third_category").attr("category_ID","i_"+third_id);
    }else if(first_name!=""&&second_name!=""){
        $(".first_category").html(first_name+"&nbsp&nbsp<i>></i>");
        $(".first_category").attr("category_ID","i_"+first_id);
        $(".second_category").html(second_name+"&nbsp&nbsp<i>></i>");
        $(".second_category").attr("category_ID","i_"+second_id);
    }else if(first_name!=""){
        $(".first_category").html(first_name+"&nbsp&nbsp<i>></i>");
        $(".first_category").attr("category_ID","i_"+first_id);
    }else if(search_good_name!=""){
        $(".some_good").html(search_good_name);
    }
    //搜索商品
    $(".search_button").click(function () {
        window.sessionStorage.search_keywords=$(".search").val();
        window.sessionStorage.category_id="";
        window.sessionStorage.first_name="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_name="";
        window.sessionStorage.brand='';
        window.sessionStorage.brand_name='';
        window.location.reload();
    });
    $(".search").keydown(function (e) {
        if (e.which == 13) {
            window.sessionStorage.search_keywords=$(".search").val();
            window.sessionStorage.category_id="";
            window.sessionStorage.first_name="";
            window.sessionStorage.second_name="";
            window.sessionStorage.third_name="";
            window.sessionStorage.brand='';
            window.sessionStorage.brand_name='';
            window.location.reload();
        }
    })

    $(".all_good_index").click(function () {
        console.log("allthere");
        window.sessionStorage.category_id="";
        window.sessionStorage.first_name="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_name="";
        window.sessionStorage.search_keywords="";
        window.sessionStorage.brand='';
        window.sessionStorage.brand_name='';
        // window.location.reload();
        window.location.href=location.href.split("?")[0];
    });
    //当在当前分类下选择时，brand不更新
    $(".first_category").click(function () {
        console.log("there");
        window.sessionStorage.category_id=$(this).attr("category_ID").split("_")[1];
        window.sessionStorage.second_name="";
        window.sessionStorage.third_name="";
        // window.location.reload();
        _url=location.href.split("?")[0];
        cate_id=$(this).attr("category_ID").split("_")[1];
        window.location.href=_url+"?cate="+cate_id;
    });

    $(".second_category").click(function () {
        console.log("there2");
        window.sessionStorage.category_id=$(this).attr("category_ID").split("_")[1];
        window.sessionStorage.third_name="";
        // window.location.reload();
        _url=location.href.split("?")[0];
        cate_id=$(this).attr("category_ID").split("_")[1];
        window.location.href=_url+"?cate="+cate_id;
    });
    $(".third_category").click(function () {
        console.log("theree");
        window.sessionStorage.category_id=$(this).attr("category_ID").split("_")[1];
        // window.location.reload();
        _url=location.href.split("?")[0];
        cate_id=$(this).attr("category_ID").split("_")[1];
        window.location.href=_url+"?cate="+cate_id;
    });

    //头部下拉菜单
    // $(".top_shortcut .fl").mouseenter(function () {
    //     $(".top_shortcut .dt").addClass("current_bg");
    //     $(".top_shortcut .dd").show(100);
    // }).mouseleave(function () {
    //     $(".top_shortcut  .dt").removeClass("current_bg");
    //     $(".top_shortcut .dd").hide(100);
    // });
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
//    显示分类列表
    $(".dropdown_menu").mouseenter(function () {
        $(".nav_dd").show();
    }).mouseleave(function () {
        $(".nav_dd").hide();
    })

    //获取商品品牌列表
    if(category_id!=""){
        $(".brand_list_box").show();
        $.ajax({
            url:http+"commodity/brand?categoryId="+category_id,
            type:'get',
            xhrFields:{withCredentials: true},
            success:function(data){
                console.log(data)
                if(data.msg=="SUCCESS"){
                    if(data.data.length>0){
                        if(data.data.length>20){
                            $(".show_more_brand").show();
                            for(var i=0;i<20;i++) {
                                if(data.data[i]==brand_name){
                                    var first_li = "<li class='first_li selected'>" + data.data[i] + "</li>";
                                }else {
                                    var first_li = "<li class='first_li'>" + data.data[i] + "</li>";
                                }

                                $(".goods_first_list").append(first_li);
                            }
                            var lis1=$(".first_li");
                            lis1.each(function (index,ele) {
                                $(ele).click(function () {
                                    $(this).addClass("selected").siblings().removeClass("selected");
                                    window.sessionStorage.brand_name = $(this).text();
                                    window.sessionStorage.brand = encodeURI($(this).text());
                                    // console.log(window.sessionStorage.brand);
                                    window.sessionStorage.search_keywords='';
                                    window.location.reload();
                                })
                            })
                            $(".show_more_brand").click(function () {
                                $(this).hide();
                                $(".not_show_more_brand").show();
                                $(".goods_first_list").empty();
                                for(var i=0;i<data.data.length;i++) {
                                    if(data.data[i]==brand_name){
                                        var first_li = "<li class='first_li selected'>" + data.data[i] + "</li>";
                                    }else {
                                        var first_li = "<li class='first_li'>" + data.data[i] + "</li>";
                                    }

                                    $(".goods_first_list").append(first_li);
                                }
                                var lis1=$(".first_li");
                                lis1.each(function (index,ele) {
                                    $(ele).click(function () {
                                        $(this).addClass("selected").siblings().removeClass("selected");
                                        window.sessionStorage.brand_name = $(this).text();
                                        window.sessionStorage.brand = encodeURI($(this).text());
                                        // console.log(11)
                                        // console.log(window.sessionStorage.brand);
                                        window.sessionStorage.search_keywords='';
                                        window.location.reload();
                                    })
                                })
                            });
                            $(".not_show_more_brand").click(function () {
                                $(this).hide();
                                $(".show_more_brand").show();
                                $(".goods_first_list").empty();
                                for(var i=0;i<20;i++) {
                                    if(data.data[i]==brand_name){
                                        var first_li = "<li class='first_li selected'>" + data.data[i] + "</li>";
                                    }else {
                                        var first_li = "<li class='first_li'>" + data.data[i] + "</li>";
                                    }

                                    $(".goods_first_list").append(first_li);
                                }
                                var lis1=$(".first_li");
                                lis1.each(function (index,ele) {
                                    $(ele).click(function () {
                                        $(this).addClass("selected").siblings().removeClass("selected");
                                        window.sessionStorage.brand_name = $(this).text();
                                        window.sessionStorage.brand = encodeURI($(this).text());
                                        // console.log(11)
                                        // console.log(window.sessionStorage.brand);
                                        window.sessionStorage.search_keywords='';
                                        window.location.reload();
                                    })
                                })
                            });

                        }else {
                            $(".show_more_brand").hide();
                            for(var i=0;i<data.data.length;i++) {
                                if(data.data[i]==brand_name){
                                    var first_li = "<li class='first_li selected'>" + data.data[i] + "</li>";
                                }else {
                                    var first_li = "<li class='first_li'>" + data.data[i] + "</li>";
                                }

                                $(".goods_first_list").append(first_li);
                            }
                            var lis1=$(".first_li");
                            lis1.each(function (index,ele) {
                                $(ele).click(function () {
                                    $(this).addClass("selected").siblings().removeClass("selected");
                                    window.sessionStorage.brand_name = $(this).text();
                                    window.sessionStorage.brand = encodeURI($(this).text());
                                    // console.log(window.sessionStorage.brand);
                                    window.sessionStorage.search_keywords='';
                                    window.location.reload();
                                })
                            })
                        }

                    }else {
                        $(".not_show_more_brand").hide();
                        $(".show_more_brand").hide();
                        $(".brand_list_box").hide();
                    }

                }
            }
        })
    }else {
        $(".brand_list_box").hide();
    }
    $.ajax({
        type: "get",
        url: http+"commodity?page=1&pageSize=20&categoryId="+category_id+"&keywords="+search_good_name+"&brand="+brand_URI,
        async: true,
        xhrFields:{withCredentials: true},
        success: function (goods_data){
            console.log(goods_data)
            if(goods_data.msg=="SUCCESS"){
                console.log(goods_data)
                $("#good_list_box").empty();
                var goods_list=goods_data.data.list;
                console.log(goods_list)
                if(goods_list.length>0){
                    $(".no_data").remove();
                    var totalPage =  goods_data.data.totalPage;
                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current,category_id,search_good_name,brand_URI);
                        }
                    })
                    console.log(goods_data)
                    // console.log(goods_list.length)
                    for(var i=0;i<goods_list.length;i++){
                        // console.log(typeof (goods_list[i].commodityName));
                        var good="<li class='goods_info'>"+
                            "<div class='row'>"+
                            '<div class="col4">'+
                            '<div class="thumbnail">'+
                            '<div class="pic_box" self_id="i_'+goods_list[i].id+'" commodityCode='+goods_list[i].commodityCode+'>'+"<img src="+goods_list[i].logoPath+" alt=''>"+'</div>'+
                            '<div class="caption">'+
                            "<h3>"+goods_list[i].commodityName+"</h3>"+
                            '<div class="goods_price">'+'<i>¥</i>'+'<span class="price">'+goods_list[i].unitPrice
                            +'</span>'+'<div class="add_car">'+
                            '<button class="btn btn-default">'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                        $('.goods_list').append(good);
                    }
                }else {
                    $(".no_data").remove();
                    var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".goods_box").append(no_data);
                }
            }




            //获取点击进入的商品id
            $(".pic_box").on("click",function () {
                window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                var selfID=$(this).attr("self_id").split("_")[1];
                window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
                var commodityCODE=$(this).attr("commodityCode");
                window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
            })

            //添加购物车 因此页面无法显示详细规格，所以默认为第一个规格
            var shop_car_num = $(".shop_car_num");
            console.log(shop_car_num.val());
            $(".btn-default").each(function (index,ele) {
                $(ele).on("click",function () {
                    var commodityid=$(this).parent().parent().parent().parent().find($(".pic_box")).attr("self_id").split("_")[1];
                    console.log(commodityid);
                    var that=$(this);
                    if (shop_car_num.val()>100){ //购物车只能添加4+1个商品
                        shop_car_num.val(parseInt(shop_car_num.val()) - 1);
                        that.attr("data-toggle","modal");
                        that.attr("data-target","#full_shopcar_Modal");
                    }
                    // console.log(goods_list[index].standardId)
                    // if(u_id==""){
                    //     that.attr("data-toggle","modal");
                    //     that.attr("data-target","#please_login_Modal");
                    // };
                    //添加购物车
                    console.log(getCookie("XSRF-TOKEN"));
                    console.log(111);
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
                                //重新加载页面
                                // window.location.reload();
                                //获得购物车商品数量
                                $.ajax({
                                    type:"get",
                                    xhrFields:{withCredentials: true},
                                    url:http+"cart/count",
                                    success:function (num) {
                                        var shopcar_num=num.data;
                                        $(".shop_car_num").val(shopcar_num);
                                    }
                                })

                            }else {
                                // var obj_data=JSON.parse(data);
                                if(data.msg=="NO_LOGIN"){
                                    $("#fail_modal_content").text("请先登录！");
                                    $("#fail_operation_Modal").modal();
                                }else if(data.msg=="FAIL"){
                                    $("#fail_modal_content").text(data.error);
                                    $("#fail_operation_Modal").modal();
                                }

                            }

                        }
                    })
                });



            })
        }
    })
    //分页选择
    $(".pagination li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".shop_car").on("click",function () {
        window.open("shop_car.html");
    })


});
function change_page(current_page,category_id,search_good_name,brand_URI) {
    console.log(current_page)
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;

    $.ajax({
        type: "get",
        url: http+"commodity?page="+current_page+"&pageSize=20&categoryId="+category_id+"&keywords="+search_good_name+"&brand="+brand_URI,
        async: true,
        xhrFields:{withCredentials: true},
        success: function (goods_data){
            // console.log("hhh"+goods_data.data.totalPage)
            var goods_list=goods_data.data.list;
            console.log(goods_data)
            $("#good_list_box").empty();

            // console.log(goods_list.length)
            for(var i=0;i<goods_list.length;i++){
                // console.log(typeof (goods_list[i].commodityName));
                var good="<li class='goods_info'>"+
                    "<div class='row'>"+
                    '<div class="col4">'+
                    '<div class="thumbnail">'+
                    '<div class="pic_box" self_id="i_'+goods_list[i].id+'" commodityCode='+goods_list[i].commodityCode+'>'+"<img src="+goods_list[i].logoPath+" alt=''>"+'</div>'+
                    '<div class="caption">'+
                    "<h3>"+goods_list[i].commodityName+"</h3>"+
                    '<div class="goods_price">'+'<i>¥</i>'+'<span class="price">'+goods_list[i].unitPrice
                    +'</span>'+'<div class="add_car">'+
                    '<button class="btn btn-default">'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                $('.goods_list').append(good);
            }


            //获取点击进入的商品id
            $(".pic_box").on("click",function () {
                window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
                var selfID=window.sessionStorage.obj_good_id;
                var commodityCODE=window.sessionStorage.good_commodityCode;
                window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                // console.log(str);
            })

            //添加购物车 因此页面无法显示详细规格，所以默认为第一个规格
            var shop_car_num = $(".shop_car_num");
            console.log(shop_car_num.val());

            $(".btn-default").each(function (index,ele) {


                $(ele).on("click",function () {
                    var commodityid=$(this).parent().parent().parent().parent().find($(".pic_box")).attr("self_id").split("_")[1];
                    console.log(commodityid);
                    var that=$(this);
                    // if (shop_car_num.val()>100){ //购物车只能添加4+1个商品
                    //     shop_car_num.val(parseInt(shop_car_num.val()) - 1);
                    //     that.attr("data-toggle","modal");
                    //     that.attr("data-target","#full_shopcar_Modal");
                    // }
                    // console.log(goods_list[index].standardId)
                    // if(u_id==""){
                    //     that.attr("data-toggle","modal");
                    //     that.attr("data-target","#please_login_Modal");
                    // };
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
                                //重新加载页面
                                // window.location.reload();
                                //获得购物车商品数量
                                $.ajax({
                                    type:"get",
                                    xhrFields:{withCredentials: true},
                                    url:http+"cart/count",
                                    success:function (num) {
                                        var shopcar_num=num.data;
                                        console.log(shopcar_num)
                                        $(".shop_car_num").val(shopcar_num);
                                    }
                                })

                            }else {
                                // var obj_data=JSON.parse(data);
                                if(data.msg=="NO_LOGIN"){
                                    $("#fail_modal_content").text("请先登录！");
                                    $("#fail_operation_Modal").modal();
                                }else{
                                    $("#fail_modal_content").text(data.error);
                                    $("#fail_operation_Modal").modal();
                                }
                            }

                        }
                    })
                });



            })
        }
    })
}
function categoty() {
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    //ajax动态获取解析导航栏分类数据
    $.ajax({
        type:"get",
        xhrFields:{withCredentials: true},
        url:http+"category",
        async:true,
        success:function (classify) {
            console.log(classify);
            if(classify.msg=="SUCCESS"){
                var json=classify.data;
                name_id=classify.data;
                // console.log(json);
                //将获取的json取到本地，方便跨页面调动
                window.sessionStorage.chooseID=JSON.stringify(json);
                var first_category=""; //填写左侧导航栏中的html内容
                $.each(json,function (index) {
                    var Id1=json[index].id;
                    var categoryName1=json[index].categoryName;
                    // console.log(categoryName1);
                    var childCategory1=json[index].childCategory;
                    // console.log(childCategory1);
                    var second_category="";
                    if(childCategory1.length>0){
                        // console.log(childCategory1.length);
                        $.each(childCategory1,function (i) {
                            var Id2=childCategory1[i].id;
                            var categoryName2=childCategory1[i].categoryName;
                            var childCategory2=childCategory1[i].childCategory;
                            var third_category="";
                            if (childCategory2.length>0){
                                $.each(childCategory2,function (n) {
                                    var Id3=childCategory2[n].id;
                                    var categoryName3=childCategory2[n].categoryName;
                                    var childCategory3=childCategory2[n].childCategory;
                                    third_category+='<span>'+ '|'+'</span>'+'<a href="javascript:;" class="info_dd" third_id="i_'+Id3+'" third_index="i_'+n+'">'
                                        +categoryName3+'</a>';

                                })

                            }
                            second_category+='<li class="info_more1">'+'<div class="info_dt" second_id="i_'+Id2+'" second_index="i_'+i+'">'+
                                '<a href="javascript:;" >'+categoryName2+'</a>'+'<i>'+'>'+'</i>' +'</div>'+
                                '<div class="info_more1_dd">'+third_category+
                                '</div>'+
                                '</li>';
                        })
                    }
                    first_category+='<li class="category1" first_id="i_'+Id1+'" first_index="i_'+index+'">'+'<a href="javascript:;" class="category1_a">'+categoryName1+'</a>'+
                        '<div class="nav_dd_info">'+
                        '<ul>'+second_category+
                        '</ul>'+
                        '</div>'+
                        '</li>';
                })
                // +'<i class="cut_line">'+'/'+'</i>'
            }
            $("#classify_messgae").html(first_category);

            var ali=$("#classify_messgae").children();
            ali.each(function (i,e) {
                $(e).mouseenter(function () {
                    // $(".nav_dd_info").show()
                    $(this).addClass("show_nav_dd_info").siblings().removeClass("show_nav_dd_info");
                    // $(this).find(".nav_dd_info").show();
                })
            });
            $("#classify_messgae").mouseleave(function () {
                ali.each(function (i,e) {
                    $(e).removeClass("show_nav_dd_info");
                })
            })
            //当点击某一分类时进行页面跳转
            //获取一级分类的li
            // var li1=$("#classify_messgae").children();
            $(".category1_a").each(function (index,ele) {
                $(ele).click(function () {
                    console.log(1111111)
                    window.sessionStorage.category_id=$(this).parent().attr("first_id").split("_")[1];
                    window.sessionStorage.first_id=$(this).parent().attr("first_id").split("_")[1];
                    window.sessionStorage.first_index=$(this).parent().attr("first_index").split("_")[1];
                    window.sessionStorage.first_name=$(this).text();
                    window.sessionStorage.second_id="";
                    window.sessionStorage.second_index="";
                    window.sessionStorage.second_name="";
                    window.sessionStorage.third_id="";
                    window.sessionStorage.third_index="";
                    window.sessionStorage.third_name="";
                    window.sessionStorage.search_keywords="";
                    window.sessionStorage.brand='';
                    window.sessionStorage.brand_name='';
                    console.log(window.sessionStorage.first_name);
                    // window.sessionStorage.second_id="";
                    // window.sessionStorage.third_id="";
                    window.location.reload()
                })
            })
            //点击了二级分类
            $(".info_dt").each(function (index,ele) {
                $(ele).click(function () {
                    console.log(22222)
                    window.sessionStorage.category_id=$(this).attr("second_id").split("_")[1];
                    window.sessionStorage.first_id=$(this).parent().parent().parent().parent().attr("first_id").split("_")[1];
                    window.sessionStorage.first_index=$(this).parent().parent().parent().parent().attr("first_index").split("_")[1];
                    window.sessionStorage.second_id=$(this).attr("second_id").split("_")[1];
                    window.sessionStorage.second_index=$(this).attr("second_index").split("_")[1];
                    window.sessionStorage.first_name=$(this).parent().parent().parent().parent().find(".category1_a").html();
                    window.sessionStorage.second_name=$(this).find("a").html();
                    window.sessionStorage.third_id="";
                    window.sessionStorage.third_index="";
                    window.sessionStorage.third_name="";
                    window.sessionStorage.search_keywords=""
                    window.sessionStorage.brand="";
                    window.sessionStorage.brand_name='';
                    // window.sessionStorage.third_id="";
                    window.location.reload()
                    console.log(category_id)
                })
            })
            //点了第三级
            $(".info_dd").each(function (index,ele) {
                $(ele).click(function () {
                    console.log(3333)
                    window.sessionStorage.category_id=$(this).attr("third_id").split("_")[1];
                    window.sessionStorage.first_id=$(this).parent().parent().parent().parent().parent().attr("first_id").split("_")[1];
                    window.sessionStorage.first_index=$(this).parent().parent().parent().parent().parent().attr("first_index").split("_")[1];
                    window.sessionStorage.second_id=$(this).parent().parent().find(".info_dt").attr("second_id").split("_")[1];
                    window.sessionStorage.second_index=$(this).parent().parent().find(".info_dt").attr("second_index").split("_")[1];
                    window.sessionStorage.third_id=$(this).attr("third_id").split("_")[1];
                    window.sessionStorage.third_index=$(this).attr("third_index").split("_")[1];
                    window.sessionStorage.first_name=$(this).parent().parent().parent().parent().parent().find(".category1_a").html();
                    window.sessionStorage.second_name=$(this).parent().parent().find(".info_dt").find("a").html();
                    window.sessionStorage.third_name=$(this).html();
                    window.sessionStorage.search_keywords="";
                    window.sessionStorage.brand="";
                    window.sessionStorage.brand_name='';
                    window.location.reload();
                })
            })


        }
    });
}
// function show_list(category_id) {
//     console.log(category_id)
//     var http=Http;
//     var u_id=window.sessionStorage.u_id;
//     var s_id=window.sessionStorage.s_id;
//     //    获取商品列表
//     $.ajax({
//         type: "get",
//         url: http+"commodity?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=20&categoryId="+category_id,
//         async: true,
//         success: function (goods_data){
//             if(goods_data.msg=="SUCCESS"){
//                 $("#good_list_box").empty();
//                 var goods_list=goods_data.data.list;
//                 console.log(goods_list)
//                 if(goods_list.length>0){
//                     $(".no_data").remove();
//                     var totalPage =  goods_data.data.totalPage;
//                     $('.pageTest').page({
//                         leng:totalPage,//分页总数
//                         activeClass: 'activP' , //active 类样式定义
//                         clickBack:function(page){
//                             console.log(page-1)
//                             var current=page-1;
//                             change_page(current);
//                         }
//                     })
//                     console.log(goods_data)
//                     // console.log(goods_list.length)
//                     for(var i=0;i<goods_list.length;i++){
//                         // console.log(typeof (goods_list[i].commodityName));
//                         var good="<li class='goods_info'>"+
//                             "<div class='row'>"+
//                             '<div class="col4">'+
//                             '<div class="thumbnail">'+
//                             '<div class="pic_box" self_id="i_'+goods_list[i].id+'" commodityCode='+goods_list[i].commodityCode+'>'+"<img src="+goods_list[i].logoPath+" alt=''>"+'</div>'+
//                             '<div class="caption">'+
//                             "<h3>"+goods_list[i].commodityName+"</h3>"+
//                             '<div class="goods_price">'+'<i>¥</i>'+'<span class="price">'+goods_list[i].unitPrice
//                             +'</span>'+'<div class="add_car">'+
//                             '<button class="btn btn-default">'+'购物车'+'</button>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
//                         $('.goods_list').append(good);
//                     }
//                 }else {
//                     $(".no_data").remove();
//                     var no_data='<div class="no_data">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
//                     $(".goods_box").append(no_data);
//                 }
//             }
//
//
//
//
//             //获取点击进入的商品id
//             $(".pic_box").on("click",function () {
//                 window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
//                 window.sessionStorage.good_commodityCode=$(this).attr("commodityCode");
//                 window.open("goods_detail.html");
//             })
//
//             //添加购物车 因此页面无法显示详细规格，所以默认为第一个规格
//             var shop_car_num = $(".shop_car_num");
//             console.log(shop_car_num.val());
//             $(".btn-default").each(function (index,ele) {
//                 $(ele).on("click",function () {
//                     var commodityid=$(this).parent().parent().parent().parent().find($(".pic_box")).attr("self_id").split("_")[1];
//                     console.log(commodityid);
//                     var that=$(this);
//                     if (shop_car_num.val()>100){ //购物车只能添加4+1个商品
//                         shop_car_num.val(parseInt(shop_car_num.val()) - 1);
//                         that.attr("data-toggle","modal");
//                         that.attr("data-target","#full_shopcar_Modal");
//                     }
//                     // console.log(goods_list[index].standardId)
//                     // if(u_id==""){
//                     //     that.attr("data-toggle","modal");
//                     //     that.attr("data-target","#please_login_Modal");
//                     // };
//                     //添加购物车
//                     $.ajax({
//                         url: http+"cart?uid="+u_id+"&sid="+s_id,
//                         data:JSON.stringify({"commodityId":commodityid,"commodityNumber":1}),
//                         type:"POST",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
//                         contentType:"application/json;charset=UTF-8",
//                         success:function (data) {
//                             console.log(data)
//                             if (data.msg=="SUCCESS"){
//                                 $("#successful_add_Modal").modal();
//                                 //重新加载页面
//                                 // window.location.reload();
//                                 //获得购物车商品数量
//                                 $.ajax({
//                                     type:"get",
//                                     url:http+"cart/count?uid="+u_id+"&sid="+s_id,
//                                     success:function (num) {
//                                         var shopcar_num=num.data;
//                                         $(".shop_car_num").val(shopcar_num);
//                                     }
//                                 })
//
//                             }else {
//                                 var obj_data=JSON.parse(data);
//                                 $("#fail_modal_content").text(obj_data.error);
//                                 $("#fail_operation_Modal").modal();
//                             }
//
//                         }
//                     })
//                 });
//
//
//
//             })
//         }
//     })
// }
// function second_category(index,second_id) {
//     console.log(111111111)
//     var http=Http;
//     var all='<li>'+'<a href="#">'+'全部'+'</a>'+'</li>';
//     $.ajax({
//         type: "get",
//         url: http+"category",
//         async: true,
//         success: function (select_data) {
//             //思想：首先获得最外层的一级分类 索引号按照最外层来 根据所点击li的索引值，来找到该li下面的childCategory
//             var first = select_data.data;
//             var second=first[index].childCategory ;
//             if(second.length>0) {
//                 $(".goods_second_list").empty();
//                 $(".goods_second_list").html(all);
//                 for (var i = 0; i < second.length; i++) {
//                     var second_li = "<li class='second_li' self_id='i_" + second[i].id + "'>" + "<a>" + second[i].categoryName + "</a>" + "</li>";
//                     $(".goods_second_list").append(second_li);
//                 }
//                 $("li[self_id='i_"+second_id+"']").addClass("selected").siblings().removeClass("selected");
//                 $(".second_category").show();
//                 $(".third_category").hide();
//             }
//
//         }
//     })
// }
// function third_category(first_index,second_index,second_id,third_id) {
//     console.log(333333333333333)
//     var http=Http;
//     var all='<li>'+'<a href="#">'+'全部'+'</a>'+'</li>';
//     $.ajax({
//         type: "get",
//         url: http+"category",
//         async: true,
//         success: function (select_data) {
//             //思想：首先获得最外层的一级分类 索引号按照最外层来 根据所点击li的索引值，来找到该li下面的childCategory
//             var first = select_data.data;
//             var second = first[first_index].childCategory;
//             if (second.length > 0) {
//                 $(".goods_second_list").empty();
//                 $(".goods_second_list").html(all);
//                 for (var i = 0; i < second.length; i++) {
//                     var second_li = "<li class='second_li' self_id='i_" + second[i].id + "'>" + "<a>" + second[i].categoryName + "</a>" + "</li>";
//                     $(".goods_second_list").append(second_li);
//                 }
//                 $("li[self_id='i_"+second_id+"']").addClass("selected").siblings().removeClass("selected");
//                 $(".second_category").show()
//                 var third = second[second_index].childCategory;
//                 if (third.length > 0) {
//                     $(".goods_third_list").empty();
//                     $(".goods_third_list").html(all);
//                     for (var j = 0; j < third.length; j++) {
//                         var third_li = "<li class='third_li' self_id='i_" + third[j].id + "'>" + "<a>" + third[j].categoryName + "</a>" + "</li>";
//                         $(".goods_third_list").append(third_li);
//                     }
//                     $("li[self_id='i_"+third_id+"']").addClass("selected").siblings().removeClass("selected");
//                     $(".third_category").show()
//                 }
//             }
//         }
//     })
// }
