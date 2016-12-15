

init();
//初始化
function init(){
	var tabs=$("wrap-l").getElementsByTagName("li");
	for(var i=0;i<tabs.length;i++){
		tabs[i].iself=i;
		tabs[i].onclick=function(){
			tab(this.iself)
		}
	}
}
//通过id获取元素
function $(id){
	var ele=document.getElementById(id);
	return ele;
}
function tab(tar){
	var items=$("wrap-r").getElementsByTagName("div");
	for(var i=0;i<items.length;i++){
		items[i].className="hide";
	}
	items[tar].className="active";
}