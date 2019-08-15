/**
 * Created by hc on 2017/3/9.
 */
/***
 * 京东首页
 */
//关闭广告条
$(function () {
    var http=Http;
    var jump_to_service=Http_jump_to_service;
    $(".jump_to_service").click(function () {
        window.open(jump_to_service);
    })
    // var http="http://120.78.188.220/qinwutong/purchase/";
    //解析json返回的用户名
    var login_str =""; //获取本地存储的数字对象
    var obj="";
    // var u_id="";
    // var s_id="";
    var category_id="";
    // var cooinfo=getCookie("XSRF-TOKEN");
    // console.log(cooinfo);
    window.sessionStorage.first_id="";
    window.sessionStorage.second_id="";
    window.sessionStorage.third_id="";
    window.sessionStorage.category_id="";
    window.sessionStorage.first_name="";
    window.sessionStorage.second_name="";
    window.sessionStorage.third_name="";
    window.sessionStorage.search_keywords="";
    window.sessionStorage.brand="";
    window.sessionStorage.brand_name='';
    // 跳转到超市
    $("#supermall").click(function () {
        window.sessionStorage.category_id=488;
        window.sessionStorage.first_id=488;
        window.sessionStorage.first_index=15;
        window.sessionStorage.first_name="农副产品";
        window.sessionStorage.second_id="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_id="";
        window.sessionStorage.third_name="";
        window.sessionStorage.search_keywords="";
        window.sessionStorage.brand='';
        window.sessionStorage.brand_name='';

    })
    // if(search_good_name!=null){
    //     $(".search").attr("value",search_good_name);
    // }

    $("#exit").click(function () {
        $.ajax({
            type:"POST",
            beforeSend: function(request) {
                var cooinfo=getCookie("XSRF-TOKEN");
                request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
            },//提交方式
            url:http+"logout",
            xhrFields:{withCredentials: true},
            success:function (data) {
                if(data.msg=="SUCCESS"){
                    window.location.reload();
                }
            }
        })
        // sessionStorage.removeItem("obj_user"); //localStorage.removeItem("key");//删除名称为“key”的信息。
        // window.sessionStorage.obj_user="";
        // u_id="";
        // s_id="";

        // $("#username").attr("href","mall_html/login.html").html("你好，请登录");
        // $("#exit").hide()
        // $("#register").show();
        // $(".qwt_welcome").css("top",90+"px");
        // $("#hello_user").html("Hi，欢迎来到勤务通！");
        // $("#welcome").html("请先登录或注册")
        // $(".user_profit").show();
        // // $(".shop_car_num").val(0);
        // $(".touxiang_box").css("background","url('../../images/touxiang.png')repeat top center");
    })

    // if(window.sessionStorage.obj_user==""||window.sessionStorage.obj_user==null){
    //     console.log("no user!");
    //     // $(".shop_car_num").val(0);
    // }else{
    //     login_str=window.sessionStorage.obj_user;
    //     // console.log(login_str)
    //     obj = $.parseJSON(login_str); //再将数组转为json
    //     $("#username").attr("href","#").html(obj.data.username);
    //     $("#register").hide();
    //     $("#exit").show();
    //     $(".qwt_welcome").css("top",110+"px");
    //     $("#hello_user").html("你好 "+obj.data.username+"&nbsp&nbsp&nbsp&nbsp");
    //     $("#welcome").html("欢迎来到勤务通！")
    //     $(".user_profit").hide();
    //     u_id=obj.data.id;
    //     s_id=obj.data.session;
    //     //get购物车数量
    //
    // }
    $.ajax({
        type:"get",
        url:http+"cart/count",
        xhrFields:{withCredentials: true},
        success:function (num) {
            if(num.msg=="SUCCESS"){
                var shopcar_num=num.data;
                console.log(shopcar_num)
                $(".shop_car_num").val(shopcar_num);
            }

        }
    })


    $(".shop_car").click(function () {
        // console.log(22222)
        window.open("mall_html/shop_car.html");
    });
    $(".my_qwt").click(function () {

        window.open("mall_html/individual_order_list.html");
    })
    $(".wait_pay").click(function () {
        // if(u_id==0){
        //     $("#fail_modal_content").text("请登录！")
        //     $("#fail_operation_Modal").modal();
        // }else {
            window.open("mall_html/individual_need_pay_list.html");
        // }
    })
    $(".wait_receive").click(function () {
        // if(u_id==0){
        //     $("#fail_modal_content").text("请登录！")
        //     $("#fail_operation_Modal").modal();
        // }else {
            window.open("mall_html/individual_need_receive_list.html");
        // }
    })
    $(".wait_commit").click(function () {
        // if(u_id==0){
        //     $("#fail_modal_content").text("请登录！")
        //     $("#fail_operation_Modal").modal();
        // }else {
            window.open("mall_html/individual_need_commit.html");
        // }
    });

    $(".goods_center").click(function () {
        window.sessionStorage.category_id="";
        window.sessionStorage.first_name="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_name="";
        window.sessionStorage.search_keywords="";
        window.sessionStorage.brand_name='';
        window.sessionStorage.brand='';
    });
    //搜索商品
    $(".search_button").click(function () {
        window.sessionStorage.category_id="";
        window.sessionStorage.brand='';
        window.sessionStorage.brand_name='';
        window.sessionStorage.search_keywords=$(".search").val();
        click();
    });
    $(".search").keydown(function (e) {
        if (e.which == 13) {
            window.sessionStorage.category_id="";
            window.sessionStorage.brand='';
            window.sessionStorage.brand_name='';
            window.sessionStorage.search_keywords=$(".search").val();
            // window.open("mall_html/goods.html");
            click();
        }
    })
 //   显示公告信息
    $.ajax({
        url:http+"notice",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function(data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                if(data.data.length>0){
                    for(var i=0;i<data.data.length;i++){
                        var notice_list='<li class="notice_li">'+data.data[i].notice+'</li>';
                        $("#notice").append(notice_list);
                    }
                    $("#notice li").each(function (index,ele) {
                        $(ele).click(function () {
                            window.open("mall_html/news/news_info.html");
                        })
                    })
                }else {
                    $("#notice").html("<span>暂无公告</span>");
                }


            }
        }
    })

 //显示用户头像
    $.ajax({
        url:http+"info?",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                $(".contact_server").click(function () {
                    window.open("http://wpa.qq.com/msgrd?v=3&uin=362867994&site=qq&menu=yes");
                })
                $("#username").attr("href","mall_html/individual_index.html").html(data.data.username);
                $("#register").hide();
                $("#exit").show();
                $(".qwt_welcome").css("top",110+"px");
                $("#hello_user").html("你好 "+data.data.username+"&nbsp&nbsp&nbsp&nbsp");
                $("#welcome").html("欢迎来到勤务通！")
                $(".user_profit").hide();
                $(".touxiang_box").click(function () {
                    // console.log(3324)
                    window.open("mall_html/individual_user_info.html");
                })
                // console.log(data);
                if(data.data.headSculpture!=null){
                    $(".img-circle").attr("src",data.data.headSculpture);
                }else {
                    $(".img-circle").attr("src","images/touxiang.png");
                }

            }else {
                $(".shop_car_num").val(0);
                $(".contact_server").click(function () {
                        $("#fail_modal_content").text(data.error);
                        $("#fail_operation_Modal").modal();
                })
            }
        }
    })
    //点击轮播图进入商品大类

    $(".slides_pic").each(function (index,ele) {
        $(ele).click(function () {

            category_id=$(this).attr("first_id").split("_")[1];
            window.sessionStorage.category_id=category_id;
            window.sessionStorage.first_id=category_id;
            window.sessionStorage.first_index=$(this).attr("first_index").split("_")[1];
            window.sessionStorage.first_name=$(this).attr("first_name");
            // console.log(window.sessionStorage.first_name)
            window.sessionStorage.second_id="";
            window.sessionStorage.second_name="";
            window.sessionStorage.third_id="";
            window.sessionStorage.third_name="";
            window.sessionStorage.search_keywords="";
            window.sessionStorage.brand='';
            window.sessionStorage.brand_name='';
            // window.open("mall_html/goods.html");
            click();
        })
    })


    $(".clcles").css("width",24*$("#slides li").length+"px");
    $(".clcles").css("margin-left",-12*$("#slides li").length+"px");
    //ajax动态获取解析导航栏分类数据
    $.ajax({
        type:"get",
        url:http+"category",
        xhrFields:{withCredentials: true},
        async:true,
        success:function (classify) {
            console.log(classify);
            if(classify.msg=="SUCCESS"){
                var json=classify.data;
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
                    category_id=$(this).parent().attr("first_id").split("_")[1];
                    window.sessionStorage.category_id=category_id;
                    window.sessionStorage.first_id=category_id;
                    window.sessionStorage.first_index=$(this).parent().attr("first_index").split("_")[1];
                    window.sessionStorage.first_name=$(this).text();
                    console.log(window.sessionStorage.first_name)
                    window.sessionStorage.second_id="";
                    window.sessionStorage.second_name="";
                    window.sessionStorage.third_id="";
                    window.sessionStorage.third_name="";
                    window.sessionStorage.search_keywords="";
                    window.sessionStorage.brand='';
                    window.sessionStorage.brand_name='';
                    // window.open("mall_html/goods.html");
                    click();
                    })
            })
            //点击了二级分类
            $(".info_dt").each(function (index,ele) {
                $(ele).click(function () {
                    console.log(22222)
                    category_id=$(this).attr("second_id").split("_")[1];
                    window.sessionStorage.category_id=category_id;
                    window.sessionStorage.first_id=$(this).parent().parent().parent().parent().attr("first_id").split("_")[1];
                    window.sessionStorage.first_index=$(this).parent().parent().parent().parent().attr("first_index").split("_")[1];
                    window.sessionStorage.second_id=category_id;
                    window.sessionStorage.second_index=$(this).attr("second_index").split("_")[1];
                    window.sessionStorage.first_name=$(this).parent().parent().parent().parent().find(".category1_a").html();
                    window.sessionStorage.second_name=$(this).find("a").html();
                    window.sessionStorage.third_id="";
                    window.sessionStorage.third_name="";
                    window.sessionStorage.search_keywords="";
                    window.sessionStorage.brand='';
                    window.sessionStorage.brand_name='';
                    // window.sessionStorage.third_id="";
                    // window.open("mall_html/goods.html");
                    click();
                    console.log(category_id)
                })
            })
            //点了第三级
            $(".info_dd").each(function (index,ele) {
                $(ele).click(function () {
                    console.log(333333)
                    category_id=$(this).attr("third_id").split("_")[1];
                    console.log(category_id)
                    window.sessionStorage.category_id=category_id;
                    window.sessionStorage.first_id=$(this).parent().parent().parent().parent().parent().attr("first_id").split("_")[1];
                    window.sessionStorage.first_index=$(this).parent().parent().parent().parent().parent().attr("first_index").split("_")[1];
                    window.sessionStorage.second_id=$(this).parent().parent().find(".info_dt").attr("second_id").split("_")[1];
                    window.sessionStorage.second_index=$(this).parent().parent().find(".info_dt").attr("second_index").split("_")[1];
                    window.sessionStorage.third_id=category_id;
                    window.sessionStorage.third_index=$(this).attr("third_index").split("_")[1];
                    window.sessionStorage.first_name=$(this).parent().parent().parent().parent().parent().find(".category1_a").html();
                    window.sessionStorage.second_name=$(this).parent().parent().find(".info_dt").find("a").html();
                    window.sessionStorage.third_name=$(this).html();
                    window.sessionStorage.search_keywords="";
                    window.sessionStorage.brand='';
                    window.sessionStorage.brand_name='';
                    // window.open("mall_html/goods.html");
                    click();
                })
            })


        }
    });
    //秒杀
    $.ajax({
        url:http+"commodity/seckill?page=0&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data)
            if(data.msg=="SUCCESS"){
                var skill_good_list=data.data.list;

                if(skill_good_list.length>0){
                    for(var i=0;i<skill_good_list.length;i++){
                        var skill_good='<li class="skill_item" commodity_code=i_'+skill_good_list[i].commodity.commodityCode+' self_id="i_'+skill_good_list[i].commodityId+'">'+'<div class="skill_goods_info">'+'<a href="javascript:;" class="skill_goodlink">'+
                            '<img src='+skill_good_list[i].commodity.logoPath+' alt="" class="skill_img" alt='+skill_good_list[i].commodity.commodityName+'>'+'</a>'+
                            '<a href="javascript:;" class="goods_des">'+skill_good_list[i].commodity.commodityName+'</a>'+'</div>'+'<p class="goods_price">'+'<span class="goods_new_price">'+
                            '<i>'+'¥'+'</i>'+'<span class="goodsskill_new_price">'+skill_good_list[i].seckillPrice+'</span>'+'</span>'+'<span class="goods_old_price">'+'<i>'+'¥'+'</i>'+
                            '<del>'+skill_good_list[i].commodity.unitPrice+'</del>'+'</span>'+'</p>'+'</li>';
                            // <span class="skill_bg"></span>
                            $(".skill_box_ul").append(skill_good);
                    }

                    if(skill_good_list.length>6){
                        skill();
                    }
                    $(".skill_item").on("click",function () {
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=$(this).attr("self_id").split("_")[1];
                        var commodityCODE=$(this).attr("commodity_code").split("_")[1];

                        window.open("mall_html/skill_goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })



                }else {
                    $(".no_skill").text("暂无秒杀");
                }
            }
        }

    })
    //首页六大分类
    //办公文具 1
    $.ajax({
        type:"get",
        url:http+"commodity?page=0&pageSize=4&categoryId=1",
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                var office_0="办公必备";
                var office_1="方便快捷";
                var office_2="易于携带";
                var office_3="高效办公";
                var office_good=data.data.list;
                if(office_good.length>0){
                    for(var i=0;i<office_good.length;i++){
                        // var name=office_good[i].commodityName.split(" ")[0];
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item have_good1" commodity_code=i_'+office_good[i].commodityCode+' self_id=i_'+office_good[i].id+'>'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+office_good[i].commodityName+'</span>'+'<img src='+office_good[i].logoPath+' alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".office_good_ul").append(office_good_list);
                    }
                    $(".have_good1").click(function () {
                        console.log(11111)
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=$(this).attr("self_id").split("_")[1];
                        var commodityCODE=$(this).attr("commodity_code").split("_")[1];
                        window.open("mall_html/goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })

                }else {
                    for(var i=0;i<4;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item">'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+'劳保用品'+'</span>'+'<img src="images/goods4.jpg" alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".office_good_ul").append(office_good_list);
                    }
                }
            }
        }
    })
    //汽车用品 437
    $.ajax({
        type:"get",
        url:http+"commodity?page=0&pageSize=4&categoryId=437",
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                var office_0="质量保证";
                var office_1="种类齐全";
                var office_2="可靠安全";
                var office_3="防护用具";
                var office_good=data.data.list;
                if(office_good.length>0){
                    for(var i=0;i<office_good.length;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item have_good2" commodity_code=i_'+office_good[i].commodityCode+' self_id=i_'+office_good[i].id+'>'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+office_good[i].commodityName+'</span>'+'<img src='+office_good[i].logoPath+' alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".laobao_good_ul").append(office_good_list);
                    }
                    $(".have_good2").click(function () {
                        // console.log(11111)
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=$(this).attr("self_id").split("_")[1];
                        var commodityCODE=$(this).attr("commodity_code").split("_")[1];
                        window.open("mall_html/goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })
                }else {
                    for(var i=0;i<4;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item">'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+'汽车用品'+'</span>'+'<img src="images/goods4.jpg" alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".laobao_good_ul").append(office_good_list);
                    }
                }
            }
        }
    })
    //生活用品 155
    $.ajax({
        type:"get",
        url:http+"commodity?page=0&pageSize=4&categoryId=155",
        success:function (data){
            console.log(data);
            console.log(111)
            if(data.msg=="SUCCESS"){
                var office_0="日常洗护";
                var office_1="价格实惠";
                var office_2="放心购买";
                var office_3="家庭必备";
                var office_good=data.data.list;
                if(office_good.length>0){
                    for(var i=0;i<office_good.length;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item have_good3" commodity_code=i_'+office_good[i].commodityCode+' self_id=i_'+office_good[i].id+'>'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+office_good[i].commodityName+'</span>'+'<img src='+office_good[i].logoPath+' alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".life_good_ul").append(office_good_list);
                    }
                    $(".have_good3").click(function () {
                        // console.log(11111)
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=$(this).attr("self_id").split("_")[1];
                        var commodityCODE=$(this).attr("commodity_code").split("_")[1];
                        window.open("mall_html/goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })

                }else {
                    for(var i=0;i<4;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item">'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+'办公用品'+'</span>'+'<img src="images/goods4.jpg" alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".life_good_ul").append(office_good_list);
                    }
                }
            }
        }
    })
    //体育用品 373
    $.ajax({
        type:"get",
        url:http+"commodity?page=0&pageSize=4&categoryId=373",
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                var office_0="健身装备";
                var office_1="户外运动";
                var office_2="塑形美体";
                var office_3="日常外出";
                var office_good=data.data.list;
                if(office_good.length>0){
                    for(var i=0;i<office_good.length;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item have_good4"  commodity_code=i_'+office_good[i].commodityCode+' self_id=i_'+office_good[i].id+' >'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+office_good[i].commodityName+'</span>'+'<img src='+office_good[i].logoPath+' alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".sport_good_ul").append(office_good_list);
                    }
                    $(".have_good4").click(function () {
                        // console.log(11111)
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=$(this).attr("self_id").split("_")[1];
                        var commodityCODE=$(this).attr("commodity_code").split("_")[1];
                        window.open("mall_html/goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })
                }else {
                    for(var i=0;i<4;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item">'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+'体育用品'+'</span>'+'<img src="images/goods4.jpg" alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".sport_good_ul").append(office_good_list);
                    }
                }
            }
        }
    })
    //办公家电 261
    $.ajax({
        type:"get",
        url:http+"commodity?page=0&pageSize=4&categoryId=261",
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                var office_0="家庭必备";
                var office_1="充值返利";
                var office_2="专人配送";
                var office_3="维修保修";
                var office_good=data.data.list;
                if(office_good.length>0){
                    for(var i=0;i<office_good.length;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item have_good5"  commodity_code=i_'+office_good[i].commodityCode+' self_id=i_'+office_good[i].id+' >'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+office_good[i].commodityName+'</span>'+'<img src='+office_good[i].logoPath+' alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".household_good_ul").append(office_good_list);
                    }
                    $(".have_good5").click(function () {
                        // console.log(11111)
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=$(this).attr("self_id").split("_")[1];
                        var commodityCODE=$(this).attr("commodity_code").split("_")[1];
                        window.open("mall_html/goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })
                }else {
                    for(var i=0;i<4;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item">'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+'办公家电'+'</span>'+'<img src="images/goods4.jpg" alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".household_good_ul").append(office_good_list);
                    }
                }
            }
        }
    })
    //通讯数码 183
    $.ajax({
        type:"get",
        url:http+"commodity?page=0&pageSize=4&categoryId=183",
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                var office_0="潮人必备";
                var office_1="最新报价";
                var office_2="电脑配件";
                var office_3="手机配件";
                var office_good=data.data.list;
                if(office_good.length>0){
                    for(var i=0;i<office_good.length;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item have_good6"  commodity_code=i_'+office_good[i].commodityCode+' self_id=i_'+office_good[i].id+'>'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+office_good[i].commodityName+'</span>'+'<img src='+office_good[i].logoPath+' alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".computer_good_ul").append(office_good_list);
                    }
                    $(".have_good6").click(function () {
                        // console.log(11111)
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                        var selfID=$(this).attr("self_id").split("_")[1];
                        var commodityCODE=$(this).attr("commodity_code").split("_")[1];
                        window.open("mall_html/goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })
                }else {
                    for(var i=0;i<4;i++){
                        var office_text=eval('office_' + i)
                        var office_good_list='<li class="cl_item">'+'<a href="javascript:;" class="cl_link">'+'<p class="cl_title">'+
                            office_text+'</p>'+'<span class="cl_desc">'+'通讯数码'+'</span>'+'<img src="images/goods4.jpg" alt="" class="cl_pic">'+'</a>'+'</li>';
                        $(".computer_good_ul").append(office_good_list);
                    }
                }

            }
        }
    })
    //  // 还没逛够
    $.ajax({
        url:http+"commodity?page=0&pageSize=10&categoryId=",
        type:"get",
        success:function (data){
            console.log(data)
            if(data.msg=="SUCCESS"){
                var hot_goods_list=data.data.list;

                for(var i=0;i<hot_goods_list.length;i++){
                    // console.log(hot_goods_list[i].commodityName)
                    var hot_good='<li class="not_eng_item" commodity_code=i_'+hot_goods_list[i].commodityCode+' self_id=i_'+hot_goods_list[i].id+'>'+'<a href="javascript:;" class="not_eng_link">'+'<img src='+hot_goods_list[i].logoPath+' alt="" class="not_eng_pic">'+
                        '<div class="not_eng_info">'+'<p class="not_eng_title">'+hot_goods_list[i].commodityName+'</p>'+
                        '<p class="not_eng_text">'+'<i>'+'¥'+'</i>'+'<span class="more_info_price_txt">'+hot_goods_list[i].unitPrice+'</span>'+
                        '</p>'+'</div>'+'</a>'+'</li>';
                    $(".hot_goods_ul").append(hot_good)
                }
                $(".not_eng_item").click(function () {
                    // console.log(22222222)
                    window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                    window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                    var selfID=$(this).attr("self_id").split("_")[1];
                    var commodityCODE=$(this).attr("commodity_code").split("_")[1];
                    window.open("mall_html/goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                })
            }
        }
    })

    $(".qwt_close_card").click(function () {
        $(".header_card").hide();
    });

    // $(".top_shortcut .fl").mouseenter(function () {
    //    $(".top_shortcut .dt").addClass("current_bg");
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
    //客户服务
    $(".my_service_box").mouseenter(function () {
        $(".my_service_box .my_service").addClass("current_bg");
        $(".my_service_box .my_service_info").show(100);
    }).mouseleave(function () {
        $(".my_service_box .my_service").removeClass("current_bg");
        $(".my_service_box .my_service_info").hide(100);
    });
    //
    // $(".web_nav_box").mouseenter(function () {
    //     $(".web_nav_box .web_nav").addClass("current_bg");
    //     $(".web_nav_box .web_nav_info").show(100);
    // }).mouseleave(function () {
    //     $(".web_nav_box .web_nav").removeClass("current_bg");
    //     $(".web_nav_box .web_nav_info").hide(100);
    // });

    //动态创建轮播小圆点
    var lis = $(".qwt_main_slider").children("ul").children();
    var ul =$(".qwt_main_slider ul").get(0);
    var length = lis.length;
    // console.log(length);
    $(".clcles").append("<ol></ol>");
    $("ol").addClass("ol_circles");
    for(var i=0;i<=length - 1;i++){
        $(".ol_circles").append("<li></li>");
    }
    var olLis = $("#my_clcles .ol_circles li");

    for(var i=0; i<olLis.length;i++)
    {
        $("#my_clcles .ol_circles li").get(i).index = i;  // 获得当前第几个小li 的索引号
        $("#my_clcles .ol_circles li").get(i).onmouseover = function() {
            for(var j=0;j<olLis.length;j++)
            {
                $("#my_clcles .ol_circles li").get(i).className="no_current";
            }
            this.className = "clcles_current";

        }
    }

    $(".qwt_main_slider").mouseenter(function () {
       $("#arrow").show();
    }).mouseleave(function () {
        $("#arrow").hide();
    });
//公告栏切换
    $(".adv_items li").each(function (index,ele) {
        var $index=0;
        $(ele).mouseenter(function () {
            $(".adv_items li").removeClass("tab_current");
            if(index%2==0){
                $index = index;
                $(ele).addClass("tab_current");
                $(".tab_items div").each(function (index,mele) {
                    if($index === index){
                       $(this).show();
                    }else {
                        $(this).hide();
                    }
                });
            }


        });
    });

    $(".right_nav_item").each(function (index,ele) {
       $(ele).mouseenter(function () {
           // console.log(2222)
           $(".right_nav_item").removeClass("current_left_bg");
           $(ele).addClass("current_left_bg");
       }).mouseleave(function () {
           $(ele).removeClass("current_left_bg");
       })
    });

    $(".not_eng_item").each(function (index,ele) {
      $(ele).mouseenter(function () {
          $(".not_eng_item").removeClass("not_eng_bg");
          $(ele).addClass("not_eng_bg");
      })
    });
   // 固定导航滚动自动切换
    var car_book_top = $("#car_book").offset().top-500;
    var player_top = $("#player").offset().top-500;
    var computer_top = $("#computer").offset().top-500;
    var not_eng_top = $("#not_eng").offset().top-500;
    //根据位置计算左边固定导航栏什么时候出现和消失
    $(window).scroll(function(){
        var scroH = $(this).scrollTop();
        scroH>=700 ?  $(".right_nav_fix").show(): $(".right_nav_fix").hide();
        if(scroH>=car_book_top){
            set_cur(".car_book");
        }
        if(scroH>=player_top){
        set_cur(".player");
        }
        if(scroH>=computer_top){
            set_cur(".computer");
        }

        if(scroH>=not_eng_top){
                set_cur(".not_eng");
        }

    });
    //右侧固定导航栏
    $(".right_nav_item a").click(function() {
        var el = $(this).attr('class');
       var arr= el.split(" ");
        var idName = null;
        for (var i=0;i<arr.length;i++){
            idName = arr[i];
        }
        $('html, body').animate({
            scrollTop: $("#"+idName).offset().top-200
        }, 300);
        //切换菜单样式
        $(this).addClass("current_left_bg").parent().siblings().find("a").removeClass("current_left_bg");
    });

    function set_cur(n){
        if($(".right_nav_item a").hasClass("current_left_bg")){
            $(".right_nav_item a").removeClass("current_left_bg");
            //console.log("1");
        }
        $(".right_nav_item a"+n).addClass("current_left_bg");
        //console.log("2");
    }

    $(".bang_item").each(function (index,ele) {
        var $index = index;
        $(ele).mouseenter(function () {
            $(".bang_item").removeClass("current_tab_bg");
            $(this).addClass("current_tab_bg");
            $(".tab_all div").hide();
            $(".tab_all div").get($index).style.display = "block";

        });
    });



    $(".back_top").click(function(){
        goTop($(this));
    });
    function goTop(className){
            var sc=$(window).scrollTop();
            $('body,html').animate({scrollTop:0},300);
    }
    //秒杀倒计时
    window.setInterval(getTimer,10);/*设置不间断定时器执行getTimer函数*/
    function getTimer(){
        var endtime=new Date(new Date(new Date(new Date().toLocaleDateString())
                .getTime()+24*60*60*1000-1));  /*当前时间的24点*/
        var nowtime=new Date();/*获取当前时间的0点*/
        // console.log(nowtime);
        var cha=endtime.getTime()-nowtime.getTime();/*得到它们相差的时间*/
        var day=Math.floor(cha/1000/60/60/24);
        var hour=Math.floor(cha/1000/60/60%24+day*24);/*划分出时分秒*/
        var minute=Math.floor(cha/1000/60%60);
        var  second=Math.floor(cha/1000%60);
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        if (hour <= 9) hour = '0' + hour;

        $("#hour").html(hour);
        $("#minute").html(minute);
        $("#second").html(second);
    }

});

function click() {
    _url="mall_html/goods.html?";

    var category_id=window.sessionStorage.category_id;
    if(category_id!=""){
        _url=_url+"&cate="+category_id;
    }
    var first_id=window.sessionStorage.first_id;
    if(first_id!=""){
        _url=_url+"&cate1="+first_id;
    }
    var second_id=window.sessionStorage.second_id;
    if(second_id!=""){
        _url=_url+"&cate2="+second_id;
    }
    var third_id=window.sessionStorage.third_id;
    if(third_id!=""){
        _url=_url+"&cate3="+third_id;
    }
    var first_name=window.sessionStorage.first_name;
    if(first_name!=""){
        _url=_url+"&name1="+first_name;
    }
    var second_name=window.sessionStorage.second_name;
    if(second_name!=""){
        _url=_url+"&name2="+second_name;
    }
    var third_name=window.sessionStorage.third_name;
    if(third_name!=""){
        _url=_url+"&name3="+third_name;
    }
    var search_key=window.sessionStorage.search_keywords;
    if(search_key!=""){
        _url=_url+"&search="+search_key;
    }
    var search_good_name=window.sessionStorage.search_keywords;
    if(search_good_name!=""){
        _url=_url+"&search_name="+search_good_name;
    }
    var brand_URI=window.sessionStorage.brand;
    if(brand_URI!=""){
        _url=_url+"&brand_URL="+brand_URI;
    }
    var brand_name=window.sessionStorage.brand_name;
    if(brand_name!=""){
        _url=_url+"&brand_name="+brand_name;
    }

    window.location.href=encodeURI(_url);
}
