

init();
//初始化
function init(){	
	addbg();
	var tabs=$("wrap-l").getElementsByTagName("li");
	for(var i=0;i<tabs.length;i++){
		tabs[i].iself=i;		
		tabs[i].onclick=function(){
			tab(this.iself);
		}
	}
	
}
//通过id获取元素
function $(id){
	var ele=document.getElementById(id);
	return ele;
}
//给每个item元素加上对应的背景
function addbg(){
	var items=$("wrap-r").getElementsByTagName("div");
	for(var i=0;i<items.length;i++){
		var itemsli=items[i].getElementsByTagName("li");
		for(var j=0;j<itemsli.length;j++){
			itemsli[j].style.backgroundImage="url(img/"+i+"-"+j+".jpg)";
		}
	}
}

function tab(tar){
	var items=$("wrap-r").getElementsByTagName("div");
	for(var i=0;i<items.length;i++){
		items[i].className="hide";
	}
	items[tar].className="active";
}