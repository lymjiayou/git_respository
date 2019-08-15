
/**
 * Created by MY on 2018/9/9.
 */
var big_img_list=new Array();
var delParent;
var defaults = {
    fileType         : ["jpg","png","bmp","jpeg"],   // 上传文件的类型
    fileSize         : 1024 * 1024 * 10                 // 上传文件的大小 1M
};
$(function () {
    // var http="http://129.28.67.53/qinwutong/purchase/";
    // var http="http://120.78.188.220/qinwutong/purchase/";
    var http=Http;
    var u_id=window.sessionStorage.u_id;
    var s_id=window.sessionStorage.s_id;
    var order_id=window.sessionStorage.commit_order_id;

    //首先列出该订单的所有商品
    $.ajax({
        url:http+"order/"+order_id+"?uid="+u_id+"&sid="+s_id,
        type:"get",
        xhrFields:{withCredentials: true},
        success:function (data) {
            if(data.msg=="SUCCESS"){
                console.log(data);
                $(".order_num").html(data.data.id);
                $(".order_time").html(data.data.createTimestamp);
                var order_commodities=data.data.commodities;
                console.log(order_commodities);
                for(var i=0;i<order_commodities.length;i++){
                    // console.log(order_commodities[i].state)
                    if(data.data.state==4){
                        console.log(111)
                        var commit_good='<div class="commit_content">'+'<div class="commit_content_left">'+'<div class="good_pic">'+'<img src='+order_commodities[i].logoPath+' alt="">'+'</div>'+
                            '<span>'+order_commodities[i].commodityName+'</span>'+'<span>'+'￥'+order_commodities[i].totalAmount+'</span>'+'</div>'+
                            '<div class="commit_content_right" good_id=i_'+order_commodities[i].id+'>'+'<div class="good_score">'+'<span class="score_text">'+'商品评分'+'</span>'+
                            '<div class="star_box1" id="star0_'+i+'" score="">'+'<ul>'+'<li>'+'</li>'+'<li>'+'</li>'+'<li>'+'</li>'+'<li>'+'</li>'+'<li>'+'</li>'+
                            '</ul>'+'</div>'+'<div class="good_score_text" id="score_'+i+'">'+'5分'+'</div>'+'</div>'+'<div class="commit_text">'+'<span>'+'评价晒单'+'</span>'+
                            '<textarea class="form-control" rows="5" placeholder="请写下你对订单的评价~">'+'</textarea>'+'<div class="img-box full share_pic_box">'+
                            '<section class="img-section">'+'<div class="confirm_update" style="margin:5px">'+'<i style="color: #ee2222">'+'*'+'</i>'+'选择图片后请点击 "上传图片" 完成上传'+'&nbsp&nbsp&nbsp'+'最多可以上传5张图片'+'</div>'+
                            '<div class="z_photo upimg-div row" >'+'<section class="z_file fl">'+'<div class="addbox">'+'<span class="icon-add">'+'+'+'</span>'+'</div>'+
                            '<input type="file" class="pic_show_input" name="file" id="file_'+i+'" class="file" value="" accept="image/jpg,image/jpeg,image/png,image/bmp" multiple />'+'</section>'+
                            '<div class="good_pic_update_button" id="i_'+i+'">上传图片</div>'+'</div>'+'</section>'+'</div>'+'</div>'+'</div>'+'</div>';

                        $(".commit_box").append(commit_good);


                    }
                }
                //点亮星星
                $(".star_box1").each(function (n,ele) {
                    $(ele).find("li").click(function () {
                        var index = $(this).index();
                        $(this).parent().parent().attr("score",index+1);
//               用score记录当前点击的li从而打分 score=1,2,3,4,5
                        $(this).parent().parent().attr("score",index+1);
                        var parentId = $(this).parent().parent().attr("id");
                        $("#"+parentId).find("li").css("background","url('../images/star.png')");
                        // 所点击星星的前面都变色，后面不变色
                        for(var i=0;i<=index;i++){
                            $("#"+parentId).find("li").eq(i).css("background","url('../images/star_selected1.png')");
                        }
                        var score = $("#"+parentId).attr("score");
                        //n表示当前点击的是第几个商品的评价
                        $("#score_"+n).text(score+"分").css("color","#ee2222");
                    })
                })
//            //服务评价
                $(".star_box2").each(function(t,e){
                    $(e).find("li").click(function () {
                        var index = $(this).index();
//               用score记录当前点击的li从而打分 score=1,2,3,4,5
                        $(this).parent().parent().attr("score",index+1);
                        var parentId = $(this).parent().parent().attr("id");
                        $("#"+parentId).find("li").css("background","url('../images/star.png')");
                        // 所点击星星的前面都变色，后面不变色
                        for(var i=0;i<=index;i++){
                            $("#"+parentId).find("li").eq(i).css("background","url('../images/star_selected1.png')");
                        }
                        var score = $("#"+parentId).attr("score");
                        $("#ser_score").text(score+"分").css("color","#ee2222");

                    })

                });
                //    添加评论图片
//            上传图片最多为5张

//创建一个二维数组来存储图片 用row_index,和del_index 来定位


                /*点击图片的文本框*/
                $(".z_photo").each(function (index,ele) {
                    var img_list = new Array();
                    var del_index = 0;
                    $(ele).find(".z_file").find(".pic_show_input").change(function () {
                        var Index = index;
                        var idFile = $(this).attr("id");
                        var file = document.getElementById(idFile);
                        var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
                        //每次上传都会有新的filelist
                        var fileList = file.files; //获取的图片文件
                        console.log(fileList)

                        // console.log(fileList+"======filelist=====");
                        var input = $(this).parent();//文本框的父亲元素
                        var imgArr = [];
                        //遍历得到的图片文件
                        var numUp = imgContainer.find(".up-section").length;
                        var totalNum = numUp + fileList.length;  //总的数量
                        if (fileList.length > 5 || totalNum > 5) {
                            $("#fail_update_content").text("上传图片数目不可以超过5个，请重新选择");
                            $("#fail_update_Modal").modal();
                            // alert("上传图片数目不可以超过5个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
                        } else if (numUp < 5) {
                            //如果一次插入的图片小于5张
                            fileList = validateUp(fileList);
                            console.log(fileList)
                            for (var i = 0; i < fileList.length; i++) {
                                img_list.push(fileList[i]);
                                big_img_list[Index]=img_list;
                                var imgUrl = window.URL.createObjectURL(fileList[i]);
                                imgArr.push(imgUrl);
                                //显示图片
                                var $section = $("<section class='up-section fl' id='i_" + Index + "_" + del_index + "'>");
                                imgContainer.prepend($section);

                                var $span = $("<span class='up-span'>");
                                $span.appendTo($section);

                                var $img0 = $("<img class='close-upimg' onclick='del_pic(" + Index + "," + del_index + ")'>");
                                del_index++;
                                $img0.attr("src", "../images/del_pic.png").appendTo($section);
                                var $img = $("<img class='up-img '>"); //up-opacity
                                $img.attr("src", imgArr[i]);
                                $img.appendTo($section);
                                // var $p = $("<p class='img-name-p'>");
                                // $p.html(fileList[i].name).appendTo($section);
                                var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                                $input.appendTo($section);
                                var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                                $input2.appendTo($section);
                            }
                            // console.log(img_list)
                        }

                        numUp = imgContainer.find(".up-section").length;
                        console.log(numUp)
                        if (numUp >= 5) {
                            $(this).parent().hide();
                        }
                        // //input内容清空
                        // $(this).val("");
                    });
                    //点击上传按钮
                    $(ele).find(".good_pic_update_button").click(function () {
                        var that = $(this);
                        that.parent().find(".up-section").find(".up-img").addClass("up-opacity");
                        that.parent().find(".up-section").addClass("loading");
                        var row_index = that.attr("id").split("_")[1];
                        console.log(big_img_list[row_index])
                        if(big_img_list[row_index]==null||big_img_list[row_index].length==0){
                            $("#fail_update_content").text("请选择图片后再点击上传！");
                            $("#fail_update_Modal").modal();
                        }else {
                            var formData = new FormData();
                            for (var i = 0; i < big_img_list[row_index].length; i++) {
                                //多个文件一定要变成负数files
                                // console.log(big_img_list[row_index][i])
                                if (big_img_list[row_index][i] != -1) {
                                    formData.append('files', big_img_list[row_index][i]);
                                }

                            }

                            //判断当前formdata对象中是否有图片
                            if(formData.has('files')==false){
                                $("#fail_update_content").text("请选择图片后再点击上传！");
                                $("#fail_update_Modal").modal();
                            }else {
                                //上传图片
                                $.ajax({
                                    url: http + "images/upload?uid=" + u_id + "&sid=" + s_id,
                                    type: "put",
                                    beforeSend: function(request) {
                                        var cooinfo=getCookie("XSRF-TOKEN");
                                        request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                    },
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    success: function (data) {
                                        if (data.msg == "SUCCESS") {
                                            console.log(data);
                                            $("#success_update_Modal").modal();
                                            var img_url = data.data;
                                            that.attr("img_url", img_url);
                                            that.parent().find(".up-section").removeClass("loading");
                                            that.parent().find(".up-section").find(".up-img").removeClass("up-opacity");
                                        } else {
                                            if(data.msg=="NO_LOGIN"){
                                                window.location.href="login.html";
                                            }else {
                                                $("#fail_update_content").text(data.error);
                                                $("#fail_update_Modal").modal();
                                            }
                                        }
                                    }
                                });
                            }

                        }


                    })
                });


                //发布评价
                $("#deliver").click(function () {
                    var ser_score=parseInt($("#ser_score").html()[0]);
                    console.log(typeof (ser_score));
                    console.log(typeof (order_id));


                    //定义一个json对象
                    var json_commit={};
                    //添加属性
                    json_commit.commodities=[];


                    $(".commit_content_right").each(function (index,ele) {
                        json_commit.commodities[index]={};
                        json_commit.commodities[index].id=$(ele).attr("good_id").split("_")[1];
                        json_commit.commodities[index].orderEvaluationLevel=parseInt($(ele).find(".good_score").find(".good_score_text").html()[0]);
                        json_commit.commodities[index].orderEvaluationInfo=$(ele).find(".commit_text").find(".form-control").val();
                        json_commit.commodities[index].orderEvaluationImagePath=$(ele).find(".commit_text").find(".share_pic_box").find(".row").find(".good_pic_update_button").attr("img_url");
                    })
                    console.log(json_commit);

                    $.ajax({
                        url:http+"order/evaluate?uid="+u_id+"&sid="+s_id,
                        type:"patch",
                        beforeSend: function(request) {
                            var cooinfo=getCookie("XSRF-TOKEN");
                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                            },
                        xhrFields:{withCredentials: true},
                        data:JSON.stringify({"id":order_id,"serviceEvaluationLevel":ser_score,"commodities":json_commit.commodities}),
                        contentType:"application/json;charset=UTF-8",
                        success:function (data) {
                            console.log(data);
                            if(data.msg=="SUCCESS"){
                                window.location.href="finish_commit.html";
                            }else {
                                if(data.msg=="NO_LOGIN"){
                                    window.location.href="login.html";
                                }else {
                                    $("#fail_update_content").text(data.error);
                                    $("#fail_update_Modal").modal();
                                }

                            }
                        }
                    })
                })
            }else {
                // var obj_data=JSON.parse(data);
                // console.log(obj_data);
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
//删除某个图片
function del_pic(Index,i) {
    $("#file_"+Index).val("");
    var up_num=$(".z_photo").eq(Index).find(".up_section").length;
    if(up_num<5){
        $("#file_"+Index).parent().show();
    }
    // console.log(Index);
    console.log(i)
    //打印出删除的元素
    console.log(big_img_list[Index][i]);
    //删除该图片的大盒子
    $('#i_'+Index+'_'+i).remove();
    big_img_list[Index][i]=-1;
    console.log(big_img_list);
    // return big_img_list[index];
}
function validateUp(files){
    var arrFiles = [];//替换的文件数组
    for(var i = 0, file; file = files[i]; i++){
        //获取文件上传的后缀名
        var newStr = file.name.split("").reverse().join("");
        if(newStr.split(".")[0] != null){
            var type = newStr.split(".")[0].split("").reverse().join("");
            // console.log(type+"===type===");
            if(jQuery.inArray(type, defaults.fileType) > -1){
                // 类型符合，可以上传
                if (file.size >= defaults.fileSize) {
                    $("#fail_modal_content").text(file.name +'文件大小不能超过10M');
                    $("#fail_operation_Modal").modal();
                    // alert(file.size);
                    // alert('您这个"'+ file.name +'"文件大小过大');
                } else {
                    // 在这里需要判断当前所有文件中
                    arrFiles.push(file);
                }
            }else{
                $("#fail_modal_content").text(file.name +'上传类型不符合');
                $("#fail_operation_Modal").modal();
                // alert('您这个"'+ file.name +'"上传类型不符合');
            }
        }else{
            $("#fail_modal_content").text(file.name +'没有类型, 无法识别');
            $("#fail_operation_Modal").modal();
            // alert('您这个"'+ file.name +'"没有类型, 无法识别');
        }
    }
    return arrFiles;
}
