
var timeWplace = 300;
var oldWidthCanvas = 0;
var oldHeightCanvas = 0;
var oldIdSize = '';

//Screen
setTimeout(function(){
    
    placeWorkingPlace();
    
    setTimeout(function(){
        detectWorkingResize();
    },500);

},250);

function detectWorkingResize(){

    var width = getWindowWidth();
    var height = getWindowHeight();
    var idSize = parseInteger(width/3) + '_' + parseInteger(height/3);
    
    if(oldIdSize!=idSize){
        oldIdSize = idSize;
        placeWorkingPlace();
        console.log("call placeWorkingPlace");
    }
	
    setTimeout(function(){
        detectWorkingResize();
    },500);

}

function placeWorkingPlace(){
	
	var menuWidth = 200;
	var width = getWindowWidth();
	var height = getWindowHeight()-105;
	
	if(width<(1060 + menuWidth)){
		menuWidth = 120;
	}
	
	if(EDITORMODE==1){
		SCREEN_0_W = 480;
		SCREEN_0_H = 780;
	}else{
		SCREEN_0_W = 960;
		SCREEN_0_H = 720;
	}

	var originalWidth = SCREEN_0_W;
	var zoomCanvas = (width - menuWidth)/originalWidth;
	
	if(width<(1060 + menuWidth)){
	}else{
		zoomCanvas = 1;
	}
	
	oldWidthCanvas = width;
	oldHeightCanvas = height;
	
	canvas.setZoom(zoomCanvas);

	var cibleHeight = SCREEN_0_H * zoomCanvas;

	if(cibleHeight>height){
		zoomCanvas = (height-8)/SCREEN_0_H;
		canvas.setZoom(zoomCanvas);
	}
	
	canvas.setWidth(SCREEN_0_W * canvas.getZoom());
	canvas.setHeight(SCREEN_0_H * canvas.getZoom());
	
	var widthcanv = (SCREEN_0_W * canvas.getZoom()) + 4;
	var largW = (SCREEN_0_W * zoomCanvas)
	var decXMarg = ((width - menuWidth) - largW)/2;
	
	var decYMarg = (height-(SCREEN_0_H * zoomCanvas))/2;
	decYMarg = decYMarg + 100;
	
	decxCanv = 0;
	
	if(decYMarg<110){
		decYMarg = 110;
	}
	
	decyCanv = decYMarg;
	decxCanv = decXMarg;
	
	$(".opacedit").css("width",width + "px");
	$(".editnote,.editzoneplugin,.editnote2,.editvideozone").css("left",(((widthcanv - 400)/2) + decxCanv) + "px");
	$(".editImage").css("left",(((widthcanv - 700)/2) + decxCanv) + "px");
	
	document.body.style.paddingLeft = decxCanv + "px";
	document.body.style.paddingTop = decYMarg  + "px";
	
	zoomCanv = zoomCanvas;

	if(menuWidth<180){
		$("#g-block").removeClass("global-block");
		$("#g-block").addClass("global-block-little");
		$(".snaplogin2").css('right','125px');
	}else{
		$("#g-block").addClass("global-block");
		$("#g-block").removeClass("global-block-little");
		$(".snaplogin2").css('right','200px');
	}
	showWiziZone();

}
