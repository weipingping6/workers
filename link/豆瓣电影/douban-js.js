// JavaScript Document
window.onload=function(){
  self.app.aclick();
}

var self={};
self.tools={};
self.tools.getByClass=function(op,iclass){
  var aele=op.getElementsByTagName('*');
  var arr=[];
  for(var i=0;i<aele.length;i++){
    if(aele[i].className==iclass){
	  arr.push(aele[i]);
	}
  }
  return arr;
}
self.tools.getStyle=function(obj,attr){
  return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}


self.ui={};
self.ui.move=function(obj,json){
  clearInterval(obj.timer);
  obj.timer=setInterval(function(){
    for(var attr in json){
	  var cur=parseInt(self.tools.getStyle(obj,attr) );
	  var speed=(json[attr]-cur)/8;
	  speed=speed>0?Math.ceil(speed):Math.floor(speed);
	  if(cur==json[attr]){
		clearInterval(obj.timer)
	  }
	  else{
		obj.style[attr]=cur+speed+'px';
	  }
	}
  },30)
}


self.app={}
self.app.aclick=function(){
  var oconl=document.getElementById('content-left');
  var acli=self.tools.getByClass(oconl,'div1-2')[0].getElementsByTagName('a');
  var omovie=document.getElementById('movie-list').getElementsByTagName('div')[0];
  var op=self.tools.getByClass(oconl,'div1-2')[0].getElementsByTagName('span')[0];
  
  var num=2;
  acli[1].onclick=function(){
	if(num==4){num=1;omovie.style.left=0+'px';}
	self.ui.move(omovie,{'left':-640*num})
	op.innerHTML=num+'/3';
	num++
  }
  acli[0].onclick=function(){
	num-=2;  
	self.ui.move(omovie,{'left':-640*num})
	if(num==0){num=3}
	if(num==2){omovie.style.left=-1920+'px';}
	op.innerHTML=num+'/3';
	num++;
  }
  
};