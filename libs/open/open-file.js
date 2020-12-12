"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');
const ncp = require('./../easyncp').ncp;

function openFileProcess(filename,tpl) {

	var easyfile =  require('./../easyfile');
	
	var isTpl = false;
	
	if(filename.indexOf("tpl-")!=-1&&tpl){	
		var recentTpl = easyfile.getfWf("tpl");
		filename = filename.replace("tpl-","");
		filename = recentTpl + filename + ".openelearning";
		isTpl = true;
	}
	
	if(fs.existsSync(filename)){
		
		console.log('CYCLE OPEN:' + filename);
		
		if(isTpl==false){
			try{	
				global.sharedObj.activeTitle = ("OPEN ELEARNING : " + filename);
			}catch(e){}
		}
		
		fs.readFile(filename,function read(err, zipBuffer){
			
			if(err){throw err;}
			
			console.log('-- Read ZIP:' + filename);
			
			if(isTpl==false){
				addRecentFile(filename);
			}
			
			var zip = new require('node-zip')(zipBuffer,{base64:false,checkCRC32:true})
			
			var listfile = zip.files['listfile.txt'];
			var datafile = listfile._data;
			var util = require('util');
			
			var listfilePath = easyfile.getfWf("extract") + "listfile.txt";	
			easyfile.writeText(listfilePath,datafile);
			
			var manualPackage = true;
			var manPackage = zip.files['manualPackage.txt'];
			if (typeof manPackage === "undefined"){
				manualPackage = false;
			}else{
				console.log('ManualPackage: manualPackage detected');
			}
			
			// CLUDIS
			var datacludis = zip.files['cludis.txt'];
			var cludisPath = easyfile.getfWf("extract") + "cludis.json";
			
			if(manualPackage&&typeof datacludis._data != "undefined"){
				datacludis = datacludis._data;
				easyfile.writeText(cludisPath,datacludis);
			}else{
				easyfile.writeText(cludisPath,JSON.stringify(datacludis));
			}
			if(typeof datacludis != "undefined"){
				console.log('-- datacludis = ' + datacludis);
			}
			

			// PAGES
			var datapages = zip.files['pages.txt'];
			var pagesPath = easyfile.getfWf("extract") + "pages.json";

			if (manualPackage&&typeof datapages._data != "undefined") {
				datapages = datapages._data;
				easyfile.writeText(pagesPath,datapages);
			}else{
				easyfile.writeText(pagesPath,JSON.stringify(datapages));
			}
			if(typeof datapages != "undefined"){
				console.log('-- datapages = ' + datapages);
			}


			// PARAMS
			var dataparams = zip.files['params.txt'];
			var paramsPath = easyfile.getfWf("extract") + "params.json";

			if(typeof dataparams === "undefined"){

			}else{
				
				if(manualPackage&&typeof datapages._data != "undefined") {
					dataparams = dataparams._data;
					easyfile.writeText(paramsPath,dataparams);
				}else{
					easyfile.writeText(paramsPath,JSON.stringify(dataparams));
				}
				if(typeof dataparams != "undefined"){
					console.log('-- params = ' + dataparams);
				}
			}


			// EXTRACODE
			var extraCodeData = zip.files['extracode.txt'];
			
			if(typeof extraCodeData === "undefined"){
				
				global.sharedObj.extracode = '';
				
			}else{

				var extraPath = easyfile.getfWf("extract") + "extracode.txt";
				
				if(typeof extraCodeData !== 'string'){
					extraCodeData = extraCodeData._data;
				}
				
				extraCodeData = decodeURIComponent(escape(extraCodeData));
				
				global.sharedObj.extracode = extraCodeData;

			}



			// EXTRACODE CSS
			var extraCodeDataCss = zip.files['extracodecss.txt'];

			if(typeof extraCodeDataCss === "undefined"){
				
				global.sharedObj.extracodecss = '';
				
			}else{

				var extraPath = easyfile.getfWf("extract") + "extracodecss.txt";
				
				if(typeof extraCodeDataCss !== 'string'){
					extraCodeDataCss = extraCodeDataCss._data;
				}
				
				extraCodeDataCss = decodeURIComponent(escape(extraCodeDataCss));
				
				global.sharedObj.extracodecss = extraCodeDataCss;

			}


			if(isTpl==false){
				global.sharedObj.dataFile = filename;
				getDependFiles(zip,datafile);
			}
			global.sharedObj.activeFile = '1';
			
			console.log('END OPEN');

		});
		
	}else{

		console.log('ERROR:', 'Error open-file : ' + filename);
		global.sharedLogs.logs += 'Error open-file' + filename + '<br>';
		
	}

}
exports.openFileProcess = openFileProcess;


function extractTextFromZip(zip,lib){

	var finalTxt = "";

	var dataExtract = zip.files[lib];

	if (dataExtract._data != "undefined") {
		finalTxt = dataExtract._data;
	}else{
		finalTxt = dataExtract;
	}

	if(typeof finalTxt !== 'string'){
		finalTxt = finalTxt.toString('utf8');
	}
	finalTxt = finalTxt.replace("undefined","");
	finalTxt = finalTxt.replace('[{"','{"');
	finalTxt = finalTxt.replace('"}]','"}');

	finalTxt = JSON.stringify(finalTxt);

	return finalTxt;
}

function addRecentFile(filepathrecent){
	
	if(global.sharedFiles.recent1==filepathrecent){
		return true;
	}else if(global.sharedFiles.recent2==filepathrecent){
		return true;
	}else if(global.sharedFiles.recent3==filepathrecent){
		return true;
	}else if(global.sharedFiles.recent4==filepathrecent){
		return true;
	}
	global.sharedFiles.recent4 = global.sharedFiles.recent3;
	global.sharedFiles.recent3 = global.sharedFiles.recent2;
	global.sharedFiles.recent2 = global.sharedFiles.recent1;
	global.sharedFiles.recent1 = filepathrecent;
	
	var easyfile =  require('./../easyfile');
	
	easyfile.writeText(easyfile.getfWf("params") + "recent1.txt",global.sharedFiles.recent1);
	easyfile.writeText(easyfile.getfWf("params") + "recent2.txt",global.sharedFiles.recent2);
	easyfile.writeText(easyfile.getfWf("params") + "recent3.txt",global.sharedFiles.recent3);
	easyfile.writeText(easyfile.getfWf("params") + "recent4.txt",global.sharedFiles.recent4);
	
}
exports.addRecentFile = addRecentFile;

function getDependFiles(zip,datafile){
	
	var easyfile =  require('./../easyfile');
	var util = require('util');
	
	if (typeof datafile === "undefined") {
		datafile = '';
	}
	if(typeof datafile !== 'string'){
		datafile = datafile.toString('utf8');
	}
	
	var arrayOfStrings = datafile.split(';');
		
	for (var i=0; i < arrayOfStrings.length; i++){
		var fnam = arrayOfStrings[i];
		if(fnam!=''){
			
			var path2 = easyfile.getfWf("assets")+fnam;
			console.log('-- fnam:' + fnam);
			if(fs.existsSync(path2)){
				
				console.log('-- exist:' + fnam);

			}else{
				
				var dataImg = zip.files[fnam];
				
				if(typeof dataImg==="undefined"){
					
					console.log('-- data undefined :' + fnam);
			
				}else{
					
					if(typeof dataImg._data === "undefined"){
						
						console.log('-- data undefined :' + fnam);
						
					}else{
						
						var bynaryImg = dataImg._data;
						console.log('-- exist:' + bynaryImg);
						easyfile.writeImg(path2,bynaryImg);
						console.log('-- complete:' + fnam);
					
					}
				}
			
			}
		}
	}

}
exports.getDependFiles = getDependFiles;