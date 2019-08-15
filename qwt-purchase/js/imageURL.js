/**
 * Created by MY on 2019/6/13.
 */
$(function () {
    //首页图片
    var online_ask="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/1e7c959e-4376-4e82-96d1-bd9ab57ab64a.jpg";
    var dingzhi="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/c69e27fe-edb4-4f34-a242-14355aefb49a.jpg";
    var compition="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/2f4b85a2-327a-462c-999a-2530eaebf0a2.png";
    var bangongwenjv="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/04c17776-0cf5-4209-b99b-bf2bad0087c1.jpg";
    var cars="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/1f025d30-9cd7-44c8-92de-ba8701651710.jpg";
    var play3c="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/c5b39ba1-4fc0-4db7-ac5c-d8e925a8de32.jpg";
    var yundonghuwai="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/08fd6f7b-8285-4d5d-b25b-604eb6567f2f.jpg";
    var jiadianguan="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/6542a7e1-6b08-4ba7-ad54-85b4d1efccda.jpg";
    var shouji="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/5e816bbb-e3c6-4719-88ca-db22470234f5.jpg";
    // var jianhang1="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/fad1c9b4-cd22-4054-be03-f8e8efb57583.png";
    var jianhang2="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/65da1949-22dc-4f83-b376-0dbff60bb178.png";
    var app="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/bbd49d15-24d3-4004-b04e-5b967c5c2ec1.jpg";
    var app_html="http://qwt-1256935978.cos.ap-chengdu.myqcloud.com/ec49499b-d197-4f98-ba3b-ed99faec3929.png";
    //监管审计跳转
    $(".check_login").click(function () {
        window.open("http://132.232.225.239:8080/platform/audit_login.html");
    })

    //普通跳转
    $(".dingzhi_info").click(function () {
        window.open("news/dingzhi_info.html");

    });
    $(".compition").click(function () {
        window.open("news/compition.html");

    });
    $(".online_ask").click(function () {
        window.open("news/online_ask.html");
    })
    //首页跳转
    $(".dingzhi_info_index").click(function () {
        window.open("mall_html/news/dingzhi_info.html");

    });
    $(".compition_index").click(function () {
        window.open("mall_html/news/compition.html");

    });
    $(".online_ask_index").click(function () {
        window.open("mall_html/news/online_ask.html");
    })
    $(".APP").click(function () {
        window.open("mall_html/news/APP.html");
    })
    //news文件夹中的跳转
    $(".dingzhi_info_news").click(function () {
        window.open("dingzhi_info.html");

    });
    $(".compition_news").click(function () {
        window.open("compition.html");

    });
    $(".online_ask_news").click(function () {
        window.open("online_ask.html");
    })

    $("#bangong_pic").attr("src",bangongwenjv);
    $("#qicheyongpin_pic").attr("src",cars);
    $("#play3c_pic").attr("src",play3c);
    $("#yongdonghuwai_pic").attr("src",yundonghuwai);
    $("#jiadian_pic").attr("src",jiadianguan);
    $("#shouji_pic").attr("src",shouji);
    $("#app_html").attr("src",app_html);
    $("#compition_html").attr("src",compition);
    $("#online_ask_html").attr("src",online_ask);
    $("#dingzhi_html").attr("src",dingzhi);
    console.log(1111)
    $(".APP").attr("src",app);
    // $(".jianshe_bank1").attr("src",jianhang1);
    $(".jianshe_bank2").attr("src",jianhang2);
    $(".jianshe_bank1").click(function () {
        window.open("https://static.leye.ccb.com/static/leyeapp/promotion/share.html");
    })
    $(".jianshe_bank2").click(function () {
        window.open("https://static.leye.ccb.com/static/leyeapp/promotion/share.html");
    })

    //首页分类跳转
    //1办公文具
    $("#bangong_pic").click(function () {
        jump_to_first(1,0,"办公文具");
    });
    $("#wenjianjia").click(function () {
        jump_to_second(1,0,"办公文具",2,0,"文件夹类");
    });
    $("#bence").click(function () {
        jump_to_second(1,0,"办公文具",14,1,"本册纸质");
    });
    $("#bijv").click(function () {
        jump_to_second(1,0,"办公文具",38,3,"笔具类");
    });
    $("#baibanpeijian").click(function () {
        jump_to_second(1,0,"办公文具",84,5,"白板配件");
    });
    $("#biaoshizhanshi").click(function () {
        jump_to_second(1,0,"办公文具",92,6,"标识展示");
    });
    //2汽车用品
    $("#qicheyongpin_pic").click(function () {
        jump_to_first(437,14,"汽车用品");
    });
    $("#meirongqingxi").click(function () {
        jump_to_second(437,14,"汽车用品",448,1,"美容清洗");
    });
    $("#weixiubaoyang").click(function () {
        jump_to_second(437,14,"汽车用品",470,3,"维修保养");
    })
    //3生活用品
    $("#play3c_pic").click(function () {
        jump_to_first(155,4,"生活用品");
    })
    $("#shenghuoyongpin").click(function () {
        jump_to_second(155,4,"生活用品",156,0,"生活用品");
    })
    $("#yinliao").click(function () {
        jump_to_second(155,4,"生活用品",177,1,"饮料");
    })
    $("#wenyuyongpin").click(function () {
        jump_to_second(155,4,"生活用品",180,2,"文娱用品");
    });
    //4体育用品
    $("#yongdonghuwai_pic").click(function () {
        jump_to_first(373,9,"体育用品");
    }); $("#qiulei").click(function () {
        jump_to_second(373,9,"体育用品",374,0,"球类");
    }); $("#qipai").click(function () {
        jump_to_second(373,9,"体育用品",377,1,"棋牌");
    }); $("#jianshenqixie").click(function () {
        jump_to_second(373,9,"体育用品",380,2,"健身器械");
    }); $("#huwaiyongpin").click(function () {
        jump_to_second(373,9,"体育用品",382,3,"户外用品");
    });
    //5办公家电
    $("#jiadian_pic").click(function () {
        jump_to_first(261,6,"办公家电");
    });
    $("#dajiadian").click(function () {
        jump_to_second(261,6,"办公家电",262,0,"大家电");
    });
    $("#shenghuodianqi").click(function () {
        jump_to_second(261,6,"办公家电",268,1,"生活电器");
    })
    //6通讯数码
    $("#shouji_pic").click(function () {
        jump_to_first(183,5,"通讯数码");
    })
    $("#diannaozhengji").click(function () {
        jump_to_second(183,5,"通讯数码",184,0,"电脑整机");
    });
    $("#diannaopeijian").click(function () {
        jump_to_second(183,5,"通讯数码",189,1,"电脑配件");
    });
    $("#wangluoshebei").click(function () {
        jump_to_second(183,5,"通讯数码",211,3,"网络设配");
    });
    $("#tongxunpeijian").click(function () {
        jump_to_second(183,5,"通讯数码",224,5,"通讯配件");
    });
    $("#shumacunchu").click(function () {
        jump_to_second(183,5,"通讯数码",234,6,"数码存储");
    });

})
function jump_to_first(firstID,firstIndex,firstName) {
    window.sessionStorage.category_id=firstID;
    window.sessionStorage.first_id=firstID;
    window.sessionStorage.first_index=firstIndex;
    window.sessionStorage.second_id="";
    window.sessionStorage.second_index="";
    window.sessionStorage.first_name=firstName;
    window.sessionStorage.second_name="";
    window.sessionStorage.third_id="";
    window.sessionStorage.third_name="";
    window.sessionStorage.search_keywords="";
    window.sessionStorage.brand='';
    window.sessionStorage.brand_name='';
    // window.sessionStorage.third_id="";
    click();
}
function jump_to_second(firstID,firstIndex,firstName,secondID,secondIndex,secondName) {
    window.sessionStorage.category_id=secondID;
    window.sessionStorage.first_id=firstID;
    window.sessionStorage.first_index=firstIndex;
    window.sessionStorage.second_id=secondID;
    window.sessionStorage.second_index=secondIndex;
    window.sessionStorage.first_name=firstName;
    window.sessionStorage.second_name=secondName;
    window.sessionStorage.third_id="";
    window.sessionStorage.third_name="";
    window.sessionStorage.search_keywords="";
    window.sessionStorage.brand='';
    window.sessionStorage.brand_name='';
    // window.sessionStorage.third_id="";
    click();
}
function click() {
    _url="mall_html/goods.html?";

    var category_id=window.sessionStorage.category_id;
    if(category_id!=""){
        _url=_url+"&cate="+category_id;
    }
    var first_id=window.sessionStorage.first_id;
    if(first_id!=""){
        _url=_url+"&cate1="+first_id;
    }
    var second_id=window.sessionStorage.second_id;
    if(second_id!=""){
        _url=_url+"&cate2="+second_id;
    }
    var third_id=window.sessionStorage.third_id;
    if(third_id!=""){
        _url=_url+"&cate3="+third_id;
    }
    var first_name=window.sessionStorage.first_name;
    if(first_name!=""){
        _url=_url+"&name1="+first_name;
    }
    var second_name=window.sessionStorage.second_name;
    if(second_name!=""){
        _url=_url+"&name2="+second_name;
    }
    var third_name=window.sessionStorage.third_name;
    if(third_name!=""){
        _url=_url+"&name3="+third_name;
    }
    var search_key=window.sessionStorage.search_keywords;
    if(search_key!=""){
        _url=_url+"&search="+search_key;
    }
    var search_good_name=window.sessionStorage.search_keywords;
    if(search_good_name!=""){
        _url=_url+"&search_name="+search_good_name;
    }
    var brand_URI=window.sessionStorage.brand;
    if(brand_URI!=""){
        _url=_url+"&brand_URL="+brand_URI;
    }
    var brand_name=window.sessionStorage.brand_name;
    if(brand_name!=""){
        _url=_url+"&brand_name="+brand_name;
    }

    window.location.href=encodeURI(_url);
}