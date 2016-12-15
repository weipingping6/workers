window.onload=function(){
	
	init();
	//初始化
	function init(){
		//生成六张小图片
		for(var i=0;i<6;i++){
			$("show-sma").getElementsByTagName("ul")[0].innerHTML+='<li><img src="img/s-'+i+'.jpg" alt=""></li>'
		}
		//移入小图片显示
		showbig();

		//tao-list中div的显示隐藏
		var tlistw=document.getElementsByClassName("tao-list-w");
		for(var i=0;i<tlistw.length;i++){
			var tlistd=tlistw[i].getElementsByTagName("div")[0]
			tlistw[i].onmouseover=function(){
				this.getElementsByTagName("div")[0].style.display="block";
				this.style.background="white";
			}
			tlistw[i].onmouseleave=function(){
				this.getElementsByTagName("div")[0].style.display="none";
				this.style.background="#f5f5f5";
			}
		}
		//网站导航部分
		


		//tb-list菜单的显示和隐藏
		$("tb-list").onmouseover=function(){
			$("list-wrap").style.display="block";
		}
		$("tb-list").onmouseleave=function(){
			$("list-wrap").style.display="none";
		}
		$("menu-all").onmouseover=function(){
			$("menu-all").getElementsByTagName("div")[0].style.display="block";
		}
		$("menu-all").onmouseleave=function(){
			$("menu-all").getElementsByTagName("div")[0].style.display="none";
		}

		//改变添加到购物车的数量
		var num=$("num").getElementsByTagName("span");
		num[0].onclick=function(){
			numreduce();
		}
		num[1].onclick=function(){
			numadd();
		}
		//尺寸选择
		var sizes=$("size").getElementsByTagName("span");
		for(var i=0;i<sizes.length;i++){
			sizes[i].iself=i;
			sizes[i].addEventListener("click", function(){
				selectsize(this.iself);				
			})
		}
		//颜色选择
		var colors=$("color").getElementsByTagName("img");
		var c_divs=$("color").getElementsByTagName("div");
		for(var i=0;i<colors.length;i++){
			colors[i].iself=i;
			colors[i].addEventListener("click", function(){
				selectcolor(this.iself);				
			});
			colors[i].addEventListener("mouseover", function(){
				c_divs[this.iself].style.display="block";				
			});
			colors[i].addEventListener("mouseleave", function(){
				c_divs[this.iself].style.display="none";				
			})
		}

		//移入大图mask+放大
		$("show-big").onmouseover=function(ev){
			$("mask").style.display="block";
			$("mask-big").style.display="block";		
			document.onmousemove=function(ev){
				var ev=ev||event;
				maskmove();
			}
			$("show-big").onmouseleave=function(){
				document.onmousemove=null;
				$("mask-big").style.display="none";
				$("mask").style.display="none";
			}
		}

	}

	//id元素选择函数
	function $(id){
		var ele=document.getElementById(id);
		return ele;
	}

	

	//小图片鼠标移入事件
	function showbig(){
		var asmapic=$("show-sma").getElementsByTagName("ul")[0].getElementsByTagName("li");
		for(var i=0;i<asmapic.length;i++){
			asmapic[i].iself=i;
			asmapic[i].onmouseover=function(){
				for(var j=0;j<asmapic.length;j++){
					asmapic[j].getElementsByTagName("img")[0].style.boxShadow="none";
				}
				$("show-big").getElementsByTagName("img")[0].src="img/s-"+this.iself+".jpg";
				this.getElementsByTagName("img")[0].style.boxShadow="0 0 0 2px #ff4400";
			}
		}
	}

	//数量变化函数
	function numreduce(){
		var numinp=$("num").getElementsByTagName("input")[0];
		if(numinp.value==1){
			return;
		}else{
			numinp.value--;
		}
	}
	function numadd(){
		var numinp=$("num").getElementsByTagName("input")[0];
		numinp.value++;
	}

	//尺寸和颜色选择函数
	function selectsize(tar){
		var sizes=$("size").getElementsByTagName("span");
		for(var i=0;i<sizes.length;i++){
			sizes[i].style.boxShadow="none";
		}
		sizes[tar].style.boxShadow="0 0 0 2px #ff4400";
	}
	function selectcolor(tar){
		var colors=$("color").getElementsByTagName("img");
		for(var i=0;i<colors.length;i++){
			colors[i].style.boxShadow="none";
		}
		colors[tar].style.boxShadow="0 0 0 2px #ff4400";
		$("show-big").getElementsByTagName("img")[0].src=colors[tar].src;
	}

	//大图片放大函数
	function bigpic(l,t){
		$("mask-big").style.height=$("show-big").offsetHeight+"px";
		var pic=$("mask-big").getElementsByTagName("img")[0];
		pic.src=$("show-big").getElementsByTagName("img")[0].src;
		pic.style.left=l+"px";
		pic.style.top=t+"px";
	}
	//mask移动函数
	function maskmove(ev){
		var ev=ev||event;
		var disx=ev.pageX-$("wrap").offsetLeft;
		var disy=ev.pageY-$("wrap").offsetTop;
		var ileft=disx-$("mask").offsetWidth/2;
		var itop=disy-$("mask").offsetHeight/2;
		if(ileft<0){
			ileft=0;
		}else if(ileft>$("show-big").offsetWidth-$("mask").offsetWidth){
			ileft=$("show-big").offsetWidth-$("mask").offsetWidth;
		}
		if(itop<0){
			itop=0;
		}else if(itop>$("show-big").offsetHeight-$("mask").offsetHeight){
			itop=$("show-big").offsetHeight-$("mask").offsetHeight;
		}
		$("mask").style.left=ileft+"px";
		$("mask").style.top=itop+"px";
		//图片放大的比例
		var pic=$("mask-big").getElementsByTagName("img")[0];
		var scalex=$("mask-big").offsetWidth/($("show-big").offsetWidth-$("mask").offsetWidth);
		var scaley=$("mask-big").offsetHeight/($("show-big").offsetHeight-$("mask").offsetHeight);
		bigpic(parseInt(-scalex*ileft),parseInt(-scaley*itop));
	}
}