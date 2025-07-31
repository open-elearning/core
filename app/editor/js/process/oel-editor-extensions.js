
function objetSendToString(id){
    
    var str = "";
    var Tobj = CLudis[id];
	str += Tobj.id + '@';
	str += Tobj.idFab + '@';
	str += Tobj.unikid + '@';
    str += Tobj.idString + '@';
    str += Tobj.type + '@';
	str += Tobj.subtype + '@';
    str += Tobj.text + '@';
    str += Tobj.text2 + '@';
    str += Tobj.text3 + '@';
    str += Tobj.text4 + '@';
    str += Tobj.text5 + '@';
    str += Tobj.text6 + '@';
    str += Tobj.val + '@';
    str += Tobj.val2 + '@';
    str += Tobj.val3 + '@';
    str += Tobj.val4 + '@';
    str += Tobj.val5 + '@';
    str += Tobj.val6 + '@';
	str += Tobj.actionVal + '@';
    str += Tobj.actionData + '@';
    str += Tobj.actionLine1 + '@';
    str += Tobj.actionLine2 + '@';
	Tobj.idsDico = getIdsLst();
	str += Tobj.idsDico + '@';

	return str;
}

function getIdsLst(){

	var str = "";

	if(GPageId!=''){
		for (var i = 0; i < CLudisCount; i++) {
			if (CLudis[i].supp==0) {
				if (CLudis[i].pageId==GPageId) {
					var idctr = parseTxt(CLudis[i].idString);
					if (idctr!='') {
						str = str + idctr + ';';
					}
				}
			}
		}
	}

	return  str;

}

function oeEditorShow(idName){
    
	var bodyHeight = $('#opacedit').height() -30;
	
    var pathAllPlugins = folderAllPlugins.replace(/\\/g, "/");
	
	if(typeof pathAllPlugins ==='undefined'){
		return false;
	}
	if(pathAllPlugins==''){
		return false;
	}
	
    var wbpath = 'file:///' + pathAllPlugins + idName + '/forms/index.html';
	wbpath = wbpath.replace(/\\/g, "/");
	wbpath = wbpath.replace('\\', "/");
	
	if(!openelearning.gebi('editEditorForms')){
		var pb = '<div id="editEditorForms" ';
		pb += ' class="editEditorForms pan ' + TYPEWIND + 'osBorder" >';
		pb += '</div>';
		$('body').append(pb);
	}
	if (bodyHeight>700) {
		$('#editEditorForms').css("top","30px");
	} else {
		$('#editEditorForms').css("top","10px");
	}

	$('.opacedit').css("display","block");
	
	var p = barreEdit();

	p += '<div class="zonePluginLogo" ></div>';
	
	p += '<iframe data="' + objetSendToString(GlobalUid) + '" ';
	p += ' id="editEditorFrame" name="editEditorFrame" ';
	p += ' src="' + wbpath + '" width="827px" ';
	
	if (bodyHeight>700) {
		p += ' height="650px" ';
	} else {
		p += ' height="' + parseInt(bodyHeight-90) + 'px" ';
	}

	p += ' style="position:absolute;left:2px;top:35px;display:none;" ';
	p += ' frameBorder="0" >';
	p += '</iframe>';
	
	p += '<div class="listzonepuglin" >';
	
	p += '<a style="float:left;" onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';

	p += '<a style="float:right;margin-right:10px;" ';
	p += 'onclick="validEditorInsert();" ';
	p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
	
	p += '</div>';
	
	$('.editEditorForms').html(p);
	if (bodyHeight>700) {
		$('.editEditorForms').css("height","700px").css("display","block");
	} else {
		$('.editEditorForms').css("height",parseInt(bodyHeight-30) + "px").css("display","block");
	}
  

    setTimeout(function(){ 
		$('#editEditorFrame').css("display","block");
		$('.zonePluginLogo').css("display","none");
		pleaseWaitPlugin = true;
    },400);
    
}

function validEditorInsert(){
	
	if(pleaseWaitPlugin){
		
		transfertTextPlugins = $('#editEditorFrame').contents().find('#finalcode').val();
		
		if(transfertTextPlugins==''){
		
			alert('Failure of registration');
		
		}else{

			var obj = CLudis[GlobalUid];
			var getObjD = transfertTextPlugins.split("@");
			var Tobj = new Object();

			Tobj.id = getObjD[0];
			Tobj.idFab = getObjD[1];
			Tobj.unikid = getObjD[2];
			Tobj.idString = getObjD[3];
			Tobj.type = getObjD[4];
			Tobj.subtype = getObjD[5];
			Tobj.text = getObjD[6];
			Tobj.text2 = getObjD[7];
			Tobj.text3 = getObjD[8];
			Tobj.text4 = getObjD[9];
			Tobj.text5 = getObjD[10];
			Tobj.text6 = getObjD[11];
			Tobj.val = getObjD[12];
			Tobj.val2 = getObjD[13];
			Tobj.val3 = getObjD[14];
			Tobj.val4 = getObjD[15];
			Tobj.val5 = getObjD[16];
			Tobj.val6 = getObjD[17];
			Tobj.actionVal = getObjD[18];
			Tobj.actionData = getObjD[19];
			Tobj.actionLine1 = getObjD[20];
			Tobj.actionLine2 = getObjD[21];

			if(parseInt(obj.id)==parseInt(Tobj.id)){
				obj.text = Tobj.text;
				obj.text2 = Tobj.text2;
				obj.text3 = Tobj.text3;
				obj.text4 = Tobj.text4;
				obj.text5 = Tobj.text5;
				obj.val = Tobj.val;
				obj.val2 = Tobj.val2;
				obj.val3 = Tobj.val3;
				obj.val4 = Tobj.val4;
				obj.val5 = Tobj.val5;
				obj.val6 = Tobj.val6;
				obj.actionVal = Tobj.actionVal;
				obj.actionData = Tobj.actionData;
				obj.actionLine1 = Tobj.actionLine1;
				obj.actionLine2 = Tobj.actionLine2;
			}

			$('.opacedit').css("display","none");
			$('.editEditorForms').css("display",'none');
			showWiziZone();
					
			
		}
	}
	
}
