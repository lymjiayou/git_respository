/**
 * Created by MY on 2019/6/19.
 */

function fresh() {
    var http=Http;
    var receiver_flag="";
    // console.log(44)
    $.ajax({
        url: http + "receiver" ,
        type: "get",
        xhrFields:{withCredentials: true},
        success: function (address_list) {
            console.log(address_list);
            // console.log("fresh");
            if (address_list.msg == "SUCCESS") {
                var addr_data = address_list.data;
                window.sessionStorage.addr=addr_data;
                if(addr_data.length>0){
                    receiver_flag=true;
                    for (var i = 0; i < addr_data.length; i++) {
                        //首先显示默认收货人
                        var receiver = '<div class="radio">' + '<label class="ad_person">' +
                            '<input receiver='+addr_data[i].receiver+' address='+addr_data[i].address.split(" ")[0]+' address1='+addr_data[i].address.split(" ")[1]+' address2='+addr_data[i].address.split(" ")[2]+' detailAD='+addr_data[i].detailAddress+' phone='+addr_data[i].phone+' type="radio" name="address" class="i_' + addr_data[i].defaultReceiver + ' radio_click" value="i_' + i + '">' +
                            '<span class="ad_reciever">'+addr_data[i].receiver +'</span>'+'&nbsp&nbsp&nbsp&nbsp' +
                            '<span class="ad_address">'+addr_data[i].address + '</span>'+'&nbsp&nbsp' +
                            '<span class="ad_detailAddress">'+addr_data[i].detailAddress + '</span>'+'&nbsp&nbsp&nbsp&nbsp' +
                            '<span class="ad_phone"> '+addr_data[i].phone +'</span>'+ '</label>' + '</div>';

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

}
function clearForm(form) {
    // input清空

    $("#new_address_Modal input", form).each(function () {
        var type = this.type;
        var tag = this.tagName.toLowerCase(); // normalize case
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = "";
        // 多选checkboxes清空
        // select 下拉框清空
        else if (tag == 'select')
            this.selectedIndex = 0;
    });
    var clearWarn=$("#new_address_Modal .warn").length;
    if(clearWarn!=0){
        $("#new_address_Modal .warn").each(function () {
            $(this.remove());
        });
    }
};

