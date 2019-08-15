/**
 * Created by MY on 2018/10/18.
 */
$(function () {
    var http=Http;

    $.ajax({
        url:http+"notice",
        type:"get",
        xhrFields:{withCredentials: true},
        success:function(data){
            console.log(data);
            if(data.msg=="SUCCESS"){
                if(data.data.length>0){
                    for(var i=0;i<data.data.length;i++){
                        console.log(11);
                        var number = i +1;
                        var notice="<tr><td style='width:80%'>"+number+". "+data.data[i].notice+ '</td>'+ "<td style='float: right'>" +data.data[i].createTimestamp+ "</td></tr>";
                        $(".notice_box").append(notice);
                    }
                }else {
                    $(".notice_box").html("<h1>暂无公告</h1>");
                }


            }
        }
    })
})
