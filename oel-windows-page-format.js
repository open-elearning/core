
//Edition du Background
function pageEditShow(){
	
	targetImg = 1;
	
    var obj = GetPageById(GPageId);
	
	if(obj.back==''){
		$('#BackEditSelect').html("-");
	}else{
		$('#BackEditSelect').html(get14Letter(obj.back));
	}
	
	if(obj.screen==''){
		$('#typePageScreen').html("-");
	}else{
		$('#typePageScreen').html(get14Letter(obj.screen));
	}
	
	switch(obj.comicMode) {
		case 0:
			$('#typePageSelect').html('Classic');
			break;
		case 1:
			$('#typePageSelect').html('Comics01');
			break;
		case 2:
			$('#typePageSelect').html('Comics02');
			break;
		case 3:
			$('#typePageSelect').html('Comics03');
			break;
		case 4:
			$('#typePageSelect').html('None');
			break;
	}
	
	ludiCss('pageeditbtn');
	
}

function get14Letter(str){
	var res = "";
	if (typeof str === "undefined"){
		res  = "-";
	}else{
		res = str.substring(0,15);
	}
	return res;
}

function pageEditOptions(){
	
	var p = '';
	
	p += '<div id="pageeditbtn" class="editbackground pageeditbtn pan ' + TYPEWIND + 'osBorder" >';
	
	p += barreEdit();
	
	p += '<div id="selectTypePageSelect" class="selectChoiceTypePage pan" >';
	p += '<div onClick="selChType(0);" class="actionSelect" >Classic</div>';
	p += '<div onClick="selChType(4);" class="actionSelect" >None</div>';
	p += '<div onClick="selChType(1);" class="actionSelect" >Comics01</div>';
	p += '<div onClick="selChType(2);" class="actionSelect" >Comics02</div>';
	p += '<div onClick="selChType(3);" class="actionSelect" >Comics03</div>';
	p += '</div>';
	
	p += '<p style="margin-top:20px;" >Page&nbsp;title&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	p += '<input id="actionEditBack" type="text" style="width:190px;" ';
	p += ' class="css-input" onchange="setSourceButton();"  ';
	p += ' onkeyup="setSourceButton();" value="" />';
	p += '</p>';
	
	p += '<p>';
	p += 'Page&nbsp;script&nbsp;:&nbsp;&nbsp;&nbsp;';
	p += '<span onClick="showScriptEdit();" class="fakeSelect" >...</span>';
	p += '</p>';
	p += '<a onClick="showScriptEdit();" class="actionSelectPerso" ';
	p += 'style="display:block!important;top:95px!important;margin-left:-5px;margin-top:5px;" ></a>';
	
	p += '<p>';
	p += 'Background&nbsp;page&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;';
	p += '<span id="BackEditSelect" onClick="showChoiceBackground();" ';
	p += ' class="fakeSelect" >-</span>';
	p += '</p>';
	
	p += '<p>';
	p += 'Type&nbsp;page&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;';
	p += '<span id="typePageSelect" onClick="showTypePageSelect();" ';
	p += ' class="fakeSelect" >-</span>';
    p += '</p>';
    
    //Background Screen
    p += '<p>';
	p += 'Background&nbsp;screen&nbsp;:&nbsp;&nbsp;';
	p += '<span id="typePageScreen" onClick="showChoiceBackScreen();" ';
	p += ' class="fakeSelect" >-</span>';
	p += '</p>';
	p += '<a onClick="deleteImageBackScreen();" class="actionDeleteBack" style="display:block!important;margin-top:9px;" ></a>';

	p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
	p += ' onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >Cancel</a>';

	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onclick="closeEdit();" ';
	p += 'class="btnSave noselectmouse" >Save</a>';

	p += '</div>';
	
	return p;
	
}

function showTypePageSelect(){
	$('#selectTypePageSelect').css("display","block");
}

//Choice Background Page
function showChoiceBackground(){
    targetImg = 1;
	$('#pageeditbtn').css("display","none");
	launchImageEditZone();
}

//Choice Background Screen
function showChoiceBackScreen(){
    targetImg = 2;
	$('#pageeditbtn').css("display","none");
	launchImageEditZone();
}

function showScriptEdit(){
	
	if(GPageId==''){
		return false;
	}
	
	eventPages = true;
	
	$("#listecrans").sortable('disable');
	
	var objPage = GetPageById(GPageId);
	$('#textareascript').val(objPage.script);
	
	var panLeft = parseInt((960/2) * zoomCanv) + decxCanv - 350;
	var panTop  = 15;
	
	$('#editscript').css("left",panLeft + 'px').css("top" ,panTop + 'px');
	$('#editscript').css("display","block");
	$('#pageeditbtn').css("display","none");

}

var cacheBackWhite;
var cacheBackJeuTV;

function selChBack(i){
	
	var obj = GetPageById(GPageId);
	$('#BackEditSelect').html('img&nbsp;');
	$('#selectChoiceBackground').css("display","none");
	canvas.setBackgroundImage(folderAllImages + obj.back);
	
}

function selChType(i){
	
	var obj = GetPageById(GPageId);
	obj.comicMode = i;
	
	$('#selectTypePageSelect').css("display","none");
	pageEditShow();
	
	if(obj.comicMode==4){
		canvas.overlayImage = null;
		canvas.renderAll.bind(canvas);
	}else{
		if(obj.comicMode>0){
			deleteLudiHELPER();
			var pathPath = folderAllImages + "comic-0" + obj.comicMode + ".png";
			canvas.setOverlayImage(pathPath, canvas.renderAll.bind(canvas));
		}else{
			canvas.overlayImage = null;
			canvas.renderAll.bind(canvas);
		}
	}

	
}

//Edition du Background
