"use strict";

const electron = require('electron');

const renderobjs = require('./render-objs');
const renderbase = require('./render-base');
const rendersmartbloc = require('./smartbloc/rendersmartbloc');

const ipcMain = electron.ipcMain;
const app = electron.app;
const pathF = require('path');

function generateHtml(){
	
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	
	global.renderprocess = true;
	global.embeddedFiles = ';';	
	global.listPluginsRender = '';
	global.sharedObj.contentcodecss = '';
	console.log('CYCLE RENDER 1 ');

	var path = easyfile.getfWf("temp") + "params.json";	
	fs.openSync(path,'r+');
	fs.readFile(path,function read(err,dataParams){
		global.dataLudiParamsData = JSON.parse(dataParams);
	});

	var path = easyfile.getfWf("temp") + "cludis.json";	
	fs.openSync(path,'r+');
	fs.readFile(path,function read(err,dataLudi){
		
		global.dataLudiFileData = JSON.parse(dataLudi);
		var dataLudiFile = global.dataLudiFileData;

		for(var i = 0; i < dataLudiFile.length; i++){
			var objLudi = dataLudiFile[i];
			if(objLudi.type=='plugme'){
				if(typeof objLudi.val2!=='string'){
					objLudi.val2 = objLudi.val2.toString('utf8');
				}
				objLudi.val2 = objLudi.val2.replace("undefined","");

				global.listPluginsRender = global.listPluginsRender + objLudi.val + ';';
				
				global.embeddedFiles += objLudi.val2;
				console.log('-- plugin =>' + objLudi.val2);
			}

		}

		console.log('-- global.embeddedFiles =>' + global.embeddedFiles);

		var timeBs = 1000;
		
		//preload all css
		var ae = global.embeddedFiles.split(';');
		ae.forEach(function(filename){
			if(filename!=''){
				
				if(filename.indexOf(".css")!=-1){
					filename = filename.replace(/^.*[\\\/]/, '');
					var pthEf = easyfile.getfWf("plugins") + filename;
					if(ifContentsIsCached(filename)==false){
						console.log('-- prepare =>', filename);	
						var upjs = fileGetContents(pthEf,filename);
						timeBs = timeBs + 4000;
					}
					console.log('-- plugin css =>' + filename);
				}
				
			}
		});
		
		//preload all js
		var ae = global.embeddedFiles.split(';');
		ae.forEach(function(filename){
			if(filename!=''){
				
				if(filename.indexOf(".js")!=-1){
					filename = filename.replace(".js",".txt");
					filename = filename.replace(/^.*[\\\/]/, '');
					var pthEf = easyfile.getfWf("assets") + filename;
					if(ifContentsIsCached(filename)==false){
						console.log('-- prepare =>', filename);	
						var upjs = fileGetContents(pthEf,filename);
						timeBs = timeBs + 4000;
					}
					console.log('-- plugin js =>' + filename);
				}
			}
		});
		
		generateCss();
		
		setTimeout(function(){
			generateHtmlSecondPass();
		},timeBs);
		
	});
	
}
exports.generateHtml = generateHtml;

function generateHtmlSecondPass(){
	
	console.log('CYCLE RENDER 2 ');

	generateJs();
	prepareFileStockProcess();

	var fd = global.fd;
	
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	
	var renderPathJs = easyfile.getfWf("finalHtml") + "javascript" + fd + "open-extra.js";
	easyfile.writeText(renderPathJs,global.sharedObj.extracode);
	
	var path = easyfile.getfWf("temp") + "pages.json";
	fs.openSync(path,'r+');
	
	var dataPageFile = '';
	
	fs.readFile(path,function read(err, data) {
		
		if(err){throw err;}
		
		dataPageFile = data;
		
		var datapages = JSON.parse(dataPageFile);
		
		var pi = 1;
		
		var fxml = '<?xml version="1.0" encoding="UTF-8"?>';
		fxml += '<d>';
		fxml += '<transition><data><![CDATA[Direct]]></data></transition>';
		fxml += '<pq><d>1</d></pq>';
		fxml += '<param><d>flatright</d></param>';
		
		var PtypePage = new Array();
		var Pitems = new Array();
		var Pback = new Array();

		var pathFinalHtml = easyfile.getfWf("finalHtml");

		var oneScreenOnly = true;

		//Liste des pages
		for(var i = 0; i < datapages.length; i++){
			
			var obj = datapages[i];
			
			Pitems[obj.pageId] = obj.index ;
			PtypePage[obj.pageId] = obj.comicMode ;

			if(obj.back==''||obj.back=='white.jpg'){
				fxml += '<fond><page>' + obj.index + '</page>';
				fxml += '<data><![CDATA[images/fond-white.png]]></data></fond>';
				Pback[obj.pageId] = '';
			}else{
				fxml += '<fond><page>' + obj.index + '</page>';
				fxml += '<data><![CDATA[images/' + obj.back + ']]></data></fond>';
				fxml += '<fond2><page>' + obj.index + '</page>';
				fxml += '<data><![CDATA[images/fond-white.png]]></data></fond2>';
				var fnam2 = obj.back;
				var pinit2 = easyfile.getfWf("assets") + fnam2.trim();
				var ptarget2 = pathFinalHtml + 'images' + fd + fnam2.trim();
				copyFileImg(pinit2,ptarget2);
				Pback[obj.pageId] = 'images/' + obj.back;
			}
			
			var extraScript = '';
			
			if(oneScreenOnly){
				if(obj.screen!=''){
					var fnamScreen = obj.screen.trim();
					copyImageToRender(obj.screen,pathFinalHtml);
					extraScript = '$("body").css("background-image","url(images/' + fnamScreen + ')");';
				}
				oneScreenOnly = false;
			}
			
			if(obj.script==''){
				fxml += '<scriptdiapo><page>' + obj.index + '</page><data>';
				fxml += '<![CDATA[' + renderobjs.rJtext(extraScript) + ']]>';
				fxml += '</data></scriptdiapo>';
			}else{
				fxml += '<scriptdiapo><page>' + obj.index + '</page><data>';
				fxml += '<![CDATA[' + renderobjs.rJtext(obj.script) + renderobjs.rJtext(extraScript) + ']]>';
				fxml += '</data></scriptdiapo>';
			}

			if(obj.comicMode>0&&obj.comicMode!=4){
				var pinitim3 = easyfile.getfWf("assets") + 'comic-0' + obj.comicMode + '.png';
				var ptarget3 = pathFinalHtml + 'images' + fd + 'comic-0' + obj.comicMode + '.png';
				copyFileImg(pinitim3,ptarget3);
				fxml += renderobjs.renderOverLaw(obj.comicMode,obj.index);
			}
			
		}
		
		fxml += '<messagefalse><data><![CDATA[Incorrect answer !]]></data></messagefalse>';
		
		//Objets Cludi
		var dataLudiFile = global.dataLudiFileData;

		//liste des CLudi
		for(var i = 0; i < dataLudiFile.length; i++){
			
			var objLudi = dataLudiFile[i];
			
			var numPage = -1;

			if(objLudi.pageId){
				numPage = parseInt(Pitems[objLudi.pageId]);
			}
			
			var typePage = parseInt(PtypePage[objLudi.pageId]);
			
			
			fxml += renderobjs.renderText(objLudi,numPage);
			fxml += renderobjs.renderQcm(objLudi,numPage,typePage);
			fxml += renderobjs.renderImages(objLudi,numPage);
			
			renderbase.renderBaseProcess(objLudi,pathFinalHtml + 'data');
			
			if (objLudi.type=='img'||objLudi.type=='texthtml') {
				copyImageToRender(objLudi.text6,pathFinalHtml);
			}
			
			if (objLudi.type=='texthtml'&&objLudi.text2!='') {
				global.sharedObj.contentcodecss = global.sharedObj.contentcodecss + objLudi.text2;
			}

			if (objLudi.type=='button'||objLudi.type=='buttonarea') {
				copyImageToRender(objLudi.actionData,pathFinalHtml);
			}
			
			if (objLudi.type=='speech') {
				var fnam = 'bullebase' + renderobjs.rJtext(objLudi.val)+ '.png';
				var pInitS = pathF.join(easyfile.getfWf("assets") + '/bulle/',fnam.trim());
				var pTargS = pathFinalHtml + 'images' + fd + fnam.trim();
				//copyFileImg(pInitS,pTargS);
			}

			if (objLudi.type=='videomp4') {
				var fnam2 = objLudi.text;
				if(fnam2.indexOf(".mp4")!=-1){
					var pinit2 = easyfile.getfWf("assets") + fnam2.trim();
					var ptarget2 = pathFinalHtml + 'data' + fd + fnam2.trim();
					easyfile.copyFileAsync(pinit2,ptarget2);
				}
			}

			if (objLudi.type=='audio') {
				var fnam2 = objLudi.text;
				if(fnam2.indexOf(".mp3")!=-1){
					var pinit2 = easyfile.getfWf("assets") + fnam2.trim();
					var ptarget2 = pathFinalHtml + 'data' + fd + fnam2.trim();
					easyfile.copyFileAsync(pinit2,ptarget2);
				}
			}
			
			if (objLudi.type=='fluxPts'&&objLudi.val3==0) {
				var i4 = easyfile.getfWf("assets") + 'fluxprocess.png';
				var t4 = pathFinalHtml + 'images' + fd + 'fluxprocess.png';
				copyFileImg(i4,t4);
				fxml +=  renderobjs.renderFluxPts(objLudi,numPage,dataLudiFile);
			}

			if (objLudi.type=='barre') {
				fxml += renderobjs.renderBarre2(objLudi,numPage);
				if (objLudi.val2==1) {
					copyImageToRender(objLudi.val3,pathFinalHtml);
				}
			}	
			fxml +=  renderobjs.renderobjframe(objLudi,numPage);
			fxml +=  renderobjs.renderDom(objLudi,numPage);
			fxml +=  renderobjs.renderVariable(objLudi,numPage);
			fxml +=  renderobjs.renderInput(objLudi,numPage);
			fxml +=  renderobjs.renderButton(objLudi,numPage,typePage);
			fxml +=  renderobjs.renderVideo(objLudi,numPage);
			fxml +=  renderobjs.renderLcm(objLudi,numPage,typePage);
			fxml +=  renderobjs.renderTcm(objLudi,numPage,typePage);
			fxml +=  renderobjs.renderLife(objLudi,numPage);
			fxml +=  renderobjs.renderPlugMe(objLudi,numPage,typePage);
			fxml +=  renderobjs.renderVideoMp4(objLudi,numPage,Pback[objLudi.pageId]);
			fxml +=  renderobjs.renderAudioMp3(objLudi,numPage);

		}
		
		var tmpid = 'openlearning';
		
		fxml += '<bloc><type>text</type><fontsize>16</fontsize><ids>dociid</ids>';
		fxml += '<x>-100</x><y>-100</y><w>20</w><h>20</h><an>1</an><text>';
		fxml += '<![CDATA[<p>' + tmpid + '</p>]]></text><color>Black</color><align>Justify</align>';
		fxml += '<ind>1</ind></bloc>';
		fxml += '</d>';
		
		var renderPath = easyfile.getfWf("renderHtml") + "data.xml";
		easyfile.writeText(renderPath,fxml);
		
		global.sharedObj.dataElectronXml = fxml;
		
		var renderBasetxt = pathFinalHtml + "base.txt";
		
		try{
			
			fs.openSync(renderBasetxt,'r+');
			fs.readFile(renderBasetxt,function read(err,renderHtml){
				generateHtmlThirdPass(renderHtml,fxml);
			});
			
		}catch(e){
			
			try{
				
				var renderBasetxt2 = pathFinalHtml + "base1.txt";
				fs.openSync(renderBasetxt2,'r+');
				fs.readFile(renderBasetxt2,function read(err,renderHtml){
					generateHtmlThirdPass(renderHtml,fxml);
				});
				
			}catch(e){
				
				global.cwle();
				global.errornb = 1;
				global.sharedLogs.logs += 'ERROR:' + e + '<br>';
				console.log('Error:', e);	
			
			}
		}

		
	});
	
}

function prepareFileStockProcess() {

	var easyfile =  require('./easyfile')
	var fs = require('fs');
	var pathFinalHtml = easyfile.getfWf("finalHtml");

	var dataTxt = global.sharedObj.stockfiles;
	var dataTxta = dataTxt.split("@");
	
	var i = 0;
	for (i = 0; i < dataTxta.length; i++) {
		var lineRow = dataTxta[i];
		if (lineRow!='') {
			var rowTxta = lineRow.split("|");
			if (rowTxta.length>1) {
				var clue1 = rowTxta[0].replace(' ','');
				var clue2 = rowTxta[1].replace(' ','').toLowerCase();
				if (clue1!=''&&clue1!=' ') {
					var pthEf = easyfile.getfWf("stockfiles") + clue1;
					if (isFileImage(pthEf)) {
						copyImgDataToRend(pthEf,pathFinalHtml);
					}
					if (isFileData(pthEf)) {
						copyFileImg(pthEf,pathFinalHtml+ 'data' + fd + clue1);
					}
					if (clue2=='extract') {
						if (isFileZip(pthEf)) {
							copyZipDataToRend(pthEf,pathFinalHtml + 'data' + fd);
						}
					}
					if (clue2=='plugin'||clue2=='plugins') {
						if (isFileZip(pthEf)) {
							copyZipDataToRend(pthEf,easyfile.getfWf("plugins") + fd);
						}
					}
				}
			}
		}
	}


}
exports.prepareFileStockProcess = prepareFileStockProcess;

function copyImageToRender(srcF,pathFinalHtml) {
	
	if (typeof(srcF) == 'undefined'){
		srcF = '';
	}	
	if(typeof srcF !== 'string'){
		srcF = srcF.toString('utf8');
	}
	srcF = srcF.replace('undefined','');

	if (srcF!='') {
		var easyfile =  require('./easyfile')
		var fs = require('fs');
		var fnam = srcF.replace(/^.*[\\\/]/,'');
		fnam = fnam.trim();
		var pinit = pathF.join(easyfile.getfWf("assets"),fnam);
		if(fnam.indexOf('.jpg')==-1&&fnam.indexOf('.gif')==-1&&fnam.indexOf('.png')==-1&&fnam.indexOf('.svg')==-1){
			fnam = fnam + '.jpg';
		}
		var ptarget = pathFinalHtml + 'images' + fd + fnam;
		copyFileImg(pinit,ptarget);	
	}

}

function copyImgDataToRend(srcF,pathFinalHtml) {
	
	if (typeof(srcF) == 'undefined'){
		srcF = '';
	}	
	if(typeof srcF !== 'string'){
		srcF = srcF.toString('utf8');
	}
	srcF = srcF.replace('undefined','');

	if (srcF!='') {

		var easyfile =  require('./easyfile')
		var fs = require('fs');
		var fnam = srcF.replace(/^.*[\\\/]/,'');
		fnam = fnam.trim();
		if(fnam.indexOf('.jpg')==-1&&fnam.indexOf('.gif')==-1&&fnam.indexOf('.png')==-1&&fnam.indexOf('.svg')==-1&&fnam.indexOf('.pdf')==-1){
			fnam = fnam + '.jpg';
		}
		var ptarget = pathFinalHtml + 'data' + fd + fnam;
		copyFileImg(srcF,ptarget);
	}

}

//Extract all
function copyZipDataToRend(srcF,pathFinalHtml) {
	
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	var fnam = srcF.replace(/^.*[\\\/]/,'');
	fnam = fnam.trim();
	
	var ptarget = pathFinalHtml;
	
	fs.readFile(srcF,function read(err, zipBuffer) {
		
		console.log('-- extract ZIP:' + srcF);
		
		var zip = new require('node-zip')(zipBuffer,{base64:false,checkCRC32:true})
		var listfile = zip.files;
		
		console.log(listfile);

		//Folder only
		for (var key in listfile) {
			var fnamzip = key;
			if (isFolderStr(fnamzip)) {
				var foldernam = fnamzip.replace(/\//,'@');
				foldernam = foldernam.replace(/\//,'@');
				foldernam = foldernam.replace(/\//,'@');
				foldernam = foldernam.replace('/','@');
				foldernam = foldernam.replace('/','@');
				foldernam = foldernam.trim();
				foldernam = foldernam + '@';
				if (foldernam!='') {
					var neofolder = ptarget;
					var actfold = foldernam.split('@');
					var i = 0;
					for (i=0;i<actfold.length;i++) {
						if (actfold[i]!='') {
							neofolder += actfold[i];
							if (!fs.existsSync(neofolder)) {
								fs.mkdirSync(neofolder);
							}
							neofolder += fd;
							console.log('neofolder - ' + neofolder);
						}
					}
				}
			}
		}
		
		//Files only
		for (var key in listfile) {

			console.log('k - ' + key);

			var fnamzip = key;
			var dataFile = zip.files[fnamzip];
			
			if (typeof dataFile._data === "undefined") {
				
				console.log('-- data undefined :' + fnamzip);

			} else {
				
				var bynaryFile = dataFile._data;
				
				if (fnamzip.indexOf('.html')!=-1 
				||fnamzip.indexOf('.css')!=-1
				||fnamzip.indexOf('.xml')!=-1
				||fnamzip.indexOf('.txt')!=-1
				||fnamzip.indexOf('.js')!=-1) {
					easyfile.writeImg(ptarget + fnamzip,bynaryFile);
				}
				
				if (fnamzip.indexOf('.jpg')!=-1
				||fnamzip.indexOf('.jpeg')!=-1
				||fnamzip.indexOf('.png')!=-1
				||fnamzip.indexOf('.gif')!=-1
				) {
					easyfile.writeImg(ptarget + fnamzip,bynaryFile);
				}
				
			}
			
		}

	});

}

function isFileImage(srcF) {
	var b = false;
	if(srcF.indexOf('.jpg')!=-1
	||srcF.indexOf('.gif')!=-1
	||srcF.indexOf('.png')!=-1
	||srcF.indexOf('.svg')!=-1){
		b = true;
	}
	return b;
}
function isFileZip(srcF) {
	var b = false;
	if(srcF.indexOf('.zip')!=-1
	||srcF.indexOf('.ZIP')!=-1){
		b = true;
	}
	return b;
}
function isFileData(srcF) {
	var b = false;
	if(srcF.indexOf('.pdf')!=-1
	||srcF.indexOf('.PDF')!=-1){
		b = true;
	}
	return b;
}
function isFolderStr(dataFile) {

	var r = false;

	if (dataFile.indexOf('/')!=-1) {
		r = true;
	}

	dataFile = dataFile.toLowerCase();
	if (dataFile.indexOf('.html')!=-1) {r = false;}
	if (dataFile.indexOf('.txt')!=-1) {r = false;}
	if (dataFile.indexOf('.css')!=-1) {r = false;}
	if (dataFile.indexOf('.js')!=-1) {r = false;}
	if (dataFile.indexOf('.xml')!=-1) {r = false;}
	if (dataFile.indexOf('.jpg')!=-1) {r = false;}
	if (dataFile.indexOf('.jpeg')!=-1) {r = false;}
	if (dataFile.indexOf('.png')!=-1) {r = false;}
	if (dataFile.indexOf('.gif')!=-1) {r = false;}

	return r;
}

function generateHtmlThirdPass(renderHtml,fxml) {
	
	console.log('CYCLE RENDER 3 ');

	var easyfile =  require('./easyfile')
	var fs = require('fs');
	
	var renderPathHtml = easyfile.getfWf("finalHtml") + "index.html";
	
	if(typeof renderHtml !== 'string'){
		renderHtml = renderHtml.toString('utf8');
	}
	
	fxml = fxml.replace(/!/g,'\\!');
	fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");

	var fh = renderHtml
	if(fh.indexOf("{dataElectronXml}")!=-1){	
		fh = fh.replace("{dataElectronXml}",fxml);
	}else{
		console.log('CYCLE RENDER ERROR dataElecXml ');
	}
	
	if(getParamsValue("responsiveProject")==1){
		fh = fh.replace("data-size='classique'","data-size='classic-auto'");
	}
	if(getParamsValue("classiquelarge")==1){
		fh = fh.replace("data-size='classique'","data-size='classiquelarge'");
	}
	
	var listOfRef = '';
	listOfRef += '<script type="text/javascript" src="data/chartist.min.js" ></script>';
	listOfRef += '<link rel="stylesheet" href="data/chartist.min.css" type="text/css" />';
	fh = fh.replace('<span id=codeup ></span>','');
	
	easyfile.writeText(renderPathHtml,fh);
	
	global.renderprocess = false;
	
}

function getParamsValue(keystr) {

	let returnValue = "";

	//Objets Cparams
	var dataLudiParams = global.dataLudiParamsData;

	//liste des Cparams
	for(var i = 0; i < dataLudiParams.length; i++){
		
		var objParams = dataLudiParams[i];
		if(objParams.key==keystr){
			returnValue = objParams.value;
		}

	}
	
	return returnValue;

}

function generateJs() {

	var fd = global.fd;
	var easyfile =  require('./easyfile');
	var pathFinalHtml = easyfile.getfWf("finalHtml");
	var fs = require('fs');
	
	//Objets Cludi
	var path = easyfile.getfWf("temp") + "cludis.json";
		
	fs.openSync(path,'r+');
	fs.readFile(path,function read(err,dataLudi){
		
		var dataLudiFile = JSON.parse(dataLudi);
		var dataJsFile = '';
		var renderPath = easyfile.getfWf("finalHtml") + 'javascript/openelearning-x.js';
		var i = 0;
		var memS = "";

		//liste des CLudi
		for(var i = 0; i < dataLudiFile.length; i++){
			var objLudi = dataLudiFile[i];
			if(objLudi.type=='variable'&&objLudi.text!=''){
				var namvar = objLudi.text;
				dataJsFile = dataJsFile + 'var ' + namvar +  ' = "-";';
			}
		}
		
		i = 0;

		var a = global.plugins.allData;

		a.forEach(function(idname){
			
			if(global.listPluginsRender.indexOf(idname + ';')!=-1){
				
				console.log('-- plugin include =>' + idname);

				var codeSP = global.plugins.jsData[i];
				
				if (typeof(codeSP) == 'undefined'){
					codeSP = "";
				}	
				if(typeof codeSP !== 'string'){
					codeSP = codeSP.toString('utf8');
				}
				codeSP= codeSP.replace("undefined","");
				
				codeSP = codeSP.replace("onPaint(",idname + "OnPaint(");
				codeSP = codeSP.replace("onEndMove(",idname + "OnEndMove(");
				codeSP = codeSP.replace("onZoom(",idname + "OnZoom(");
				codeSP = codeSP.replace("isOK(",idname + "IsOK(");
				
				codeSP = codeSP.replace("function viewResults(","function " +  idname + "ViewResults(");
				codeSP = codeSP.replace("function sendObjMemory(","function " +  idname + "SendObjMemory(");
				codeSP = codeSP.replace("function retrieveObjMemory(","function " +  idname + "RetrieveObjMemory(");
				codeSP = codeSP.replace("function viewErrors(","function " + idname + "ViewErrors(");
				codeSP = codeSP.replace("function ViewErrors(","function " + idname + "ViewErrors(");
				
				if(codeSP.indexOf("WordFindGame")!=-1){
					console.log('-- WordFindGame stop ! =>' + idname);
				}

				if(memS.indexOf(idname + ";")==-1){
					console.log('-- write js =>' + codeSP);
					dataJsFile = dataJsFile + "\r\n";
					dataJsFile = dataJsFile + "//" + idname + "\r\n";
					dataJsFile = dataJsFile + codeSP + "\r\n";
				}
				
				memS = memS + idname + ";";
			
			}

			i++;
			
		});
		
		var ae = global.embeddedFiles.split(';')
		ae.forEach(function(filename){
			
			if(filename!=''){

				if(filename.indexOf(".js")!=-1){
					
					var filename = filename.replace(/^.*[\\\/]/, '')
					
					filename = filename.replace(".js",".txt");
					
					var pthEf = easyfile.getfWf("assets") + filename;
					dataJsFile += '/*' + pthEf + '*/'+ "\r\n";
					console.log('load :' + pthEf);
					var upjs = fileGetContents(pthEf,filename);
					if(typeof upjs !== 'string'){
					}
					if (typeof(upjs) == 'undefined'){
						upjs = "";
					}
					upjs = upjs.replace("undefined","");
					
					if(memS.indexOf(filename + ";")==-1){
						dataJsFile = dataJsFile + upjs + "\r\n";
					}
					
					memS = memS + filename + ";";
					
				}
			}
			
			
		});
		
		easyfile.writeText(renderPath,dataJsFile);
		generateCss();

	});

}

function generateCss() {
	
	var fd = global.fd;
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	var dataCssFile = '';
	var renderPath = easyfile.getfWf("finalHtml") + 'css/open.css';
	var pathFinalHtml = easyfile.getfWf("finalHtml");

	var i = 0;
	var mem = '';
	
	var a = global.plugins.allData;
	a.forEach(function(idname) {
		
		if (mem.indexOf(idname + ';')==-1) {
			mem = idname + ';';
			var codeCSS = global.plugins.cssData[i];
			dataCssFile += codeCSS;
			i++;
		}
		
	});

	var ae = global.embeddedFiles.split(';')
	ae.forEach(function(filename){
		if (filename!='') {
			if (filename.indexOf(".css")!=-1) {
				var pthEf = easyfile.getfWf("plugins") + filename;
				dataCssFile += '/*' + filename + '*/';
				dataCssFile += fileGetContents(pthEf,filename);
			}
		}
	});
	
	if (typeof(global.sharedObj.extracodecss) != 'undefined') {
		dataCssFile += '/*extracodecss*/';
		dataCssFile += global.sharedObj.extracodecss;
	}
	
	if (typeof(global.sharedObj.contentcodecss) != 'undefined') {
		dataCssFile += '/*contentcodecss*/';
		dataCssFile += global.sharedObj.contentcodecss;
	}

	dataCssFile += rendersmartbloc.getCssSmartBLoc();
	copyImageToRender('oel-man-working.jpg',pathFinalHtml);
	
	easyfile.writeText(renderPath,dataCssFile);
	
}

function copyFileImg(src,dest) {
	
	var fs = require('fs');
	
	if(fs.existsSync(src)){
		
		//If no exist
		if(!fs.existsSync(dest)){
			let readStream = fs.createReadStream(src);
			readStream.once('error', (err) => {
				
				console.log('copy error "' + src + '"');
				console.log(' to folder ' + dest);
				
				if(err.code==='ENOENT'){
					console.log(' ENOENT ');
				}
				if(err.code==='EACCES'){
					console.log(' EACCES ');
				}
				if(err.code==='EPERM'){
					console.log(' EPERM ');
				}	
				global.sharedLogs.logs += 'copy error :' + dest + '<br>';
			});
			readStream.once('end', () => {
				console.log('Copy ' + dest);
			});
			readStream.pipe(fs.createWriteStream(dest));
		}
		
	}else{
		console.log('file not exist ?  "' + src + '"');
	}
}

function ifContentsIsCached(idFile){
	
	if(typeof global.sharedFiles.allData[idFile]==='undefined'){
		return false;
	}else{
		return true;
	}
	
}

function fileGetContents(path,idFile){
	
	if(typeof global.sharedFiles.allData[idFile]==='undefined'){
		
		var fs = require('fs');
		
		path = path.replace(/\\/g, '\/');
		
		if(fs.existsSync(path)){
			
			fs.openSync(path,'r+');
			fs.readFile(path,function read(err,fxml){
				
				if(typeof fxml === "undefined") {
					fxml = '';
				}
				if(typeof fxml !== 'string'){
					fxml = fxml.toString('utf8');
				}
				global.sharedFiles.allData[idFile] = fxml;

				console.log(idFile + ' is cached');
				
				return fxml;
				
			});
		
		}else{
			return '/* not-find:' + path + '*/';
		}
	
	}else{
		
		return global.sharedFiles.allData[idFile];
		
	}
	
}

