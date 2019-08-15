/**
 * Created by MY on 2018/9/9.
 */
var big_img_list=new Array();
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
        success:function (data) {
            if(data.msg=="SUCCESS"){
                console.log(data);
                $(".order_num").html(data.data.id);
                $(".order_time").html(data.data.createTimestamp);
                var order_commodities=data.data.commodities;
                console.log(order_commodities);
                for(var i=0;i<order_commodities.length;i++){
                    console.log(order_commodities[i].state)
                    if(order_commodities[i].state==4){
                        var commit_good='<div class="commit_content">'+'<div class="commit_content_left">'+'<div class="good_pic">'+'<img src='+order_commodities[i].logoPath+' alt="">'+'</div>'+
                            '<span>'+order_commodities[i].commodityName+'</span>'+'<span>'+'￥'+order_commodities[i].totalAmount+'</span>'+'</div>'+
                            '<div class="commit_content_right" good_id=i_'+order_commodities[i].id+'>'+'<div class="good_score">'+'<span class="score_text">'+'商品评分'+'</span>'+
                            '<div class="star_box1" id="star0_'+i+'" score="">'+'<ul>'+'<li>'+'</li>'+'<li>'+'</li>'+'<li>'+'</li>'+'<li>'+'</li>'+'<li>'+'</li>'+
                            '</ul>'+'</div>'+'<div class="good_score_text" id="score_'+i+'">'+'5分'+'</div>'+'</div>'+'<div class="commit_text">'+'<span>'+'评价晒单'+'</span>'+
                            '<textarea class="form-control" rows="5" placeholder="请写下你对订单的评价~">'+'</textarea>'+'<div class="share_pic_box">'+
                            '<div class="confirm_update" style="margin:5px">'+'<i style="color: #ee2222">'+'*'+'</i>'+'选择图片后请点击 "上传图片" 完成上传'+'</div>'+
                            '<div class="row" id="row_'+i+'">'+'<div class="pic_box" id="updatebox_'+i+'">'+'<label for="file_'+i+'">'+'<div class="panel update_pic_l">'+'<div class="addbox">'+'<span class="icon-add">'+'+'+'</span>'+'</div>'+
                            '<input class="pic_show_input" type="file" id="file_'+i+'" style="display: none" />'+'</div>'+'</label>'+'</div>'+'<span class="enough">'+'最多只能添加5张图片！'+'</span>'+
                            '<div class="good_pic_update_button" id="i_'+i+'">'+'上传图片'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>'+'</div>';
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

                $(".row").each(function (index,ele) {
                    var img_list=new Array();
                    // console.log(index);
                    // console.log(img_list);
                    var del_index=0;
                    $(ele).find(".pic_show_input").change(function () {
                        var that=$(this);
                        // console.log(that)
                        var Index=index
                        var html = "<div class='pic_content' id='i_"+Index+"_"+del_index+"'><div class='pic_box'><img class='updateimg img-responsive' src='' style='width: 100%;height: 100%;'/></div><div class='delete_good_pic_button' onclick='del_pic("+Index+","+del_index+")' style='display: none'>删除</div></div>";
                        $("#updatebox_"+index).before(html);
                        del_index++;
                        // formData.append('file',$("#file_"+index)[0].files[0
                        var imgFile = that[0].files[0];
                        var fr = new FileReader();
                        fr.onload = function() {
                            var imgs = that.parent().parent().parent().parent().parent().find(".pic_box").find('.updateimg');
                            imgs[imgs.length-1].src = fr.result;
                        };
                        fr.readAsDataURL(imgFile);
                        //将图片插入数组中
                        img_list.push(imgFile);
                        big_img_list[index]=img_list;
                        console.log(big_img_list)
                        //若要删除图片,首先先显示出删除按钮
                        $(".pic_content").each(function (index,ele) {
                            $(ele).mouseenter(function () {
                                $(this).find(".delete_good_pic_button").show();
                            }).mouseleave(function () {
                                $(this).find(".delete_good_pic_button").hide();
                            })
                        })
                        // $(".delete_good_pic_button").on("click",function () {
                        //     // $(e).click(function () {
                        //     var that_pic_box=$(this).parent().parent();
                        //     console.log(23313)
                        //     // img_list.splice(i,1);
                        //     // console.log(img_list);
                        //     // that_pic_box.remove();
                        //     // })
                        // })
                        //判断上传图片的张数
                        var pic_boxs=that.parent().parent().parent().parent().parent().find(".pic_box");
                        // console.log(pic_boxs.length)
                        if(pic_boxs.length>5){
                            that.parent().parent().parent().parent().parent().find(".pic_box:last").hide();
                            that.parent().parent().parent().parent().parent().find(".enough").show();
                        }
                        // console.log( $(ele).find(".delete_good_pic_button").length)
                    });

                    $(ele).find(".good_pic_update_button").click(function () {
                        var that=$(this);
                        var row_index=that.attr("id").split("_")[1];
                            console.log(big_img_list[row_index])
                            var formData=new FormData();
                            for(var i=0;i<big_img_list[row_index].length;i++){
                                //多个文件一定要变成负数files
                                console.log(big_img_list[row_index][i])
                                if(big_img_list[row_index][i]!=-1){
                                    formData.append('files',big_img_list[row_index][i]);
                                }

                            }
                            console.log(formData);
                            $.ajax({
                                url:http+"images/upload?uid="+u_id+"&sid="+s_id,
                                type:"put",
                                beforeSend: function(request) {
                                    var cooinfo=getCookie("XSRF-TOKEN");
                                    request.setRequestHeader("X-XSRF-TOKEN", cooinfo);
                                },
                                data:formData,
                                processData : false,
                                contentType : false,
                                success:function (data) {
                                    if(data.msg=="SUCCESS"){
                                        console.log(data);
                                        $("#success_update_Modal").modal();
                                        var img_url=data.data;
                                        that.attr("img_url",img_url);
                                    }else {

                                        if(data.msg=="NO_LOGIN"){
                                            window.location.href="login.html";
                                        }else {
                                            $("#fail_update_content").text(data.error);
                                            $("#fail_update_Modal").modal();
                                        }
                                    }
                                }
                        });
                    })

                })
//

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
                        json_commit.commodities[index].id=parseInt($(ele).attr("good_id").split("_")[1]);
                        json_commit.commodities[index].orderEvaluationLevel=parseInt($(ele).find(".good_score").find(".good_score_text").html()[0]);
                        json_commit.commodities[index].orderEvaluationInfo=$(ele).find(".commit_text").find(".form-control").val();
                        json_commit.commodities[index].orderEvaluationImagePath=$(ele).find(".commit_text").find(".share_pic_box").find(".row").find(".good_pic_update_button").attr("img_url");
                    })
                    console.log(json_commit);

                    $.ajax({
                        url:http+"order/evaluate?uid="+u_id+"&sid="+s_id,
                        type:"patch",                        beforeSend: function(request) {                            var cooinfo=getCookie("XSRF-TOKEN");                            console.log(cooinfo);                            request.setRequestHeader("X-XSRF-TOKEN", cooinfo);                        },
                        data:JSON.stringify({"id":parseInt(order_id),"serviceEvaluationLevel":ser_score,"commodities":json_commit.commodities}),
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
function del_pic(Index,i) {
    // console.log(Index);
    console.log(i)
    //打印出删除的元素
    console.log(big_img_list[Index][i]);
    // console.log(big_img_list)
    // that_pic_box.remove();
    //删除该图片的大盒子
    $('#i_'+Index+'_'+i).remove();
    //在二维数组中删除该元素
    // big_img_list[Index].splice(i,1);
    big_img_list[Index][i]=-1;
    // console.log(big_img_list[Index]);
    var pic_boxs=$('#row_'+Index).find(".pic_box");
    // console.log(pic_boxs.length)
    if(pic_boxs.length<6){
        pic_boxs.show();
        pic_boxs.parent().find(".enough").hide();
    }
}
