/**
 * Created by lysp on 2018/8/7.
 */

$(function () {
    var http=Http;
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var shop_car_buy_good_id=window.sessionStorage.shop_car_buy_good_id;
    console.log(shop_car_buy_good_id);
    // var order_id=window.sessionStorage.submit_order_id;
    // console.log(order_id)
    //获得收货人信息
    //列出收货地址列表
    var receiver_name="";
    var detail_address="";
    var address="";
    var phone="";
    var companyName="";
    var taxpayer="";
    var companyAdress="";
    var companyTel="";
    var bankAccount="";
    var bankName="";
    var invoiceState="";
    var invoiceType="";
    var billingType="";
    var receipt_errors="";
    var payremark="";
    var payWay="";
    var payWay_num="";
    var receiver_flag="";
    var default_sign="";
//查看用户身份
    $.ajax({
        url:http+"info?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if (data.msg == "SUCCESS") {
                var type = data.data.type;
                console.log(type)
                if (type == 1) {
                    $(".company_pay_way").hide();
                } else {
                    $(".company_pay_way").show();
                }
                //获取收货人列表
                $.ajax({
                    url: http + "receiver?uid=" + u_id + "&sid=" + s_id ,
                    type: "get",
                    xhrFields:{withCredentials: true},
                    success: function (address_list) {
                        console.log(address_list);
                        if (address_list.msg == "SUCCESS") {
                            var addr_data = address_list.data;
                            if(addr_data.length>0){
                                receiver_flag=true;
                                for (var i = 0; i < addr_data.length; i++) {
                                    //首先显示默认收货人
                                    var receiver = '<div class="radio">' + '<label>' + '<input type="radio" name="address" class="i_' + addr_data[i].defaultReceiver + ' radio_click" value="i_' + i + '">' +
                                        addr_data[i].receiver + '&nbsp&nbsp&nbsp&nbsp' + addr_data[i].address + '&nbsp&nbsp' + addr_data[i].detailAddress + '&nbsp&nbsp&nbsp&nbsp' + addr_data[i].phone + '</label>' + '</div>';

                                    $(".edit_receiver_info").prepend(receiver);
                                }
                            }else {
                                receiver_flag=false;
                            }

                            if($(".i_true").length==0){
                                $(".i_false").eq(0).attr("checked","true");
                            }else {
                                $(".i_true").attr("checked", "true");
                            }
                            var ways = $(".pay_way").children();
                            ways.each(function (index, e) {
                                $(e).click(function () {
                                    var val = $('input:radio[name="pay"]:checked').val();
                                    if (val == null) {
                                        $(".account_time_info").hide();
                                    } else if (val == "记账") {    //更改记账信息
                                        $(".account_time_info").show();
                                        //获得记账时间
                                        // $(".choose_account_time").change(function () {
                                        //     payWay= $(this).children("option:selected").text();
                                        // })
                                    } else {
                                        payWay = $('input:radio[name="pay"]:checked').val();
                                        //每次显示下拉菜单都重置到默认值
                                        $(".choose_account_time option:first").attr("selected", true).siblings("option").attr("selected", false);
                                        $(".account_time_info").hide();
                                        // $(".total_price_num").html(buy_list.data.realPrice/100);
                                    }
                                })

                            })

                            //录入订单信息
                            $("#submit_order").click(function () {
                                if(receiver_flag){
                                    payWay = $('input:radio[name="pay"]:checked').val();
                                    console.log(payWay)
                                    receipt_errors = $(".re_warn").length;
                                    var i = $("input:radio[name='address']:checked").val().split("_")[1];
                                    receiver_name = addr_data[i].receiver;
                                    detail_address = addr_data[i].detailAddress;
                                    address = addr_data[i].address
                                    phone = addr_data[i].phone;
                                    companyName = $(".company_name").val();
                                    taxpayer = $(".tax_num").val();
                                    companyAdress = $(".company_address").val();
                                    companyTel = $(".company_tel").val();
                                    bankAccount = $(".bank_account").val();
                                    payremark = $(".buyer_message").val();
                                    console.log(payremark);
                                    switch (payWay) {
                                        case "在线支付":
                                            payWay_num = 4;
                                            break;
                                        case "平台预充值支付":
                                            payWay_num = 5;
                                            break;
                                        case "货到付款":
                                            payWay_num = 6;
                                            break;
                                        case "记账":
                                            payWay = $(".choose_account_time").children("option:selected").text();
                                            // console.log(payWay);
                                            switch (payWay){
                                                case "一个月以内":
                                                    payWay_num = 1;
                                                    break;
                                                case "两个月以内":
                                                    payWay_num=2;
                                                    break;
                                                case "三个月以内":
                                                    payWay_num=3;
                                                    break;
                                                case "":
                                                    payWay_num="";
                                                    break;
                                            }
                                            // if (payWay == "一个月以内") {
                                            //     payWay_num = 1;
                                            // } else if (payWay == "两个月以内") {
                                            //     payWay_num = 2;
                                            // } else if (payWay_num == "三个月以内") {
                                            //     payWay_num = 3;
                                            // }
                                            // } else {
                                            //     payWay_num = "";
                                            // }
                                            break;
                                    }
                                    console.log(payWay_num);

                                    //如果选择不需要发票
                                    if ($("#no_receipt").is(":checked")) {
                                        invoiceState = false;
                                        receipt_errors = 0;
                                    } else {
                                        invoiceState = true;
                                        var re_type = $("input:radio[name='re_type']:checked").val();
                                        var kai_type = $("input:radio[name='kai_type']:checked").val();
                                        if (re_type == "电子发票") {
                                            invoiceType = 0;
                                        } else {
                                            invoiceType = 1;
                                        }
                                        if (kai_type == "普通发票") {
                                            billingType = 10;
                                        } else {
                                            billingType = 11;
                                        }
                                        bankName = $(".choose_bank option:selected").val();
                                    }
                                    // console.log(bankName);
                                    // console.log(companyName);
                                    console.log(receipt_errors)
                                    if (receipt_errors == 0) {
                                        $.ajax({
                                            url: http + "order?uid=" + u_id + "&sid=" + s_id+"&cars="+shop_car_buy_good_id,
                                            xhrFields:{withCredentials: true},
                                            data: JSON.stringify({
                                                "invoice": {
                                                    "companyName": companyName,
                                                    "taxpayer": taxpayer,
                                                    "companyAddress": companyAdress + companyTel,
                                                    "bankAccount": bankAccount,
                                                    "bankName": bankName,
                                                    "invoiceType": invoiceType,
                                                    "billingType": billingType
                                                },
                                                "receiver": receiver_name,
                                                "detailAddress": detail_address,
                                                "phone": phone,
                                                "address": address,
                                                "invoiceState": invoiceState,
                                                "payWay": payWay_num,
                                                "customInformation": payremark
                                            }),
                                            type: "POST",
                                            beforeSend: function(request) {
                                                var cooinfo=getCookie("XSRF-TOKEN");
                                                request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                            },
                                            contentType: "application/json;charset=UTF-8",
                                            success: function (data) {
                                                console.log(data)
                                                if (data.msg == "SUCCESS") {

                                                    if (payWay_num == 1 || payWay_num == 2 || payWay_num == 3) {
                                                        $(".update_text").text("已成功提交记账订单!")
                                                        $("#success_update_Modal").modal();
                                                        $("#success_update_Modal").on('hide.bs.modal', function () {
                                                            window.close();
                                                            // window.location.href = document.referrer;//返回前一页并刷新
                                                        })
                                                    } else if(payWay_num==6){
                                                        $(".update_text").text("已成功提交货到付款订单!")
                                                        $("#success_update_Modal").modal();
                                                        $("#success_update_Modal").on('hide.bs.modal', function () {
                                                            window.close();
                                                            // window.location.href = document.referrer;//返回前一页并刷新
                                                        })
                                                    }
                                                    else {
                                                        window.sessionStorage.pay_order_id =data.data;
                                                        window.sessionStorage.pay_way = payWay_num;
                                                        window.open("submit_pay.html");
                                                        window.close();
                                                    }


                                                } else {
                                                    if (payWay == "请选择时间") {
                                                        $("#fail_modal_content").text("请选择记账时间!");
                                                        $("#fail_operation_Modal").modal();
                                                    }else {
                                                        $("#fail_modal_content").text(data.error);
                                                        $("#fail_operation_Modal").modal();
                                                        $("#fail_operation_Modal").on('hide.bs.modal', function () {
                                                            window.close();
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    }else {
                                        $("#fail_modal_content").text("发票内容请填写正确并且所填项不能为空！");
                                        $("#fail_operation_Modal").modal();
                                    }
                                }else {
                                    //收货人为空
                                    $("#fail_modal_content").text("收货人信息不能为空!");
                                    $("#fail_operation_Modal").modal();
                                }


                            })
                        } else {
                            // var data = JSON.parse(address_list);
                            // console.log(data);
                            if (address_list.msg == "NO_LOGIN") {
                                // console.log(222222)
                                window.location.href = "login.html";
                            } else if (address_list.msg == "FAIL") {
                                $("#fail_modal_content").text(address_list.error);
                                $("#fail_operation_Modal").modal();
                            }
                        }


                    }
                })
            } else {
                // var data = JSON.parse(data);
                // console.log(data);
                if (data.msg == "NO_LOGIN") {
                    window.location.href = "login.html";
                } else if (data.msg == "FAIL") {
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }


    })



    //新建收货地址
    $(".save_address").click(function () {
        $(".select_item").find(".warn").remove();
        var provice=$('.province option:selected').val();
        var city=$('.city option:selected').val();
        var area=$('.area option:selected').val();
        console.log(provice)
        if(provice==0||city==0||area==0){
            // $(".select_item").children($(".warn")).remove();
            $(".select_item").append('<span class="warn">所在地区不能为空</span>')
        }
//当点击按钮时，要通过最后一次验证表单内容是否符合规则，可通过。warn标签的长度来判断
        $(this).removeAttr("data-dismiss");
        $(".info input").trigger("blur");
        var error=$(".warn").length;
        //只有没有错误提示时再提交
        if(error==0){
            $(this).attr("data-dismiss","modal");

            var receiver_name=$(".name_detail").val();
            console.log(receiver_name)
            var re_province=$(".province option:selected").val();
            var re_city=$(".city option:selected").val();
            var re_area=$(".area option:selected").val();
            var address=re_province+" "+re_city+" "+re_area;
            var re_street_detail=$(".street_detail").val();
            var re_tel=$(".tel_detail").val();
            if ($(".default_addr").get(0).checked) {
                default_sign=true;

            }else {
                default_sign=false;
            }
            $.ajax({
                url:http+"receiver?uid="+u_id+"&sid="+s_id,
                data:JSON.stringify({"address":address,"phone":re_tel,"receiver":receiver_name,"detailAddress":re_street_detail,"defaultReceiver":default_sign}),   //提交数据
                type:"POST",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },//提交方式
//                    dataType:"jsonp", //返回类型设置为jsonp 为了解决跨域问题
                contentType:"application/json;charset=UTF-8",
                async:false,
                xhrFields:{withCredentials: true},
                success:function (data) {
                    console.log(data);
                    if(data.msg=="SUCCESS") {
                        // window.location.reload();
                    }
                    else {
                        if(data.msg=="NO_LOGIN"){
                            window.location.href="login.html";
                        }else if(data.msg=="FAIL"){
                            $("#fail_modal_content").text(data.error);
                            $("#fail_operation_Modal").modal();
                        }
                        // $("#fail_modal_content").text(data.error);
                        // $("#fail_operation_Modal").modal();
                    }

                }
            })


        }
    })


    //使用新地址
    $("#new_ad").click(function () {
        $("#new_address_Modal").modal();
        $("#new_address_Modal").on('hide.bs.modal', function () {
            window.location.reload();
            // $(".edit_receiver_info").empty();
            // addr_fresh()
        })
        $('input:radio[name="address"]').attr("checked", false);
    });
    //    收货地址的表单验证
    //姓名判断
    $(".name_detail").focus(function () {
        $(this).siblings("span").remove();
        $(this).parent().append('<span class="tips">请填写您的真实姓名，长度不超过20                                                        window.close();                                                        })</span>');
    });
    $(".name_detail").blur(function () {
        if($(this).val()==""){
            $(this).parent().parent().find($(".warn")).remove();
            $(this).parent().parent().append(' <span class="warn">收货人姓名不能为空</span>')

        }else {
            $(this).parent().parent().find($(".warn")).remove();

        }
    })

//    省市区三级联动判断
    $(".province").change(function () {
        if($(this).val()){//如果选中了
            $(".city").change(function () {
                if($(this).val()){
                    $(".area").change(function () {
                        if($(this).val()){
                            //如果三级都不为空
                            $(this).parent().parent().find($(".warn")).remove();

                        }else {
                            $(this).parent().parent().find($(".warn")).remove();
                            $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')

                        }
                    })
                }else {
                    $(this).parent().parent().find($(".warn")).remove();
                    $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')

                }
            })

        }else {
            $(this).parent().parent().find($(".warn")).remove();
            $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')

        }
    })
    var provice=$('.province option:selected').val();
    var city=$('.city option:selected').val();
    var area=$('.area option:selected').val();
    // console.log(city);
    if((provice=="")||(city=="")||(area=="")){
        // $(".select_item").children($(".warn")).remove();
        $(".select_item").append('<span class="warn">所在地区不能为空</span>')
    }
//    街道信息判断
    $(".street_detail").focus(function () {
        $(this).siblings("span").remove();
        $(this).parent().append('<span class="tips">不必重复填写地区</span>');
    });
    $(".street_detail").blur(function () {
        if($(this).val()==""){
            $(this).parent().parent().find($(".warn")).remove();
            $(this).parent().parent().append(' <span class="warn">街道地址不能为空</span>')

        }else {
            $(this).parent().parent().find($(".warn")).remove();

        }
    })
    //电话号码判断
    // 电话号码的正则表达式判断
    var phone_reg =/^1[3|4|5|7|8]\d{9}$/;
    $(".tel_detail").focus(function () {
        $(this).siblings("span").remove();
        $(this).parent().append('<span class="tips">请填写您的真实联系电话</span>');
    });
    $(".tel_detail").blur(function () {
        if($(this).val()==""){
            $(this).parent().parent().find($(".warn")).remove();
            $(this).parent().parent().append(' <span class="warn">电话号码不能为空</span>')

        }else if(!$(this).val().match(phone_reg)){
            $(this).parent().parent().find($(".warn")).remove();
            $(this).parent().parent().append(' <span class="warn">电话号码格式有误，请输入正确的号码</span>');

        }
        else {
            $(this).parent().parent().find($(".warn")).remove();

        }
    })


//当点击按钮时，要通过最后一次验证表单内容是否符合规则，可通过。warn标签的长度来判断
    $(".save_address").click(function () {
        $(this).removeAttr("data-dismiss");
        $(".info input").trigger("blur");
        var error=$(".warn").length;
        // document.write(error);
        console.log(error);
        if(error==0){
            $(this).attr("data-dismiss","modal");
        }

    })
    //发票信息
    $("#need_receipt").click(function(){
        var val=$('input:radio[name="receipt"]:checked').val();
        if(val==null){
            $(".receipt_info").hide();
        }
        else{
            $(".receipt_info").show();
        }
    });
    $("#no_receipt").click(function () {
        $(".receipt_info").hide();
    });
    //对填写的发票信息进行表单验证
    // 电话号码的正则表达式判断
    $('#company_name').blur(function(){
        var that=$(this);
        if ($(this).val() == "") {
            $(".info_warn").eq(0).html('<div class="re_warn">企业名称不能为空</div>');
            // that.css('border','solid 1px #e22');
        }
        else {
            $(".info_warn").eq(0).html('<i style="font-size: 16px;color: #ee2222">*</i>');
            // that.css('border','1px solid #ccc');
        }
    });
    $('#company_address').blur(function(){
        var that=$(this);
        if ($(this).val() == "") {
            $(".info_warn").eq(1).html('<div class="re_warn">企业地址不能为空</div>');
            // that.css('border','solid 1px #e22');
        }
        else {
            $(".info_warn").eq(1).html('<i style="font-size: 16px;color: #ee2222">*</i>');
            // that.css('border','1px solid #ccc');
        }
    });
    var public_tel=/^0(10|2[0-5789]|\\d{3})-\\d{7,8}$/;
    // 电话号码失去焦点
    $('#company_tel').blur(function(){
        var that=$(this);
        if ($(this).val() == "") {
            $(".info_warn").eq(2).html('<div class="re_warn">电话不能为空</div>');
            // that.css('border','solid 1px #e22');
        }
        // 电话号码的长度应为11位
        else if($(this).val().length != 11) {
            $(".info_warn").eq(2).html('<div class="re_warn">手机号长度不正确！</div>');
            // that.css('border','solid 1px #e22');
        }
        // 判断输入的是不是手机号码
        else if(!$(this).val().match(phone_reg)) {
            $(".info_warn").eq(2).html('<div class="re_warn">电话格式有误！</div>');
            // that.css('border','solid 1px #e22');
        } else {
            $(".info_warn").eq(2).html('<i style="font-size: 16px;color: #ee2222">*</i>');
            // that.css('border','1px solid #ccc');
        }
    });
    $('#tax_num').blur(function(){
        var that=$(this);
        if ($(this).val() == "") {
            $(".info_warn").eq(3).html('<div class="re_warn">纳税人识别号不能为空</div>');
            // that.css('border','solid 1px #e22');
        }
        else {
            $(".info_warn").eq(3).html('<i style="font-size: 16px;color: #ee2222">*</i>');
            // that.css('border','1px solid #ccc');
        }
    });
    // $('#bank_account').blur(function(){
    //     var that=$(this);
    //     if ($(this).val() == "") {
    //         $(".info_warn").eq(4).html('<div class="re_warn">银行账号不能为空</div>');
    //         // that.css('border','solid 1px #e22');
    //     }
    //     else {
    //         $(".info_warn").eq(4).html('');
    //         // that.css('border','1px solid #ccc');
    //     }
    // });
    $('#bank_account').blur(function(){
        var num = /^\d*$/; //全数字
        console.log($(this).val().length)
        if ($(this).val() == "") {
            $(".info_warn").eq(4).html('<div class="re_warn">银行账号不能为空</div>');
            // that.css('border','solid 1px #e22');
        }else if($(this).val().length < 16 || $(this).val().length > 19){
            $(".info_warn").eq(4).html('<div class="re_warn">银行卡号长度必须在16到19之间</div>');
        }else if(!num.test($(this).val())){
            $(".info_warn").eq(4).html('<div class="re_warn">银行卡号必须全为数字</div>');
        }//Luhm校验（新） luhmCheck()是验证银行卡号码正误的
        else if(!luhmCheck($(this).val()))
        {
            $(".info_warn").eq(4).html('<div class="re_warn">银行卡号码有误</div>');
        }
        else {
            $(".info_warn").eq(4).html('<i style="font-size: 16px;color: #ee2222">*</i>');
            // that.css('border','1px solid #ccc');
        }
    });



//   获得购物订单中的物品

    $.ajax({
        url:http+"cart?uid="+u_id+"&sid="+s_id+"&cars="+shop_car_buy_good_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (buy_list) {
            console.log(buy_list);
            if(buy_list.msg=="SUCCESS"){
                console.log(buy_list)

                for (var i = 0; i < buy_list.data.commodities.length; i++) {
                    var buy_goods=buy_list.data.commodities[i].commodity;
                    var num=buy_goods.commodityNumber;

                    var want_buy_good ='<div class="list">'+'<div class="pic">'+"<img src="+buy_goods.logoPath+" alt=''>"+ '</div>'+
                        '<span class="good">'+buy_goods.commodityName+buy_goods.standardName+ '</span>'+
                        '<span class="price">'+buy_goods.unitPrice+'</span>'+
                        '<span class="num">'+buy_list.data.commodities[i].commodityNumber+'</span>'+'<span class="total">'+
                        +buy_list.data.commodities[i].totalAmount+'</span>'+'</div>'
                    $(".lists").append(want_buy_good);
                }
            //获得总金额
                $(".total_price_num").html(buy_list.data.priceCount);
            //    获得订单金额，根据记账时间重新计算
            //     var total_price = parseFloat($(".total_price_num").text());
            //     //获取支付方式列表
            //     var ways = $(".pay_way").children();



            }else {
                if(buy_list.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else {
                    $("#fail_modal_content").text(buy_list.error);
                    $("#fail_operation_Modal").modal();
                    $("#fail_operation_Modal").on('hide.bs.modal', function () {
                        window.close();
                        // window.location.href=document.referrer;//返回前一页并刷新
                    })
                }

            }
        }
    })
//点击提交订单
    $("#submit_order").click(function () {
        // var pay_way=$('input:radio[name="pay"]:checked').val();
        var order_total_price=$(".total_price_num").html();

    })
    //点击取消订单
    $("#cancel_order").click(function () {
        $("#tip_delete_Modal").modal();
        $(".delete_del").on("click",function () {
            // window.history.go(-1);//返回前一页不刷新
            window.close();
            // window.location.href=document.referrer;//返回前一页并刷新
        })
    })

});
// function addr_fresh() {
//     var http=Http;
// //获取收货人列表
//     var receiver_flag="";
//     $.ajax({
//         url: http + "receiver",
//         type: "get",
//         xhrFields:{withCredentials: true},
//         success: function (address_list) {
//             console.log(address_list);
//             if (address_list.msg == "SUCCESS") {
//                 var addr_data = address_list.data;
//                 if(addr_data.length>0){
//                     receiver_flag=true;
//                     for (var i = 0; i < addr_data.length; i++) {
//                         //首先显示默认收货人
//                         var receiver = '<div class="radio">' + '<label>' + '<input type="radio" name="address" class="i_' + addr_data[i].defaultReceiver + ' radio_click" value="i_' + i + '">' +
//                             addr_data[i].receiver + '&nbsp&nbsp&nbsp&nbsp' + addr_data[i].address + '&nbsp&nbsp' + addr_data[i].detailAddress + '&nbsp&nbsp&nbsp&nbsp' + addr_data[i].phone + '</label>' + '</div>';
//
//                         $(".edit_receiver_info").prepend(receiver);
//                     }
//                 }else {
//                     receiver_flag=false;
//                 }
//
//                 if($(".i_true").length==0){
//                     $(".i_false").eq(0).attr("checked","true");
//                 }else {
//                     $(".i_true").attr("checked", "true");
//                 }
//
//             } else {
//                 // var data = JSON.parse(address_list);
//                 // console.log(data);
//                 if (address_list.msg == "NO_LOGIN") {
//                     // console.log(222222)
//                     window.location.href = "login.html";
//                 } else if (address_list.msg == "FAIL") {
//                     $("#fail_modal_content").text(address_list.error);
//                     $("#fail_operation_Modal").modal();
//                 }
//             }
//
//
//         }
//     })
// }