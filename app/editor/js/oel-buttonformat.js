
var globalFormatButton = 0;

function showFormatButton(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	$('.opacedit').css("display","block");
	$('#editFormatButton').css("display","block");
	
	$('.toolFormatButton').css('background-color','transparent');
	
	$('#textButtonFormatEdit').val(obj.idString);
	
	if (typeof obj.text6 === "undefined") {obj.text6 = 1;}
	applickFormatButton(obj);
	globalFormatButton = obj.text6;
	
}

function applickFormatButton(obj){
	
	if(obj.text6==0||obj.text6==1){
		obj.width  = 160;
		obj.height = 40;
		obj.realwidth = obj.width;
		obj.realheight = obj.height;
		$('.toolFormatButton01').css('background-color','#BCF5A9');
	}
	
	if(obj.text6==2){
		obj.width  = 200;
		obj.height = 50;
		obj.realwidth = obj.width;
		obj.realheight = obj.height;
		$('.toolFormatButton02').css('background-color','#BCF5A9');
	}
	
	if(obj.text6==3){
		obj.width  = 200;
		obj.height = 50;
		obj.realwidth = obj.width;
		obj.realheight = obj.height;
		$('.toolFormatButton03').css('background-color','#BCF5A9');
	}
	
}

function saveFormatButton(){
	
	if(GlobalUid==-1){
		return false;
	}
	var obj = CLudis[GlobalUid];
	obj.text6 = globalFormatButton;
	
	if(obj.text6==1){
		obj.width  = 160;
		obj.height = 40;
		obj.realwidth = obj.width;
		obj.realheight = obj.height;
	}
	if(obj.text6==4||obj.text6==5||obj.text6==6){
		obj.width = 80;
		obj.height = 80;
		obj.realwidth = obj.width;
		obj.realheight = obj.height;
	}
	
	applickFormatButton(obj);
	
	obj.idString = $('#textButtonFormatEdit').val();
	
	closeEdit();
	
	eventObjects = true;
}

function showClickBtnObj(i,elm){
	
	globalFormatButton = i;
	$('.toolFormatButton,.toolFormatButtonR').css('background-color','transparent');
	elm.style.backgroundColor = '#BCF5A9';
	
}

function formatButtonObject(){
	
	var p = '<div id="editFormatButton" ';
	p += ' class="editFormatButton pan ' + TYPEWIND + 'osBorder" >';
	
	p += barreEdit();

	p += '<div class="tableBaseTitle" style="width:350px;margin-top:20px;" >';
	p += 'ID&nbsp;:&nbsp;<input id="textButtonFormatEdit" ';
	p += ' type="text" class="textdatabasetitleedit" style="width:270px;" />';
	p += '</div>';
	
	p += '<div id="formatButtonList" class="formatButtonList" >';
	
	p += '<div onClick="showClickBtnObj(1,this);" ';
	p += 'class="toolFormatButton01 toolFormatButton" ></div>';
	
	p += '<div onClick="showClickBtnObj(2,this);" ';
	p += 'class="toolFormatButton02 toolFormatButton" ></div>';
	
	p += '<div onClick="showClickBtnObj(3,this);" ';
	p += 'class="toolFormatButton03 toolFormatButton" ></div>';
	
	p += '<div onClick="showClickBtnObj(4,this);" ';
	p += 'class="toolRoundButton04 toolFormatButtonR" ></div>';
	
	p += '<div onClick="showClickBtnObj(5,this);" ';
	p += 'class="toolRoundButton05 toolFormatButtonR" ></div>';
	
	p += '<div onClick="showClickBtnObj(6,this);" ';
	p += 'class="toolRoundButton06 toolFormatButtonR" ></div>';

	p += '</div>';
	
	p += '<br/><br/><br/><br/><br/>';
	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onClick="saveFormatButton();" class="btnSave">Save</a>';
	
	p += '</div>';	
	
	return p;
	
}