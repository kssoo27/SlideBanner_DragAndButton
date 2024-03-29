$(function(){
// 기초 STYLE 설정
	var keyTotal=$(".mainBanner li").length;
	var liList=$(".mainBanner li");
	$(".mainBanner ul").css({width:100*(keyTotal+2)+"%"});
	$(".mainBanner li").css({width:100/(keyTotal+2)+"%"});
	var mainBannerFirst=$(".mainBanner li").eq(0).clone();
	var mainBannerLast=$(".mainBanner li").last().clone();
	$(".mainBanner ul").append(mainBannerFirst);
	$(".mainBanner ul").prepend(mainBannerLast);
	$(".mainBanner ul").css({left:"-100%"});
	var bannerWidth=$(".mainBanner li").width();
	var keyIndex=0;

// bannerMovement
	function bannerMovement(){
		$(".mainBanner").removeClass("transNone");
		bannerAmount=keyIndex*bannerWidth*(-1);
		$(".mainBanner ul").css({transform:"translateX("+bannerAmount+"px)"});
		if(keyIndex==keyTotal){
			keyIndex=0;
		}
		else if(keyIndex==-1){
			keyIndex=(keyTotal-1);
		}
		$(".controller a").eq(keyIndex).siblings().removeClass("on");
		$(".controller a").eq(keyIndex).addClass("on");
	}
	$(".mainBanner ul").on("transitionend", function(){
		$(".mainBanner ul").addClass("transNone");
		$(".mainBanner ul").css({transform:"translatex("+keyIndex*bannerWidth*(-1)+"px)"});
		setTimeout(function(){
			$(".mainBanner ul").removeClass("transNone");
		},300);
	});
	
// controller 컨트롤러
	$(".controller a").eq(0).addClass("on");
	$(".controller a").click(function(e){
		e.preventDefault();
		keyIndex=$(this).index();
		bannerMovement();
	});
	
// keyvisual 드래그 슬라이드
	var bannerAmount="";
	var bannerUpdownFlag=true;
	//터치 시작
	$(".mainBanner ul").on("touchstart", function(e){
		bannerUpdownFlag=true;
		$(".mainBanner ul").on("touchmove", bannerMove);
		prevX=event.touches[0].screenX;
	});
	// 터치 움직임
	$(".mainBanner ul").on("touchmove", bannerMove=function(e){
		moveX=event.touches[0].screenX;
		if(bannerUpdownFlag){
			if(prevX!=moveX){ // 좌우 움직임
				bannerUpdownFlag=false;
			}
			else{ // 상하 움직임
				$(".mainBanner ul").off("touchmove", bannerMove);
			}
		}
		else{
			bannerAmount=moveX-prevX;
			
			$("body").addClass("fixed");
			$(".mainBanner ul").addClass("transNone");
			$(".mainBanner ul").css({transform:"translateX("+(((-1)*keyIndex*bannerWidth)+bannerAmount)+"px)"});
		}
	});
	//터치 끝
	$(".mainBanner ul").on("touchend", function(e){
		if(bannerUpdownFlag) return false;
		nextX=event.changedTouches[0].screenX;	
		$("body").removeClass("fixed");
		// console.log(nextX);
		if(prevX-nextX> 100){ // 우측으로 슬라이드	
			keyIndex++;
		}
		else if(nextX-prevX> 100){ // 좌측으로 슬라이드
			keyIndex--;
		}
		$(".mainBanner ul").removeClass("transNone");
		bannerMovement();
	});
});