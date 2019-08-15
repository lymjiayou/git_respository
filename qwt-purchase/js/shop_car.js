/**
 * Created by lysp on 2018/7/26.
 */
$(function(){
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    // var lis_1=$(".shop_1").children("ul").children();
    // var del=$(".delete");
    // del.click(function () {
    //     $(this).parent().parent().parent().remove();
    // })
//            $(".delete_all").click(function () {
//                if()
//            })

//获得购物车商品
    $.ajax({
        type:"get",
        url:http+"cart?uid="+u_id+"&sid="+s_id,
        xhrFields:{withCredentials: true},
        success:function (data){
            console.log(data)

            if(data.msg=="SUCCESS"){

                var shopcar_list=data.data.commodities;
                // shopcar_list.length=0
                if(shopcar_list.length>0){
                    // var totalPage = data.data.commodities.totalPage;
                    // $('.pageTest').page({
                    //     leng:totalPage,//分页总数
                    //     activeClass: 'activP' , //active 类样式定义
                    //     clickBack:function(page){
                    //         console.log(page-1)
                    //         var current=page-1;
                    //         change_page(current);
                    //     }
                    // })
                    $("#goods_sum").html(shopcar_list.length);
                    for(var i=0;i<shopcar_list.length;i++){
                        var shopcar_good='<li shopcar_id="i_'+shopcar_list[i].id+'" self_id=i_'+shopcar_list[i].commodityId+'>'+'<ul class="goods_msg clearfloat">'+'<li class="choose_check">'+'<label>'+
                            '<input type="checkbox" class="cc good_checkbox" canbuy="i_'+shopcar_list[i].commodity.certified+'">'+'</label>'+
                            '<a class="goods_img" href="#">'+"<img src="+shopcar_list[i].commodity.logoPath+" alt=''>"+'</a>'+'</li>'+
                            '<li class="goods" commodity_code=i_'+shopcar_list[i].commodity.commodityCode+' self_id=i_'+shopcar_list[i].commodityId+'>'+'<div class="goods_name">'+'<span>'+shopcar_list[i].commodity.commodityName+shopcar_list[i].commodity.standardName+'</span>'+
                            '<span class="no_good no_'+i+'">'+'</span>'+'</div>'+'</li>'+
                            '<li class="price" unit_Price="i_'+shopcar_list[i].commodity.unitPrice+'">'+'<b class="unit_price">'+'<i>'+'￥'+'</i>'+shopcar_list[i].commodity.unitPrice+'</b>'+'</li>'+
                            '<li class="quantity" index_num="i_'+i+'">'+'<div class="quantity_form clearfloat">'+'<span class="sub">'+'-'+'</span>'+"<input type='text' class='num' value="+shopcar_list[i].commodityNumber+">"+
                            '<span class="add">'+'+'+'</span>'+'</div>'+'</li>'+'<li class="sum">'+'<b class="total_price">'+'<i>'+'￥'+'</i>'+shopcar_list[i].totalAmount +'</b>'+
                            '</li>'+'<li class="action">'+'<a href="#" class="delete">'+'删除'+'</a>'+'</li>'+'</ul>'+' </li>'
                        $(".shop_list").append(shopcar_good);
                        // shopcar_list[1].commodity.certified=2;
                        if(shopcar_list[i].commodity.certified!=1){
                            $(".no_"+i).html("商品已下架");
                        }else {
                            $(".no_"+i).html();
                        }
                    }
                    $(".goods").click(function () {
                        window.sessionStorage.good_commodityCode=$(this).attr("commodity_code").split("_")[1];
                        window.sessionStorage.obj_good_id=$(this).attr("self_id").split('_')[1];
                        var selfID=window.sessionStorage.obj_good_id;
                        var commodityCODE=window.sessionStorage.good_commodityCode;
                        window.open("goods_detail.html?selfID="+selfID+"&commodityCode="+commodityCODE);
                    })
                    //删除购物车的商品
                    $(".delete").each(function (index,ele) {
                        $(ele).click(function () {
                            $("#tip_delete_Modal").modal();
                            var that=$(this)
                            console.log($(this));
                            var shopcar_id=$(this).parent().parent().parent().attr("shopcar_id").split("_")[1];
                            // console.log(shopcar_id);
                            var lengh=shopcar_list.length-1;//删除商品后的总数
                            $(".delete_del").click(function () {
                                $.ajax({
                                    type:"delete",
                                    beforeSend: function(request) {
                                        var cooinfo=getCookie("XSRF-TOKEN");
                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                    xhrFields:{withCredentials: true},
                                    url:http+"cart?uid="+u_id+"&sid="+s_id,
                                    data:JSON.stringify([shopcar_id]),
                                    contentType:"application/json;charset=UTF-8",
                                    success:function (data) {
                                        if(data.msg=="SUCCESS"){
                                            that.parent().parent().parent().remove();
                                            $("#goods_sum").text(lengh);

                                            window.location.reload();
                                        }else {
                                            if(data.msg=="NO_LOGIN"){
                                                window.location.href="login.html";
                                            }else {
                                                $("#fail_modal_content").text(data.error);
                                                $("#fail_operation_Modal").modal();
                                            }
                                        }
                                    }
                                })
                            })

                        })
                    })
                    //未选择商品点击支付
                    $(".btn_big").click(function () {
                        console.log(document.getElementById("choose_sum").innerHTML);
                        if(document.getElementById("choose_sum").innerHTML==0){

                            $("#fail_modal_content").text("您未选择商品") ;
                            $("#fail_operation_Modal").modal();

                        }

                    })

                    var checkbox=$(".good_checkbox");
                    var shopcar_buy_good_id=new Array();
                    var canbuyCertified=new Array();
                    // console.log(checkbox.length);
                    // 全选
                    //若点击全选则将所有的购物车商品id加入数组
                    var ck_all_i=0;
                    $(".ck_all").on("click",function () {
                        ck_all_i++
                        if($(this).is(':checked')) {
                            for (var n = 0; n < cc.length; n++) {
                                cc[n].checked = this.checked;
                                // console.log($(this).is(':checked'))
                            }
                            //重新插入全部商品id
                            shopcar_buy_good_id.length = 0;
                            canbuyCertified.length=0;
                            checkbox.each(function (index, ele) {
                                shopcar_buy_good_id.push($(ele).parent().parent().parent().parent().attr("shopcar_id").split("_")[1]);
                                canbuyCertified.push($(ele).attr("canbuy").split("_")[1]);

                            })
                            console.log(JSON.stringify(shopcar_buy_good_id));
                            console.log(JSON.stringify(canbuyCertified));
                            //计算价格
                            $.ajax({
                                url: http+"cart/countMoney?uid="+u_id+"&sid="+s_id,
                                data:JSON.stringify(shopcar_buy_good_id),
                                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                xhrFields:{withCredentials: true},
                                contentType:"application/json;charset=UTF-8",
                                success:function (data) {
                                    if(data.msg=="SUCCESS"){
                                        var totalprice=data.data;
                                        $("#price_sum").html("￥"+totalprice);
                                        window.sessionStorage.obj_totalprice=totalprice;
                                    }else {
                                        if(data.msg=="NO_LOGIN"){
                                            window.location.href="login.html";
                                        }else {
                                            $("#fail_modal_content").text(data.error);
                                            $("#fail_operation_Modal").modal();
                                        }
                                    }
                                }

                            })
                            // 全选是选中状态表示全中所有商品  一旦不选中某一产品，就是选择单个商品的情况后

                            $(".btn_big").click(function () {
                                console.log("点一下");
                                //提交订单前判断有没有选中已下架的商品
                                console.log(document.getElementById("choose_sum").innerHTML);
                                if(document.getElementById("choose_sum").innerHTML!=0){
                                    var xiajia=false;
                                    for(var i=0;i<canbuyCertified.length;i++){
                                        // console.log(canbuyCertified[i])
                                        if(canbuyCertified[i]!="1"){
                                            xiajia=true;
                                        }
                                    }
                                    if(xiajia){
                                        $("#fail_modal_content").text("已下架的商品不能购买！");
                                        $("#fail_operation_Modal").modal();
                                    }else {
                                        window.sessionStorage.shop_car_buy_good_id=shopcar_buy_good_id;
                                        window.location.href = "submit_order.html";
                                    }

                                }
                                else{
                                    $("#fail_modal_content").text("您未选择商品") ;
                                    $("#fail_operation_Modal").modal();
                                    $("#fail_operation_Modal").on('hide.bs.modal', function () {
                                        window.location.reload();
                                    })
                                }

                            })
                            funSum();
                        }else {
                            // selectGoods();
                            $("#price_sum").html("￥0");
                            shopcar_buy_good_id.length=0;
                            for (var n = 0; n < cc.length; n++) {
                                cc[n].checked = this.checked;
                                // console.log($(this).is(':checked'))
                            }
                            $("#choose_sum").text(0);
                            // console.log(JSON.stringify(shopcar_buy_good_id));
                        }

                        // console.log(JSON.stringify(shopcar_buy_good_id));

                    })
//对每个商品进行操作的购买
                    checkbox.each(function (index,ele) {
                        $(ele).on("click",function () {

                            var that=$(this)
                            //如果没有被选中
                            if(!that.is(':checked')){
                                var no_choose=that.parent().parent().parent().parent().attr("shopcar_id").split("_")[1];
                                var no_choose2=that.attr("canbuy").split("_")[1];//没有选中的商品的是否下架标识
                                // console.log(no_choose);
                                shopcar_buy_good_id.splice($.inArray(no_choose,shopcar_buy_good_id),1);
                                canbuyCertified.splice($.inArray(no_choose2,canbuyCertified),1);
                                //   不知道元素下标时，通过值来删除用splice() 其中$.inArray('b',arrList)是b这个元素在数组arrList 中的位置
                                // splice(index,1)函数中第一个参数index是要删除元素在数组中的位置，第二个参数是要删除的数量。
                                console.log(shopcar_buy_good_id)
                                console.log(canbuyCertified);
                            }else {
                                shopcar_buy_good_id.push(that.parent().parent().parent().parent().attr("shopcar_id").split("_")[1]);
                                canbuyCertified.push(that.attr("canbuy").split("_")[1]);
                            }


                            //计算价格
                            $.ajax({
                                url: http+"cart/countMoney?uid="+u_id+"&sid="+s_id,
                                data:JSON.stringify(shopcar_buy_good_id),
                                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                xhrFields:{withCredentials: true},
                                contentType:"application/json;charset=UTF-8",
                                success:function (data) {
                                    if(data.msg=="SUCCESS"){
                                        var totalprice=data.data;
                                        $("#price_sum").html("￥"+totalprice);
                                        window.sessionStorage.obj_totalprice=totalprice;
                                    }else {
                                        if(data.msg=="NO_LOGIN"){
                                            window.location.href="login.html";
                                        }else {
                                            $("#fail_modal_content").text(data.error);
                                            $("#fail_operation_Modal").modal();
                                        }
                                    }
                                }

                            })
                            //在单独勾选时，判断有没有下架商品

                            //选择了商品后才能去支付
                            $(".btn_big").click(function () {
                                console.log(document.getElementById("choose_sum").innerHTML);
                                if(document.getElementById("choose_sum").innerHTML!=0){
                                    var xiajia2=false;
                                    for(var i=0;i<canbuyCertified.length;i++){
                                        // console.log(canbuyCertified[i])
                                        if(canbuyCertified[i]!="1"){
                                            xiajia2=true;
                                        }
                                    }
                                    if(xiajia2){
                                        $("#fail_modal_content").text("已下架的商品不能购买！");
                                        $("#fail_operation_Modal").modal();
                                    }else {
                                        window.sessionStorage.shop_car_buy_good_id=shopcar_buy_good_id;
                                        window.location.href = "submit_order.html";
                                    }
                                }
                                else{
                                    $("#fail_modal_content").text("您未选择商品") ;
                                    $("#fail_operation_Modal").modal();
                                    $("#fail_operation_Modal").on('hide.bs.modal', function () {
                                        window.location.reload();
                                    })
                                }

                            })

                        })
                        // console.log($(this).is(':checked'))

                    })

                    function I(x) {
                        return id = document.getElementById(x);
                    }

                    function C(x) {
                        return clas = document.getElementsByClassName(x);
                    }


                    var ck_all = C("ck_all");
                    var shop_ck = C("shop_ck");
                    var cc = C("cc");
                    var store_qwt = I("store_qwt");
                    var store_my = I("store_my");
                    var shop_qwt = C("shop_qwt")[0];
                    var shop_my = C("shop_my")[0];
                    var goods_sum = I("goods_sum");

                    // // 商品总数
                    // goods_sum.innerHTML = cc.length;

                    // 取消总体全选
                    function nAllck(x) {
                        var n = 0;
                        // console.log(34)
                        for (var i = 0; i < x.length; i++) {
                            if (x[i].checked) {
                                n++
                            }
                        }
                        // console.log(n);
                        for (var i = 0; i < ck_all.length; i++) {
                            ck_all[i].checked = (n == x.length) ? true : false;
                        }


                    }

                    // 取消任意商品，取消总体全选，总数量价格改变
                    for (var i = 0; i < cc.length; i++) {
                        cc[i].onchange = function () {
                            nAllck(cc);
                            funSum();
                        }
                    }

                    //手动修改数量变化
                    var re=/^[0-9]*[1-9][0-9]*$/;
                    $(".num").each(function (i,ele) {
                        $(ele).blur(function() {
                            // console.log(222)
                            var that=$(this);
                            var shopcar_id=that.parent().parent().parent().parent().attr("shopcar_id").split("_")[1];
                            var commodity_id=that.parent().parent().parent().parent().attr("self_id").split("_")[1];

                            var index=that.parent().parent().attr("index_num").split("_")[1];
                            console.log(typeof (that.val()));
                            console.log(isNaN(that.val()));
                            console.log(re.test(that.val()));

                            if(that.val()==""||that.val()=="0"){
                                $("#fail_modal_content").text("商品数量必须大于0！") ;
                                $("#fail_operation_Modal").modal();
                                $("#fail_operation_Modal").on('hide.bs.modal', function () {
                                    window.location.reload();
                                })

                            }
                             if(!re.test(that.val())){
                                $("#fail_modal_content").text("非法输入！商品数量必须为正整数！") ;
                                $("#fail_operation_Modal").modal();
                                $("#fail_operation_Modal").on('hide.bs.modal', function () {
                                    window.location.reload();
                                })
                            } else {
                                var b=parseInt(that.val())

                                // //修改数量
                                $.ajax({
                                    url: http+"cart",
                                    data:JSON.stringify({id:shopcar_id,commodityNumber:b}),
                                    type:"patch",
                                    beforeSend: function(request) {
                                        var cooinfo=getCookie("XSRF-TOKEN");
                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                    xhrFields:{withCredentials: true},
                                    contentType:"application/json;charset=UTF-8",
                                    success:function (data) {
                                        if(data.msg=="SUCCESS"){
                                            console.log("修改数量成功！");
                                            //再次调用列出购物车列表的ajax
                                            $.ajax({
                                                type:"get",
                                                url:http+"cart",
                                                xhrFields:{withCredentials: true},
                                                success:function (shopcar_list) {
                                                    if(shopcar_list.msg=="SUCCESS"){
                                                        var choose_shopcar=shopcar_list.data.commodities;
                                                        // console.log(choose_shopcar[index].totalAmount)
                                                        that.parent().parent().parent().find(".sum").children("b").html('<i>￥</i>'+choose_shopcar[index].totalAmount)
                                                    }else {
                                                        if(shopcar_list.msg=="NO_LOGIN"){
                                                            window.location.href="login.html";
                                                        }else {
                                                            $("#fail_modal_content").text(shopcar_list.error);
                                                            $("#fail_operation_Modal").modal();
                                                        }
                                                    }
                                                }
                                            })
                                            //计算价格
                                            $.ajax({
                                                url: http+"cart/countMoney",
                                                data:JSON.stringify(shopcar_buy_good_id),
                                                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                                xhrFields:{withCredentials: true},
                                                contentType:"application/json;charset=UTF-8",
                                                success:function (data) {
                                                    if(data.msg=="SUCCESS"){
                                                        var totalprice=data.data;
                                                        $("#price_sum").html("￥"+totalprice);
                                                        window.sessionStorage.obj_totalprice=totalprice;
                                                    }else {
                                                        if(data.msg=="NO_LOGIN"){
                                                            window.location.href="login.html";
                                                        }else {
                                                            $("#fail_modal_content").text(data.error);
                                                            $("#fail_operation_Modal").modal();
                                                        }
                                                    }
                                                }

                                            })
                                        }
                                    }
                                })

                            }

                        });
                    });

                    // 商品数量加减,价格变化
                    var sub = C("sub");
                    var add = C("add");
                    var num = C("num");
                    var unit_price = C("unit_price");
                    var total_price = C("total_price");




                    changeNum(add);
                    changeNum(sub);

                    function changeNum(x) {

                        for (var i = 0; i < x.length; i++) {
                            x[i].n = i;

                            x[i].onclick = function () {
                                // console.log(7777);
                                var that=$(num[this.n]);
                                var shopcar_id=that.parent().parent().parent().parent().attr("shopcar_id").split("_")[1];
                                var commodity_id=that.parent().parent().parent().parent().attr("self_id").split("_")[1];
                                var b=0;
                                x == add ? (num[this.n].value++) : (num[this.n].value--);
                                x == add ? (b=1) : (b=-1);

                                // var a = (unit_price[this.n].innerHTML).substr(1);
                                var c = num[this.n].value;
                                that.attr("value",c);
                                if (c <= 1) {
                                    num[this.n].value = 1;
                                    c = 1;
                                }
                                var index=that.parent().parent().attr("index_num").split("_")[1];
                                //修改数量
                                $.ajax({
                                    url: http+"cart?uid="+u_id+"&sid="+s_id,
                                    data:JSON.stringify({commodityId:commodity_id,commodityNumber:parseInt(b)}),
                                    type:"POST",
                                    beforeSend: function(request) {
                                        var cooinfo=getCookie("XSRF-TOKEN");
                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                    xhrFields:{withCredentials: true},
                                    contentType:"application/json;charset=UTF-8",
                                    success:function (data) {
                                        if(data.msg=="SUCCESS"){
                                            console.log("修改数量成功！");
                                            //再次调用列出购物车列表的ajax
                                            $.ajax({
                                                type:"get",
                                                url:http+"cart?uid="+u_id+"&sid="+s_id,
                                                xhrFields:{withCredentials: true},
                                                success:function (shopcar_list) {
                                                    if(shopcar_list.msg=="SUCCESS"){
                                                        var choose_shopcar=shopcar_list.data.commodities;
                                                        // console.log(choose_shopcar[index].totalAmount)
                                                        that.parent().parent().parent().find(".sum").children("b").html('<i>￥</i>'+choose_shopcar[index].totalAmount)
                                                    }else {
                                                        if(shopcar_list.msg=="NO_LOGIN"){
                                                            window.location.href="login.html";
                                                        }else {
                                                            $("#fail_modal_content").text(shopcar_list.error);
                                                            $("#fail_operation_Modal").modal();
                                                        }
                                                    }
                                                }
                                            })
                                            //计算价格
                                            $.ajax({
                                                url: http+"cart/countMoney?uid="+u_id+"&sid="+s_id,
                                                data:JSON.stringify(shopcar_buy_good_id),
                                                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                                xhrFields:{withCredentials: true},
                                                contentType:"application/json;charset=UTF-8",
                                                success:function (data) {
                                                    if(data.msg=="SUCCESS"){
                                                        var totalprice=data.data;
                                                        $("#price_sum").html("￥"+totalprice);
                                                        window.sessionStorage.obj_totalprice=totalprice;
                                                    }else {
                                                        if(data.msg=="NO_LOGIN"){
                                                            window.location.href="login.html";
                                                        }else {
                                                            $("#fail_modal_content").text(data.error);
                                                            $("#fail_operation_Modal").modal();
                                                        }
                                                    }
                                                }

                                            })
                                        }
                                    }
                                })
                                // cc[this.n].checked = true;
                            }
                        }
                    }



                    // 选择的商品总数，总金额,背景
                    // var choose_sum = I("choose_sum");
                    var price_sum = I("price_sum");
                    var goods_bg = C("goods_bg");

                    function funSum() {
                        var addSum = 0;
                        var priceSum = 0;
                        for (var i = 0; i < cc.length; i++) {
                            // // 背景改变
                            // var bgc = cc[i].checked ? "#fff4e8" : "#fff";
                            // goods_bg[i].css("background-color",bgc);
                            // 总数，金额
                            if (cc[i].checked) {
                                addSum=shopcar_buy_good_id.length;
                                priceSum += Number((total_price[i].innerHTML).substr(1));
                            }
                            $("#choose_sum").html(addSum);

                        }
                    }

                }else {
                    var no_data='<div class="no_data" style="margin-top: 20px">'+'<img src="../images/nodata.png">'+ '<h1>'+'购物车是空的'+'<h1>'+'</div>';
                    $("#store_qwt").append(no_data);
                }

            }else {
                // var obj_data=JSON.parse(data);
                if(data.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else {
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }
    });

})



