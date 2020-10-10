
function initLoadAllLudiVideo(){
	
	var video = $('.video-ludivideo');
	
	//set video properties
	if(video[0]){
		$('.current').text(timeFormat(0));
		$('.duration').text(timeFormat(video[0].duration));	
	}
	
	updateVolume(0, 0.7);
	
	setTimeout(startBufferLudiVideo, 300);
		
	var t = '<div id="init" onClick="playAllLudiVideo()" ></div>';
	$('.videoContainer').append(t);
	
	$('#init').css('display','block');
	$('.loading').css('display','none');
	
	
	if(document.getElementById("AutoPlayLudiVideo")){
		$('#init').css('display','none');
		$('.loading').css('display','none');
		$('.control').show();
		$('.btnPlay').addClass('paused');
		if(video[0]){
			video[0].play();
		}
	}
	
}

function playAllLudiVideo(){
	
	$('#init').css('display','none');
	$('.btnPlay').addClass('paused');
	$(this).unbind('click');
	$('.video-ludivideo')[0].play();
	$('.control').show();
	
}

function loadAllLudiVideo(){

	//INITIALIZE
	var video = $('.video-ludivideo');
	
	//remove default control when JS loaded
	if(video[0]){
		video[0].removeAttribute("controls");
	}
	
	$('.loading').css('display','block');
	
	if(video.onloadedmetadata){
		//before everything get started
		video.on('loadedmetadata', function() {
			initLoadAllLudiVideo()
		});
	}else{
		initLoadAllLudiVideo()
	}
	
	//display current video play time
	video.on('timeupdate', function() {
		
		var perc = 10;
		
		if(video[0]){
			var currentPos = video[0].currentTime;
			var maxduration = video[0].duration;
			perc = 100 * currentPos / maxduration;	
		}

		$('.timeBar').css('width',perc+'%');	
		$('.current').text(timeFormat(currentPos));	
	});
	
	//CONTROLS EVENTS
	//video screen and play button clicked
	if($('.control').length>0){
		video.on('click', function() { playpause(); } );
		$('.btnPlay').on('click', function() { playpause(); } );	
	}
	
	//$('.btnStop').on('click', function() {
	$('.btnStop').click(function(){
		$('.btnPlay').removeClass('paused');
		updatebar($('.progress').offset().left);
		if(video[0]){
			video[0].pause();
		}
		$('#init').css('display','block');
		$('.loading').css('display','none');
	});
	
	//fullscreen button clicked
	//$('.btnFS').on('click', function() {
	$('.btnFS').click(function(){
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
	$('.sound').click(function() {
		
		if(video[0]){
			
			video[0].muted = !video[0].muted;
			$(this).toggleClass('muted');
			if(video[0].muted) {
				$('.volumeBar').css('width',0);
			}else{
				$('.volumeBar').css('width', video[0].volume*100+'%');
			}
		
		}
		
	});
	
	//VIDEO EVENTS
	//video canplay event
	video.on('canplay', function() {
		$('.loading').fadeOut(100);
	});
	
	//video canplaythrough event
	//solve Chrome cache issue
	var completeloaded = false;
	video.on('canplaythrough', function() {
		completeloaded = true;
	});
	
	//fin de la vidéo ended event
	video.on('ended', function() {
		
		if(document.getElementById("LoopLudiVideo")){
			video[0].currentTime = 0;
			video[0].play();
		
		}else{
			
			$('.btnPlay').removeClass('paused');
			
			if(video[0]){
				video[0].pause();
			}
			if(document.getElementById("NextPageLudiVideo")){
				LUDI.nextPage();
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
		$('.loading').fadeIn(200);
	});
	
	//VIDEO PROGRESS BAR
	//when video timebar clicked
	var timeDrag = false;	/* check for drag event */
	$('.progress').on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX);
	});
	$(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
		}
	});
	$(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX);
		}
	});

	//VOLUME BAR
	//volume bar event
	var volumeDrag = false;
	$('.volume').on('mousedown', function(e) {
		volumeDrag = true;
		if(video[0]){
			video[0].muted = false;
		}
		$('.sound').removeClass('muted');
		updateVolume(e.pageX);
	});
	$(document).on('mouseup', function(e) {
		if(volumeDrag) {
			volumeDrag = false;
			updateVolume(e.pageX);
		}
	});
	$(document).on('mousemove', function(e) {
		if(volumeDrag) {
			updateVolume(e.pageX);
		}
	});

}

//display video buffering bar
var startBufferLudiVideo = function() {
	
	var video = $('.video-ludivideo');
	
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
	
	$('.bufferBar').css('width',perc + '%');
	
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

var updateVolume = function(x, vol){

	var video = $('.video-ludivideo');
	var volume = $('.volume');
	var percentage;

	//if only volume have specificed
	//then direct update volume
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
	$('.volumeBar').css('width',percentage+'%');
	
	if(video[0]){
		
		video[0].volume = percentage / 100;
		
		//change sound icon based on volume
		if(video[0].volume == 0){
			$('.sound').removeClass('sound2').addClass('muted');
		}
		else if(video[0].volume > 0.5){
			$('.sound').removeClass('muted').addClass('sound2');
		}else{
			$('.sound').removeClass('muted').removeClass('sound2');
		}
	}

};

var playpause = function() {
	
	var video = $('.video-ludivideo');
	
	if(video[0]){
		
		if(video[0].paused || video[0].ended) {
			$('.btnPlay').addClass('paused');
			video[0].play();
			$('.control').show();
			$('#init').css('display','none');
			$('.loading').css('display','none');
		} else {
			$('.btnPlay').removeClass('paused');
			video[0].pause();
		}
		
	}
	
};

var updatebar = function(x) {
	
	var video = $('.video-ludivideo');
	
	var progress = $('.progress');
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
	
	$('.timeBar').css('width',percentage+'%');
	
	if(video[0]){
		video[0].currentTime = maxduration * percentage / 100;
	}
	
};

	