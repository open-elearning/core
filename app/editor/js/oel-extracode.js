
function extraCodeEditZone(){
	
	var p = '<div id="editExtraCode" class="editExtraCode pan ' + TYPEWIND + 'osBorder" >';
	
	p += '<div class="toolbar-w toolbar-header">';
	p += '<div onClick="closeEdit();" class="closehead" ></div>';
	p += '<h1 class="titlehead">Extra code JS</h1>';
	p += '</div>';
	
	p += '<textarea ';
	p += ' style="border:solid 1px gray;font-size:22px;font-weight:bold;';
	p += 'margin-top:32px;margin-left:20px;width:750px;height:510px;" ';
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
	$('.opacedit').css("display","block");
	$('#editExtraCode').css("display","block");
	var remote = require('electron').remote;
	var extraCodeTxt = remote.getGlobal('sharedObj').extracode;
	$('#textExtraCode').val(extraCodeTxt);
}

function saveCodeEditZone(){
	
	$('.opacedit').css("display","none");
	$('#editExtraCode').css("display","none");
	
	var extraCodeTxt = $('#textExtraCode').val();
	
	const electron = require('electron')
	const ipc = electron.ipcRenderer
	
	ipc.send('message',{key:'saveExtraCode',text:extraCodeTxt})
	
}
