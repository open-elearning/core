
var colorSelect = '';

function launchBarreEdit(obj){

	$('.opacedit,#colorselectpan').css("display","block");
	$('#textTitleBarreEdit').val(obj.text);
	$('#textBarreColorEdit').val(obj.val);
	colorSelect = obj.val;
}

function colorChoiceZone(){
	
	var p = '<div id="colorselectpan" ';
	p += ' style="height:350px;width:450px;" ';
	p += ' class="editnote pan ' + TYPEWIND + 'osBorder" >';
	
	p += barreEdit();

	p += '<div style="position:relative;width:420px;margin-top:10px;padding-top:10px;';
	p += 'padding-bottom:10px;border:solid 0px red;" >';
	p += '&nbsp;&nbsp;&nbsp;Title&nbsp;:&nbsp;&nbsp;';
	p += '<input id="textTitleBarreEdit" ';
	p += ' type="text" class="css-input textdatabasetitleedit" style="width:320px;" />';
	p += '</div>';
	
	p += '<div style="position:relative;width:420px;';
	p += 'height:180px;margin-top:5px;';
	p += 'border:solid 0px purple;" >';
	p += colorChoiceC('#447BB3');
	p += colorChoiceC('#336E7B');
	p += colorChoiceC('#019875');
	p += colorChoiceC('#F2784B');
	p += colorChoiceC('#913D88');
	p += colorChoiceC('#22313F');
	p += colorChoiceC('#F62459');
	p += colorChoiceC('#a0522d');
	p += colorChoiceC('#008a00');
	p += colorChoiceC('#a20025');
	p += colorChoiceC('#642EFE');
	p += colorChoiceC('#4C0B5F');
	p += colorChoiceC('#610B21');
	p += colorChoiceC('#0B614B');

	p += '<input id="textBarreColorEdit" ';
	p += 'type="text" class="css-input" style="width:90px;margin-top:10px;margin-left:150px;" />';

	p += '</div>';

	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onClick="saveChoiceColorProcess();" class="btnSave">Save</a>';
	p += '</div>';
	
	return p;
	
}

function colorChoiceC(col){
	var idCol = col.replace('#','col');
	var p = '<div id="'+ idCol +'" class="colorCircle colorCircleRound" ';
	p += ' style="background-color:'+ col +';" ';
	p += ' onClick="colorChoiceProcess(\''+ col +'\',\'' + idCol + '\');" >';
	p += '</div>';
	return p;
}

function colorChoiceProcess(col,idCol){
	colorSelect = col;
	
	$('#textBarreColorEdit').val(colorSelect);
	
	$('.colorCircleRound').removeClass("colorCircleActive");
	$('#' + idCol).addClass("colorCircleActive");

}

function saveChoiceColorProcess(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	closePan();
		
	var obj = CLudis[GlobalUid];
	
	if(obj.type=="barre"){
		colorBase = colorSelect;
		obj.text = $('#textTitleBarreEdit').val();
	}
	
	var objCanvas = canvas.getActiveObject();
	objCanvas.fill = colorSelect;
	obj.val = colorSelect;
	canvas.deactivateAll();
	
	getImageDataMini(GPageId);

	canvas.renderAll();
	showWiziZone();
	eventObjects = true;

}

function seClTxt(c){
	editorInstance.commands.foreColor('',"foreColor", "red");
	$('.colorpikerpalette').css('display','none');
	$('#colorpiker').css('background-color',c);
}
