
var nbErrorLoad = 0;
var modeOffline = 0;
var eventObjects = false;
var eventPages = false;

//haveActiveFile
function haveActiveFile(){

	var remote = require('electron').remote;
	var activeFile = remote.getGlobal('sharedObj').activeFile;
	
	if(activeFile==0&&activeFile=='0'){
		return false;
	}else{
		return true;
	}
	
}

//setEditorMode
function setEditorMode(valEdit){

	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	
	ipc.send('message',{key:'setGlobalVar',varkey:'EDITORMODE',valkey:valEdit});

}

//haveActiveOS
function haveActiveOS(){

	var remote = require('electron').remote;
	var activeOS = remote.getGlobal('sharedObj').activeOS;
	
	if(activeOS){
		return activeOS;
	}else{
		return "";
	}
	
}

//haveRenderProcess
function haveRenderProcess(){

	var remote = require('electron').remote;
	var renderProcess = remote.getGlobal('renderprocess');
	
	if(renderProcess==true||renderProcess==1){
		return true;
	}else{
		return false;
	}
	
}

function getTitleFile(){

	var remote = require('electron').remote;
	var activeTitle = remote.getGlobal('sharedObj').activeTitle;
	
	return activeTitle;
	
}

//haveError
function haveError(){

	var remote = require('electron').remote;
	var errornb = remote.getGlobal('errornb');
	
	if(parseInt(errornb)==0){
		return false;
	}else{
		return true;
	}
	
}

function plogs(mess){
	
	if(openelearning.gebi('voirleslogs')){
		$('#voirleslogs').append(mess + '<br>');
	}
	
}

function replaceAll(src, str1, str2, ignore){
	if(typeof(src)=='undefined'){
		return "";
	}
	if(src==""){
		return "";
	}
	if(typeof src !== 'string'){
		return src;
	}else{			
		return src.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
	}
} 

function rJtext(s){
	
	if (typeof(s) == 'undefined'){
		return "";
	}
	
	s = decodeURIComponent(escape(s));
	
	s = replaceAll(s,';nLUDI',";\nLUDI");
	//s = replaceAll(s,';n',";\n");
	
	s = replaceAll(s,'u00f4','ô');
	s = replaceAll(s,'u00e9','é');
	s = replaceAll(s,'u00e8','è');
	s = replaceAll(s,'u00e0','à');
	s = replaceAll(s,'u00e0','à');
	s = replaceAll(s,'u00e7','ç');
	s = replaceAll(s,'u00f9','ù');
	s = replaceAll(s,'u00ab','«');
	s = replaceAll(s,'u00bb','»');
	s = replaceAll(s,'u00ef','ï');
	s = replaceAll(s,'u00f6','ö');
	s = replaceAll(s,'u00e2','â');
	s = replaceAll(s,'u2019',"'");
	s = replaceAll(s,'Ã©',"e");
	s = replaceAll(s,'ZaposA','"');
	return s;
}

function sJtext(src){
	src = replaceAll(src,'"','ZaposA');
	return src;
}

var old_render_str;
var stepsave = 0 ;

//Sauvegarde des données json pages
function saveFileRender(jsonCPages){
	
	if(lessonid==''){return false;}
	
	if(eventPages==false){
		stepsave = stepsave + 1;
		return false;
	}
	const electron = require('electron')
	const ipc = electron.ipcRenderer

	ipc.send('message',{key:'saveJsonPages',text:JSON.stringify(jsonCPages)})
	eventPages = false;
}

function saveCommand(){
	
	if(haveActiveFile()==false){
		return false;
	}
	
	eventObjects = true;
	eventPages = true;
	createRenderJSON();
	
	$('.opacedit').css("display","block");
	$("#editgeneration").css("display","block");
	$('.menu-vertical').css("display","none");
	
	setTimeout(function(){
		
		if(!eventPages){
			
			const electron = require('electron');
			const ipc = electron.ipcRenderer;
			ipc.send('message',{key:'savefile'});
			
			setTimeout(function(){
				closePan();
			},700);
			
		}else{
			
			setTimeout(function(){
				if(!eventPages){
					const electron = require('electron');
					const ipc = electron.ipcRenderer;
					ipc.send('message',{key:'savefile'});
						
					setTimeout(function(){
						closePan();
					},700);
					
				}else{
					alert('Error');
					closePan();
				}
			},1000);
		
		}
	},700);
	
}

//Sauvegarde des données json objets
function saveFileRenderLudi(jsonCLudis){
	
	if(lessonid==''){return false;}
	
	if(eventObjects==false){
		stepsave = stepsave + 1;
		setTimeout(function(){$('.micro-save').css("display","none");},1000);
		return false;
	}
	
	const electron = require('electron')
	const ipc = electron.ipcRenderer
	ipc.send('message',{key:'saveJsonCLudis',text:JSON.stringify(jsonCLudis)})
	
	eventObjects = false;
	setTimeout(function(){$('.micro-save').css("display","none");},500);
	stepsave = stepsave + 1;
	
}

//Sauvegarde des données json params
function saveFileRenderParams(jsonCParams){
	
	if(lessonid==''){return false;}
	
	const electron = require('electron')
	const ipc = electron.ipcRenderer
	ipc.send('message',{key:'saveJsonCParams',text:JSON.stringify(jsonCParams)})
	
	eventObjects = false;
	setTimeout(function(){$('.micro-save').css("display","none");},500);
	stepsave = stepsave + 1;
	
}

var PageGlobaleRender = 0;

var progressTranquil = 0;

// -2 : Export to folder
function launchRapidRender(np){
	
	closeMove();
	
	PageGlobaleRender = np;
	
	$('.barreProgress').css("width","0%");
	$('.opacedit').css("display","block");
	$("#barreGeneration").css("display","block");
	
	stepsave = 0 ;
	eventPages = true;
	eventObjects = true;
	
	createRenderJSON();
	
	progressTranquil = 10;
	
	$('.barreProgress').css("width", "2%");
	
	setTimeout(function(){
		$('.barreProgress').css("width", progressTranquil + "%");
		launchProcessRender();
	},1000);
	
	setTimeout(function(){
		if(np!=-2){
			progressTranquil = progressTranquil + 10;
			$('.barreProgress').css("width", progressTranquil + "%");
			finalRenderProcess();
		}else{
			if (np==-2) {
				renderExportToFolder()
			} else {
				setTimeout(function(){
					$('.barreProgress').css("width", "60%");
					setTimeout(function(){
						$('.opacedit').css("display","none");
						$("#barreGeneration").css("display","none");
					},1000);
				},3000);
			}
		}
	},2000);
	
}

function launchProcessRender(){
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'render'});
}

function finalRenderProcess(){
	
	if(haveRenderProcess()){

		if(progressTranquil<90){
			progressTranquil = progressTranquil + 5;
		}else if(progressTranquil<96){
			progressTranquil = progressTranquil + 1;
		}
		
		$('.barreProgress').css("width", progressTranquil + "%");
		
		setTimeout(function(){
			finalRenderProcess();
		},500);
	
	}else{
		
		if(!haveError()){
			
			$('.barreProgress').css("width","100%");
			setTimeout(function(){finalRenderProcessLaunch()},500);
			
		}
		
		setTimeout(function(){
			$('.opacedit').css("display","none");
			$("#barreGeneration").css("display","none");
			$('.barreProgress').css("width","0%");
		},3500);
	}
	
}

function renderExportToFolder(){
	
	if(haveRenderProcess()){

		if(progressTranquil<90){
			progressTranquil = progressTranquil + 5;
		}else if(progressTranquil<96){
			progressTranquil = progressTranquil + 1;
		}
		
		$('.barreProgress').css("width", progressTranquil + "%");
		
		setTimeout(function(){
			renderExportToFolder();
		},500);
	
	}else{
		
		if(!haveError()){
			
			$('.barreProgress').css("width","100%");
			var ipc = require('electron').ipcRenderer;
			ipc.send('message',{key:'exportlocal'})
			
		}
		
		setTimeout(function(){
			$('.opacedit').css("display","none");
			$("#barreGeneration").css("display","none");
			$('.barreProgress').css("width","0%");
		},3500);
	}

}


function modifProcessLaunch(){
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'modifProcess'});
	
}

function finalRenderProcessLaunch(){
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'launch'});
	
}

function launchPageRender(np){
	
	if(np==-1){
		np = GetNumPageById(GPageId);
	}
	
	closeMove();
	
	var ur = "launchludiscape/index.html";
	ur = ur + "?externdata=../dataxml/"+lessonid+".xml";
	ur = ur + '&i=' + lessonid + '&ps=page' + np;
	
	location.href = ur;
	
}

function Sit(s){

	if(typeof(s)=='undefined'){
		return "";
	}
	
	var CtrtResult = s ;
	
	return CtrtResult;
	
}

function parseInteger(str) {
	
	if(typeof(str)=='undefined'){str=0;}
	
	if(str==null){str = 0;}
	
	if(str==''){str=0;}
	
	return parseInt(str);
}

function parseTxt(str) {
	
	if(typeof(str)=='undefined'){
		return "";
	}
	if(str=='undefined'){
		str =  "";
	}
	str = str.replace(" ", "");
	str = str.replace(" ", "");
	if(str==null){str = "";}
	
	return (str);
}

function parseFctTxt(str) {
	
	if(typeof(str)=='undefined'){
		return "";
	}
	if(str=='undefined'){
		return "";
	}
	str = str.replace("...",'');
	str = str.replace(" ",'');
	str = str.replace(" ",'');
	str = str.replace("(",'');
	str = str.replace(")",'');
	str = str.replace(";",'');
	str = str.replace("|",'');
	if(str==null){str = "";}
	
	return (str);
}

function cleanUrlImg(data){
	
	if(typeof(data)=='undefined'){
		data = "";
	}
	if(data=='undefined'){
		data = "";
	}
	var nur = data;
	if(nur.indexOf("worker/assets")!=-1){
		nur = nur.substring(nur.indexOf("worker/assets"));
		nur = nur.replace("worker/assets/", "assets/");
	}else{
		if(nur.indexOf("file-upload/")!=-1){
			nur = nur.substring(nur.indexOf("worker/assets"));
			nur = nur.replace("//", "/");
		}
	}
	
	if(nur.indexOf('.jpg')!=-1
	||nur.indexOf('.png')!=-1
	||nur.indexOf('.gif')!=-1){	
		if(nur.indexOf("assets")==-1){
			nur = folderAllImages + nur;
		}
	}
	
	return nur;
}
