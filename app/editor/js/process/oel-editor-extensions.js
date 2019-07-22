
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
	return str;
}

function oeEditorShow(idName){
    
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

	$('.opacedit').css("display","block");
	
	var p = barreEdit();

	p += '<div class="zonePluginLogo" ></div>';
	
	p += '<iframe data="' + objetSendToString(GlobalUid) + '" ';
	p += ' id="editEditorFrame" name="editEditorFrame" ';
	p += ' src="' + wbpath + '" width="827px" height="650px" ';
	p += ' style="position:absolute;left:2px;top:35px;display:none;" ';
	p += ' frameBorder="0" >';
	p += '</iframe>';
	
	p += '<div class="listzonepuglin" >';
	
	p += '<a style="float:left;" onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >Cancel</a>';

	p += '<a style="float:right;margin-right:10px;" ';
	p += 'onclick="validEditorInsert();" ';
	p += 'class="btnSave noselectmouse" >Save</a>';
	
	p += '</div>';

	$('.editEditorForms').html(p);

    $('.editEditorForms').css("height","700px").css("display","block");

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
			}

			$('.opacedit').css("display","none");
			$('.editEditorForms').css("display",'none');
			showWiziZone();
					
			
		}
	}
	
}