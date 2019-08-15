/**
 * Created by MY on 2019/6/27.
 */
function skill() {
    //秒杀轮动
    var odiv = document.getElementById('skill_box');
    var oul = odiv.getElementsByTagName('ul')[0];
    var ali = oul.getElementsByTagName('li');
    var spa = -2;
    //不断填充ul 使得商品实现无缝轮播
    oul.innerHTML=oul.innerHTML+oul.innerHTML;
    oul.style.width=ali[0].offsetWidth*ali.length+'px';

    function move(){
        if(oul.offsetLeft<-oul.offsetWidth/2){
            oul.style.left='0';
        }
        if(oul.offsetLeft>0){
            oul.style.left=-oul.offsetWidth/2+'px'
        }
        oul.style.left=oul.offsetLeft+spa+'px';
    }
    var timer = setInterval(move,50);

    // oul.onmousemove=function(){
    //     clearInterval(timer);
    //     $("#arr").show();
    //
    // }
    // oul.onmouseout=function(){
    //
    //     $("#arr").hide();
    //     timer = setInterval(move,30);
    // };
    $(".skill_goods_items").mouseenter(function(){
        $("#arr").show();
        clearInterval(timer);
    }).mouseleave(function () {
        //鼠标离开窗口，开启计时器
        $("#arr").hide();
        timer=setInterval(move,50)
    })
    // // //每个商品的宽度是165 每次移动一个商品的宽度
    $("#right").click(function () {
        // target -= 165;
        spa=2;
        if(oul.offsetLeft<0) {
            oul.style.left = oul.offsetLeft + 165 + 'px';
        }
        else{  oul.style.left=-oul.offsetWidth/2+'px'
        }
        // console.log(target)
    });
    $("#left").click(function () {
        // target += 165;
        spa=-2;
        if(oul.offsetLeft>-oul.offsetWidth/2){
            oul.style.left=oul.offsetLeft - 165 + 'px';
        }
        else {
            oul.style.left='0';
        }

        // console.log(target);
    });

}