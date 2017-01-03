//选中加入购物车的按钮,并添加事件
var wp={};
wp.$addbk = $("#book-wrap").find(".book-add");
wp.$sel=$("#book-wrap").find(".bi-price");
wp.$sel.attr("onoff",true);
wp.$addbk.click(function(){
	$("#blank").remove();
	if( $(this).siblings(".bk-select").attr("onoff")=="true" ){
		wp.fn.createList( $(this).parent().parent());
		$(this).siblings(".bk-select").attr("onoff",false);
	}else{
		wp.fn.addnum( $(this).parent().parent());
	}
	wp.fn.sum();
})
//选择书本属性：精装或平装
wp.$selprice=$("#book-wrap").find(".bi-price");
wp.$selprice.click(function(){
	this.className+=" bk-select";
	$(this).siblings(".bi-price").attr("class","bi-price");
})
//删除购物车中的选项
$("#top-wrap").delegate($(".delbook"), 'click', function(ev) {
	var ev=ev||window.event;
	if( ev.target.className!="delbook" ){
		return;
	}else{
		wp.fn.delbook( $(ev.target) );
	}
});



wp.fn={};
//给书本每一项添加索引ix
wp.fn.addIndex=function(eles){
	eles.each(function(i,ele){
		$(ele).attr("ix",i)
	});
}
wp.fn.addIndex( $(".book-i") );

//点击加入购物车，生成书本项目
wp.fn.createList=function(booki){
	var $list=$("<div>").attr("class","list");
	var $listItem=$("<div>").attr("class","list-item");
	//创建li-post并给其中的图片加地址
	var $liPost=$("<div>").attr("class","li-post").html("<img src="+ booki.find('.book-post>img')[0].src +">");
	//创建li-info，并给书本添加信息
	var $liInfo=$("<div>").attr("class","li-info").html(' <p><a href="javascript:;">'+ booki.find(".bi-title>span")[0].innerHTML +'</a><span>'+ booki.find(".bi-author")[0].innerHTML +'</span></p><p>'+ booki.find(".bk-select").find("p")[0].innerHTML +'</p><p>现在有货</p><p>此商品可享受满99元免费送货</p><p><a href="javascript:;" class="delbook">删除</a><a href="javascript:;">移入收藏夹</a></p> ');
	$listItem.append($liPost);
	$listItem.append($liInfo);
	$list.append($listItem);
	
	var $listPrice=$("<span>").attr("class","list-price").html( booki.find(".bk-select").find("p")[1].innerHTML );
	$list.append($listPrice);

	var $listNum=$("<span>").attr("class","list-num").html( '<span>-</span><input type="text" value=1><span>+</span> ' ).attr("ix",booki.attr("ix"));
	$list.append($listNum);
	$("#foot").before($list)
}
//购物车里有该书本之后，再点击添加不再生成，增加数量
wp.fn.addnum=function(booki){
	var tar;
	$(".list-num").each(function(i,ele){
		if( $(ele).attr("ix")== booki.attr("ix") ){
			$(ele).find("input")[0].value++;
		}
	})
}
//点击加减号改变书本数量
wp.fn.changenum=function(){
	wp.$num= $(".list-num");
	wp.$num.each(function(i,ele){
		$("#top-wrap").delegate($(ele).find("span").eq(0), 'click', function(ev) {
			var ev=ev||window.event;
			if( $(ev.target).next("input").length!=0 ){
				if($(ev.target).siblings("input")[0].value==1){
					return;
				}else{
					$(ev.target).siblings("input")[0].value--;
					wp.fn.sum();
				}
			}else{
				return;
			}
		});
		$("#top-wrap").delegate($(ele).find("span").eq(1), 'click', function(ev) {
			var ev=ev||window.event;
			if( $(ev.target).prev("input").length!=0 ){
				$(ev.target).prev("input")[0].value++;
				wp.fn.sum();
			}else{
				return;
			}
		});
		return false;

	})
}
wp.fn.changenum()
//删除购物车中的选项
wp.fn.delbook=function(obj){
	obj.parents(".list").remove();
	obj.siblings(".bk-select").attr("onoff",true);
	wp.fn.sum();
	if( $(".list").length==1 ){
		var blank=$("<div id='blank'>购物车是空的哦~~~</div>");
		$(".list-head").after(blank);
	}
}
//购物车小计计算
wp.fn.sum=function(){
	var num = 0;
	var mon = 0;
	$(".list").each(function(i,ele){
		var inp = $(ele).find(".list-num").find("input");
		var pri=$(ele).find(".list-price");
		if( inp.length!=0 ){
			mon += parseInt( inp.val() )* pri.html().slice(1) ;
			num += parseInt( inp.val() );
		}
	})
	$("#foot").find("span").eq(0).html( num );
	$("#foot").find("span").eq(1).html( wp.fn.two( mon ) );
}
//保留两位小数的方法
wp.fn.two=function(num){
	num+="";
	if( num.indexOf(".")!=-1 ){
		num+="00";
	}else{
		num+=".00";
	}
	return num.slice(0,num.indexOf(".")+3);
}