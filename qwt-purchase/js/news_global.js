/**
 * Created by MY on 2019/1/7.
 */
/**
 * Created by lysp on 2018/8/1.
 */

$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;

    var jump_to_service=Http_jump_to_service;
    $(".jump_to_service").click(function () {
        window.open(jump_to_service);
    })
    //退出登录
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
                // console.log(data);
                window.location.reload();
            }
        })
    })
    //获取购物车数量
    $.ajax({
        type:"get",
        url:http+"cart/count",
        xhrFields:{withCredentials: true},
        success:function (num) {
            console.log(num)
            if(num.msg=="SUCCESS"){
                var shopcar_num=num.data;
                console.log(shopcar_num)
                $(".shop_car_num").val(shopcar_num);
            }

        }
    })
    //获取用户信息
    $.ajax({
        url:http+"info",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                $(".contact_server").click(function () {
                    window.open("http://wpa.qq.com/msgrd?v=3&uin=362867994&site=qq&menu=yes");
                })
                $("#username").attr("href", "../individual_index.html").html(data.data.username);
                $("#register").hide();
                $("#exit").show();

            }else {
                $(".shop_car_num").val(0);
                $(".contact_server").click(function () {
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                })
            }
        }
    })

    categoty();

    var category_id="";
    window.sessionStorage.first_id="";
    window.sessionStorage.second_id="";
    window.sessionStorage.third_id="";
    window.sessionStorage.category_id="";
    window.sessionStorage.first_name="";
    window.sessionStorage.second_name="";
    window.sessionStorage.third_name="";
    window.sessionStorage.search_keywords="";
    window.sessionStorage.brand="";
    window.sessionStorage.brand_name="";

    $(".goods_center").click(function () {
        window.sessionStorage.category_id="";
        window.sessionStorage.first_name="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_name="";
        window.sessionStorage.search_keywords="";
        window.sessionStorage.brand="";
        window.sessionStorage.brand_name="";
        window.open("../goods.html");
    });

    //搜索商品
    $(".search_button").click(function () {
        window.sessionStorage.category_id="";
        window.sessionStorage.search_keywords=$(".search").val();
        window.sessionStorage.brand="";
        window.sessionStorage.brand_name="";
        window.open("../goods.html");
    })
    $(".search").keydown(function (e) {
        if (e.which == 13) {
            window.sessionStorage.category_id="";
            window.sessionStorage.search_keywords=$(".search").val();
            window.sessionStorage.brand="";
            window.sessionStorage.brand_name="";
            window.open("../goods.html");
        }
    })

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
        console.log(1111)
        $(".nav_dd").show();
    }).mouseleave(function () {
        $(".nav_dd").hide();
    })


    $(".shop_car").on("click",function () {
        window.open("../shop_car.html");
    })


});

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
            //重新点击分类列表时brand置空
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
                    window.sessionStorage.brand="";
                    window.sessionStorage.brand_name="";
                    // console.log(window.sessionStorage.first_name);
                    window.open("../goods.html");
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
                    window.sessionStorage.search_keywords="";
                    window.sessionStorage.brand="";
                    window.sessionStorage.brand_name="";
                    window.open("../goods.html");

                })
            })
            //点了第三级
            $(".info_dd").each(function (index,ele) {
                $(ele).click(function () {
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
                    window.sessionStorage.brand_name="";
                    window.open("../goods.html");
                })
            })


        }
    });
}