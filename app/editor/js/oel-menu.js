
function ludiInit(){
	
	var h = '';
	
	h += '<div class="pspeedpage" onClick="launchRapidRender(-1);" >';
	h += '</div>';
	
	h += '<div class="pslogs" onClick="$(\'#voirleslogs\').fadeIn();" >';
	h += '</div>';
	
	$('.menu-ecran').append(h);
	
	var p = panneauxTools();
	p += questionQcmEdit();
	p += listeEcransEdit() + questionEdit();
	p += questionEditDelete() + actionEdit();
	p += imageEditZone() + videoEdit() + editAudioMp3Zone();
	p += tcmEditZone() + lcmEditZone() + extraCodeEditZone();
	p += actionsEdit() + objectEditId() + editVideoMp4Zone();
	p += colorChoiceZone() + pageEditOptions() + formatButtonObject();
	p += exceptionExtraWindows() + databaseEditZone() + animEditObject()+ propertiesObject();
	$('body').append(p);
	
	var be = barreEdit();
	$('.toolbarZoneTexteDiv').html(be);
	var mp = '<a style="position:absolute;left:15px;bottom:15px;" '; 
	mp += ' onclick="closeEdit();" ';
	mp += 'class="validation noselectmouse" >Cancel</a>';
	
	mp += '<a style="position:absolute;right:15px;bottom:15px;" ';
	mp += 'onclick="setSourceTextV2();closeEdit();" ';
	mp += 'class="btnSave noselectmouse" >Save</a>';

	$('#editzoneV2').append(mp);
	
	$('#editzoneV2').addClass('pan');
	$('#editzoneV2').addClass(TYPEWIND + 'osBorder');

}

function panneauxTools(){
	
	var p = '';

	p += '<div class="notequestion pan" onClick="showEditNote();" >';
	p += '<div class="remarqueview" ></div>';
	p += '<div class="noteview" ></div>';
	p += '</div>';
	
	p += '<div class="actiondelete pan" onClick="showEditDelete(0);" ></div>';
	p += '<div class="actiondeleteb pan" onClick="showEditDelete(0);" ></div>';
	
	p += '<div class="actionposition pan" onClick="changeSourceSpeech();" ></div>';
	p += '<div class="editquestion pan" onClick="showEditZone();" ></div>';
	p += '<div class="actionaddfluxpts pan" onClick="addFluxPts();" ></div>';
	
	p += '<div class="micro-save" ></div>';

	return p;

}

function ludiCss(nam){
	closePan();
	closeMove();
	$('.' + nam).css("display","block");
	$('.opacedit').css("display","block");
	$('.opacedit').css("top","103px");
	$('.opacedit').css("left","0px");
}

function ludiCssNoPan(nam){
	closePan();
	closeMove();
	$('.' + nam).css("display","block");
	$('.opacedit').css("display","block");
	$('.opacedit').css("top","103px");
	$('.opacedit').css("left","0px");
}

function optMenu(){
	$('.menu-options').css("display","block");
}

function showLogsInfos(){
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'logsopt',path:'logsopt'});
	$('.menu-options').css("display","none");
}

function closePan(){
	var pan = $('.pan');
	pan.css("display","none");
	$('.opacedit').css("left","0px");
}

function closeMove(){
	if(typeof MoveObjectLudi!=="undefined"){
		MoveObjectLudi.set('left',-50);
	}
}

function listeEcransEdit(){

	var p = '<div id="g-block" class="global-block" data-force="30" >';
	
	p += '<div class="block-reordonne" onClick="reOrdonne();" ></div>';
	p += '<div class="block-stopedit" onClick="endOrdonne();" ></div>';
	p += '<ol id="listecrans" class="listecrans" >';
	p += '</ol>';
	
	p += '<div id="addecrans" onClick="pageAdd();" ></div>';
	
	p += '<div class="forceload" onClick="forceLoadProcess()" ></div>';
	
	p += '</div>';
	
	return p;

}

function forceLoadProcess(){
	
	lessonid = 'forcefile';
	
	finishLoadJson=true;
	initLoadJson=1;
	
	GPageId = guid();
	var objTemp = new CPage();
	objTemp.pageId = GPageId;
	objTemp.index = 0;
	CPagesAdd(objTemp);
	ajoutLudiBARRE();
	eventPages = true;
	
	finishLoadJson=true;
	initLoadJson=1;
	CPagesPaint();
	loadPage(GPageId);
	finishLoadData = true;
	
	$("#initgeneration,.opacedit,.forceload").css("display","none");
	
	CPagesPaint();
		
}

ludiInit();