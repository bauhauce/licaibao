// 获取节点
var ad = document.getElementById("ad");
var adCon = document.getElementById("adCon");
var adDot = document.getElementById("adDot");
var items = ad.getElementsByClassName("item");
var dots = ad.getElementsByClassName("dot");
var distance = parseInt(getStyle(ad, 'width')); 
window.onresize = function (){
    distance = parseInt(getStyle(ad, 'width'));
}
// 插入节点
adCon.style.width = distance*(items.legnth+1);
var addItem = document.createElement('div');
var addItem = items[0].cloneNode(true);
adCon.appendChild(addItem);
var itemIndex = 0;
var dotIndex = 0;
// 获取实时样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, false)[attr];
    }
}

//运动框架
function move(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur = 0;

        if (attr == 'opacity') {
            cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        }
        else {
            cur = parseInt(getStyle(obj, attr));
        }

        var speed = (iTarget - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (cur == iTarget) {
            clearInterval(obj.timer);
        }
        else {
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;

                document.getElementById('txt1').value = obj.style.opacity;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30);
}

// 点击圆点切换大图
for (var i = 0; i < dots.length; i ++){
    dots[i].index = i;
    dots[i].onclick = function (){
        dotIndex = this.index;
        itemIndex = dotIndex;
        for ( var j = 0; j < dots.length; j ++){
            dots[j].className = 'dot';
        }
        dots[dotIndex].className = 'dot active';
        move(adCon, 'left', -distance*(itemIndex));
    }
}

// 轮播图
function autoPlay(){
    dotIndex ++;
    if (dotIndex > dots.length - 1){
        dotIndex = 0;
    }
    for ( var j = 0; j < dots.length; j ++){
        dots[j].className = 'dot';
    }
    dots[dotIndex].className = 'dot active';

    itemIndex ++;
    if (itemIndex > items.length - 1){
        adCon.style.left = 0;
        itemIndex = 1;
    }
    move(adCon, 'left', -distance*(itemIndex));
}

// 开始轮播图
var timer = setInterval(autoPlay,3000);

// 停止轮播图
ad.onmouseover = function (){
    clearInterval(timer);
}
ad.onmouseout = function (){
    timer = setInterval(autoPlay,3000)
}