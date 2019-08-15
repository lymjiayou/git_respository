/**
 * Created by lysp on 2018/8/24.
 */
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;

//获得收货地址
    $.ajax({
        url:http+"receiver?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (address_list) {
            if(address_list.msg=="SUCCESS"){
                var addr_data = address_list.data.list
                //列出收货地址列表
                //用table列出收货地址
                console.log(addr_data);
                // addr_data.length=0
                if(address_list.data.list.length>0){
                    var totalPage =  address_list.data.totalPage;
                    $('.pageTest').page({
                        leng:totalPage,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                        clickBack:function(page){
                            var current=page;
                            change_page(current);
                        }
                    })
                    // // console.log(addr_data);
                    for (var i = 0; i < addr_data.length; i++) {
                        var default_sign="";
                        if(addr_data[i].isDefaultReceiver){
                            default_sign='<img src="../images/default_address.png" alt="">'+'默认地址';
                        }
                        var receiver = '<tr class="receiver_content">' + '<th class="receiver_name_info">' + addr_data[i].receiver + '</th>' +
                            '<th class="receiver_area_info">' + addr_data[i].address + '</th>' + '<th class="receiver_street_info">' + addr_data[i].detailAddress + '</th>' +
                            '<th class="receiver_tel_info">' + addr_data[i].phone + '</th>' + '<th class="receiver_default_info">' +default_sign+ '</th>' +
                            '<th class="receiver_operation">' + '<div class="edit" self_id="i_' + addr_data[i].id + '">' + '<img src=" ../images/edit_addr.png" alt="" class="e_sign">' + '<span>' + '编辑' + '</span>' + '</div>' +
                            '<div class="delete" self_id="i_' + addr_data[i].id + '">' + '<img src="../images/del_addr.png" alt="" class="d_sign">' + '<span>' + '删除' + '</span>' + '</div>' + '</th>' + '</tr>';
                        $(".receiver_list_box").append(receiver);

                    }
                    //编辑收货地址
                    $(".edit").each(function (index, e) {
                        $(e).mouseenter(function () {
                            $(this).find("img").attr("src", "../images/red_edit.png");
                        }).mouseleave(function () {
                            $(this).find("img").attr("src", "../images/edit_addr.png")
                        });
                        $(e).click(function () {
                            $(".save_address_edit").hide();
                            $(".save_address").show();
                            $(".warn").remove();
                            var that = $(this);
                            $("#new_address_Label").html("编辑地址");
                            that.attr("data-toggle", "modal");
                            that.attr("data-target", "#new_address_Modal");
                            var id = $(this).attr("self_id").split("_")[1];
                            //首先获取要修改的地址信息
                            $.ajax({
                                url:http+"receiver/"+id+"?uid="+u_id+"&sid="+s_id+"&page=1&pageSize=10",
                                type:"get",
                                xhrFields:{withCredentials: true},
                                success:function (data) {
                                    var receiver_info=data.data;
                                    if (data.msg=="SUCCESS"){
                                        // console.log(receiver_info);
                                        //获得可编辑的收货人信息
                                        $(".name_detail").val(receiver_info.receiver);
                                        //省市区三级分类获取
                                        var oProvince = jdCity;
                                        var j = 1;
                                        // 遍历省份名添加到到第一级下拉菜单，设置自定义属性num作为索引号
                                        for (i in oProvince) {
                                            $('.province').append('<option value=' + oProvince[i]['name'] + ' num=' + j + '>' + oProvince[i]['name'] +
                                                '</option>');
                                            j++;
                                        }
                                        var pro_vince=receiver_info.address.split(" ")[0];
                                        //设置value值为pro_vince的值被选中
                                        $(".province").val(pro_vince);

                                        // 获取省份索引号
                                        //   console.log($('.province option:selected').val());
                                        var fir_idx = $('.province option:selected').attr('num') - 1;
                                        // 当前选中的省份对应的第二级城市列表json对象
                                        var oCity = oProvince[fir_idx]['city'];
                                        var k = 1;
                                        // 遍历对应的城市名到第二级下拉菜单
                                        for (i in oCity) {
                                            $('.city').append('<option value=' + oCity[i]['name'] + ' num=' + k + '>' + oCity[i]['name'] + '</option>');
                                            k++;
                                        }
                                        var ci_ty=receiver_info.address.split(" ")[1];
                                        $('.city').val(ci_ty)
                                        // 获取城市索引号
                                        var snd_idx = $('.city option:selected').attr('num') - 1;
                                        // 当前选中的城市对应的第三级区县列表arr对象
                                        var oArea = oCity[snd_idx]['area'];
                                        // 遍历对应的区县名到第三级下拉菜单
                                        for (i in oArea) {
                                            $('.area').append('<option value=' + oArea[i] + '>' + oArea[i] + '</option>');
                                        }
                                        var ar_ea=receiver_info.address.split(" ")[2];
                                        $(".area").val(ar_ea)
                                        //去掉警告信息
                                        // $(".select_item").find($(".warn")).remove();
                                        $(".street_detail").val(receiver_info.detailAddress);
                                        $(".tel_detail").val(receiver_info.phone);
                                        //点击保存修改的收货地址
                                        $(".save_address").click(function () {
                                            var edit_error=$(".warn").length;
                                            console.log(edit_error)
                                            if(edit_error==0){
                                                $(this).attr("data-dismiss","modal");
                                                var receiver_name=$(".name_detail").val();
                                                var re_province=$(".province option:selected").val();
                                                var re_city=$(".city option:selected").val();
                                                var re_area=$(".area option:selected").val();
                                                var address=re_province+" "+re_city+" "+re_area;
                                                var re_street_detail=$(".street_detail").val();
                                                // alert(re_street_detail)
                                                var re_tel=$(".tel_detail").val();
                                                //修改收货地址
                                                $.ajax({
                                                    type:"patch",
                                                    beforeSend: function(request) {
                                                        var cooinfo=getCookie("XSRF-TOKEN");
                                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                                        },
                                                    contentType:"application/json;charset=UTF-8",
                                                    url: http+"receiver?uid="+u_id+"&sid="+s_id,
                                                    xhrFields:{withCredentials: true},
                                                    data:JSON.stringify({"id":id,"address":address,"phone":re_tel,"receiver":receiver_name,"detailAddress":re_street_detail}),
                                                    success: function (data) {
                                                        if (data.msg == "SUCCESS") {
                                                            console.log(data);
                                                            window.location.reload();
                                                            //如果有设为默认地址
                                                            if ($(".default_addr").get(0).checked) {
                                                                $.ajax({
                                                                    url:http+"purchase/receiver/"+id+"/default?uid="+u_id+"&sid="+s_id,
                                                                    type:"patch",
                                                                    beforeSend: function(request) {
                                                                        var cooinfo=getCookie("XSRF-TOKEN");
                                                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                                                    xhrFields:{withCredentials: true},
                                                                    success:function (data) {
                                                                        // console.log(data);
                                                                        if(data.msg=="SUCCESS"){
                                                                            window.location.reload();
                                                                        }
                                                                    }
                                                                })

                                                            }

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


                                        })
                                    }else {
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


                    //删除收货地址
                    $(".delete").each(function (index, ele) {
                        $(ele).mouseenter(function () {
                            $(this).find("img").attr("src", "../images/red_delete.png");
                        }).mouseleave(function () {
                            $(this).find("img").attr("src", "../images/del_addr.png")
                        });
                        $(ele).click(function () {
                            var that = $(this);
                            that.attr("data-toggle", "modal");
                            that.attr("data-target", "#tip_delete_Modal");
                            var id = $(this).attr("self_id").split("_")[1];
                            $(".delete_del").click(function () {
                                $.ajax({
                                    type:"delete",
                                    beforeSend: function(request) {
                                        var cooinfo=getCookie("XSRF-TOKEN");
                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                    url: http+"receiver/"+id+"?uid="+u_id+"&sid="+s_id,
                                    xhrFields:{withCredentials: true},
                                    success: function (data) {
                                        if (data.msg == "SUCCESS") {
                                            console.log(data)
                                            // that.parent().parent().remove();
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
                }else {
                    var no_data='<div class="no_data" style="margin-top: 20px">'+'<img src="../images/nodata.png">'+ '<h1>'+'暂无符合条件的数据记录'+'<h1>'+'</div>';
                    $(".address_table_box").append(no_data);
                }
            }else {
                // var data=JSON.parse(address_list);
                // console.log(data);
                if(address_list.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else {
                    $("#fail_modal_content").text(address_list.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }
    })
//新建收货地址
    $(".new_address").click(function () {
        $("#new_address_Label").html("新增地址");
        $("#new_address_Modal").modal();
        $(".save_address_edit").show();
        $(".save_address").hide();
    })
    //新建收货地址
    $(".save_address_edit").on("click",function () {
        $(".select_item").find(".warn").remove();
        var provice=$('.province option:selected').val();
        var city=$('.city option:selected').val();
        var area=$('.area option:selected').val();
        if(provice==0||city==0||area==0){
            // $(".select_item").children($(".warn")).remove();
            $(".select_item").append('<span class="warn">所在地区不能为空</span>')
        }

//当点击按钮时，要通过最后一次验证表单内容是否符合规则，可通过。warn标签的长度来判断
//         $(this).removeAttr("data-dismiss");
        $(".info input").trigger("blur");
        var error=$(".warn").length;
        console.log($(".warn"))
        //只有没有错误提示时再提交
        if(error==0){
            // console.log(error);
            $(this).attr("data-dismiss","modal");
            var receiver_name=$(".name_detail").val();
            var re_province=$(".province option:selected").val();
            var re_city=$(".city option:selected").val();
            var re_area=$(".area option:selected").val();
            var address=re_province+" "+re_city+" "+re_area;
            var re_street_detail=$(".street_detail").val();
            var re_tel=$(".tel_detail").val();
            //提交收货地址
            $.ajax({
                url:http+"receiver?uid="+u_id+"&sid="+s_id,
                data:JSON.stringify({"address":address,"phone":re_tel,"receiver":receiver_name,"detailAddress":re_street_detail}),   //提交数据
                type:"POST",
                beforeSend: function(request) {
                    var cooinfo=getCookie("XSRF-TOKEN");
                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },//提交方式
            //dataType:"jsonp", //返回类型设置为jsonp 为了解决跨域问题
                contentType:"application/json;charset=UTF-8",
                xhrFields:{withCredentials: true},
                async:false,
                success:function (data) {
                    console.log(data);
                    if(data.msg=="SUCCESS"){
                        var addr_id=data.data;
                        //如果有设为默认地址
                        if ($(".default_addr").get(0).checked) {
                            $.ajax({
                                url:http+"receiver/"+addr_id+"/default?uid="+u_id+"&sid="+s_id,
                                type:"patch",
                                beforeSend: function(request) {
                                    var cooinfo=getCookie("XSRF-TOKEN");
                                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                },
                                xhrFields:{withCredentials: true},
                                success:function (data) {
                                    // console.log(data);
                                    if(data.msg=="SUCCESS"){
                                        window.location.reload();
                                    }
                                }
                            })
                        }else {
                            window.location.reload();
                        }
                        //刷新当前页面 获取添加后的数据
                    }else {
                        if(data.msg=="NO_LOGIN"){
                            window.location.href="login.html";
                        }else{
                            $("#fail_modal_content").text(data.error);
                            $("#fail_operation_Modal").modal();
                        }
                    }
                }
            })


        }
    })


    // //清空重置表单
    // $(".new_address").click(function () {
    //     $("#addr_indo_form input").val("").removeAttr('checked');
    //     $(".province").empty();
    //     $(".province").append('<option value="0">-请选择-</option>');
    //     $(".city").empty();
    //     $(".area").empty();
    //     $(".warn").remove();
    //
    //     choose_place();
    // })

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
    $(".province").on("change",function () {

        if($(this).val()){//如果选中了
            $(".city").on("change",function () {
                if($(this).val()){
                    $(".area").on("change",function () {
                        if($(this).val()){
                            //如果三级都不为空
                            $(this).parent().parent().find($(".warn")).remove();

                        }
                        // else {
                        //     $(this).parent().parent().find($(".warn")).remove();
                        //     $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')
                        //
                        // }
                    })
                }
                // else {
                //     $(this).parent().parent().find($(".warn")).remove();
                //     $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')
                //
                // }
            })

        }
        // else {
        //     $(this).parent().parent().find($(".warn")).remove();
        //     $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')
        //
        // }
    })
    // var provice=$('.province option:selected').val();
    // var city=$('.city option:selected').val();
    // var area=$('.area option:selected').val();
    // console.log(provice)
    // if(provice==0||city==0||area==0){
    //     // $(".select_item").children($(".warn")).remove();
    //     $(".select_item").append('<span class="warn">所在地区不能为空</span>')
    // }
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
    var phone_reg = /^1[3|4|5|7|8]\d{9}$/;
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




});
function change_page(current_page) {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;

//获得收货地址
    $.ajax({
        url:http+"receiver?uid="+u_id+"&sid="+s_id+"&page="+current_page+"&pageSize=10",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (address_list) {
            if(address_list.msg=="SUCCESS"){
                $(".receiver_list_box").empty();
                var addr_data = address_list.data.list
                //列出收货地址列表
                //用table列出收货地址
                console.log(addr_data)
                if(address_list.data.list.length>0){

                    // // console.log(addr_data);
                    for (var i = 0; i < addr_data.length; i++) {
                        var default_sign="";
                        if(addr_data[i].isDefaultReceiver){
                            default_sign='<img src="../images/default_address.png" alt="">'+'默认地址';
                        }
                        var receiver = '<tr class="receiver_content">' + '<th class="receiver_name_info">' + addr_data[i].receiver + '</th>' +
                            '<th class="receiver_area_info">' + addr_data[i].address + '</th>' + '<th class="receiver_street_info">' + addr_data[i].detailAddress + '</th>' +
                            '<th class="receiver_tel_info">' + addr_data[i].phone + '</th>' + '<th class="receiver_default_info">' +default_sign+ '</th>' +
                            '<th class="receiver_operation">' + '<div class="edit" self_id="i_' + addr_data[i].id + '">' + '<img src=" ../images/edit_addr.png" alt="" class="e_sign">' + '<span>' + '编辑' + '</span>' + '</div>' +
                            '<div class="delete" self_id="i_' + addr_data[i].id + '">' + '<img src="../images/del_addr.png" alt="" class="d_sign">' + '<span>' + '删除' + '</span>' + '</div>' + '</th>' + '</tr>';
                        $(".receiver_list_box").append(receiver);

                    }


                    //编辑收货地址
                    $(".edit").each(function (index, e) {
                        $(e).mouseenter(function () {
                            $(this).find("img").attr("src", "../images/red_edit.png");
                        }).mouseleave(function () {
                            $(this).find("img").attr("src", "../images/edit_addr.png")
                        });
                        $(e).click(function () {
                            $(".save_address_edit").hide();
                            $(".save_address").show();
                            $(".warn").remove();
                            var that = $(this);
                            $("#new_address_Label").html("编辑地址");
                            that.attr("data-toggle", "modal");
                            that.attr("data-target", "#new_address_Modal");
                            var id = $(this).attr("self_id").split("_")[1];
                            //首先获取要修改的地址信息
                            $.ajax({
                                url:http+"receiver/"+id+"?uid="+u_id+"&sid="+s_id+"&page="+current_page+"&pageSize=10",
                                type:"get",
                                xhrFields:{withCredentials: true},
                                success:function (data) {
                                    var receiver_info=data.data;
                                    if (data.msg=="SUCCESS"){
                                        console.log(receiver_info);
                                        //获得可编辑的收货人信息
                                        $(".name_detail").val(receiver_info.receiver);
                                        //省市区三级分类获取
                                        var oProvince = jdCity;
                                        var j = 1;
                                        // 遍历省份名添加到到第一级下拉菜单，设置自定义属性num作为索引号
                                        for (i in oProvince) {
                                            $('.province').append('<option value=' + oProvince[i]['name'] + ' num=' + j + '>' + oProvince[i]['name'] +
                                                '</option>');
                                            j++;
                                        }
                                        var pro_vince=receiver_info.address.split(" ")[0];
                                        //设置value值为pro_vince的值被选中
                                        $(".province").val(pro_vince);

                                        // 获取省份索引号
                                        //   console.log($('.province option:selected').val());
                                        var fir_idx = $('.province option:selected').attr('num') - 1;
                                        // 当前选中的省份对应的第二级城市列表json对象
                                        var oCity = oProvince[fir_idx]['city'];
                                        var k = 1;
                                        // 遍历对应的城市名到第二级下拉菜单
                                        for (i in oCity) {
                                            $('.city').append('<option value=' + oCity[i]['name'] + ' num=' + k + '>' + oCity[i]['name'] + '</option>');
                                            k++;
                                        }
                                        var ci_ty=receiver_info.address.split(" ")[1];
                                        $('.city').val(ci_ty)
                                        // 获取城市索引号
                                        var snd_idx = $('.city option:selected').attr('num') - 1;
                                        // 当前选中的城市对应的第三级区县列表arr对象
                                        var oArea = oCity[snd_idx]['area'];
                                        // 遍历对应的区县名到第三级下拉菜单
                                        for (i in oArea) {
                                            $('.area').append('<option value=' + oArea[i] + '>' + oArea[i] + '</option>');
                                        }
                                        var ar_ea=receiver_info.address.split(" ")[2];
                                        $(".area").val(ar_ea)
                                        //去掉警告信息
                                        // $(".select_item").find($(".warn")).remove();
                                        $(".street_detail").val(receiver_info.detailAddress);
                                        $(".tel_detail").val(receiver_info.phone);
                                        //点击保存修改的收货地址
                                        $(".save_address").click(function () {
                                            var receiver_name=$(".name_detail").val();
                                            var re_province=$(".province option:selected").val();
                                            var re_city=$(".city option:selected").val();
                                            var re_area=$(".area option:selected").val();
                                            var address=re_province+" "+re_city+" "+re_area;
                                            var re_street_detail=$(".street_detail").val();
                                            // alert(re_street_detail)
                                            var re_tel=$(".tel_detail").val();
                                            //修改收货地址
                                            $.ajax({
                                                type:"patch",
                                                beforeSend: function(request) {
                                                    var cooinfo=getCookie("XSRF-TOKEN");
                                                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                                    },
                                                contentType:"application/json;charset=UTF-8",
                                                xhrFields:{withCredentials: true},
                                                url: http+"receiver?uid="+u_id+"&sid="+s_id,
                                                data:JSON.stringify({"id":id,"address":address,"phone":re_tel,"receiver":receiver_name,"detailAddress":re_street_detail}),
                                                success: function (data) {
                                                    if (data.msg == "SUCCESS") {
                                                        console.log(data);
                                                        //如果有设为默认地址
                                                        if ($(".default_addr").get(0).checked) {
                                                            $.ajax({
                                                                url:http+"purchase/receiver/"+id+"/default?uid="+u_id+"&sid="+s_id,
                                                                type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                                                                xhrFields:{withCredentials: true},
                                                                success:function (data) {
                                                                    // console.log(data);
                                                                    if(data.msg=="SUCCESS"){
                                                                        window.location.reload();
                                                                    }
                                                                }
                                                            })

                                                        }else {
                                                            window.location.reload();
                                                        }
                                                    }else {
                                                        if(data.msg=="NO_LOGIN"){
                                                            window.location.href="login.html";
                                                        }else{
                                                            $("#fail_modal_content").text(data.error);
                                                            $("#fail_operation_Modal").modal();
                                                        }
                                                    }
                                                }
                                            })
                                        })
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
                    //删除收货地址
                    $(".delete").each(function (index, ele) {
                        $(ele).mouseenter(function () {
                            $(this).find("img").attr("src", "../images/red_delete.png");
                        }).mouseleave(function () {
                            $(this).find("img").attr("src", "../images/del_addr.png")
                        });
                        $(ele).click(function () {
                            var that = $(this);
                            that.attr("data-toggle", "modal");
                            that.attr("data-target", "#tip_delete_Modal");
                            var id = $(this).attr("self_id").split("_")[1];
                            $(".delete_del").click(function () {
                                $.ajax({
                                    type:"delete",
                                    beforeSend: function(request) {
                                        var cooinfo=getCookie("XSRF-TOKEN");
                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                        },
                                    xhrFields:{withCredentials: true},
                                    url: http+"receiver/"+id+"?uid="+u_id+"&sid="+s_id,
                                    success: function (data) {
                                        if (data.msg == "SUCCESS") {
                                            console.log(data)
                                            // that.parent().parent().remove();
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
                }

            }else {
                // var data=JSON.parse(address_list);
                // console.log(data);
                if(data.msg=="NO_LOGIN"){
                    window.location.href="login.html";
                }else{
                    $("#fail_modal_content").text(data.error);
                    $("#fail_operation_Modal").modal();
                }
            }
        }
    })
// //新建收货地址
//     $(".new_address").click(function () {
//         $("#new_address_Label").html("新增地址");
//         $("#new_address_Modal").modal();
//         $(".save_address_edit").show();
//         $(".save_address").hide();
//     })
//     //新建收货地址
//     $(".save_address_edit").on("click",function () {
//         $(".select_item").find(".warn").remove();
//         var provice=$('.province option:selected').val();
//         var city=$('.city option:selected').val();
//         var area=$('.area option:selected').val();
//         if(provice==0||city==0||area==0){
//             // $(".select_item").children($(".warn")).remove();
//             $(".select_item").append('<span class="warn">所在地区不能为空</span>')
//         }
//
// //当点击按钮时，要通过最后一次验证表单内容是否符合规则，可通过。warn标签的长度来判断
// //         $(this).removeAttr("data-dismiss");
//         $(".info input").trigger("blur");
//         var error=$(".warn").length;
//         console.log($(".warn"))
//         //只有没有错误提示时再提交
//         if(error==0){
//             // console.log(error);
//             $(this).attr("data-dismiss","modal");
//             var receiver_name=$(".name_detail").val();
//             var re_province=$(".province option:selected").val();
//             var re_city=$(".city option:selected").val();
//             var re_area=$(".area option:selected").val();
//             var address=re_province+" "+re_city+" "+re_area;
//             var re_street_detail=$(".street_detail").val();
//             var re_tel=$(".tel_detail").val();
//             //提交收货地址
//             $.ajax({
//                 url:http+"receiver?uid="+u_id+"&sid="+s_id,
//                 data:JSON.stringify({"address":address,"phone":re_tel,"receiver":receiver_name,"detailAddress":re_street_detail}),   //提交数据
//                 type:"POST",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },//提交方式
//                 //dataType:"jsonp", //返回类型设置为jsonp 为了解决跨域问题
//                 contentType:"application/json;charset=UTF-8",
//                 async:false,
//                 success:function (data) {
//                     console.log(data);
//                     if(data.msg=="SUCCESS"){
//                         var addr_id=data.data;
//                         //如果有设为默认地址
//                         if ($(".default_addr").get(0).checked) {
//                             $.ajax({
//                                 url:http+"receiver/"+addr_id+"/default?uid="+u_id+"&sid="+s_id,
//                                 type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
//                                 success:function (data) {
//                                     // console.log(data);
//                                     if(data.msg=="SUCCESS"){
//                                         window.location.reload();
//                                     }
//                                 }
//                             })
//                         }else {
//                             window.location.reload();
//                         }
//                         //刷新当前页面 获取添加后的数据
//                     }
//                 }
//             })
//
//
//         }
//     })
//
//
//     // //清空重置表单
//     // $(".new_address").click(function () {
//     //     $("#addr_indo_form input").val("").removeAttr('checked');
//     //     $(".province").empty();
//     //     $(".province").append('<option value="0">-请选择-</option>');
//     //     $(".city").empty();
//     //     $(".area").empty();
//     //     $(".warn").remove();
//     //
//     //     choose_place();
//     // })
//
// //    收货地址的表单验证
//     //姓名判断
//     $(".name_detail").focus(function () {
//         $(this).siblings("span").remove();
//         $(this).parent().append('<span class="tips">请填写您的真实姓名</span>');
//     });
//     $(".name_detail").blur(function () {
//         if($(this).val()==""){
//             $(this).parent().parent().find($(".warn")).remove();
//             $(this).parent().parent().append(' <span class="warn">收货人姓名不能为空</span>')
//
//         }else {
//             $(this).parent().parent().find($(".warn")).remove();
//
//         }
//     })
//
// //    省市区三级联动判断
//     $(".province").on("change",function () {
//
//         if($(this).val()){//如果选中了
//             $(".city").on("change",function () {
//                 if($(this).val()){
//                     $(".area").on("change",function () {
//                         if($(this).val()){
//                             //如果三级都不为空
//                             $(this).parent().parent().find($(".warn")).remove();
//
//                         }
//                         // else {
//                         //     $(this).parent().parent().find($(".warn")).remove();
//                         //     $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')
//                         //
//                         // }
//                     })
//                 }
//                 // else {
//                 //     $(this).parent().parent().find($(".warn")).remove();
//                 //     $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')
//                 //
//                 // }
//             })
//
//         }
//         // else {
//         //     $(this).parent().parent().find($(".warn")).remove();
//         //     $(this).parent().parent().append(' <span class="warn">所在地区不能为空</span>')
//         //
//         // }
//     })
//     // var provice=$('.province option:selected').val();
//     // var city=$('.city option:selected').val();
//     // var area=$('.area option:selected').val();
//     // console.log(provice)
//     // if(provice==0||city==0||area==0){
//     //     // $(".select_item").children($(".warn")).remove();
//     //     $(".select_item").append('<span class="warn">所在地区不能为空</span>')
//     // }
// //    街道信息判断
//     $(".street_detail").focus(function () {
//         $(this).siblings("span").remove();
//         $(this).parent().append('<span class="tips">不必重复填写地区</span>');
//     });
//     $(".street_detail").blur(function () {
//         if($(this).val()==""){
//             $(this).parent().parent().find($(".warn")).remove();
//             $(this).parent().parent().append(' <span class="warn">街道地址不能为空</span>')
//
//         }else {
//             $(this).parent().parent().find($(".warn")).remove();
//         }
//     })
//     //电话号码判断
//     // 电话号码的正则表达式判断
//     var phone_reg = /^1[3|4|5|7|8]\d{9}$/;
//     $(".tel_detail").focus(function () {
//         $(this).siblings("span").remove();
//         $(this).parent().append('<span class="tips">请填写您的真实联系电话</span>');
//     });
//     $(".tel_detail").blur(function () {
//         if($(this).val()==""){
//             $(this).parent().parent().find($(".warn")).remove();
//             $(this).parent().parent().append(' <span class="warn">电话号码不能为空</span>')
//
//         }else if(!$(this).val().match(phone_reg)){
//             $(this).parent().parent().find($(".warn")).remove();
//             $(this).parent().parent().append(' <span class="warn">电话号码格式有误，请输入正确的号码</span>');
//
//         }
//         else {
//             $(this).parent().parent().find($(".warn")).remove();
//
//         }
//     })
}
// function choose_place() {
//     var oProvince = jdCity;
//
//     var j = 1;
//
//     // 遍历省份名添加到到第一级下拉菜单，设置自定义属性num作为索引号
//     for (i in oProvince) {
//         $('.province').append('<option value=' + oProvince[i]['name'] + ' num=' + j + '>' + oProvince[i]['name'] +
//             '</option>');
//         j++;
//     }
//
//     $('.province').change(function () {
//
//         //确认选中的了省份名，否则会报错undefined
//         if ($(this).val()) {
//             // 获取省份索引号
//             //   console.log($('.province option:selected').val());
//             var fir_idx = $('.province option:selected').attr('num') - 1;
//
//             // 当前选中的省份对应的第二级城市列表json对象
//             var oCity = oProvince[fir_idx]['city'];
//
//             //先清空再写入
//             $('.city').empty();
//             $('.area').empty();
//
//             //写入提示行
//             $('.city').append('<option value="0">-请选择-</option>');
//
//             var k = 1;
//
//             // 遍历对应的城市名到第二级下拉菜单
//             for (i in oCity) {
//                 $('.city').append('<option value=' + oCity[i]['name'] + ' num=' + k + '>' + oCity[i]['name'] +
//                     '</option>');
//                 k++;
//             }
//
//             $('.city').change(function () {
//
//                 //确认选中的了城市名，否则会报错undefined
//                 if ($(this).val()) {
//
//                     // 获取城市索引号
//                     var snd_idx = $('.city option:selected').attr('num') - 1;
//
//                     //先清空再写入
//                     $('.area').empty();
//
//                     //写入提示行
//                     $('.area').append('<option value="0">-请选择-</option>');
//
//                     // 当前选中的城市对应的第三级区县列表arr对象
//                     var oArea = oCity[snd_idx]['area'];
//
//                     // 遍历对应的区县名到第三级下拉菜单
//                     for (i in oArea) {
//                         $('.area').append('<option value=' + oArea[i] + '>' + oArea[i] + '</option>');
//                     }
//
//                 } else {
//                     //如果选择“-- 请选择城市 --”的option，则清空区县列表
//                     $('.area').empty();
//                 }
//
//             });
//
//         } else {
//             //如果选择“-- 请选择省份 --”的option，则清空所有
//             $('.city').empty();
//             $('.area').empty();
//         }
//
//     });
// }