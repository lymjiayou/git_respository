/**
 * Created by MY on 2019/6/16.
 */
function seckill(len) {
    // //勤务通秒杀商品轮动展示区
    var leader = 0,target = 0;
    setInterval(function() {
        if(target >= 0)
        {
            target = 0;
        }
        else if(target <= -1170)
        {
            // target = -1170;
        }
        leader = leader + (target - leader) / 10;

        $(".skill_box_ul").get(0).style.left = leader+ "px";
    },60);
    // //定义计时器
    var timer=setInterval(run,100)
    // //鼠标划在窗口上面，停止计时器
    $(".skill_goods_items").mouseenter(function(){
        console.log(222)
        // clearInterval(timer);
        $("#arr").show()
    }).mouseleave(function () {
        //鼠标离开窗口，开启计时器
        // timer=setInterval(run,100)
        $("#arr").hide();
    })
    function run() {
        if(target<=-1170){
            target=1170

        }else {
            target-=5;
        }
    }

};
