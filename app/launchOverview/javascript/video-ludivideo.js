
function initLoadAllLudiVideo(i){
	
	var selectV = '.video-ludivideo' + i;
	var video = $(selectV);
	
	//set video properties
	if(video[0]){
		$(".current"+i).text(timeFormat(0));
		$('.duration'+i).text(timeFormat(video[0].duration));	
	}
	
	updateVolume(0, 0.7,i);
	
	setTimeout('startBufferLudiVideo('+i+')',300);
	
	var t = '<div id="init'+i+'" class="ludivideoinit init'+i+'" onClick="playAllLudiVideo('+i+')" ></div>';
	$('.bloc' + i).append(t);
	
	$('.init'+i).css('display','block');
	$('.loading'+i).css('display','none');
	
	if(document.getElementById("AutoPlayLudiVideo" + i)){
		$('.init'+i).css('display','none');
		$('.loading'+i).css('display','none');
		$('.control'+i).show();
		$('.btnPlay'+i).addClass('paused');
		if(video[0]){
			video[0].play();
		}
	}
	
}

function playAllLudiVideo(i){
	
	var selectV = '.video-ludivideo' + i;
	$('.init'+ i).css('display','none');
	$('.btnPlay'+ i).addClass('paused');
	$(this).unbind('click');
	$(selectV)[0].play();
	$('.control'+ i).show();
	
}

function loadAllLudiVideo(i){

	var selectV = '.video-ludivideo' + i;
	var selectB = '.bloc' + i;
	//INITIALIZE
	var video = $(selectV);
	
	//remove default control when JS loaded
	if(video[0]){
		video[0].removeAttribute("controls");
	}
	
	$('.loading'+i).css('display','block');
	
	if(video.onloadedmetadata){
		//before everything get started
		video.on('loadedmetadata', function() {
			initLoadAllLudiVideo(i)
		});
	}else{
		initLoadAllLudiVideo(i)
	}
	
	//display current video play time
	video.on('timeupdate', function() {
		var perc = 10;
		if(video[0]){
			var currentPos = video[0].currentTime;
			var maxduration = video[0].duration;
			perc = 100 * currentPos / maxduration;	
		}
		$('.timeBar'+i).css('width',perc+'%');	
		$('.current'+i).text(timeFormat(currentPos));	
	});
	
	//CONTROLS EVENTS
	//video screen and play button clicked
	if($('.control'+i).length>0){
		video.on('click', function() { playpause(i); } );
		$('.btnPlay'+i).on('click', function() { playpause(i); } );	
	}
	
	$('.btnStop'+i).click(function(){
		selectV = '.video-ludivideo' + i;
		$('.btnPlay'+i).removeClass('paused');
		updatebar($('.progress'+i).offset().left,i);
		var videoStop = $(selectV);
		if(videoStop[0]){
			videoStop[0].pause();
		}
		$('.init'+i).css('display','block');
		$('.loading'+i).css('display','none');
	});
	
	//fullscreen button clicked

	$('.btnFS'+i).click(function(){

		if($.isFunction(video[0].webkitEnterFullscreen)) {
			if(video[0]){
				video[0].webkitEnterFullscreen();
			}
		}	
		else if ($.isFunction(video[0].mozRequestFullScreen)) {
			if(video[0]){
				video[0].mozRequestFullScreen();
			}
		}
		else {
			alertm('Your browsers doesn\'t support fullscreen');
		}
	});
	
	//sound button clicked
	$('.soundbtn'+i).click(function() {
		
		if(video[0]){
			
			video[0].muted = !video[0].muted;
			$(this).toggleClass('muted');
			if(video[0].muted) {
				$('.volumeBar'+i).css('width',0);
			}else{
				$('.volumeBar'+i).css('width', video[0].volume*100+'%');
			}
		
		}
		
	});
	
	//VIDEO EVENTS
	//video canplay event
	video.on('canplay', function() {
		$('.loading'+i).fadeOut(100);
	});
	
	//video canplaythrough event
	//solve Chrome cache issue
	var completeloaded = false;
	video.on('canplaythrough', function() {
		completeloaded = true;
	});
	
	//fin de la vidéo ended event
	video.on('ended', function() {
		
		if(gebi("LoopLudiVideo" + i)){
			video[0].currentTime = 0;
			video[0].play();
		
		}else{
			
			$('.btnPlay'+i).removeClass('paused');
			
			if(video[0]){
				video[0].pause();
			}
			if(gebi("NextPageLudiVideo" +i)){
				LUDI.nextPage();
			}
			if(gebi("NextFctLudiVideo" +i)){
				var fct = gebi("NextFctLudiVideo" +i).innerHTML;
				if(isFunctionW(fct)){
					window[fct]();
				}
			}
			
		}
		//alert('coucou c la fin!');
	});

	//video seeking event
	video.on('seeking', function() {
		//if video fully loaded, ignore loading screen
		if(!completeloaded) { 
		}	
	});
	
	//video seeked event
	video.on('seeked', function() { });
	
	//video waiting for more data event
	video.on('waiting', function() {
		$('.loading'+i).fadeIn(200);
	});
	
	//VIDEO PROGRESS BAR
	//when video timebar clicked
	var timeDrag = false;	/* check for drag event */
	$('.progress'+i).on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX,i);
	});
	$(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX,i);
		}
	});
	$(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX,i);
		}
	});

	//VOLUME BAR
	//volume bar event
	var volumeDrag = false;
	$('.volume'+i).on('mousedown', function(e) {
		volumeDrag = true;
		if(video[0]){
			video[0].muted = false;
		}
		$('.soundbtn'+i).removeClass('muted');
		updateVolume(e.pageX,i);
	});
	$(document).on('mouseup', function(e) {
		if(volumeDrag) {
			volumeDrag = false;
			updateVolume(e.pageX,i);
		}
	});
	$(document).on('mousemove', function(e) {
		if(volumeDrag) {
			updateVolume(e.pageX,i);
		}
	});

}

//display video buffering bar
var startBufferLudiVideo = function(i){

	var selectV = '.video-ludivideo' + i;
	
	var video = $(selectV);
	
	var currentBuffer = 0;
	var maxduration = 0;
	var perc = 100;
	
	if(video[0]){
		if(video[0].buffered){
			
			if(typeof video[0].buffered === "undefined"){
				
			}else{
				
				if(video[0].buffered.length>0){
					try{
						currentBuffer = video[0].buffered.end(0);
						maxduration = video[0].duration;
						perc = 100 * currentBuffer / maxduration;
					}catch(e){
						
					}
				}
			}
			
		}
	}
	
	$('.bufferBar'+i).css('width',perc + '%');
	
	if(currentBuffer < maxduration) {
		setTimeout(startBufferLudiVideo, 500);
	}
	
};	

//Time format converter - 00:00
var timeFormat = function(seconds){
	var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
	var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
	return m+":"+s;
};

var updateVolume = function(x, vol,i){

	var selectV = '.video-ludivideo' + i;

	var video = $(selectV);
	var volume = $('.volume'+i);
	var percentage;

	if(vol) {
		percentage = vol * 100;
	}
	else {
		var position = x - volume.offset().left;
		percentage = 100 * position / volume.width();
	}

	if(percentage > 100) {
		percentage = 100;
	}
	if(percentage < 0) {
		percentage = 0;
	}
	
	//update volume bar and video volume
	$('.volumeBar'+i).css('width',percentage+'%');
	
	if(video[0]){
		
		video[0].volume = percentage / 100;
		
		//change sound icon based on volume
		if(video[0].volume == 0){
			$('.soundbtn'+i).removeClass('sound2').addClass('muted');
		}
		else if(video[0].volume > 0.5){
			$('.soundbtn'+i).removeClass('muted').addClass('sound2');
		}else{
			$('.soundbtn'+i).removeClass('muted').removeClass('sound2');
		}
	}

};

var playpause = function(i) {
	
	var selectV = '.video-ludivideo' + i;
	var video = $(selectV);
	
	if(video[0]){
		
		if(video[0].paused||video[0].ended) {
			$('.btnPlay'+i).addClass('paused');
			video[0].play();
			$('.control'+i).show();
			$('.init'+i).css('display','none');
			$('.loading'+i).css('display','none');
		}else{
			$('.btnPlay'+i).removeClass('paused');
			video[0].pause();
		}
		
	}
	
};

var updatebar = function(x,i) {
	
	var selectV = '.video-ludivideo' + i;
	var selectB = 'bloc' + i;
	var video = $(selectV);
	
	var progress = $('.progress'+i);
	var maxduration = 0;
	
	if(video[0]){
		maxduration = video[0].duration;
	}
	
	var position = x - progress.offset().left;
	var percentage = 100 * position / progress.width();
	if(percentage > 100) {
		percentage = 100;
	}
	if(percentage < 0) {
		percentage = 0;
	}
	
	$('.timeBar'+i).css('width',percentage+'%');
	
	if(video[0]){
		video[0].currentTime = maxduration * percentage / 100;
	}
	
};

	