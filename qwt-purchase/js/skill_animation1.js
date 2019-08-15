/**
 * Created by MY on 2019/6/27.
 */
window.onload=function(){
    console.log(111)
    var odiv = document.getElementById('skill_box');
    console.log(odiv)
    var oul = odiv.getElementsByTagName('ul')[0];
    var ali = oul.getElementsByTagName('li');
    var spa = -2;
    oul.innerHTML=oul.innerHTML+oul.innerHTML;
    oul.style.width=ali[0].offsetWidth*ali.length+'px';
    console.log(oul.offsetLeft);
    function move(){
        console.log(234)
        if(oul.offsetLeft<-oul.offsetWidth/2){
            oul.style.left='0';
        }
        if(oul.offsetLeft>0){
            oul.style.left=-oul.offsetWidth/2+'px'
        }
        oul.style.left=oul.offsetLeft+spa+'px';
    }
    var timer = setInterval(move,30)

    odiv.onmousemove=function(){clearInterval(timer);}
    odiv.onmouseout=function(){timer = setInterval(move,30)};
    document.getElementsByTagName('a')[0].onclick = function(){
        spa=-2;
    }
    document.getElementsByTagName('a')[1].onclick = function(){
        spa=2;
    }
}