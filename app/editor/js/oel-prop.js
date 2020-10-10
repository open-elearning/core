
function processLockObjLudi(){

	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	obj.lock = true;
	
	$("#lockopenludi").css("display","block");
	
	placeEditZone(GlobalUid);
	showWiziZone();
	placeEditZone(GlobalUid);

	var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition,.actionaddfluxpts');
	obs.css("display","none");
	$('.notequestion').css("display","none");
	
	MoveObjectLudi.set('left',-100);
	MoveObjectLudi.set('top' ,-100);
	
	canvas.deactivateAll();
	
	loadPage(GPageId);

}

function showProperties(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	$('.opacedit').css("display","block");
	$('#editFormatproperties').css("display","block");
	
	$('#propertiesObjectX').val(obj.getX());
	$('#propertiesObjectY').val(obj.getY());
	$('#propertiesObjectW').val(obj.getW());
	$('#propertiesObjectH').val(obj.getH());
	
	if(obj.zindex==''||obj.zindex==0||obj.zindex>3){
		obj.zindex = 1;
	}
	if(typeof(obj.zindex)=='undefined'){
		obj.zindex = 1;
	}
	
	$('#propertiesObjectZ').val(obj.zindex);

}

function propertiesObject(){
	
	var p = '<div id="editFormatproperties" ';
	p += ' class="editFormatproperties pan ' + TYPEWIND + 'osBorder" >';
	
	p += '<div class="toolbar-w toolbar-header">';
	p += '<div onClick="closeEdit();" class="closehead" ></div>';
	p += '<h1 class="titlehead">Properties of object</h1>';
	p += '</div>';
	
	p += '<div class="floatProp" style="margin-top:35px;" >';
	p += '&nbsp;X&nbsp;:&nbsp;<input id="propertiesObjectX" type="number" ';
	p += ' class="textdatabasetitleedit" style="width:100px;" />';
	p += '</div>';
	
	p += '<div class="floatProp" >';
	p += '&nbsp;Y&nbsp;:&nbsp;<input id="propertiesObjectY" type="number" ';
	p += ' class="textdatabasetitleedit" style="width:100px;" />';
	p += '</div>';
	
	p += '<div class="floatProp" >';
	p += 'W&nbsp;:&nbsp;<input id="propertiesObjectW" type="number" ';
	p += ' class="textdatabasetitleedit" style="width:100px;" />';
	p += '</div>';
	
	p += '<div class="floatProp" >';
	p += 'H&nbsp;:&nbsp;<input id="propertiesObjectH" type="number" ';
	p += ' class="textdatabasetitleedit" style="width:100px;" />';
	p += '</div>';
	
	p += '<div class="floatProp" >';
	p += 'Z&nbsp;:&nbsp;<input id="propertiesObjectZ" type="number" ';
	p += ' class="textdatabasetitleedit" style="width:100px;" />';
	p += '</div>';
	
	p += '<a style="float:right;margin:10px;" onClick="saveProperties();" class="btnSave">Apply</a>';
	
	p += '</div>';	
	
	return p;
	
}

function saveProperties(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	obj.setX($('#propertiesObjectX').val());
	obj.setY($('#propertiesObjectY').val());
	obj.setW($('#propertiesObjectW').val());
	obj.setH($('#propertiesObjectH').val());
	
	obj.zindex = $('#propertiesObjectZ').val();
	
	if(obj.zindex==0||obj.zindex>3){
		obj.zindex = 1;
	}

	loadPage(GPageId);
	eventObjects = true;
	
}