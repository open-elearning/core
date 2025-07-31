
//Init data
setTimeout(function(){
	ludisInitCreation();
},500);

//Wait createRenderJSON is OK
function ludisInitCreation(){
	
	if(typeof lessonid !== 'undefined'){
	}else{
		lessonid = 'electronfile';
	}
	
	if(typeof folderAllImages === 'undefined'){
		folderAllImages = '';
	}
	
	if(folderAllImages==''){
		refreshImagesZones();
		var l = getAssetsList();
	}
	
	if(finishLoadJson==false){
		
		plogs("finishLoadJson = " + finishLoadJson);
		
		plogs("initLoadJson = " + initLoadJson);

		if(initLoadJson==2||initLoadJson==0){
			$("#initgeneration,.opacedit").css("display","block");
			$(".forceload").css("display","block");
			loadRenderJSON();
			document.title = getTitleFile();
		}
		
		setTimeout(function(){
			$(".forceload").css("display","none");
			ludisInitCreation();
		},250);
		
	}else{
		
		plogs("finishLoadJson = " + finishLoadJson);

		if(CPagesCount==0){
			GPageId = guid();
			var objTemp = new CPage();
			objTemp.pageId = GPageId;
			objTemp.index = 0;
			CPagesAdd(objTemp);
			ajoutLudiBARRE();
			eventPages = true;
		}

		plogs("CPagesPaint");
		
		CPagesPaint();
		loadPage(GPageId,1);
		
		addMoveCursor();
		
		finishLoadData = true;
		
		$("#initgeneration,.opacedit").css("display","none");
		
		var eventObjects = true;
		var eventPages = true;
		
		createRenderJSON();
		
	}
	
}

//Create Render JSON OBJETS
function createRenderJSON(){
	
	if(typeof CLudisCount === "undefined"){
		return false;
	}
	
	if(haveActiveFile()==false){
		return false;
	}
	
	var classiquelarge = getParamsValue('classiquelarge');

	$('.micro-save').css("display","block");
	
	jArrayCLudis = new Array();
	jsonCLudis = new Array();
	
	for (var i = 0; i < CLudisCount; i++){
		
		var Tobj = CLudis[i];
		
		if(PageExist(Tobj.pageId)){
		
			var decsupp = parseInt(Tobj.supp);
			
			if (decsupp==0) {
				var ti = Tobj.type;
				if (ti=='img'||ti=='text'||ti=='label'
				||ti=='database'||ti=='variable'||ti=='dom'||ti=='objframe'
				||ti=='title'||ti=='qcm'||ti=='button'
				||ti=='tcm'||ti=='lcm'||ti=='video'||ti=='audio'
				||ti=='videomp4'||ti=='bilan'||ti=='barre'||ti=='metaobject'
				||ti=='speech'||ti=='plugme'||ti=='fluxPts'
				||ti=='gamezoneaction'||ti=='texthtml'||ti=='plugin'
				||ti=='life'||ti=='input'||ti=='buttonarea') {
				
					var block = new Object();
					block.type = Tobj.type;
					block.subtype = Tobj.subtype;

					block.x = Tobj.x;
					block.y = Tobj.y;
					block.w = Tobj.width;
					block.h = Tobj.height;
					
					block.x2 = Tobj.x2;
					block.y2 = Tobj.y2;
					block.w2 = Tobj.width2;
					block.h2 = Tobj.height2;

					block.rw = Tobj.realwidth;
					block.rh = Tobj.realheight;
					block.anim = Tobj.anim;
					block.css = Tobj.css;
					block.fontSize = Tobj.fontSize;
					block.lock = Tobj.lock;

					if(typeof(Tobj.zindex)=='undefined'){
						Tobj.zindex = 1;
					}
					
					block.zindex = Tobj.zindex;
					
					block.idString = Tobj.idString;
					
					block.pageId = Tobj.pageId;
					
					block.text = sJtext(Tobj.text);
					
					if(Tobj.text2!=''){
						block.text2 = sJtext(Tobj.text2);
					}
					if(Tobj.text3!=''){
						block.text3 = sJtext(Tobj.text3);
					}
					if(Tobj.text4!=''){
						block.text4 = sJtext(Tobj.text4);
					}
					if(Tobj.text5!=''){
						block.text5 = sJtext(Tobj.text5);
					}
					if(Tobj.text6!=''){
						block.text6 = sJtext(Tobj.text6);
					}
					if(Tobj.text7!=''){
						block.text7 = sJtext(Tobj.text7);
					}
					if(Tobj.text8!=''){
						block.text8 = sJtext(Tobj.text8);
					}
					
					block.val = Tobj.val;
					
					if(Tobj.number!=''){
						block.number = Tobj.number;
					}
					if(Tobj.val2!=''){
						block.val2 = Tobj.val2;
					}else{
						block.val2 = '';
					}
					if(Tobj.val3!=''){
						
						if (Tobj.type=="barre") {
							var nurval3 = correctImgSrc(Tobj.val3);
							block.val3 = nurval3;
						} else {
							block.val3 = Tobj.val3;
						}
						
					}else{
						block.val3 = '';
					}

					if(Tobj.val4!=''){
						block.val4 = Tobj.val4;
					}else{
						block.val4 = '';
					}
					if(Tobj.val5!=''){
						block.val5 = Tobj.val5;
					}else{
						block.val5 = '';
					}
					if(Tobj.val6!=''){
						block.val6 = Tobj.val6;
					}else{
						block.val6 = '';
					}
					if(Tobj.val7!=''){
						block.val7 = Tobj.val7;
					}else{
						block.val7 = '';
					}
					if(Tobj.val8!=''){
						block.val8 = Tobj.val8;
					}else{
						block.val8 = '';
					}
					
					if(Tobj.actionVal!=''){
						block.actionVal = Tobj.actionVal;
					}else{
						block.actionVal = '';
					}
					if(Tobj.actionData!=''){
						block.actionData = correctImgSrc(Tobj.actionData);
					}else{
						block.actionData = '';
					}

					if(Tobj.actionLine1!=''){
						block.actionLine1 = Tobj.actionLine1;
					}else{
						block.actionLine1 = '';
					}			
					if(Tobj.actionLine2!=''){
						block.actionLine2 = Tobj.actionLine2;
					}else{
						block.actionLine2 = '';
					}

					if(Tobj.data!=''){
						if(Tobj.type=='img'){
							var nur = correctImgSrc(Tobj.data);
							Tobj.text6 = nur;
							block.data = Tobj.text6;
						}else{
							block.data = Tobj.data;
						}
					}
					
					if(Tobj.text6!=''){
						block.text6 = sJtext(Tobj.text6);
					}
					
					if(Tobj.type=='qcm'||Tobj.type=='input'
					||Tobj.type=='lcm'||Tobj.type=='tcm'){
						block.note = Tobj.note;
						block.remarque = Tobj.remarque;
					}
					
					block.fontSize = Tobj.fontSize;
					block.lock = Tobj.lock;
					var jsonBlock = JSON.stringify(block);
					
					jArrayCLudis.push(jsonBlock);
					jsonCLudis.push(block);
					
				}
				
			}
		
		}
		
	}
	
	amplify.store('actualCLudis',jArrayCLudis);

	saveFileRenderLudi(jsonCLudis);
	
	createRenderPagesJSON();
	
	modifProcessLaunch();
	
}

function correctImgSrc(data){

	if(typeof data === "undefined") {
		data = '';
	}
	
	var nur = data;
	if(nur.indexOf(".jpg")!=-1
	||nur.indexOf(".png")!=-1
	||nur.indexOf(".gif")!=-1
	||nur.indexOf(".jpeg")!=-1
	||nur.indexOf(".svg")!=-1
	){
		if(nur.indexOf("worker/assets")!=-1){
			nur = nur.substring(nur.indexOf("worker/assets"));
			nur = nur.replace("worker/assets/", "assets/");
		}else{
			if(nur.indexOf("file-upload/")!=-1){
				nur = nur.substring(nur.indexOf("worker/assets"));
				nur = nur.replace("//", "/");
			}
		}

		if (nur.indexOf("/assets/")!=-1) {
			nur = nur.substring(nur.indexOf("/assets/"));
			nur = nur.replace("/assets/", "assets/");
			nur = nur.replace("//", "/");
		}

	}
	return nur;
}

//Create Render JSON PAGES
function createRenderPagesJSON(){
	
	//Pages
	jArrayCPages = new Array();
	jsonCPages = new Array();
	
	var ind = 0;
	
	for(var i=0;i<CPagesCount;i++){
		
		var Tobj = CPages[i];
		if(typeof Tobj === "undefined") {
	
		}else{
			var decsupp = parseInt(Tobj.supp);
			
			if(decsupp==0){
				
				var block = new Object();
				block.id = Tobj.id;
				block.pageId = Tobj.pageId;
				block.index = ind;
				block.data = Tobj.data;
				block.back = Tobj.back;
				block.backsvg = Tobj.backsvg;
				block.back2 = Tobj.back2;
				block.back2svg = Tobj.back2svg;
				block.screen = Tobj.screen;
				block.comicMode = Tobj.comicMode;
				block.script = sJtext(Tobj.script);

				if(typeof Tobj.transition === "undefined") {
					Tobj.transition = 'Direct'
				}
				block.transition = Tobj.transition;
			
				if(typeof Tobj.title === "undefined") {
					Tobj.title = ''
				}
				block.title = Tobj.title;
				if(typeof Tobj.komessage === "undefined") {
					Tobj.komessage = ''
				}
				block.komessage = Tobj.komessage;

				ind = ind + 1;
				
				var jsonBlock = JSON.stringify(block);
				
				jArrayCPages.push(jsonBlock);
				jsonCPages.push(block);
			
			}
		}
	}
	
	amplify.store('actualCPages' + lessonid,jArrayCPages);
	amplify.store('actualPageId' + lessonid,GPageId);
	saveFileRender(jsonCPages);

	createRenderParamsJSON();
	
	plogs('saveFileRender jsonCPages : ' + CPagesCount);
		
}

//Create Render JSON PARAMS
function createRenderParamsJSON(){
	
	if(typeof CParamsCount === "undefined"){
		return false;
	}
	
	if(haveActiveFile()==false){
		return false;
	}
	
	$('.micro-save').css("display","block");
	
	jArrayCParams = new Array();
	jsonCParams = new Array();
	
	for (var i = 0; i < CParamsCount; i++){
		
		var Tobj = CParams[i];

		var block = new Object();
		block.id = Tobj.id;
		block.type = Tobj.type;
		block.key = Tobj.key;
		block.value = Tobj.value;
	
		var jsonBlock = JSON.stringify(block);
		
		jArrayCParams.push(jsonBlock);
		jsonCParams.push(block);
		
	}
	
	amplify.store('actualCParams',jArrayCParams);

	saveFileRenderParams(jsonCParams);

}

var initLoadJson = 0;

//Load Extract JSON
function loadRenderJSON(){
	
	//console.log("loadRenderJSON");
	//console.log("haveActiveFile = " + haveActiveFile());
	
	if(haveActiveFile()==false){	
		return false;
	}

	plogs('loadRenderJSON START');
	
	initLoadJson = 1;
	
	var actualCPages = new Array();
	var actualCLudis = new Array();
	var actualCparams = new Array();

	GPageId = Sit(amplify.store('actualPageId' + lessonid));
	
	actualCPages = loadLocalJSON('pages.json');
	amplify.store('actualCPages' + lessonid,actualCPages);
	plogs(actualCPages.length  + ' Pages load ...');
	
	actualCLudis = loadLocalJSON('cludis.json');
	amplify.store('actualCLudis' + lessonid,actualCLudis);
	plogs(actualCLudis.length  + ' Objects load ...');
	
	actualCparams = loadLocalJSON('params.json');
	amplify.store('actualCparams' + lessonid,actualCparams);
	plogs(actualCparams.length  + ' Params load ...');

	plogs('loadRenderJSON OK');
	
	if(typeof actualCPages.length ==="undefined"){
		if(typeof actualCLudis.length ==="undefined"){
			plogs('New File');
			stepsave = 0 ;
			eventPages = true;
			eventObjects = true;
		}
	}
	
	loadRenderJsonByData(actualCPages,actualCLudis,actualCparams);
	
	finishLoadJson = true;
	
}

//loadRenderJsonByData
function loadRenderJsonByData(actualCPages,actualCLudis,actualCparams){
	
	var jso = true;
	
	if(typeof actualCPages==="undefined"){
		return false;
	}
	
	if(typeof actualCLudis==="undefined"){
		return false;
	}

	if(typeof actualCparams==="undefined"){
		return false;
	}
	
	var memPage = "";
	var indexPage = 0;
	
	CParamsCount = 0;

	for(var i=0;i<actualCparams.length;i++){
		
		var elemObj = actualCparams[i];
		var elemP = new CParam();
		elemP.id = CParamsCount;
		elemP.key = elemObj.key;
		elemP.type = elemObj.type;
		elemP.value = elemObj.value;
		CParams.push(elemP);
		CParamsCount = CParamsCount + 1;

	}
	
	var classiquelarge = getParamsValue('classiquelarge');

	for (var i=0;i<actualCPages.length;i++) {
		
		if(actualCPages[i]){
			
			var objPage;
			
			if(jso){
				objPage = actualCPages[i];
			}else{
				objPage = JSON.parse(actualCPages[i]);
			}
			
			var objTemp = new CPage();
			
			if(GPageId==''){
				GPageId = objPage.pageId;
			}
			objTemp.script = rJtext(objPage.script);
			objTemp.back = rJtext(objPage.back);
			objTemp.backsvg = rJtext(objPage.backsvg);
			objTemp.back2 = rJtext(objPage.back2);
			objTemp.back2svg = rJtext(objPage.back2svg);

			objTemp.screen = rJtext(objPage.screen);
			objTemp.comicMode = parseInteger(objPage.comicMode);
			objTemp.pageId = objPage.pageId;
			
			if(typeof objPage.transition === "undefined") {
				objPage.transition = 'Direct'
			}
			if(typeof objPage.title === "undefined") {
				objPage.title = ''
			}
			if(typeof objPage.komessage === "undefined") {
				objPage.komessage = ''
			}
			objTemp.transition = rJtext(objPage.transition);
			objTemp.title = rJtext(objPage.title);
			objTemp.komessage = rJtext(objPage.komessage);
			
			memPage = memPage + objPage.pageId + ";";
			
			objTemp.index = objPage.index;
			indexPage = objPage.index;
			CPagesAdd(objTemp);
			
		}
	
	}
	
	var objFake = LudiBase();
	objFake.type = '';
	objFake.x = -50;
	objFake.y = -50;
	objFake.width = 10;
	objFake.height = 10;
	objFake.realwidth = 10;
	objFake.realheight = 10;
	CLudisAdd(objFake);
	
	for(var i=0;i<actualCLudis.length;i++){
		
		if(actualCLudis[i]){
			
			var objTemp2 = LudiBase();
			
			var objLudi;
			
			if(jso){
				objLudi = actualCLudis[i];
			}else{
				objLudi = JSON.parse(actualCLudis[i]);
			}
			
			objTemp2.type = objLudi.type;
			objTemp2.subtype = objLudi.subtype;
			objTemp2.x = objLudi.x;
			objTemp2.y = objLudi.y;

			objTemp2.x2 =parseInteger( objLudi.x2);
			objTemp2.y2 = parseInteger(objLudi.y2);

			objTemp2.width = objLudi.w;
			objTemp2.width2 = parseInteger(objLudi.w2);

			if (classiquelarge==1) {
				if (objTemp2.type=='barre') {
					objTemp2.width = 1281;
				}
			}

			objTemp2.height = objLudi.h;
			objTemp2.height2 = parseInteger(objLudi.h2);

			objTemp2.realwidth = objLudi.rw;
			objTemp2.realheight = objLudi.rh;
			objTemp2.realwidth2 = parseInteger(objLudi.rw2);
			objTemp2.realheight2 = parseInteger(objLudi.rh2);
			
			objTemp2.lock = objLudi.lock;
			if(typeof(objTemp2.lock)=='undefined'){
				objTemp2.lock = false;
			}
			
			objTemp2.zindex = objLudi.zindex;
			if(typeof(objTemp2.zindex)=='undefined'){
				objTemp2.zindex = 1;
			}
			
			objTemp2.anim = objLudi.anim;
			
			objTemp2.css = objLudi.css;
			if(typeof(objTemp2.css)=='undefined'){
				objTemp2.css = '';
			}
			
			objTemp2.idString = objLudi.idString;
			objTemp2.pageId = objLudi.pageId;
			
			objTemp2.text = rJtext(objLudi.text);
			objTemp2.text2 = rJtext(Sit(objLudi.text2));
			objTemp2.text3 = rJtext(Sit(objLudi.text3));
			objTemp2.text4 = rJtext(Sit(objLudi.text4));
			objTemp2.text5 = rJtext(Sit(objLudi.text5));
			objTemp2.text6 = rJtext(Sit(objLudi.text6));
			objTemp2.text7 = rJtext(Sit(objLudi.text7));
			objTemp2.text8 = rJtext(Sit(objLudi.text8));

			objTemp2.val = objLudi.val;
			objTemp2.val2 = Sit(objLudi.val2);
			objTemp2.val3 = Sit(objLudi.val3);
			objTemp2.val4 = Sit(objLudi.val4);
			objTemp2.val5 = Sit(objLudi.val5);
			objTemp2.val6 = Sit(objLudi.val6);
			objTemp2.val7 = Sit(objLudi.val7);
			objTemp2.val8 = Sit(objLudi.val8);

			objTemp2.data = Sit(objLudi.data);
			objTemp2.number = Sit(objLudi.number);
			
			objTemp2.actionVal = Sit(objLudi.actionVal);
			objTemp2.actionData = Sit(objLudi.actionData);
			objTemp2.actionLine1 = Sit(objLudi.actionLine1);
			objTemp2.actionLine2 = Sit(objLudi.actionLine2);
			
			objTemp2.fontSize = parseInteger(objLudi.fontSize);
			if(objTemp2.fontSize==0){
				objTemp2.fontSize = 18;
			}
			
			objTemp2.lock = objLudi.lock;

			if(objTemp2.lock === 'undefined'){
				objTemp2.lock = false;
			}
			
			objTemp2.note = parseInteger(objLudi.note);
			objTemp2.remarque = rJtext(Sit(objLudi.remarque));
			
			CLudisAdd(objTemp2);
			
			if (memPage.indexOf(objTemp2.pageId)==-1) {
				alert("Ho !");
				var objPageRecover = new CPage();;
				objPageRecover.script = "";
				objPageRecover.back = "";
				objPageRecover.backsvg = "";
				objPageRecover.back2 = "";
				objPageRecover.backsvg2 = "";
				objPageRecover.screen = "";
				objPageRecover.pageId = objTemp2.pageId;
				memPage = memPage + objTemp2.pageId + ";";
				objPageRecover.index = indexPage + 1;
				CPagesAdd(objPageRecover);
			}
			
		}
	
	}
	
	createRenderJSON();
	
}

//Create open elearning
function ludiQuit(){
	//location.href='../index.php';
}
