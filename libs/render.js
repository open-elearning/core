"use strict";

const electron = require('electron')
const renderobjs = require('./render-objs')
const renderbase = require('./render-base')
const ipcMain = electron.ipcMain;
const app = electron.app;

function generateHtml(){
	
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	
	global.embeddedFiles = ';';	
	
	var path = easyfile.getfWf("temp") + "cludis.json";	
	fs.openSync(path,'r+');
	fs.readFile(path,function read(err,dataLudi){
		var dataLudiFile = JSON.parse(dataLudi);
		for(var i = 0; i < dataLudiFile.length; i++){
			var objLudi = dataLudiFile[i];
			if(objLudi.type=='plugme'){
				if(typeof objLudi.val2 !== 'string'){
					objLudi.val2 = objLudi.val2.toString('utf8');
				}
				objLudi.val2 = objLudi.val2.replace("undefined","");
				global.embeddedFiles += objLudi.val2;
			}
			
		}
		
		generateCss();
		
		setTimeout(function(){
			generateHtmlSecondPass();
		},500);
		
	});
	
}
exports.generateHtml = generateHtml;

function generateHtmlSecondPass(){
	
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
		
		var Pitems = new Array();
		var Pback = new Array();
		//Liste des pages
		for(var i = 0; i < datapages.length; i++){
			
			var obj = datapages[i];
			
			Pitems[obj.pageId] = obj.index ;
			
			if(obj.back==''||obj.back=='white.jpg'){
				fxml += '<fond><page>' + obj.index + '</page><data><![CDATA[images/fond-white.png]]></data></fond>';
				Pback[obj.pageId] = '';
			}else{
				fxml += '<fond><page>' + obj.index + '</page><data><![CDATA[images/' + obj.back + ']]></data></fond>';
				var fnam2 = obj.back;
				var pinit2 = easyfile.getfWf("assets") + fnam2;
				var ptarget2 = easyfile.getfWf("finalHtml") + 'images' + fd + fnam2;
				copyFileImg(pinit2,ptarget2);
				Pback[obj.pageId] = 'images/' + obj.back;
			}
			
			if(obj.script==''){
				fxml += '<scriptdiapo><page>' + obj.index + '</page><data></data></scriptdiapo>';
			}else{
				fxml += '<scriptdiapo><page>' + obj.index + '</page><data>';
				fxml += '<![CDATA[' + renderobjs.rJtext(obj.script) +']]>';
				fxml += '</data></scriptdiapo>';
			}
			
		}
		
		fxml += '<messagefalse><data><![CDATA[Incorrect answer !]]></data></messagefalse>';
		
		//Objets Cludi
		var path = easyfile.getfWf("temp") + "cludis.json";
		
		fs.openSync(path,'r+');
		fs.readFile(path,function read(err,dataLudi){
			
			var dataLudiFile = JSON.parse(dataLudi);
			
			//liste des CLudi
			for(var i = 0; i < dataLudiFile.length; i++){

				var objLudi = dataLudiFile[i];
				
				var numPage = -1;
				if(objLudi.pageId){
					numPage = parseInt(Pitems[objLudi.pageId]);
				}
				
				fxml +=  renderobjs.renderBarre(objLudi,numPage);
				fxml +=  renderobjs.renderText(objLudi,numPage);
				fxml +=  renderobjs.renderQcm(objLudi,numPage);
				fxml +=  renderobjs.renderImages(objLudi,numPage);
				
				renderbase.renderBaseProcess(objLudi,easyfile.getfWf("finalHtml") + 'data');
				
				if(objLudi.type=='img'){
					var fnam = objLudi.text6.replace(/^.*[\\\/]/, '');
					var pinit = easyfile.getfWf("assets") + fnam;
					var ptarget = easyfile.getfWf("finalHtml") + 'images' + fd + fnam;
					copyFileImg(pinit,ptarget);
				}
				
				if(objLudi.type=='videomp4'){
					var fnam2 = objLudi.text;
					if(fnam2.indexOf(".mp4")!=-1){
						var pinit2 = easyfile.getfWf("assets") + fnam2;
						var ptarget2 = easyfile.getfWf("finalHtml") + 'data' + fd + fnam2;
						copyFileImg(pinit2,ptarget2);
					}
				}
				
				fxml +=  renderobjs.renderButton(objLudi,numPage);
				fxml +=  renderobjs.renderVideo(objLudi,numPage);
				fxml +=  renderobjs.renderLcm(objLudi,numPage);
				fxml +=  renderobjs.renderTcm(objLudi,numPage);
				fxml +=  renderobjs.renderLife(objLudi,numPage);
				fxml +=  renderobjs.renderPlugMe(objLudi,numPage);
				fxml +=  renderobjs.renderVideoMp4(objLudi,numPage,Pback[objLudi.pageId]);
				
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
			
			var renderBasetxt = easyfile.getfWf("finalHtml") + "base.txt";
			
			try{
				
				fs.openSync(renderBasetxt,'r+');
				fs.readFile(renderBasetxt,function read(err,renderHtml){
					generateHtmlThirdPass(renderHtml,fxml);
				});
				
			}catch(e){
				
				try{
					
					var renderBasetxt2 = easyfile.getfWf("finalHtml") + "base1.txt";
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
		
	});
	
}

function generateHtmlThirdPass(renderHtml,fxml){
	
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	
	var renderPathHtml = easyfile.getfWf("finalHtml") + "index.html";
	
	if(typeof renderHtml !== 'string'){
		renderHtml = renderHtml.toString('utf8');
	}
	
	fxml = fxml.replace(/!/g, '\\!');
	var fh = renderHtml.replace("{dataElectronXml}",fxml);
	easyfile.writeText(renderPathHtml,fh);
	generateJs();
	
}

function generateJs(){
	
	var fd = global.fd;
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	var dataJsFile = '';
	var renderPath = easyfile.getfWf("finalHtml") + 'javascript/openelearning-x.js';
	var a = global.plugins.allData;
	var i = 0;
	
	a.forEach(function(idname) {
		
		var codeSP = global.plugins.jsData[i];
		
		codeSP = codeSP.replace("onPaint(",idname + "OnPaint(")
		codeSP = codeSP.replace("onEndMove(",idname + "OnEndMove(")
		codeSP = codeSP.replace("onZoom(",idname + "OnZoom(")
		codeSP = codeSP.replace("isOK(",idname + "IsOK(")
		
		codeSP = codeSP.replace("viewResults(", idname + "ViewResults(")
		codeSP = codeSP.replace("sendObjMemory(", idname + "SendObjMemory(")
		codeSP = codeSP.replace("retrieveObjMemory(", idname + "RetrieveObjMemory(")
		codeSP = codeSP.replace("viewErrors(", idname + "ViewErrors(")
		
		dataJsFile = dataJsFile + codeSP;
		i++;
		
	});
	
	easyfile.writeText(renderPath,dataJsFile);
	
	generateCss();
	
}

function generateCss(){
	
	var fd = global.fd;
	var easyfile =  require('./easyfile')
	var fs = require('fs');
	var dataCssFile = '';
	var renderPath = easyfile.getfWf("finalHtml") + 'css/open.css';
	
	var i = 0;
	var mem = '';
	
	var a = global.plugins.allData;
	a.forEach(function(idname) {
		
		if(mem.indexOf(idname + ';')==-1){
			mem = idname + ';';
			var codeCSS = global.plugins.cssData[i];
			dataCssFile += codeCSS;
			i++;
		}
		
	});
	var ae = global.embeddedFiles.split(';')
	ae.forEach(function(filename){
		if(filename!=''){
			var pthEf = easyfile.getfWf("plugins") + filename;
			dataCssFile += '/*' + filename + '*/';
			dataCssFile += fileGetContents(pthEf,filename);
		}
	});
	
	easyfile.writeText(renderPath,dataCssFile);
	
}

function copyFileImg(src,dest){
	
	var fs = require('fs');
	
	let readStream = fs.createReadStream(src);
	
	readStream.once('error', (err) => {
		console.log('copyFileImg error ' + err);
	});
	
	readStream.once('end', () => {
		console.log('done copying');
	});
	
	readStream.pipe(fs.createWriteStream(dest));
    
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

