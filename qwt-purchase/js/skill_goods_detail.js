/**
 * Created by MY on 2018/10/18.
 */
/**
 * Created by lysp on 2018/8/3.
 */
$(function(){
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var id=window.sessionStorage.obj_good_id;
    var commodity_code=window.sessionStorage.good_commodityCode;
    if(commodity_code==null){
        var Param=window.location.search;//获取url中的参数
        console.log(Param);
        var theRequest = new Object();
        if (Param.indexOf("?") != -1) {
            var str = Param.substr(1);

            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        id=theRequest['selfID'];
        commodity_code=theRequest['commodityCode'];
    }
    console.log(commodity_code);
    console.log(id);
    console.log(u_id);

    //ajax获得商品信息
    var n='';
    var pic_address="";
    var detail_pic_address="";
    var good_pic="";
    var pic_lis="";
    var big_pic_lis="";
    var commodity_info="";
    var commodity_info_length="";
    // var detail_pic_array=new Array();
    var head_pic="";
    var comment_info="";
    var big_comment_pic="";
    var search_good_name=window.sessionStorage.search_keywords;
    if(search_good_name!=null){
        $(".search").attr("value",search_good_name);
    }
    $(".goods_center").click(function () {
        window.sessionStorage.category_id="";
        window.sessionStorage.first_id="";
        window.sessionStorage.first_name="";
        window.sessionStorage.second_id="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_id="";
        window.sessionStorage.third_name="";
        window.sessionStorage.brand="";
        window.sessionStorage.brand_name='';
    });
    //搜索商品
    $(".search_button").click(function () {
        window.sessionStorage.search_keywords=$(".search").val();
        window.sessionStorage.category_id="";
        window.sessionStorage.first_name="";
        window.sessionStorage.second_name="";
        window.sessionStorage.third_name="";
        window.sessionStorage.brand="";
        window.sessionStorage.brand_name='';
        window.location.href="goods.html";
    })
    $(".search").keydown(function (e) {
        if (e.which == 13) {
            window.sessionStorage.search_keywords=$(".search").val();
            window.sessionStorage.category_id="";
            window.sessionStorage.first_name="";
            window.sessionStorage.second_name="";
            window.sessionStorage.third_name="";
            window.sessionStorage.brand="";
            window.sessionStorage.brand_name='';
            window.location.href="goods.html";
        }
    })
    $.ajax({
        type: "get",
        url: http+"commodity/seckill/details?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10&commodityCode="+commodity_code,
        async: true,
        xhrFields:{withCredentials: true},
        success:function (good_detail) {
            console.log(good_detail)
            if(good_detail.msg=="SUCCESS"){
                // console.log(good_detail);
                //默认首先显示的信息
                var good_info=good_detail.data;
                console.log(good_info);
                if(good_info.length>0){
                    //产品信息
                    var xiajia=true;
                    for(var i=0;i<good_info.length;i++){
                        console.log(good_info[i].commodityId)
                        if(id==good_info[i].commodityId){
                            n=i;
                            xiajia=false;
                        }
                    }
                    if(xiajia){
                        $("#fail_modal_content").text("商品已下架！") ;
                        $("#fail_operation_Modal").modal();
                        $("#fail_operation_Modal").on('hide.bs.modal', function () {
                            window.close();
                        })
                    }
                    //产品信息
                    console.log(good_info)
                    // var first_info=good_info[n].commodity.categoryId.split(";")[0];
                    // var second_info=good_info[n].commodity.categoryId.split(";")[1];
                    // var third_info=good_info[n].commodity.categoryId.split(";")[2];
                    // var first_id=first_info.split(":")[0];
                    // var first_name=first_info.split(":")[1];
                    // var second_id=second_info.split(":")[0];
                    // var second_name=second_info.split(":")[1];
                    // var third_id=third_info.split(":")[0];
                    // var third_name=third_info.split(":")[1];
                    var first_id=good_info[n].commodity.categoryLevel1;
                    var first_name=good_info[n].commodity.categoryLevel1Name;
                    var second_id=good_info[n].commodity.categoryLevel2;
                    var second_name=good_info[n].commodity.categoryLevel2Name;
                    var third_id=good_info[n].commodity.categoryLevel3;
                    var third_name=good_info[n].commodity.categoryLevel3Name;
                    $(".first_category").html(first_name+"&nbsp&nbsp<i>></i>");
                    $(".first_category").attr("category_ID","i_"+first_id);
                    $(".second_category").html(second_name+"&nbsp&nbsp<i>></i>");
                    $(".second_category").attr("category_ID","i_"+second_id);
                    $(".third_category").html(third_name+"&nbsp&nbsp<i>></i>");
                    $(".third_category").attr("category_ID","i_"+third_id);
                    $(".back_to_allcategory").click(function () {
                        window.sessionStorage.category_id="";
                        window.sessionStorage.first_name="";
                        window.sessionStorage.second_name="";
                        window.sessionStorage.third_name="";
                        window.location.href="goods.html";
                    })
                    $(".first_category").click(function () {
                        window.sessionStorage.category_id=$(this).attr("category_ID").split("_")[1];
                        window.sessionStorage.first_name=first_name;
                        window.sessionStorage.first_id=first_id;
                        window.sessionStorage.second_name="";
                        window.sessionStorage.third_name="";
                        window.location.href="goods.html";
                    });
                    $(".second_category").click(function () {
                        window.sessionStorage.category_id=$(this).attr("category_ID").split("_")[1];
                        window.sessionStorage.third_name="";
                        window.sessionStorage.second_name=second_name;
                        window.sessionStorage.first_name=first_name;
                        window.sessionStorage.first_id=first_id;
                        window.sessionStorage.second_id=second_id;
                        window.location.href="goods.html";
                    });
                    $(".third_category").click(function () {
                        window.sessionStorage.category_id=$(this).attr("category_ID").split("_")[1];
                        window.sessionStorage.third_name=third_name;
                        window.sessionStorage.second_name=second_name;
                        window.sessionStorage.first_name=first_name;
                        window.sessionStorage.first_id=first_id;
                        window.sessionStorage.second_id=second_id;
                        window.sessionStorage.third_id=third_id;
                        window.location.href="goods.html";
                    });
                    $(".goods_name").html(good_info[n].commodity.commodityName)
                    //同类商品推荐 按照一级分类推荐
                    $.ajax({
                        url: http+"commodity?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=5&categoryId="+first_id,
                        type: "get",
                        xhrFields:{withCredentials: true},
                        success: function (data){
                            console.log(data);
                            if(data.msg=="SUCCESS"){
                                var recommend_list=data.data.list;
                                if(recommend_list.length>0){
                                    for(var i=0;i<recommend_list.length;i++){
                                        var recommend_good='<li class="goods_info">'+'<div class="row">'+'<div class="col4">'+'<div class="thumbnail" self_id=i_'+recommend_list[i].id+' commodity_code='+recommend_list[i].commodityCode+'>'+
                                            '<a href="javascript:;">'+'<img src='+recommend_list[i].logoPath+' alt="">'+'</a>'+'<div class="caption">'+'<h3>'+recommend_list[i].commodityName
                                            +'</h3>'+'<div class="goods_price">'+'<i>'+'¥'+'</i>'+'<span class="price">'+recommend_list[i].unitPrice+'</span>'+
                                            '</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</li>';
                                        $(".goods_list").append(recommend_good);

                                    }
                                    //获取点击进入的商品id
                                    $(".thumbnail").on("click",function () {
                                        // console.log(11)
                                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split("_")[1];
                                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code");
                                        var selfID=$(this).attr("self_id").split("_")[1];
                                        var commodityCODE=$(this).attr("commodity_code");
                                        window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);

                                    })

                                }else {
                                    $(".no_recommend").text("暂无数据")
                                }
                            }
                        }
                    })
                    // $(".goods_detail_info").html(good_info[0].commodityInfo);
                    //商品规格数据

                    detail_pic_address=good_info[n].commodity.commodityInfo.split(";");


                    good_pic='<div class="pic_box">'+'<img src='+good_info[n].commodity.logoPath+' alt="">'+'</div>'+
                        '<div class="pic_slide">'+'<ul id="pic_slide_img">'+'</ul>'+'<div id="arr">'+'<span id="left">'+'<'+'</span>'+
                        '<span id="right">'+'>'+'</span>'+'</div>'+'</div>'
                    $(".goods_pic").append(good_pic);

                    //获取轮播图片
                    console.log(good_info[n].commodity.sowingMap.match(";"))
                    if(good_info[n].commodity.sowingMap.match(";")){
                        // console.log(111)
                        pic_address=good_info[n].commodity.sowingMap.split(";");
                        for (var j=0;j<pic_address.length;j++){
                            pic_lis='<li>'+'<img src='+pic_address[j]+'>'+'</li>';
                            $("#pic_slide_img").append(pic_lis);
                        }
                        var sowing=new Array();
                        sowing=good_info[n].commodity.sowingMap.split(";");
                        if(sowing.length>4){
                            $("#right").on("click",function () {
                                target -=100;
                                //  右键图片都向左移动 left值变小
                            });

                            $("#left").on("click",function () {
                                target +=100;
                            });

                        }
                        //缓动动画
                        var leader = 0,target = 0;
                        setInterval(function() {
                            if(target >= 0)
                            //如果当前图片还未移动按了左键
                            {
                                target = 0;
                            }
                            else if(target <= -100)
                            //如果已经移动到头按了右键
                            {
                                target = -100;
                            }
                            leader = leader + (target - leader) / 10;

                            $("#pic_slide_img").get(0).style.left = leader+ "px";
                        },30);


                    }else {
                        // console.log(222)
                        pic_lis='<li>'+'<img src='+good_info[n].commodity.sowingMap+'>'+'</li>';
                        // console.log(pic_lis);
                        $("#pic_slide_img").html(pic_lis);
                    }


                    //商品详情
                    for (var j=0;j<detail_pic_address.length;j++){
                        big_pic_lis='<li>'+'<img src='+detail_pic_address[j]+'>'+'</li>';
                        $(".goods_detail_pic").append(big_pic_lis);
                    }



                    //商品文字信息
                    var good_name='<div class="goods_name">'+'<span class="name">'+good_info[n].commodity.commodityName+'</span>'+'</div>'+

                        '<div class="item">'+'<span class="label_info" style="color: #ee2222;font-weight: bold">'+'秒杀价格:'+'</span>'+'<div class="info price_tag">'+'<i>'+'¥'+'</i>'+good_info[n].seckillPrice +'</div>'+'</div>'+
                        '<div class="item original_info" >'+'<span class="label_info" style="font-size: 16px">'+'原价:'+'</span>'+'<div class="info" style="font-size: 14px">'+'<i>'+'¥'+'</i>'+good_info[n].commodity.unitPrice +'</div>'+'</div>'
                        +'<div class="item">'+'<span class="label_info" style="color: #ee2222;font-weight: bold">'+'秒杀库存:'+'</span>'+'<div class="info stock_info">'+'<input type="text" id="stock_num" style="color: #ee2222;font-weight: bold" value='+good_info[n].commodityNumber+'>'+'</div>'+'</div>'
                        +'<div class="item choose_num">'+'<span class="label_info">'+'数量:'+'</span>'+'<div class="info num_add_sub">'+'<input type="button" class="sub" value="-">'
                        +'<input type="text" class="num" value="1">'+'<input type="button" class="add" value="+">'+'</div>'+'</div>'+
                        '<div class="item choose_specification">'+'<span class="label_info">选择规格:</span>'+'<div class="info specifics_info">'+'</div>'+'</div>';

                    $(".good_info").prepend(good_name);
                    var num=$(".num");//获得文本框对象
                    var p=good_info[n].seckillPrice;

                    // console.log(parseInt(num.val()));
                    //初始化数量为1，所以失效减
                    $(".sub").attr("disabled",true);
                    //获取库存数值的对象
                    // var stock_num=$("#stock_num");
                    // 点击加号
                    $(".add").on("click",function () {
                        // console.log(num.val());
                        //给获取的值加上绝对值避免出现负数
                        num.val(Math.abs(parseInt(num.val()))+1);
                        var sum_p=parseInt(num.val())*p;

                        $(".price_tag").html("<i>￥</i>"+sum_p.toFixed(2));
                        // stock_num.val(parseInt(stock_num.val())-1);
                        if (parseInt(num.val())!=1){
                            $(".sub").attr("disabled",false);
                        };
                    })
                    //减号的操作
                    $(".sub").on("click",function () {

                        num.val(Math.abs(parseInt(num.val()))-1);
                        var sum_p=parseInt(num.val())*p;

                        $(".price_tag").html("<i>￥</i>"+sum_p.toFixed(2));
                        // stock_num.val(parseInt(stock_num.val())+1);
                        if (parseInt(num.val())==1){
                            $(".sub").attr("disabled",true);
                        }
                    })
                    $('.num').bind('input propertychange', function() {
                        var that=$(this);
                        console.log(typeof (num.val()));
                        if(num.val()==""){
                            num.val(0);
                            $(".price_tag").html("<i>￥</i>"+0.00);
                        }else if(isNaN(num.val())){
                            $("#fail_modal_content").text("非法输入！") ;
                            $("#fail_operation_Modal").modal();
                            // $(".price_tag").html("<i>￥</i>"+0.00);
                            $("#fail_operation_Modal").on('hide.bs.modal', function () {
                                window.location.reload();
                            })
                        }
                        else {
                            num.val(Math.abs(parseInt(num.val())));
                            var sum_p=parseInt(num.val())*p;

                            $(".price_tag").html("<i>￥</i>"+sum_p.toFixed(2));
                        }


                    });


                    //默认规格信息
                    $("#goods_specific").html(good_info[n].commodity.commoditySpecification);

                    for(var i=0;i<good_info.length;i++){
                        // var standardName=good_info[i].commodityName.split(" ")[1]
                        if(i==n){//默认规格信息 默认选中第一个
                            var good_standards='<div class="specific no_choose choose_border" commodity_id="i_'+good_info[i].commodityId+'" commodity_code='+good_info[i].commodity.commodityCode+'>'+good_info[i].commodity.standardName
                                +'</div>'
                        }else {
                            // console.log(standards_info[i].standardName)
                            var good_standards='<div class="specific no_choose" commodity_id="i_'+good_info[i].commodityId+'" commodity_code='+good_info[i].commodity.commodityCode+'>'+good_info[i].commodity.standardName
                                +'</div>'
                        }

                        $(".specifics_info").append(good_standards);
                    }
                    //默认评价信息 获得第一个规格的commodityid
                    var first_commodity_id=$(".specific:first").attr("commodity_id").split("_")[1];
                    $.ajax({
                        url:http+"order/commodity/evaluate?uid="+u_id+"&sid="+s_id+"&commodityId="+first_commodity_id+"&page=1&pageSize=10",
                        type:"get",
                        xhrFields:{withCredentials: true},
                        success:function (data) {
                            console.log(data);
                            if(data.msg=="SUCCESS"){
                                var commit_list=data.data.list;
                                console.log(commit_list)
                                if(commit_list.length>0){
                                    var totalPage =data.data.totalPage;
                                    $('.pageTest').page({
                                        leng:totalPage,//分页总数
                                        activeClass: 'activP' , //active 类样式定义
                                        clickBack:function(page){
                                            // console.log(page-1)
                                            var current=page;
                                            change_page(current,first_commodity_id);
                                        }
                                    })
                                    for(var i=0;i<commit_list.length;i++){
                                        var orderEvaluationLevel=commit_list[i].orderEvaluationLevel;
                                        var stars=star(orderEvaluationLevel);
                                        //判断用户是否有头像
                                        // var headSculpture=commit_list[i].headSculpture;
                                        var headSculpture=commit_list[i].purchaseUser.headSculpture
                                        if(headSculpture==""){
                                            head_pic="../images/touxiang.png";
                                        }else {
                                            head_pic=headSculpture;
                                        }
                                        //判断评价信息
                                        var orderEvaluationInfo=commit_list[i].orderEvaluationInfo;
                                        if(orderEvaluationInfo==null||orderEvaluationInfo==""){
                                            comment_info="系统默认好评";
                                        }else {
                                            comment_info=orderEvaluationInfo;
                                        }
                                        // var first_comentpic=commit_list[i].orderEvaluationImagePath.split(";")[0];
                                        // console.log(first_comentpic)
                                        var commits_content='<div class="comment_item">'+'<div class="user_column">'+'<div class="user_info">'+'<img src='+head_pic+' alt="" class="img-circle user_img" style="width: 50px;height: 50px">'+
                                            commit_list[i].purchaseUser.username+'</div>'+'</div>'+'<div class="comment_column">'+'<div class="comment_info">'+'<div class="comment_stars">'+'<ul>'+stars+'</ul>'+'</div>'+'</div>'+
                                            '<p class="comment_content">'+comment_info+'</p>'+'<div class="pic_list">'+'<ul id="small_pic_list_box">'+'</ul>'+'</div>'+
                                            '<div class="big_pic_box">'+'</div>'+'</div>'+'</div>';
                                        $(".have_comments").prepend(commits_content);

                                        var orderEvaluationImagePath=commit_list[i].orderEvaluationImagePath;
                                        if(orderEvaluationImagePath!=null){
                                            var comment_pics=commit_list[i].orderEvaluationImagePath.split(";");
                                            for(var j=0;j<comment_pics.length;j++){
                                                // $(".big_pic_box").html('<img src='+comment_pics[0]+' alt="">');
                                                var commentpics='<li>'+'<img src='+comment_pics[j]+' alt="">'+'</li>';
                                                $("#small_pic_list_box").append(commentpics);
                                            }
                                        }
                                    }
                                    // 商品评价图片显示
                                    $("#small_pic_list_box li").on("click",function () {
                                        var big_pic_box=$(this).parent().parent().parent().find(".big_pic_box");
                                        big_pic_box.show();
                                        console.log(123)
                                        $(this).css("border", "2px solid #ee2222").siblings().css("border", "2px solid #ddd");
                                        var pic_url=$(this).find('img').attr('src');
                                        console.log(pic_url);
                                        big_pic_box.html('<img src='+pic_url+' alt="">');
                                        big_pic_box.click(function () {
                                            $(this).hide();
                                        })

                                    });

                                }else {
                                    // console.log(222)
                                    var no_data='<h1>'+'商品评价'+'</h1>'+'<p>'+'该商品暂无评价'+'</p>';
                                    $(".no_comment").append(no_data);

                                }
                            }
                        }

                    })
                    var specific=$(".specifics_info").children();
                    specific.each(function (index,el) {
                        $(el).on("click",function () {

                            if(id!=$(this).attr("commodity_id").split("_")[1]) {
                                window.sessionStorage.obj_good_id=$(this).attr("commodity_id").split("_")[1];
                                window.sessionStorage.good_commodityCode=$(this).attr("commodity_code");
                                var selfID=$(this).attr("commodity_id").split("_")[1];
                                var commodityCODE=$(this).attr("commodity_code");
                                window.open("skill_goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                            }

                        })
                    })

                    //选择查看轮播图
                    $("#pic_slide_img li").on("mouseover",function () {
                        $(this).css("border", "2px solid #ee2222").siblings().css("border", "2px solid #ddd");
                        $(".pic_box img").attr("src", $(this).find('img').attr('src'))
                    });
                }else {
                    window.close();
                }



            }

            // specific.eq(0).addClass("choose_border");
            //加入购物车
            $(".add_shopcar").on("click",function () {
                // console.log(5645)
                var add_good_num=$(".num").val();//获取添加至购物车的商品数量
                var commodity_id=$(".choose_border").attr("commodity_id").split("_")[1];
                $.ajax({
                    url: http+"cart?uid="+u_id+"&sid="+s_id,
                    data:JSON.stringify({"commodityId":commodity_id,"commodityNumber":add_good_num}),
                    type:"POST",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                    xhrFields:{withCredentials: true},
                    contentType:"application/json;charset=UTF-8",
                    success:function (data) {
                        if (data.msg=="SUCCESS"){
                            $("#successful_add_Modal").modal();
                            $.ajax({
                                type:"get",
                                xhrFields:{withCredentials: true},
                                url:http+"cart/count?uid="+u_id+"&sid="+s_id,
                                success:function (num) {
                                    // console.log(num)
                                    if(num.msg=="SUCCESS"){
                                        // console.log(num);
                                        var shopcar_num=num.data;
                                        console.log(shopcar_num)
                                        $(".shop_car_num").val(shopcar_num);
                                    }
                                }
                            })
                        }else if(data.msg=="FAIL"){
                            $("#fail_modal_content").text(data.error);
                            $("#fail_operation_Modal").modal();
                        } else {
                            // var data=JSON.parse(data);
                            // console.log(data)
                            if(data.msg=="NO_LOGIN"){
                                $("#fail_modal_content").text("请先登录！");
                                $("#fail_operation_Modal").modal();
                            }

                        }

                    }
                })

            })


            //直接购买商品 先将商品加入购物车获得购物车商品id
            $(".immediately_buy").click(function () {
                var stock_num=$("#stock_num").val();
                var add_good_num=$(".num").val();//获取添加至购物车的商品数量
                if(add_good_num==0){
                    $("#fail_modal_content").text("商品购买数量不能为0！");
                    $("#fail_operation_Modal").modal();
                }else if(add_good_num>stock_num){
                    $("#fail_modal_content").text("商品购买数量大于库存！不能购买");
                    $("#fail_operation_Modal").modal();
                }else {
                    var commodity_id=$(".choose_border").attr("commodity_id").split("_")[1];
                    window.sessionStorage.seckill_buy_price=$(".price_tag").text();
                    window.sessionStorage.seckill_buy_num=add_good_num;
                    window.sessionStorage.seckill_buy_good_id=commodity_id;
                    // console.log(add_good_num)
                    // console.log(commodity_id)
                    window.open("submit_order_seckill.html");
                }

            })

        }


    })

});
function change_page(current_page,commmodity_id) {
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var head_pic="";
    var comment_info="";
    $.ajax({
        url:http+"order/commodity/evaluate?uid="+u_id+"&sid="+s_id+"&commodityId="+commmodity_id+"&page="+current_page+"&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            console.log(data);
            if(data.msg=="SUCCESS"){
                $(".have_comments").empty();
                var commit_list=data.data.list;
                console.log(commit_list.length)
                if(commit_list.length>0){
                    for(var i=0;i<commit_list.length;i++){
                        var orderEvaluationLevel=commit_list[i].orderEvaluationLevel;
                        var stars=star(orderEvaluationLevel);
                        //判断用户是否有头像
                        // var headSculpture=commit_list[i].headSculpture;
                        var headSculpture=commit_list[i].purchaseUser.headSculpture;
                        if(headSculpture==""){
                            head_pic="../images/touxiang.png";
                        }else {
                            head_pic=headSculpture;
                        }
                        //判断评价信息
                        var orderEvaluationInfo=commit_list[i].orderEvaluationInfo;
                        if(orderEvaluationInfo==null||orderEvaluationInfo==""){
                            comment_info="系统默认好评";
                        }else {
                            comment_info=orderEvaluationInfo;
                        }
                        // var first_comentpic=commit_list[i].orderEvaluationImagePath.split(";")[0];
                        // console.log(first_comentpic)
                        var commits_content='<div class="comment_item">'+'<div class="user_column">'+'<div class="user_info">'+'<img src='+head_pic+' alt="" class="img-circle user_img" style="width: 50px;height: 50px">'+
                            commit_list[i].purchaseUser.username+'</div>'+'</div>'+'<div class="comment_column">'+'<div class="comment_info">'+'<div class="comment_stars">'+'<ul>'+stars+'</ul>'+'</div>'+'</div>'+
                            '<p class="comment_content">'+comment_info+'</p>'+'<div class="pic_list">'+'<ul id="small_pic_list_box">'+'</ul>'+'</div>'+
                            '<div class="big_pic_box">'+'</div>'+'</div>'+'</div>';
                        $(".have_comments").prepend(commits_content);


                        var orderEvaluationImagePath=commit_list[i].orderEvaluationImagePath;
                        if(orderEvaluationImagePath!=null){
                            var comment_pics=commit_list[i].orderEvaluationImagePath.split(";");
                            for(var j=0;j<comment_pics.length;j++){
                                var commentpics='<li>'+'<img src='+comment_pics[j]+' alt="">'+'</li>';
                                $("#small_pic_list_box").append(commentpics);
                            }
                        }
                        // 商品评价图片显示
                        $("#small_pic_list_box li").on("click",function () {
                            var big_pic_box=$(this).parent().parent().parent().find(".big_pic_box");
                            big_pic_box.show();
                            // console.log(123)
                            $(this).css("border", "2px solid #ee2222").siblings().css("border", "2px solid #ddd");
                            var pic_url=$(this).find('img').attr('src');
                            console.log(pic_url);
                            big_pic_box.html('<img src='+pic_url+' alt="">');
                            big_pic_box.click(function () {
                                $(this).hide();
                            })

                        });


                    }

                }else {
                    // console.log(222)
                    var no_data='<h1>'+'商品评价'+'</h1>'+'<p>'+'该商品暂无评价'+'</p>';
                    $(".no_comment").append(no_data);

                }
            }
        }

    })
}
// function tab_info(length,commodity_info) {
//     if(length%4==0){
//         // console.log(0)
//         for(var i=0;i<length;i++){
//             var tab_good_detail='<li>'+'<div class="item">'+'<span class="label_info">'+commodity_info[i]+'</span>'+'</div>'
//                 +'<div class="item">'+'<span class="label_info">'+commodity_info[i+1]+'</span>'+'</div>'
//                 +'<div class="item">'+'<span class="label_info">'+commodity_info[i+2]+'</span>'+'</div>'
//                 +'<div class="item">'+'<span class="label_info">'+commodity_info[i+3]+'</span>'+'</div>'
//             '</li>';
//             $(".tab_specific_info").append(tab_good_detail);
//             i+=3;
//         }
//     }else if(length%4==1){
//         // console.log(1)
//         for(var i=0;i<length;i++){
//             if(i==length-1){
//                 var new_tab_good_detail='<li>'+'<div class="item">'+'<span class="label_info">'+commodity_info[i]+'</span>'+'</div>'
//                 '</li>';
//                 $(".tab_specific_info").append(new_tab_good_detail);
//             }else {
//                 var tab_good_detail='<li>'+'<div class="item">'+'<span class="label_info">'+commodity_info[i]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+1]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+2]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+3]+'</span>'+'</div>'
//                 '</li>';
//                 $(".tab_specific_info").append(tab_good_detail);
//                 i+=3;
//             }
//         }
//     }else if(length%4==2){
//         // console.log(2)
//         for(var i=0;i<length;i++){
//
//             if(i==length-2){
//                 var new_tab_good_detail='<li>'+'<div class="item">'+'<span class="label_info">'+commodity_info[i]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+1]+'</span>'+'</div>'+
//                     '</li>';
//                 i++;
//                 $(".tab_specific_info").append(new_tab_good_detail);
//             }else {
//                 var tab_good_detail='<li>'+'<div class="item">'+'<span class="label_info">'+commodity_info[i]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+1]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+2]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+3]+'</span>'+'</div>'
//                 '</li>';
//                 $(".tab_specific_info").append(tab_good_detail);
//                 i+=3;
//             }
//         }
//     }else if(length%4==3){
//         // console.log(3)
//         for(var i=0;i<length;i++){
//
//             if(i==length-3){
//                 var new_tab_good_detail='<li class="nj">'+'<div class="item">'+'<span class="label_info">'+commodity_info[i]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+1]+'</span>'+'</div>'+
//                     '<div class="item">'+'<span class="label_info">'+commodity_info[i+2]+'</span>'+'</div>'+
//                     '</li>';
//                 i+=2;
//                 $(".tab_specific_info").append(new_tab_good_detail);
//             }else {
//                 var tab_good_detail='<li>'+'<div class="item">'+'<span class="label_info">'+commodity_info[i]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+1]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+2]+'</span>'+'</div>'
//                     +'<div class="item">'+'<span class="label_info">'+commodity_info[i+3]+'</span>'+'</div>'
//                 '</li>';
//                 $(".tab_specific_info").append(tab_good_detail);
//                 i+=3;
//             }
//         }
//     }
// }
function star(orderlevel) {
    switch (orderlevel){
        case 5:
            var stars='<li></li><li></li><li></li><li></li><li></li>';
            break;
        case 4:
            var stars='<li></li><li></li><li></li><li></li>';
            break;
        case 3:
            var stars='<li></li><li></li><li></li>';
            break;
        case 2:
            var stars='<li></li><li></li>';
            break;
        case 1:
            var stars='<li></li>';
            break;

    }
    return stars;
}
