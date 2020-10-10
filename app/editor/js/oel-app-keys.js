
var ctrlDownTouch = false;
var oneTimeOnlyTouch = true;
var kCodeCtrlKey = 17;
var kCodeCmdKey = 91;
var kCodeVKey = 86;
var kCodeRKey = 82;
var kCodeCKey = 67;
var kCodeDelete = 46;

$(document).keyup(function(e){
	if(catchEventTouchs()){
		if(e.keyCode == kCodeCtrlKey || e.keyCode == kCodeCmdKey){
			ctrlDownTouch = false;
		}else{
			ctrlDownTouch = false;
		}
	}else{
		ctrlDownTouch = false;
	}
	oneTimeOnlyTouch = true;
});

document.addEventListener('keydown',function(event){
	if(catchEventTouchs()){
		processKeyEventCatch(event);
	}
});

function catchEventTouchs(){
	var b = true;
	if ($('.opacedit').is(':visible')) {
		b = false;
	}
	return b;
}

function processKeyEventCatch(event){

	if(typeof event==="undefined"){return false;}
	if(GlobalUid==-1){return false;}

	var LudiObj = CLudis[GlobalUid];
	var haveMv = false;
	
	console.log("keyCode = " + event.keyCode);

	if(event.keyCode == kCodeCtrlKey||event.keyCode == kCodeCmdKey){
		ctrlDownTouch = true;
	}
	
	if(ctrlDownTouch && event.keyCode == kCodeRKey){
		// Bubbles Mode
		
	}

	if(ctrlDownTouch && event.keyCode == kCodeCKey){
		copyCLudi();
	}
	if(ctrlDownTouch && event.keyCode == kCodeVKey){
		pasteCLudi();
	}
	if(event.keyCode == kCodeDelete){
		actionDelete();
	}
	if(event.keyCode == 37&&oneTimeOnlyTouch) {
		LudiObj.x = LudiObj.x - 1;
		haveMv = true;
	}
	if(event.keyCode == 38&&oneTimeOnlyTouch) {
		LudiObj.y = LudiObj.y - 1;
		haveMv = true;
	}
	if(event.keyCode == 39&&oneTimeOnlyTouch) {
		LudiObj.x = LudiObj.x + 1;
		haveMv = true;
	}
	if(event.keyCode == 40&&oneTimeOnlyTouch) {
		LudiObj.y = LudiObj.y + 1;
		haveMv = true;
	}
	
	if(haveMv&&oneTimeOnlyTouch){

		oneTimeOnlyTouch = false;
		canvas.forEachObject(function(obj){
			if (obj.id&&obj.id===GlobalUid){
				obj.set('left',LudiObj.x);
				obj.set('top', LudiObj.y);
			}
		});
		
		var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition,.actionaddfluxpts');
		obs.css("display","none");
		
		moveWiziZone(GlobalUid);
		canvas.renderAll();

	}

}

