/**
 * Created by MY on 2019/6/17.
 */
$(function () {
    $(".num").each(function (i,ele) {
        $(ele).blur(function() {
            // console.log(222)
            var that=$(this);
            var shopcar_id=that.parent().parent().parent().parent().attr("shopcar_id").split("_")[1];
            var commodity_id=that.parent().parent().parent().parent().attr("self_id").split("_")[1];

            var index=that.parent().parent().attr("index_num").split("_")[1];
            // console.log(typeof (num.val()));
            console.log(that.val());
            if(that.val()==""||that.val=="0"){
                $("#fail_modal_content").text("商品数量必须大于0！") ;
                $("#fail_operation_Modal").modal();
                $("#fail_operation_Modal").on('hide.bs.modal', function () {
                    window.location.reload();
                })

            }else if(isNaN(that.val()){
                $("#fail_modal_content").text("非法输入！") ;
                $("#fail_operation_Modal").modal();
                $("#fail_operation_Modal").on('hide.bs.modal', function () {
                    window.location.reload();
                })
            } else {
                var b=parseInt(that.val())

                // //修改数量
                $.ajax({
                    url: http+"cart",
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

})