window.addEventListener("load", function(){
// 기초 스타일 설정
	var body=document.querySelector("body");
	var mainBanner=document.querySelector(".mainBanner ul");
	var mainBannerList=document.querySelectorAll(".mainBanner ul li");
// 슬라이드 개수
	var keyTotal=mainBannerList.length;
	for(i=0; i<keyTotal; i++){
		mainBannerList[i].style.width=100/(keyTotal+2)+"%";
	}
	mainBanner.style.width=(keyTotal+2)*100+"%";
	var bannerWidth=mainBannerList[0].clientWidth;
	var mainBannerFirst=mainBannerList[0].cloneNode(true);
	var mainBannerLast=mainBanner.lastElementChild.cloneNode(true);
	mainBanner.appendChild(mainBannerFirst);
	mainBanner.insertBefore(mainBannerLast, mainBannerList[0]);
	mainBanner.style.left="-100%";
// controller 컨트롤러
	var keyIndex=0;
	var keyControl=document.querySelectorAll(".controller a");
	keyControl[0].classList.add("on");

	for(i=0; i<keyControl.length; i++){
		keyControl[i].index=i;
		keyControl[i].addEventListener("click", function(e){
			e.preventDefault();
			// if(bannerFlag){return false;}
			for(j=0; j<keyControl.length; j++){
				keyControl[j].classList.remove("on");
			}
			this.classList.add("on");
			keyIndex=this.index;
			mainBanner.classList.remove("transNone");
			mainBanner.style.transform="translatex("+keyIndex*-bannerWidth+"px)";
		});
	}
	
// keyvisual 드래그 슬라이드
	var bannerAmount="";
	var bannerUpdownFlag=true;
	//터치 시작
	mainBanner.addEventListener("touchstart", function(e){
		bannerUpdownFlag=true;
		mainBanner.addEventListener("touchmove", bannerMove);
		prevX=event.touches[0].screenX;
	});
	// 터치 움직임
	mainBanner.addEventListener("touchmove", bannerMove=function(e){
		moveX=event.touches[0].screenX;
		if(bannerUpdownFlag){
			if(prevX!=moveX){ // 좌우 움직임
				bannerUpdownFlag=false;
			}
			else{ // 상하 움직임
				mainBanner.removeEventListener("touchmove", bannerMove);
			}
		}
		else{
			bannerAmount=moveX-prevX;
			
			body.classList.add("fixed");
			mainBanner.classList.add("transNone");
			mainBanner.style.transform="translateX("+(keyIndex*-bannerWidth+bannerAmount)+"px)";
		}
	});
	//터치 끝
	mainBanner.addEventListener("touchend", function(e){
		if(bannerUpdownFlag) return false;
		nextX=event.changedTouches[0].screenX;	
		body.classList.remove("fixed");
		// console.log(nextX);
		if(prevX-nextX> 100){ // 우측으로 슬라이드	
			keyIndex++;
		}
		else if(nextX-prevX> 100){ // 좌측으로 슬라이드
			keyIndex--;
		}
		mainBanner.classList.remove("transNone");
		mainBanner.style.transform="translatex("+keyIndex*-bannerWidth+"px)";
		if(keyIndex<0){
			keyIndex=keyTotal-1;
		}
		else if(keyIndex==keyTotal){
			keyIndex=0;
		}
		for(i=0; i<keyControl.length; i++){
			keyControl[i].classList.remove("on");
		}
		keyControl[keyIndex].classList.add("on");
		body.classList.remove("fixed");
	});
	mainBanner.addEventListener("transitionend", function(){
		mainBanner.classList.add("transNone");
		mainBanner.style.transform="translatex("+keyIndex*-bannerWidth+"px)";
		setTimeout(function(){	
			mainBanner.classList.remove("transNone");
		},300);
		console.log("a");
	});
});