
var refAct = ["DS","DK","DP","GO","AP","DC"];
var refActs = ["nextpage","nextpageisok","previouspage","tothepage","personalact","nextpagefeedback"];

function questionEditDelete(){
	
	var p = '';
	p += '<div id="editdelete" class="loadBase pan ' + TYPEWIND + 'osBorder" style="height:100px;" >';
	
	p += '<div class="toolbar-w toolbar-header">';
	p += '<div onClick="closeEdit();" class="closehead" ></div>';
	p += '<h1 class="titlehead" >'+getTrd("deleteMessage")+'</h1>';
	p += '</div>';
	
	p += '<br/><br/><center><a onClick="closeEdit();" class="validation">'+getTrd("no")+'</a>&nbsp;&nbsp;&nbsp;';
	p += '<a onClick="actionDelete();" class="btnSave">'+getTrd("yes")+'</a>';
	
	p += '</center></div>';	
	
	return p;
	
}

function barreEdit(){
	
	var p = barEditWind(getTrd("Edition"));
	return p;
	
}

function questionEdit(){
	
	//'<div id="opacedit" onClick="closeEdit();" class="opacedit pan" ></div>';
	
	var p = '<div id="editnote" class="editnote pan ' + TYPEWIND + 'osBorder" >';
	
	p += barreEdit();
	
	p += '<p>Note&nbsp;if&nbsp;false&nbsp;answer&nbsp;:&nbsp;</p>';
	p += '<input id="questioneditremarque" type="text" style="width:365px;" ';
	p += ' class="css-input" onchange="setSourceNote();" onkeyup="setSourceNote();" value="" />';
	p += '<p>Score&nbsp;:&nbsp;&nbsp;';
	p += '<input id="questioneditnote" type="number" style="width:90px;" ';
	p += ' class="css-input" onchange="setSourceNote();" ';
	p += 'onkeyup="setSourceNote();" min="0" max="10" value="" /></p>';
	p += '</div>';
	
	return p;
	
}

function LunchPluginEdit(obj){
		
	if(!openelearning.gebi('editplugin')&&obj.text3!=''){
		
		var p = '<div id="editplugin" class="editzoneplugin pan ' + TYPEWIND + 'osBorder" >';
		
		p += barreEdit();
		
		p += '<p id="labelfield1" >'+obj.text3+' :</p>';
		p += '<input id="field1" type="text" style="width:380px;" ';
		p += ' class="css-input" onchange="setSourcePlugin();" onkeyup="setSourcePlugin();" value="" />';
		
		p += '<p id="labelfield2" >'+obj.text4+' :</p>';
		p += '<input id="field2" type="text" style="width:380px;" ';
		p += ' class="css-input" onchange="setSourcePlugin();" onkeyup="setSourcePlugin();" value="" />';
		
		p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
		p += ' onclick="closeEdit();" ';
		p += 'class="validation noselectmouse" >Cancel</a>';

		p += '<a style="position:absolute;right:15px;bottom:15px;" ';
		p += 'onclick="setSourcePlugin();closeEdit();" ';
		p += 'class="btnSave noselectmouse" >Save</a>';

		p += '</div>';
		
		$('body').append(p);
		
	}
		
	placeWorkingPlace();
	
	loadEdit = false;
	
	$('#labelfield1').html(obj.text3 + ' :');
	$('#field1').val(obj.text);
	
	$('#labelfield2').html(obj.text4 + ' :');
	$('#field2').val(obj.text2);
	
	$('.opacedit,#editplugin').css("display","block");
	
}

function LaunchInputEdit(obj){
	
	if(!openelearning.gebi('editInput')){
		
		var p = '<div id="editInput" class="inputZoneWin pan ' + TYPEWIND + 'osBorder" >';
		
		p += barreEdit();
		
		p += '<p id="labelInput" >Answer :</p>';
		p += '<input id="fieldInput" type="text" style="width:380px;" ';
		p += 'class="css-input" value="" />';

		p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
		p += ' onclick="closeEdit();" ';
		p += 'class="validation noselectmouse" >Cancel</a>';

		p += '<a style="position:absolute;right:15px;bottom:15px;" ';
		p += 'onclick="setSourceInput();closeEdit();" ';
		p += 'class="btnSave noselectmouse" >Save</a>';

		p += '</div>';
		
		$('body').append(p);
		
	}
		
	placeWorkingPlace();
	
	loadEdit = false;
	
	$('#fieldInput').val(obj.text);
	
	$('.opacedit,#editInput').css("display","block");
	
}

function tcmEditZone(){
	
	var p = '<div id="tcmeditnote" class="editnote2 pan ' + TYPEWIND + 'osBorder" >';

	p += barreEdit();

	p += '<p>'+getTrd("text")+' :</p>';
	
	p += '<textarea id="tcmtextarea" onchange="setSourceTcm();" ';
	p += ' onkeyup="setSourceTcm();" col=75 line=35 class="textzone" ';
	p += 'style="font-size:16px;width:440px;height:140px;" >';
	p += '</textarea>';
	
	p += '<p>'+getTrd("Distractors")+' :</p>';
	p += '<textarea id="tcmdistra" onchange="setSourceTcm();" ';
	p += ' onkeyup="setSourceTcm();" col=70 line=35 class="textzone" ';
	p += 'style="font-size:16px;width:220px;height:140px;" >';
	p += '</textarea>';
	
	p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
	p += ' onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >Cancel</a>';

	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onclick="setSourceTcm();closeEdit();" ';
	p += 'class="btnSave noselectmouse" >Save</a>';

	p += '</div>';
	
	return p;
	
}

function lcmEditZone(){
	
	var p = '<div id="lcmeditpan" class="editnote2 pan ' + TYPEWIND + 'osBorder" >';
	
	p += barreEdit();

	p += '<br><input id="sourcelcm1" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	p += '<input id="tolcm1" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	
	p += '<input id="sourcelcm2" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	p += '<input id="tolcm2" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';

	p += '<input onchange="ajustLcmZone()" id="sourcelcm3" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	p += '<input onchange="ajustLcmZone()" id="tolcm3" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	
	p += '<input onchange="ajustLcmZone()" id="sourcelcm4" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	p += '<input onchange="ajustLcmZone()" id="tolcm4" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	
	p += '<input onchange="ajustLcmZone()" id="sourcelcm5" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	p += '<input onchange="ajustLcmZone()" id="tolcm5" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	
	p += '<input onchange="ajustLcmZone()" id="sourcelcm6" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	p += '<input onchange="ajustLcmZone()" id="tolcm6" onkeyup="setSourceLcm();" ';
	p += ' type="text" class="lcm-input" />';
	

	p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
	p += ' onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >Cancel</a>';

	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onclick="ajustLcmZone();closeEdit();" ';
	p += 'class="btnSave noselectmouse" >Save</a>';

	p += '</div>';
	
	return p;
	
}

//Edition des actions
function actionEdit(){
	
	var p = '';
	
	p += '<div id="actioneditbtn" class="editnoteactions pan ' + TYPEWIND + 'osBorder" >';
	
	p += barreEdit();
	
	p += GetActionSel("selectChoiceAction",112,109,'');
	
	p += '<br>';
	
	p += '<p>&nbsp;Button&nbsp;Text&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	
	p += '<input id="actionedittext" type="text" style="width:190px;" ';
	p += ' class="css-input" onchange="setSourceButton();"  ';
	p += ' onkeyup="setSourceButton();" value="" />';
	p += '</p>';
	
	p += '<p>';
	p += '<span class="labelactionswin" >';
	p += 'Button&nbsp;Action&nbsp;:&nbsp;';
	p += '</span>';
	p += '<span id="actioneditselect" style="height:26px;width:220px;" ';
	p += ' onClick="showChoiceAction();" ';
	p += ' class="fakeSelect" >-</span>';
	
	p += '<input id="actioneditpage" type="number" ';
	p += ' class="css-input actionSelectPageNumber" onchange="setSourceButton();"  ';
	p += ' onkeyup="setSourceButton();" min=0 max=100 value="" />';
	
	p += '<a onClick="actionspersoShow();" class="actionSelectPersoBtn" ></a>';
	
	p += '</p>';
	
	p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
	p += ' onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >Cancel</a>';
	
	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onclick="closeEdit();" ';
	p += 'class="btnSave noselectmouse" >Save</a>';

	p += '</div>';
	
	return p;
	
}

function showChoiceAction(){
	$('#selectChoiceAction').css("display","block");
}

//Edition des actions
function objectEditId(){
	
	var p = '<div id="objetEditIdZone" ';
	p += ' class="objetEditIdZone pan ' + TYPEWIND + 'osBorder" >';
	p += barreEdit();
	
	p += '<div style="position:relative;float:left;margin-top:35px;" >';
	p += '<div style="float:left;padding:10px;min-width:60px;text-align:right;" >ID&nbsp;:&nbsp;</div>';
	p += '<input  id="editIdObject" type="text" style="width:300px;float:left;" ';
	p += ' class="css-input" value="" /></div>';

	p += '<div style="position:relative;float:left;margin-top:10px;" >';
	p += '<div style="float:left;padding:10px;min-width:60px;text-align:right;" >CSS&nbsp;:&nbsp;</div>';
	p += '<input  id="editCssObject" type="text" style="width:300px;float:left;" ';
	p += ' class="css-input" value="" /></div>';

	p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
	p += ' onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >Cancel</a>';

	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onclick="saveEditIdCssFormat();closeEdit();" ';
	p += 'class="btnSave noselectmouse" >Save</a>';

	p += '</div>';
	
	return p;
	
}

function saveEditIdCssFormat(){

	if(GlobalUid==-1){
		return false;
	}
	var obj = CLudis[GlobalUid];
	obj.idString = $('#editIdObject').val();
	var cssStr = $('#editCssObject').val();
	obj.css = cssStr;

}

function exceptionExtraWindows(){
	
	var p = '';
	
	p += '<div id="exeptionLogZone" class="exeptionLogZone pan ' + TYPEWIND + 'osBorder" >';
	
	p += '<div class="toolbar-w toolbar-header">';
	p += '<div onClick="closeEdit();" class="closehead" ></div>';
	p += '<h1 class="titlehead">Exception</h1>';
	p += '</div>';
	
	p += '<div id="zoneLogText" class="zoneLogText" ></div>';
	
	p += '<br><center><a onClick="closeEdit();" class="validation">Cancel</a>&nbsp;&nbsp;&nbsp;';
	p += '<a onClick="forceLoad()" class="validation">Force</a>';
	
	p += '</div>';
		
	return p;
	
}



