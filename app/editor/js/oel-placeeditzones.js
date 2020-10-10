
var GlobalUid = -1;
var ModeEdit = false;
var ModeDelete = 0;
var pageDelete = '';
var loadEdit = true;
var UidEdit = -1;

//Move icons
function placeEditZone(uid){
	
	for (var i = 0; i < CLudisCount; i++){
		
		var obj = CLudis[i];
		
		if(obj.id==uid){
			
			GlobalUid = uid;
			
			placeGlobalTools(obj);

			if(obj.type=='helper'){
				var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition,.actionaddfluxpts');
				obs.css("display","none");
				launchHelper(obj);
				return false;
			}
			
			if(obj.type=='text'||obj.type=='img'||obj.type=='label'){
				$('.notequestion').css("display","none");
			}
			
			if(obj.type=='fluxPts'){
				var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition');
				obs.css("display","none");
				if(obj.val2==0){
					var ol = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv ;
					var ot = parseInt(obj.getY() * zoomCanv) + decyCanv;
					$('.actionaddfluxpts').css("display","block");
					$('.actionaddfluxpts').css("left",ol + 'px').css("top",ot + 'px');
				}
				return false;
			}
			
			if(obj.type=='qcm'
			||obj.type=='tcm'
			||obj.type=='lcm'
			||obj.type=='input'
			){
				
				var ol = parseInt(obj.getX() * zoomCanv) + decxCanv;
				var ot = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv + 10;
				
				$('.notequestion').css("display","block");
				$('.notequestion').css("left",ol +'px');
				$('.notequestion').css("top",ot +'px');

				$('.remarqueview').html(obj.remarque);
				$('.noteview').html(obj.note);
			
			}
			
			var editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv - 50;
			var editT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
			
			if(editT<decyCanv){
				editT = decyCanv;
			}
			
			if(obj.haveEditElement()){
				$('.editquestion').css("display","block");
			}else{
				$('.editquestion').css("display","none");
			}
			
			if(obj.width<100||obj.height<100){
				editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv - 20;
				editT = parseInt(obj.getY() * zoomCanv) + decyCanv - 45;
			}
			
			if(editT<115){
				editT = 115;
			}

			$('.editquestion').css("left",editL + 'px');
			$('.editquestion').css("top" ,editT + 'px');
			
			if(obj.type=='input'){
				editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv - (obj.getH());
				editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv + 4;
				$('.actiondelete').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
			}else{
				if(obj.type=='barre'||obj.type=='title'||obj.getH()<100){
					editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv + 4;
					editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv - 50;
					$('.actiondeleteb').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
				}else{
					editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv - (obj.getH() / 3);
					editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv;
					$('.actiondelete').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
				}
			}
			
			var mobjL = parseInt(obj.getX()) - 33;
			var mobjT = parseInt(obj.getY()) - 33;
			
			MoveObjectLudi.set('left',mobjL);
			MoveObjectLudi.set('top',mobjT);
			
			if(obj.type=='speech'){
				editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv - (obj.getH() / 3);
				editL = parseInt(obj.getX() * zoomCanv) + decxCanv -36;
				$('.actionposition').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
			}
			
			showWiziZone();
			
		}
		
	}
	
}

function placeGlobalTools(obj){

	if(obj.type=='text'||obj.type=='label'||obj.type=='title'||obj.type=='barre'){
		
		$('#GlobalMenuFormat').css("display","block");
		$('.toolsMenuFormat').css('visibility','visible');
		$('.toolsMenuFormat').css('display','block');
		
		authoApplikFormat = false;
		$('#fontsizenumber').val(obj.fontSize);
		authoApplikFormat = true;

	}else{

		$('#GlobalMenuFormat').css("display","none");
		$('.toolsMenuFormat').css('visibility','hidden');

	}

}

var authoApplikFormat = false;

function applikFtSizeToObj(){
	
	if(authoApplikFormat){
		
		var obj = CLudis[GlobalUid];

		if(typeof obj === 'undefined'){

			$('#GlobalMenuFormat').css("display","none");
			$('.toolsMenuFormat').css('visibility','hidden');
			
		}else{

			var tz = $('#fontsizenumber').val();
			obj.fontSize = tz;
			showWiziZone();
		
		}

	}	
	
}

//Placement des Zones d'edition fenetre
function showEditZone(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	eventObjects = true;
	
	var obj = CLudis[GlobalUid];
	
	if(obj.type=='qcm'){
		
		var panLeft = parseInt((SCREEN_0_W/2) * zoomCanv) + decxCanv - 200;
		$('.questionqcmedit').css("left",panLeft + 'px');
		$('.opacedit').css("display","block");
		$('.questionqcmedit').css("display",'block');
		
		setSourceQcm(GlobalUid);
		
	}
	
	constructWindEdit(obj);

	if(obj.type=='input'){
		LaunchInputEdit(obj);
	}
	
	if(obj.type=='text'||obj.type=='title'||obj.type=='speech'||obj.type=='label'){
		
		$('.editZoneTexteV2').css("display","block");
		$('.opacedit').css("display","block");

		loadEdit = true;
		
		tinymce.get("textAreaV2").setContent(obj.text);
		
		//editorInstance.setValue(obj.text, true);

		if(obj.type!='speech'){
			$('.styl0,.styl1').css("background-color","white").css("display","block");
		if(parseInteger(obj.val)==0){
			$('.styl0').css("background-color","#A9A9F5");
		}else{
			$('.styl1').css("background-color","#A9A9F5");
		}
		}else{
			$('.styl0,.styl1').css("display","none");
		}
		
		loadEdit = false;
	}
	
	if(obj.type=='button'){
		
		loadEdit = true;
		
		var obj = CLudis[GlobalUid];
		
		$('#actionedittext').val(obj.text);
		
		$('#actioneditpage').css('display','none');
		$('.actionSelectPersoBtn').css('display','none');
		switch (obj.data) {
			case refAct[0]:
				$('#actioneditselect').html(getTrd(refActs[0]));
				break;
			case refAct[1]:
				$('#actioneditselect').html(getTrd(refActs[1]));
				break;
			case refAct[2]:
				$('#actioneditselect').html(getTrd(refActs[2]));
				break;
			case refAct[3]:
				$('#actioneditselect').html(getTrd(refActs[3]));
				$('#actioneditpage').css('display','inline-block');
				break;
			case refAct[4]:
				$('#actioneditselect').html(getTrd(refActs[4]));
				$('.actionSelectPersoBtn').css('display','block');
				break;
			case refAct[5]:
				$('#actioneditselect').html(getTrd(refActs[5]));
				break;
			default:
				$('#actioneditselect').html('-');
		}
		
		$('.opacedit,#actioneditbtn').css("display","block");
		
		$('#actioneditpage').val(parseInteger(obj.val));
		
		loadEdit = false;
		
	}
	
	if(obj.type=='img'){
		targetImg = 0;
		launchImageEditZone();
	}
	
	if(obj.type=='database'){
		launchEditDataBase(obj);
	}
	
	if(obj.type=='video'){
		
		loadEdit = true;
		
		$('#videoEditUrl').val(obj.text);
		$('#overviewvideo').html(obj.text3);
		$('.opacedit,#videoeditzone').css("display","block");
		
		loadEdit = false;
		
	}
	
	if(obj.type=='videomp4'){
		loadEdit = true;
		launchVideoMp4Zone(obj);
		loadEdit = false;
	}

	if(obj.type=='audio'){
		loadEdit = true;
		launchAudioMp3Zone(obj);
		loadEdit = false;
	}
	
	if(obj.type=='tcm'){
		
		loadEdit = true;
		
		$('.opacedit,#tcmeditnote').css("display","block");
		$('#tcmtextarea').val(txtAreaText(obj.text));
		$('#tcmdistra').val(txtAreaText(obj.text2));
		
		loadEdit = false;
		
	}
	
	if(obj.type=='lcm'){
		
		loadEdit = true;
		
		$('.opacedit,#lcmeditpan').css("display","block");
		
		$('#sourcelcm1').val(obj.text);
		$('#tolcm1').val(obj.val);
		
		$('#sourcelcm2').val(obj.text2);
		$('#tolcm2').val(obj.val2);		
				
		$('#sourcelcm3').val(obj.text3);
		$('#tolcm3').val(obj.val3);	
		
		$('#sourcelcm4').val(obj.text4);
		$('#tolcm4').val(obj.val4);	

		$('#sourcelcm5').val(obj.text5);
		$('#tolcm5').val(obj.val5);	
		
		$('#sourcelcm6').val(obj.text6);
		$('#tolcm6').val(obj.val6);	
		
		ajustLcmZone();
		
		loadEdit = false;
	
	}
	
	if(obj.type=='barre'){
		
		loadEdit = true;
		
		launchBarreEdit(obj);
		
		loadEdit = false;
	
	}
	
	if(obj.type=='plugin'){
		LunchPluginEdit(obj);
	}
	
	if(obj.type=='plugme'){
		editPluginLaunch(obj);
	}
	
}

function ajustLcmZone(){
	
	if(GlobalUid==-1){
		return false;
	}

	var obj = CLudis[GlobalUid];
	
	if(parseTxt(obj.text3)!=''
	||parseTxt(obj.val3)!=''){
		obj.number = 3;
		$('#tolcm4,#sourcelcm4').css("display","inline-block");
		$('#lcmeditpan').css("height","280px");
	}else{
		$('#tolcm4,#sourcelcm4').css("display","none");
	}
	
	if(parseTxt(obj.text4)!=''
	||parseTxt(obj.val4)!=''){
		obj.number = 4;
		$('#sourcelcm5,#tolcm5').css("display","inline-block");
		$('#lcmeditpan').css("height","330px");
	}else{
		$('#sourcelcm5,#tolcm5').css("display","none");
	}
	
	if(parseTxt(obj.text5)!=''
	||parseTxt(obj.val5)!=''){
		obj.number = 5;
		$('#sourcelcm6,#tolcm6').css("display","inline-block");
		$('#lcmeditpan').css("height","380px");
	}else{
		$('#sourcelcm6,#tolcm6').css("display","none");
	}
	
	if(parseTxt(obj.text6)!=''
	||parseTxt(obj.val6)!=''){
		obj.number = 6;
	}
	eventObjects = true;
}

function showEditNote(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	loadEdit = true;
	
	var obj = CLudis[GlobalUid];
	
	$('#questioneditremarque').val(obj.remarque);
	$('#questioneditnote').val(obj.note);
	
	$('.opacedit,#editnote').css("display","block");
	
	loadEdit = false;
	
}

function switchTextBack(v){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	obj.val = v;
	
	$('.styl0,.styl1').css("background-color","white");
	if(parseInteger(obj.val)==0){
		$('.styl0').css("background-color","#A9A9F5");
	}else{
		$('.styl1').css("background-color","#A9A9F5");
	}
	
	showWiziZone();
	eventObjects = true;
}

function showEditDelete(typ){
	
	ModeDelete = typ;
	
	if(ModeDelete==0&&GlobalUid==-1){
		return false;
	}
	
	loadEdit = true;
	
	if(ModeDelete==0){
		var obj = CLudis[GlobalUid];
		$('#questioneditremarque').val(obj.remarque);
		$('#questioneditnote').val(obj.note);
	}
	
	$('.opacedit,#editdelete').css("display","block");
	
	loadEdit = false;
	
}

function showEditFormatId(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	loadEdit = true;
	
	var obj = CLudis[GlobalUid];
	
	if(obj.type=='button'){
		showFormatButton();
	}else{
		$('#editIdObject').val(obj.idString);
		$('#editCssObject').val(obj.css);
		$('.opacedit,#objetEditIdZone').css("display","block");
	}
	
	loadEdit = false;
	
}

function showExeptionWin(){
	
	loadEdit = true;
	$('.opacedit,#exeptionLogZone').css("display","block");
	loadEdit = false;
	
}

function closeEdit(){
	$('.opacedit,.editnote,#editzone,.opacedit,.pan').css("display","none");
	$('.panel-login').css('display','none');
	$('.opacedit').css("left","0px");
	reloadObject(GlobalUid);
}
