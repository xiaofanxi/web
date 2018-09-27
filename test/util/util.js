function $(v){
	if(typeof v === 'function'){
		window.onload = v;
	}else if(typeof v === 'string'){
		return document.getElementById(v);
	}else if(typeof v === 'object'){
		return v;
	}
}
/*	getComputedStyle()     IE6,7,8不兼容      可能getComputedStyle(obj,1)里面有参数旧的火狐 
	currentStyle()  	   标志浏览器不兼容	
	background:url() red ...... 复合样式(不要获取)
	backgroundColor			单一样式(不要用来做判断)
	不要获取未设置后的样式:不兼容
	不要有空格*/
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
/*移动位置*/
function doMove(obj,direction,dir,target,backFunc){//标签对象,方向,步长,目标	
	dir = parseInt(getStyle(obj,direction)) < target?dir:-dir;
	clearInterval(obj.timer);	
	obj.timer = setInterval(function(){
		var speed = parseInt(getStyle(obj,direction))+dir;
		if(speed > target && dir > 0||speed < target && dir < 0){//往前跑,往后跑
			speed = target;
		}	
		obj.style[direction] = speed + 'px';
		if(speed == target){
			clearInterval(obj.timer);
			if(backFunc){
				backFunc();
			}//等价backFunc&&backFunc();
				//backFunc&&backFunc();
		}		
	},30);		
}
/*抖动*/
function shake(obj,direction,backFunc){
	var pos = parseInt(getStyle(obj,direction));
	var num=0;	
	var arr = [];
	for(var i=20;i>0;i-=2){
		arr.push(i,-i);
	}
    console.log(arr);
    clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		obj.style[direction] = pos+arr[num]+'px';
		num++;
		if(num === arr.length){
			clearInterval(obj.timer);
			backFunc&&backFunc();
		}	
	},50);	
}
/*转换为两位数*/
function toTwo(num){
	return num<10?'0'+num:''+num;
}
/*毫秒转换为时分秒*/
function toDate(t){
	return Math.floor(t/86400)+'天'+Math.floor(t%86400/3600)+'时'+Math.floor(t%86400%3600/60)+'分'+t%60+'秒';	
}
/*检测字符串是否全是数字*/
function detectNum(str){
	var n = 0;
	for(var i=0;i<str.length;i++){
		n = str.charCodeAt();
		if(n<48||n>57)return false;
	}
	return true;	
}
/*字符串分组*/
function groupStr(str,num){
	var iNum = str.length%num;
	var prev = '';
	var arr = [];
	var iNow = 0;
	var tmp = '';
	if(iNum != 0){
		prev = str.substring(0,iNum);
		arr.push(prev);
	}	
	str = str.substring(iNum);
	for(var i=0;i<str.length;i++){
		iNow++;
		tmp += str[i];
		if(iNow == num&&tmp){
			arr.push(tmp);
			tmp = '';
			iNow = 0;
		}
	}
	return arr.join(',');
}
/*字符串分组*/
function groupStr1(str){
	var re = /(?=(?!\b)(\d{4})+$)/g;
	return str.replace(re,',');
}
/*递归输出数组*/
function show(num){
	var arr = [];
	/*return (function(){
		arr.unshift(num);
		num--;
		if(num!=0){
			arguments.callee();
		}	
		return arr;
	})();*/
	arr.length = num+1;
	var str = arr.join('a');
	var arr2 = [];
	str.replace(/a/g,function(){
		arr2.unshift(num--)});
	return arr2;
}
/*数组内json对象按属性排序*/
var arr = [{name:'zlw',age:24},{name:'dag',age:41},{name:'faf',age:31}];
var compare = function(obj1,obj2){
	var val1 = obj1.name;
	var val2 = obj2.name;
	if(val1<val2){
		return -1;
	}else if(val1>val2) {
		return 1;
	}else{
		return 0;
	}
}
arr.sort(compare);

/*检测插件(IE中无效)*/
function hasPlugin(name){
	name = name.toLowerCase();
	for(var i=0;i<navigator.plugins.length;i++){
		if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
			return true;
		}
	}
	return false;
}
//检测Flash
alert(hasPlugin("Flash"));
//检测QuickTime
alert(hasPlugin("QuickTime"));

/*检测IE中插件,name是插件COM唯一标识符*/
function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		return true;	
	}catch(ex){
		return false;	
	}	
}
//检测Flash
alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
//检测QuickTime
alert(hasIEPlugin("QuickTime.QuickTime"));

/*检测所有浏览器插件name插件名,comName插件COM唯一标识符*/
function hasPlugins(name,comName){
	var result = hasPlugin(name);
	if(!result){
		result = hasIEPlugin(comName);
	}
	return result;
}


/*加载外部.js文件*/
function loadScriptString(url){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
}


/*加载文本*/
function loadScriptString(code){
	var script = document.createElement("script");
	script.type = "text/javascript";
	try {
		script.appendChild(document.createTextNode(code));
	} catch (ex){
		script.text = code;
	}
	document.body.appendChild(script);
}

function addScript(){
	loadScriptString("function sayHi(){alert('hi');}");
	sayHi();
}

/*加载css样式*/
 function loadStyleString(css){
	var style = document.createElement("style");
	style.type = "text/css";
	try{
		style.appendChild(document.createTextNode(css));
	} catch (ex){
		style.styleSheet.cssText = css;
	}
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(style);
}

function addStyle(){
	loadStyleString("body{background-color:red}"); 
}

/*contains方法判断两个节点关系 1,无关  2,居前  4,居后 8,包含  16,被包含*/
function contains(refNode, otherNode){
	if (typeof refNode.contains == "function" && 
			(!client.engine.webkit || client.engine.webkit >= 522)){
		return refNode.contains(otherNode);
	} else if (typeof refNode.compareDocumentPosition == "function"){
		return !!(refNode.compareDocumentPosition(otherNode) & 16);
	} else {
		var node = otherNode.parentNode;
		do {
			if (node === refNode){
				return true;
			} else {
				node = node.parentNode;
			}
		} while (node !== null);
		return false;
	}
}

function getContains(){
	alert(contains(document.documentElement, document.body));	
}