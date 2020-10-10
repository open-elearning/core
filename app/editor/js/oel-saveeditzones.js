
function reloadObject(i){
	
	if(i==-1){
		return false;
	}
	
	var objL = CLudis[i];
	
	UidEdit = -1;
	
	if(objL.type=='qcm'||objL.type=='text'
	||objL.type=='variable'||objL.type=='label'
	||objL.type=='title'||objL.type=='tcm'
	||objL.type=='lcm'||objL.type=='button'
	||objL.type=='speech'||objL.type=='input'){
		
		canvas.forEachObject(function(obj) {
			if (obj.id && obj.id === i&& obj.id != 'move') {
				obj.set('active', true);
				canvas.remove(obj);
			}
		});
		
		canvas.forEachObject(function(obj) {
			if (obj.id === i&& obj.id != 'move') {
				obj.set('active', true);
				canvas.remove(obj);
			}
		});
		
		objL.isCreate = false;
		ModeEdit = false;
		eventObjects = true;
		
		CLudisPaint();
	}
	
}

function setSourceText(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	closePan();
	
	var obj = CLudis[GlobalUid];
	var txt = editorInstance.getValue();
	if(obj.text!=txt){
		txt = replaceAll(txt,"href","data-ref");
		obj.text = txt;
		
	}
	
	reloadObject(GlobalUid);
	showWiziZone();

	eventObjects = true;
}

function setSourceTextV2(){
	
	//var txt = $('#textAreaV2').tinymce().getContent();
	
	if(GlobalUid==-1){
		return false;
	}
	
	var txt = tinymce.get("textAreaV2").getContent();

	closePan();
	
	var obj = CLudis[GlobalUid];
	
	if(obj.text!=txt){
		txt = replaceAll(txt,"href","data-ref");
		obj.text = txt;	
	}
	
	reloadObject(GlobalUid);
	showWiziZone();

	eventObjects = true;
}


function setSourceScript(){
	
	if(GPageId==''){
		return false;
	}
	
	var objPage = GetPageById(GPageId);
	
	objPage.script = $('#textareascript').val();
	
	closePan();
	
	eventPages = true;
	eventObjects = true;
}

function setSourceNote(){
	
	if(loadEdit==true){
		return false;
	}
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	obj.remarque = $('#questioneditremarque').val();
	obj.note = $('#questioneditnote').val();
	
	$('.remarqueview').html(obj.remarque);
	$('.noteview').html(obj.note);
	eventObjects = true;			
}

function setSourcePlugin(){
	
	if(loadEdit==true){
		return false;
	}
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	obj.text = $('#field1').val();
	obj.text2 = $('#field2').val();
	eventObjects = true;
}

function setSourceInput(){
	
	if(loadEdit==true){return false;}
	if(GlobalUid==-1){return false;}
	var obj = CLudis[GlobalUid];
	obj.text = $('#fieldInput').val();
	
	closePan();
	
	placeEditZone(GlobalUid);
	reloadObject(GlobalUid);
	showWiziZone();
	eventObjects = true;

}

function setSourceButton(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	if(obj.type=='button'){
		var txt = $('#actionedittext').val();
		obj.text = txt;
		var objCanvas = canvas.getActiveObject();
		objCanvas.paths[1].text = txt;
		obj.val = $('#actioneditpage').val();
	}
	eventObjects = true;
}

function setSourceIdString(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];	
	var txt = $('#editIdObject').val();
	txt = openelearning.extractIdStr(txt);
	obj.idString = txt;
		
	eventObjects = true;
}

function changeSourceSpeech(){
	
	if(GlobalUid==-1){
		return false;
	}
	var lst = '0;1;4;5;';
	var max = 5;
	var obj = CLudis[GlobalUid];
	obj.val = parseInteger(obj.val) + 1;
	
	if(obj.val>max){obj.val = 0;}
	
	if(obj.y<200){
		if(lst.indexOf(obj.val+';')==-1){
			obj.val++;
			if(obj.val>max){obj.val = 0;}
		}
		if(lst.indexOf(obj.val+';')==-1){
			obj.val++;
			if(obj.val>max){obj.val = 0;}
		}
		if(lst.indexOf(obj.val+';')==-1){
			obj.val++;
			if(obj.val>max){obj.val = 0;}
		}
	}
	if(obj.val<4){obj.width = 300;}
	if(obj.val==4){obj.width = 480;}
	if(obj.val==5){obj.width = 480;}
	
	obj.realwidth = obj.width;
	
	obj.data = "img/bulle/bullebase" + obj.val + ".png";
	
	placeEditZone(GlobalUid);
	reloadObject(GlobalUid);
	showWiziZone();
	eventObjects = true;
}

function setSourceTcm(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	if(obj.type=='tcm'){
		
		var text = transText($('#tcmtextarea').val());
		if(text!=obj.text){
			obj.text = text;
			ModeEdit = true;
			UidEdit = GlobalUid;
		}
		
		var text2 = transText($('#tcmdistra').val());
		if(text2!=obj.text2){	
			obj.text2 = text2;
			ModeEdit = true;
			UidEdit = GlobalUid;
		}
		eventObjects = true;
	}
	
}

function setSourceLcm(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	if(obj.type=='lcm'){
		
		obj.text = $('#sourcelcm1').val();
		obj.val = $('#tolcm1').val();
		
		obj.text2 = $('#sourcelcm2').val();
		obj.val2 = $('#tolcm2').val();		
		
		obj.text3 = $('#sourcelcm3').val();
		obj.val3 = $('#tolcm3').val();
		
		obj.text4 = parseTxt($('#sourcelcm4').val());
		obj.val4 = parseTxt($('#tolcm4').val());		
		
		obj.text5 = parseTxt($('#sourcelcm5').val());
		obj.val5 = parseTxt($('#tolcm5').val());
		
		obj.text6 = parseTxt($('#sourcelcm6').val());
		obj.val6 = parseTxt($('#tolcm6').val());
		
		if(obj.text3!=''){obj.number = 3;}
		if(obj.text4!=''){obj.number = 4;}
		if(obj.text5!=''){obj.number = 5;}
		if(obj.text6!=''){obj.number = 6;}
		
		ajustLcmZone();
		
		ModeEdit = true;
		UidEdit = GlobalUid;
		eventObjects = true;	
	}
	
}

function actionDelete(){
	
	if(ModeDelete==1){
		deletePages(pageDelete);
		closeEdit();
		closePan();
		return false;
	}
	
	if(loadEdit==true){
		return false;
	}
	if(GlobalUid==-1){
		return false;
	}
	
	i = GlobalUid;
	canvas.forEachObject(function(obj) {
		if (obj.id && obj.id === i) {
			obj.set('active', true);
			canvas.remove(obj);
		}
	});
	
	canvas.forEachObject(function(obj) {
		if (obj.id === i) {
			obj.set('active', true);
			canvas.remove(obj);
		}
	});
	
	var obj = CLudis[i];
	obj.supp = 1;
	
	GlobalUid = -1;
	UidEdit = -1;
	showWiziZone();
	closePan();
	createRenderJSON();
	closeEdit();
	closePan();
	
	if(typeof MoveObjectLudi==="undefined"){
			
	}else{
		MoveObjectLudi.set('left',-100);
	}
	
	eventObjects = true;
}

function transText(txt){
	
	txt = txt.replace(/(?:\r\n|\r|\n)/g, '<br>');
	return txt;
	
}

function txtAreaText(txt){
	
	var find = '<br>';
	var re = new RegExp(find, 'g');
	txt = txt.replace(re, '\n');
	return txt;
	
}

