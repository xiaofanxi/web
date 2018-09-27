window.onload = function () {
    (function () {
        var length = 5 * 5 * 5,
            oUl = document.getElementById("list").children[0],
            aLi = oUl.children;

        //初始化随机显示
        (function () {
            for (var i = 0; i < length; i++) {
                var oLi = document.createElement("li");
                oLi.x = i % 5;
                oLi.y = Math.floor(i % 25 / 5);
                oLi.z = 4-Math.floor(i / 25);
                var d = flyData[i]||flyData[0];
                oLi.innerHTML = "<b class='liCover'></b>"+
                    "<p class='liTitle'>"+d.type+"</p>"+
                    "<p class='liAuthor'>"+d.author+"</p>"+
                    "<p class='liTime'>"+d.time+"</p>";
                //oLi.innerHTML = "x:" + oLi.x + ",y:" + oLi.y + ",z:" + oLi.z;
                var initX = Math.random() * 6000 - 3000,
                    initY = Math.random() * 6000 - 3000,
                    initZ = Math.random() * 6000 - 3000;
                oLi.style.transform = "translate3D(" + initX + "px," + initY + "px," + initZ + "px)";
                oUl.appendChild(oLi);
            }
            setTimeout(Table, 200);
        })();

        (function () {
            var alertP = document.getElementById("alertPage"),
                oAll = document.getElementById("all"),
                oBack = document.getElementById("back");
            oUl.onclick = function (e) {
                e.cancelBubble = true;
                console.log("oUL");
                var target = e.target;
                if (/b/i.test(target.nodeName)) {
                    console.log(getComputedStyle(alertP).display);
                    if(getComputedStyle(alertP).display == "none"){
                        show(500);
                    }else{
                        hidden(500);
                    }
                }
                alertP.onclick = function (e) {
                    console.log("alertP");
                    e.cancelBubble = true;
                    oAll.className = "left";
                };
            }
            oBack.onclick = function (e) {
                oAll.className = "";
                hidden(1000);
            }
            document.onclick = function () {
                console.log("document");
                hidden(500);
            }
            function show(time) {
                if(!alertP.timer){
                    console.log("show");
                    alertP.timer = true;
                    alertP.style.display = "block";
                    alertP.style.transform = "rotateY(0deg) scale(2)";
                    alertP.style.opacity = "0";
                    var cTime = new Date();
                    m();
                    function m(){
                        var prop = (new Date() -cTime)/time;
                        if(prop>=1){
                            prop = 1;
                            alertP.timer = false;
                        }else{
                            requestAnimationFrame(m);
                        }
                        alertP.style.transform = "rotateY(0deg) scale("+(2-prop)+")";
                        alertP.style.opacity = prop;
                    }
                }
            }
            function hidden(time) {
                if(alertP.style.display == "block"&&!alertP.timer){
                    alertP.timer = true;
                    var cTime = new Date;
                    m();
                    function m() {
                        var prop = (new Date - cTime)/time;
                        if(prop>=1){
                            prop = 1;
                            alertP.timer = false;
                            alertP.style.display = "none";
                        }else{
                            requestAnimationFrame(m);
                        }
                        alertP.style.transform = "rotateY("+180*prop+"deg) scale("+(1-prop)+")";
                        alertP.style.opacity = 1-prop;
                    }
                }
            }
            
        })();

        //点击事件,点击后展示不同布局
        !function () {
            var aBtn = document.getElementById("btn").getElementsByTagName("li"),
                arr = [Table, Sphere, Helix, Grid],
                arrLength = aBtn.length;
            for (var i = 0; i < arrLength; i++) {
                aBtn[i].onclick = arr[i];
            }
        }();

        //拖拽/滚轮事件的添加
        (function () {
            //拖拽旋转
            var roX = 0,//初始化时oUl的X方向旋转值
                roY = 0,//初始化时oUl的Y方向旋转值
                trZ = -1500,//初始化时oUl的3D转化,Z方向的值
                timerMouse = null;
            document.onselectstart = function () {
                return false;
            };
            document.ondrag = function () {
                return false;
            };
            document.onmousedown = function (e) {
                cancelAnimationFrame(timerMouse);
                var sX = e.clientX,//鼠标开始位置
                    sY = e.clientY,
                    lastX = sX,
                    lastY = sY,
                    _x = 0,
                    _y = 0;
                this.onmousemove = function (e) {
                    _x = e.clientX - lastX;//鼠标x方向移动距离
                    _y = e.clientY - lastY;//鼠标y方向移动距离
                    roX -= _y * 0.15;//转动弧度
                    roY += _x * 0.15;
                    oUl.style.transform = "translateZ(" + trZ + "px) rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
                    lastX = e.clientX;
                    lastY = e.clientY;
                };
                this.onmouseup = function () {
                    this.onmousemove = null;

                    function inertance() {//惯性函数
                        cancelAnimationFrame(timerMouse);
                        _x *= 0.9;
                        _y *= 0.9;
                        roX -= _y * 0.15;
                        roY += _x * 0.15;
                        oUl.style.transform = "translateZ(" + trZ + "px) rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
                        if (Math.abs(_x) < 1 && Math.abs(_y) < 1) return;//Math.abs()计算绝对值
                        timerMouse = requestAnimationFrame(inertance);
                    };
                    requestAnimationFrame(inertance);
                }
            };
            //滚轮事件放大缩小
            ~function (fn) {
                var d;
                if (document.onmousewheel === undefined) {
                    document.addEventListener("DOMMouseScroll", function (e) {//firefox,向下滚动为正数3,6
                        d = -e.detail / 3;
                        fn.call(this, d);
                    });
                } else {
                    document.onmousewheel = function (e) {//chrome,opera,safari,ie,向下滚动为负数-120
                        d = e.wheelDelta / 120;
                        fn.call(this, d);
                    }
                }
            }(function (d) {
                trZ += d * 150;
                oUl.style.transform = "translateZ(" + trZ + "px) rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
            });
        })();

        //Table布局
        function Table() {
            if (Table.arr) {
                for (var i = 0; i < length; i++) {
                    aLi[i].style.transform = Table.arr[i];
                }
            } else {
                Table.arr = [];
                var n = Math.ceil(length / 18) + 2,
                    midY = n / 2 - 0.5,
                    midX = 18 / 2 - 0.5,
                    disX = 170,
                    disY = 210,
                    arr = [
                        {x: 0, y: 0},
                        {x: 17, y: 0},
                        {x: 0, y: 1},
                        {x: 1, y: 1},
                        {x: 12, y: 1},
                        {x: 13, y: 1},
                        {x: 14, y: 1},
                        {x: 15, y: 1},
                        {x: 16, y: 1},
                        {x: 17, y: 1},
                        {x: 0, y: 2},
                        {x: 1, y: 2},
                        {x: 12, y: 2},
                        {x: 13, y: 2},
                        {x: 14, y: 2},
                        {x: 15, y: 2},
                        {x: 16, y: 2},
                        {x: 17, y: 2}
                    ];
                for (var i = 0; i < length; i++) {
                    var x, y;
                    if (i < 18) {
                        x = arr[i].x;
                        y = arr[i].y;
                    } else {
                        x = i % 18;
                        y = Math.floor(i / 18) + 2;
                    }
                    var val = "translate3D(" + (x - midX) * disX + "px," + (y - midY) * disY + "px,0px)";
                    Table.arr[i] = val;
                    aLi[i].style.transform = val;
                }
            }
        }

        //Sphere布局
        function Sphere() {
            var arr = [1, 3, 5, 8, 12, 16, 22, 18, 14, 10, 7, 5, 3, 1],
                arrLength = arr.length,
                degX = 180 / (arrLength - 1);
            //计算当前的ali[i]处于第几层,第几个
            for (var i = 0; i < length; i++) {
                var floor = 0,
                    num = 0,
                    sumNum = 0;
                for (var j = 0; j < arrLength; j++) {
                    sumNum += arr[j];
                    if (sumNum > i) {
                        floor = j;
                        num = arr[j] - (sumNum - i);
                        break;
                    }
                }
                var degY = 360 / arr[floor];
               // aLi[i].innerHTML = "第" + floor + "层,第" + num + "个";
                aLi[i].style.transform = "rotateY(" + degY * (num + 1.1) + "deg) rotateX(" + (90 - degX * floor) + "deg) translateZ(800px)";
            }
        }

        //Helix布局
        function Helix() {
            var num = Math.round(125 / 4),
                degNum = 360 / num,
                centerNum = Math.floor(125 / 2),
                stepSize = 7;
            for (var i = 0; i < length; i++) {
                aLi[i].style.transform = "rotateY(" + degNum * i + "deg) translateY(" + (i - centerNum) * stepSize + "px) translateZ(800px)";
            }
        }

        //Grid布局
        function Grid() {
            var disX = 350,
                disY = 350,
                disZ = 350;
            for (var i = 0; i < length; i++) {
                var oLi = aLi[i];
                var x = (oLi.x - 2) * disX,
                    y = (oLi.y - 2) * disY,
                    z = (oLi.z - 2) * disZ;
                oLi.style.transform = "translate3D(" + x + "px," + y + "px," + z + "px" + ")";
            }
        }
    })();
};