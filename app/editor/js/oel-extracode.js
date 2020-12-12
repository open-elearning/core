
var typeCodeEdit = -1;

function extraCodeEditZone(){
	
	var p = '<div id="editExtraCode" class="editExtraCode pan ' + TYPEWIND + 'osBorder" >';
	
	p += barEditWind(getTrd("Edition") + '&nbsp;<span class="titlecustomcode" >...</span>');
	
	p += '<textarea spellcheck="false" ';
	p += ' style="border:solid 1px gray;font-size:22px;';
	p += 'margin-top:40px;background-color:#2C3E50;color:white;';
	p += 'margin-left:1%;width:98%;height:88%;" ';
	p += 'id="textExtraCode" name="textExtraCode" ';
	p += 'rows="5" cols="40">';
	p += '</textarea>';
	
	p += '<div class="tableBaseEditionBtn" >';
	
	p += '<a style="float:left;" onclick="closeEdit();" ';
	p += 'class="validation lblcancel" >Cancel</a>';
	
	p += '<a style="float:right;margin-right:10px;" ';
	p += 'onclick="saveCodeEditZone();" ';
	p += 'class="btnSave lblsave" >Save</a>';
	
	p += '</div>';
	
	p += '</div>';
	
	return p;

}

function launchCodeEditZone(){
	optHideAll();
	$('.titlecustomcode').html("Custom code script JS")
	$('.opacedit').css("display","block");
	$('#editExtraCode').css("display","block");
	var remote = require('electron').remote;
	var extraCodeTxt = remote.getGlobal('sharedObj').extracode;
	$('#textExtraCode').val(extraCodeTxt);
	typeCodeEdit = 0;
}

function launchCodeEditZoneCss(){
	optHideAll();
	$('.titlecustomcode').html("Custom code script CSS")
	$('.opacedit').css("display","block");
	$('#editExtraCode').css("display","block");
	var remote = require('electron').remote;
	var extraCodeTxt = remote.getGlobal('sharedObj').extracodecss;
	$('#textExtraCode').val(extraCodeTxt);
	typeCodeEdit = 1;
}

function saveCodeEditZone(){
	
	$('.opacedit').css("display","none");
	$('#editExtraCode').css("display","none");
	
	var extraCodeTxt = $('#textExtraCode').val();
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;

	ipc.send('message',{key:'saveExtraCode',text:extraCodeTxt,tc:typeCodeEdit});
	closePan();
}
