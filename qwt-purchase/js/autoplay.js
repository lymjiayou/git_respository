/**
 * Created by hc on 2017/3/13.
 */
/**
 * 轮播图
 */
window.onload = function () {
    function $(id) {
        return typeof id==='string'?document.getElementById(id):id;
    }
    var index=0;
    var timer=null;
    var pic=$("slides").getElementsByTagName("li");
    var num=$("my_clcles").getElementsByTagName("li");//根据图片数量获得小圆点数量
    var flash=$("flash");
    var left=$("left_arrow");
    var right=$("right_arrow");
    //单击左箭头
    left.onclick=function(){
        index--;
        if (index<0) { //如果index切换到左边界 就重新设置为右边界的图片 实现无缝轮动
            index=num.length-1
        };
        changeOption(index);
    }
    //单击右箭头
    right.onclick=function(){
        index++;
        if (index>=num.length) {
            index=0
        };
        changeOption(index);
    }
    //鼠标划在窗口上面，停止计时器
    flash.onmouseover=function(){
        clearInterval(timer);
    }
    //鼠标离开窗口，开启计时器
    flash.onmouseout=function(){
        timer=setInterval(run,5000)
    }
    //鼠标划在页签上面，停止计时器，手动切换
    for(var i=0;i<num.length;i++){
        num[i].id=i;
        num[i].onmouseover=function(){
            clearInterval(timer);
            changeOption(this.id);
        }
    }
    //定义计时器
    timer=setInterval(run,5000)
    //封装函数run
    function run(){
        index++;
        if (index>=num.length) {
            index=0
        };
        changeOption(index);
    }
    //封装函数changeOption  展示当前图片 并改变样式
    function changeOption(curindex){
        // console.log(index)
        for(var j=0;j<num.length;j++){
            pic[j].style.display="none";
            num[j].className="no_current";
        }
        pic[curindex].style.display="block";
        num[curindex].className="clcles_current";
        index=curindex;
    }
};
