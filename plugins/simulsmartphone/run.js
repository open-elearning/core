
var dialogSmartFN = "";
var dialogSmartOptions = "";
var dialogSmartTimer = 3000;

function onPaint(obj){
	
	var h = '<div id="bloc' + obj.id + '" ';
	h += ' class="back-smartphone bloc' + obj.id + '" >';
	h += '<div id="talksmartphone' + obj.id + '" class="talk-smartphone"></div></div>';

	setTimeout("appliqueSmartBubble(" + obj.id + ")",1000);
	
	return h;
	
}

function appliqueSmartBubble(i){
	
	var obj = CObjets[i];
	
	var hs = '<div class="speech-bubble-g bubble1" >Hello, :-)</div><div class="speech-bubble-b bubble2" >Hi Damien, How are you ?</div><div class="speech-bubble-g bubble3" >I&apos;m fine, and you?</div><div class="speech-bubble-b bubble4" >Great, I was boarding my flight</div><div class="speech-bubble-g bubble5" >Where are you flying to today?</div><div class="speech-bubble-b bubble6" >Los Angeles.</div><div class="speech-bubble-g bubble7" >Cooool !</div>';
	
	hs = formatImoticones(hs);
	
	if(obj.fields[1]!=''){
		
		dialogSmartOptions = obj.fields[0];
		
		hs = '<div class="speech-bubble-g bubble1" >' + formatImoticones(obj.fields[1]) + '</div>';
		
		if(obj.fields[2]!=''){
			hs += '<div class="speech-bubble-b bubble2" >' + formatImoticones(obj.fields[2]) + '</div>';
		}
		if(obj.fields[3]!=''){
			hs += '<div class="speech-bubble-g bubble3" >' + formatImoticones(obj.fields[3]) + '</div>';
		}
		if(obj.fields[4]!=''){
			hs += '<div class="speech-bubble-b bubble4" >' + formatImoticones(obj.fields[4]) + '</div>';
		}
		if(obj.fields[5]!=''){
			hs += '<div class="speech-bubble-g bubble5" >' + formatImoticones(obj.fields[5]) + '</div>';
		}
		if(obj.fields[6]!=''){
			hs += '<div class="speech-bubble-b bubble6" >' + formatImoticones(obj.fields[6]) + '</div>';
		}
		if(obj.fields[7]!=''){
			hs += '<div class="speech-bubble-g bubble7" >' + formatImoticones(obj.fields[7]) + '</div>';
		}
		if(obj.fields[8]!=''){
			hs += '<div class="speech-bubble-b bubble8" >' + formatImoticones(obj.fields[8]) + '</div>';
		}
		if(obj.fields[9]!=''){
			hs += '<div class="speech-bubble-g bubble9" >' + formatImoticones(obj.fields[9]) + '</div>';
		}
		if(obj.fields[10]!=''){
			hs += '<div class="speech-bubble-b bubble10" >' + formatImoticones(obj.fields[10]) + '</div>';
		}
		
	}
	
	
	$("#talksmartphone" + i).html(hs);
	
	showSmartBubble(1);
	
}

function formatImoticones(txt){
	txt = txt.replace(':-)','<img src="data/smiley.png" />');
	txt = txt.replace(':-(','<img src="data/smileysad.png" />');
	txt = txt.replace(':-:','<img src="data/smileysdo.png" />');
	txt = txt.replace('smileyheart','<img src="data/smileylove.png" />');
	return txt;
}

function showSmartBubble(ab){
	
	if($(".bubble" + ab).length==0){
		
		if(dialogSmartOptions.indexOf("1")!=-1){
			$(".speech-bubble-g").css("display","none");
			$(".speech-bubble-b").css("display","none");
			$(".bubble1").animate({marginTop: "5px"});
			$(".bubble2").animate({marginTop: "5px"});
			$(".bubble3").animate({marginTop: "5px"});
			$(".bubble4").animate({marginTop: "5px"});
			showSmartBubble(1);
		}
		
		if(dialogSmartOptions.indexOf("2")!=-1){
			LUDI.nextPage();
		}
	}
	
	if(dialogSmartOptions.indexOf("3")!=-1){
		dialogSmartTimer = 1000;
	}
	
	$(".bubble" + ab).fadeIn(200, function() {
		
		bipSoundSmartBubble();
		
		if(ab==4){
			$(".bubble1").animate({marginTop: "-40px"});
		}
		if(ab==6){
			$(".bubble1").animate({marginTop: "-100px"});
			$(".bubble2").animate({marginTop: "-50px"});
		}
		if(ab==7){
			$(".bubble1").animate({marginTop: "-130px"});
			$(".bubble2").animate({marginTop: "-130px"});
			$(".bubble3").animate({marginTop: "-40px"});
		}
		if(ab==9){
			$(".bubble1").animate({marginTop: "-190px"});
			$(".bubble2").animate({marginTop: "-190px"});
			$(".bubble3").animate({marginTop: "-190px"});
			$(".bubble4").animate({marginTop: "-50px"});
		}
		setTimeout(function(){
			ab = ab + 1;
			showSmartBubble(ab);
		},dialogSmartTimer);
		
	});
	
}

function bipSoundSmartBubble(){
	
	var sndid = "moneyBipSound";
	
	if(document.getElementById(sndid)){
		
		var audioElement;
		
		try {	
			audioElement = document.getElementById(sndid);
		}catch(err){}
		
		try {
			audioElement.pause();
			audioElement.currentTime = 0;
			audioElement.load();
		}catch(err){}
		
		try {
			audioElement.play();
		}catch(err){}
		
	}else{
		
		try {
			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', 'data/textmessage.mp3');
			audioElement.setAttribute("id", sndid);
			document.body.appendChild(audioElement);
			audioElement.play();
		}catch(err){}

	}

}
	
function onZoom(obj){

}

function isOK(obj){
	return true;
}
