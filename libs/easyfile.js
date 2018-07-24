"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;

const ncp = require('./easyncp').ncp;

let haveErrorLoadInit = false;

const appName = "openelearning";
//createWorkingFolder
//createFolderInWorkingFolder
//getWorkingFolder
//getFolderInWorkingFolder
//writeText

function init(nameFolder){
	
	var fs = require('fs');
	
	console.log('init ' + appName);
	
	global.sharedLogs.logs += 'init:' + appName + '<br>';
	
	createWorkingFolder(appName);
	createFolderInWorkingFolder(appName,"dataFiles");
	createFolderInWorkingFolder(appName,"temp");
	createFolderInWorkingFolder(appName,"extract");
	createFolderInWorkingFolder(appName,"params");
	createFolderInWorkingFolder(appName,"renderHtml");
	createFolderInWorkingFolder(appName,"finalHtml");
	createFolderInWorkingFolder(appName,"launchOverview");
	createFolderInWorkingFolder(appName,"assets");
	createFolderInWorkingFolder(appName,"assetsxml");
	createFolderInWorkingFolder(appName,"plugins");
	
	global.sharedLogs.logs += 'finalHtml:' + getfWf("finalHtml") + '<br>';
	global.sharedLogs.logs += 'appData:' + app.getPath('appData') + '<br>';
	global.sharedLogs.logs += 'userData:' + app.getPath('userData') + '<br>';
	
	var serv = './';
	if(!fs.existsSync(serv + "app/assets")) {
		serv = '/usr/lib/OpenElearning/resources/app/';
		if(!fs.existsSync(serv + "app/assets")) {
			global.sharedLogs.logs += 'ERROR serv:' + serv + "app/assets not exits" + '<br>';
			return false;
		}
	}
	
	//Search file before copy
	var fileClue = serv + "app/launchOverview/base.txt";
	
	if(fs.existsSync(fileClue)){

		global.sharedLogs.logs += 'serv:' + serv + "app/assets" + '<br>';

		ncp(serv + "app/assets", getfWf("assets"), function (err) {
			if (err){
				global.sharedLogs.logs += 'assets error:' + err + '<br>';
				return console.error(err);
			}
			console.log('assets init done !');
			global.sharedLogs.logs += 'assets init done !<br>';
		});
		
		ncp(serv + "assets/t", getfWf("assetsxml"), function (err) {
			if (err){
				global.sharedLogs.logs += 'assetsxml error:' + err + '<br>';
				return console.error(err);
			}
			console.log('assetsxml init done !');
			global.sharedLogs.logs += 'assetsxml init done !<br>';
		});
		
		ncp(serv + "app/launchOverview", getfWf("finalHtml"), function (err) {
			if(err){
				console.log('error' + err);
				global.sharedLogs.logs += 'finalHtml error:' + err + '<br>';
				return console.error(err);
			}
			console.log('finalHtml init done !');
			global.sharedLogs.logs += 'finalHtml init done !<br>';
		});
	
		
	}else{
		
		global.sharedLogs.logs += 'ERROR:' + fileClue + " not exits" + '<br>';
		
	}
	
	global.sharedObj.gpath = app.getPath('userData');
	
	writeText(getfWf("dataFiles") + "texte.txt", "test");
	
	deleteExtracts("cludis.json");
	deleteExtracts("pages.json");
	
	deleteTemp("cludis.json");
	deleteTemp("pages.json");
	
	cleanImages();
	
	setTimeout(function(){
		loadLibs();
		listOfPlugins();
		listOfPluginsX();
	},1000);
	
	setTimeout(function(){
		if(haveErrorLoadInit){
			console.log('INIT is RESET');
			global.sharedLogs.logs += 'INIT is RESET<br>';
			init(nameFolder);
		}else{
			console.log('INIT is COMPLETE');
			global.sharedLogs.logs += 'INIT is COMPLETE<br>';
		}
	},2500);
	
}
exports.init = init;

function cleanImages(){
	
	var fd = global.fd;
	
	var fs = require('fs');
	var dir = getfWf("finalHtml") + "images" + fd;
	
	
	fs.readdir(dir, function (err, items) {
		if(err) {
			return console.log(err);
		}
		items.forEach(function (item) {
			
			if(item.indexOf('aaoel')!=-1){
				var filepath = dir + item;
				deleteFileDeleteLink(filepath);
			}
			
		});	  
	});
	
	deleteFileDeleteLink(getfWf("extract") + "listfile.txt");
	
}

function listOfPlugins(){
	
	global.plugins.allData = new Array();
	var fs = require('fs');
	var dir = getfWf("plugins");
	
	fs.readdir(dir,function(err,items){
	
		if(err){
			return console.log(err);
		}
		items.forEach(function(item){
			var filepath = dir + item;
			if(item.indexOf('.')==-1&&item!='.'&&item!='..'){
				global.plugins.allData.push(item);
				console.log('plugin :' + item);
			}
		})
	});
}

function listOfPluginsX(){
	
	global.plugins.xData = new Array();
	global.plugins.jsData = new Array();
	global.plugins.cssData = new Array();
	
	var fs = require('fs');
	var dir = getfWf("plugins");
	
	fs.readdir(dir,function(err,items){
		if(err){
			return console.log(err);
		}
		items.forEach(function(item){
			var filepath = dir + item;
			if(item.indexOf('.')==-1&&item!='.'&&item!='..'){
				
				fs.openSync(dir+item+'/plugin.xml','r+');
				fs.readFile(dir+item+'/plugin.xml',function read(err,fxml){
					if(typeof fxml !== 'string'){
						fxml = fxml.toString('utf8');
					}
					fxml = strReplace("\n",'',fxml);
					fxml = fxml.replace(/[\n]/gi,"");
					fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
					global.plugins.xData.push(fxml);
				});
				
				fs.openSync(dir+item+'/run.js','r+');
				fs.readFile(dir+item+'/run.js',function read(err,fjs){
					if(typeof fjs !== 'string'){
						fjs = fjs.toString('utf8');
					}
					global.plugins.jsData.push(fjs);
				});
				
				fs.openSync(dir+item+'/run.css','r+');
				fs.readFile(dir+item+'/run.css',function read(err,fcss){
					if(typeof fcss !== 'string'){
						fcss = fcss.toString('utf8');
					}
					global.plugins.cssData.push(fcss);
				});
				
			}
		})
	});
}

function loadLibs(){
	
	var fs = require('fs');
	
	//LCM 3
	var pathLcm3 = getfWf("assetsxml") + 'lcm3.xml';
	
	if(!fs.existsSync(pathLcm3)){
		haveErrorLoadInit = true;
		return false;
	}
	
	try{
		var fd = fs.openSync(pathLcm3,'r');
		var fr = fs.readFile(pathLcm3,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.lcm3 = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}

	fs.closeSync(fd);
	
	//LCM 4
	var pathLcm4 = getfWf("assetsxml") + 'lcm4.xml';
	
		if(!fs.existsSync(pathLcm4)){
		haveErrorLoadInit = true;
		return false;
	}
	
	try{
		var fd = fs.openSync(pathLcm4,'r');
		var fr = fs.readFile(pathLcm4,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.lcm4 = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}
	
	fs.closeSync(fd);
	
	
	//LCM 5
	var pathLcm5 = getfWf("assetsxml") + 'lcm4.xml';
	
	if(!fs.existsSync(pathLcm5)){
		haveErrorLoadInit = true;
		return false;
	}
	
	try{
		var fd = fs.openSync(pathLcm5,'r');
		var fr = fs.readFile(pathLcm5,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.lcm5 = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}
	
	fs.closeSync(fd);
	
	//LCM 6
	var pathLcm6 = getfWf("assetsxml") + 'lcm6.xml';
	if(!fs.existsSync(pathLcm6)){
		haveErrorLoadInit = true;
		return false;
	}
	try{
		var fd = fs.openSync(pathLcm6,'r');
		var fr = fs.readFile(pathLcm6,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.lcm6 = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}
	
	fs.closeSync(fd);
	
	
	//LIFE
	var pathLife = getfWf("assetsxml") + 'life.xml';
	if(!fs.existsSync(pathLife)){
		haveErrorLoadInit = true;
		return false;
	}
	try{
		var fd = fs.openSync(pathLife,'r');
		var fr = fs.readFile(pathLife,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.life = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}
	fs.closeSync(fd);
	
	
	
	//SPEECH
	var pathSpeech = getfWf("assetsxml") + 'speech.xml';
	if(!fs.existsSync(pathSpeech)){
		haveErrorLoadInit = true;
		return false;
	}
	try{
		var fd = fs.openSync(pathSpeech,'r');
		var fr = fs.readFile(pathSpeech,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.speech = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}
	fs.closeSync(fd);
	
	
	//BILAN
	var pathBilan = getfWf("assetsxml") + 'bilan.xml';
	if(!fs.existsSync(pathBilan)){
		haveErrorLoadInit = true;
		return false;
	}
	try{
		var fd = fs.openSync(pathBilan,'r');
		var fr = fs.readFile(pathBilan,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.bilan = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}
	fs.closeSync(fd);
	
	
	
	//Plugin
	var pathPlugin = getfWf("assetsxml") + 'plugin.xml';
	if(!fs.existsSync(pathPlugin)){
		haveErrorLoadInit = true;
		return false;
	}
	try{
		var fd = fs.openSync(pathPlugin,'r');
		var fr = fs.readFile(pathPlugin,function read(err,data){
			if(err){
				haveErrorLoadInit = true;
				return false;
			}
			global.sharedLibs.plugin = data;
		});
	}catch(e){
		haveErrorLoadInit = true;
		return false;
	}
	fs.closeSync(fd);
	
	
	file_get_contents(getfWf("assetsxml") + 'tablescore.xml','tablescore');
	file_get_contents(getfWf("assetsxml") + 'lependu.xml','lependu');
	
	try
	{	
		fs.openSync(getfWf("finalHtml") + 'base.txt','r');
		fs.readFile(getfWf("finalHtml") + 'base.txt',
			function read(err,data){
				writeText(getfWf("finalHtml") + "base1.txt",data);
			}
		);
	}catch(e){}
	
	
}

function deleteFileDeleteLink(filepath) {
	
	var fs = require('fs');
	if (fs.existsSync(filepath)) {
		fs.unlink(filepath, (err) => {
			if(err){
				alert("An error ocurred updating the file" + err.message);
				console.log(err);
				return;
			}
			console.log("File succesfully deleted");
		});
	} else {
		console.log("This file doesn't exist, cannot delete");
	}

}

function deleteExtracts(name){
	var fs = require('fs');
	var erasePath = getfWf("extract") + name;	
	writeText(erasePath,'{}');	
}

function deleteTemp(name){
	var fs = require('fs');
	var erasePath = getfWf("temp") + name;	
	writeText(erasePath,'{}');	
}

function getTextFile(pathFile){
	
	var fs = require('fs');
	
	if(fs.existsSync(pathFile)){
		fs.readFile(pathFile,function read(err, data) {
			if(err){
				return "";
			}
			return data;
		});
	}else{
		return "";
	}
	
}
exports.getTextFile = getTextFile;

function createWorkingFolder(nameFolder){
	
	var fd = global.fd;
	
	var fs = require('fs');
	var foldw = app.getPath('userData') + fd + nameFolder;
	if(!fs.existsSync(foldw)){
		fs.mkdirSync(foldw);
	}
	
}
exports.createWorkingFolder = createWorkingFolder;

function createFolderInWorkingFolder(workingFolder,nameFolder){
	
	var fd = global.fd;
	var fs = require('fs');
	var foldw = app.getPath('userData') + fd + workingFolder + fd +  nameFolder;
	if(!fs.existsSync(foldw)){
		console.log(foldw);
		fs.mkdirSync(foldw);
	}
}
exports.createFolderInWorkingFolder = createFolderInWorkingFolder;

function getWorkingFolder(nameFolder){
	
	var fd = global.fd;
	
	var foldw = app.getPath('userData') + fd + nameFolder;
	return foldw;	
}
exports.getWorkingFolder = getWorkingFolder;

function getFolderInWorkingFolder(workingFolder,nameFolder){
	var fd = global.fd;
	// appData userData documents savegames
	var foldw = app.getPath('userData') + fd + workingFolder + fd + nameFolder;
	return foldw;	
}
exports.getFolderInWorkingFolder = getWorkingFolder;

function getfWf(nameFolder){
	var fd = global.fd;
	return getFolderInWorkingFolder(appName,nameFolder)  + fd;	
}
exports.getfWf = getfWf;

function writeText(pathFile,txt){
	var fs = require('fs');
	fs.writeFile(pathFile,txt, function (err,data) {
	  if (err) {
		return console.log(err);
	  }
	  //console.log('writeText in ' + pathFile);
	});
}
exports.writeText = writeText;

function writeImg(pathFile,data){
	var fs = require('fs');
	fs.writeFile(pathFile,data,'binary',function (err,data) {
	  if(err){
		return console.log(err);
	  }
	});
}
exports.writeImg = writeImg;

function writeJson(pathFile,objJson){
	var fs = require('fs');
	fs.writeFile(pathFile,JSON.stringify(objJson),function(err,data){
		if(err){
			return console.log(err);
		}
		console.log('writeJson in ' + pathFile);
	});
}
exports.writeJson = writeJson;

function file_get_contents(path,idFile){
	
	if(typeof global.sharedFiles.allData[idFile] === 'undefined') {
		
		var fs = require('fs');
		
		if(fs.existsSync(path)){
			
			fs.openSync(path,'r+');
			fs.readFile(path,function read(err,fxml){
				if(typeof fxml === "undefined") {
					fxml = '';
				}
				if(typeof fxml !== 'string'){
					fxml = fxml.toString('utf8');
				}
				fxml = strReplace("\n",'',fxml);
				fxml = fxml.replace(/[\n]/gi,"");
				fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
				
				global.sharedFiles.allData[idFile] = fxml;
				
				return fxml;
			});
			
		}else{
			console.log('file no found:' + path);
		}

	}
	
}

function strReplace(s1,par,str){
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	if(str.indexOf(s1)!=-1){
		str = strReplace(s1,par,str);
	}
	return str;
}