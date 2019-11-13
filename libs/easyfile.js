"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;

const ncp = require('./easyncp').ncp;
const rfsbp = require('./rfsbp');

let haveErrorLoadInit = false;

const appName = "openelearning";
//createWorkingFolder
//createFolderInWorkingFolder
//getWorkingFolder
//getFolderInWorkingFolder
//writeText

function init(nameVersion){
	
	var fs = require('fs');
	
	console.log('init ' + appName);
	
	global.sharedLogs.logs += 'init:' + appName + '<br>';
	
	var haveNewVersion = false;
	var fileversion = getfWf("params") + nameVersion + "v.txt";
	
	if(!fs.existsSync(fileversion)){
		haveNewVersion = true;
		writeText(fileversion, "v");
	}
	
	createWorkingFolder(appName);
	createFolderInWorkingFolder(appName,"dataFiles");
	createFolderInWorkingFolder(appName,"temp");
	createFolderInWorkingFolder(appName,"tpl");
	createFolderInWorkingFolder(appName,"store");
	createFolderInWorkingFolder(appName,"extract");
	createFolderInWorkingFolder(appName,"params");
	createFolderInWorkingFolder(appName,"renderHtml");
	createFolderInWorkingFolder(appName,"finalHtml");
	createFolderInWorkingFolder(appName,"launchOverview");
	createFolderInWorkingFolder(appName,"assets");

	global.sharedLogs.logs += 'finalHtml:' + getfWf("finalHtml") + '<br>';
	global.sharedLogs.logs += 'appData:' + app.getPath('appData') + '<br>';
	global.sharedLogs.logs += 'userData:' + app.getPath('userData') + '<br>';
	
	createFolderInWorkingFolder(appName,"plugins");
	
	var serv = getPathServ();
	
	//Search file before copy
	var fileClue = serv + "app/launchOverview/base.txt";
	
	if(fs.existsSync(fileClue)){

		global.sharedLogs.logs += 'serv:' + serv + "app/assets" + '<br>';
		
		if(haveNewVersion){
			
			ncp(serv + "app/assets", getfWf("assets"), function (err) {
				if (err){
					global.sharedLogs.logs += 'assets error:' + err + '<br>';
					return console.error(err);
				}
				console.log('assets init done !');
				global.sharedLogs.logs += 'assets init done !<br>';
			});
			
			ncp(serv + "assets/e", getfWf("plugins"), function (err) {
				if (err){
					global.sharedLogs.logs += 'plugins error:' + err + '<br>';
					return console.error(err);
				}
				console.log('plugins init done !');
				global.sharedLogs.logs += 'plugins init done !<br>';
			});
			
		}
		
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
		console.log('ERROR:' + fileClue + " not exits");
		global.sharedLogs.logs += 'ERROR:' + fileClue + " not exits" + '<br>';
		
	}
	
	global.sharedObj.gpath = app.getPath('userData');
	
	deleteExtracts("cludis.json");
	deleteExtracts("pages.json");
	
	deleteTemp("cludis.json");
	deleteTemp("pages.json");
	
	setTimeout(function(){
		
		
		listOfPluginsX();
		cleanImages();
		writeText(getfWf("dataFiles") + "texte.txt", "test");
		
		loadLibs();

		ncp(serv + "assets/store", getfWf("store"), function (err) {
			if (err){
				global.sharedLogs.logs += 'store error:' + err + '<br>';
				return console.error(err);
			}
			console.log('store init done !');
			global.sharedLogs.logs += 'store init done !<br>';
		});

	},200);
	
	setTimeout(function(){
		
		if(haveErrorLoadInit){
			console.log('INIT is in ERROR');
			global.sharedLogs.logs += 'INIT is in ERROR<br>';
		}else{
			console.log('INIT is COMPLETE');
			global.sharedLogs.logs += 'INIT is COMPLETE<br>';
		}
		
		ncp(serv + "assets/tpl", getfWf("tpl"),function (err) {
			if(err){
				global.sharedLogs.logs += 'tpl error:' + err + '<br>';
				return console.error(err);
			}
			console.log('tpl init done !');
			global.sharedLogs.logs += 'tpl init done !<br>';
		});
		
		listOfStore();
		listOfInterface();

	},2000);

	setTimeout(function(){

		createFolderInWorkingFolder(appName,"assetsxml");
		createFolderInWorkingFolder(appName,"scorm");

		//facult.
		ncp(serv + "assets/t", getfWf("assetsxml"), function (err) {
			if (err){
				global.sharedLogs.logs += 'assetsxml error:' + err + '<br>';
				return console.error(err);
			}
			console.log('assetsxml init done !');
			global.sharedLogs.logs += 'assetsxml init done !<br>';
		});

		ncp(serv + "assets/scorm", getfWf("finalHtml"),function (err) {
			if(err){
				global.sharedLogs.logs += 'scorm error:' + err + '<br>';
				return console.error(err);
			}
			console.log('scorm init done !');
			global.sharedLogs.logs += 'scorm init done !<br>';
		});
		
	},7000);

}
exports.init = init;

function getPathServ(){
	
	var fs = require('fs');
	
	var serv = './';
	
	/* Ubuntu 18.04.1 LTS */
	if(!fs.existsSync(serv + "app/assets")) {
		serv = '/usr/lib/OpenElearning/resources/app/';
		
		/* MAC-OS */
		if(!fs.existsSync(serv + "app/assets")) {
			
			serv = __dirname;
			if(typeof serv !== 'string'){
				serv = serv.toString('utf8');
			}
			serv = serv.substring(0, serv.length - 4);
			
			if(!fs.existsSync(serv + "app/assets")) {
				global.sharedLogs.logs += 'ERROR serv:' + serv + "app/assets not exits" + '<br>';
				return './';
			}
			
		}
		
	}
	
	return serv;
	
}

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
	
	var dir2 = getfWf("finalHtml") + "data" + fd;
	
	fs.readdir(dir2, function (err, items) {
		if(err) {
			return console.log(err);
		}
		items.forEach(function (item) {
			
			if(item.indexOf('aaoel')!=-1){
				var filepath = dir2 + item;
				deleteFileDeleteLink(filepath);
			}
			
		});	  
	});
	
	deleteFileDeleteLink(getfWf("extract") + "listfile.txt");
	
}

function listOfStore(){
	
	global.plugins.store = new Array();
	var fs = require('fs');
	var dir = getfWf("store");
	
	global.plugins.pathStore = dir;
	
	fs.readdir(dir,function(err,items){
		
		if(err){
			return console.log(err);
		}
		items.forEach(function(item){
			var filepath = dir + item;
			if(item.indexOf('.')==-1&&item!='.'&&item!='..'){
				
				var plugItem = {name:item,description:'',isInstall:false};
				var pathFile = dir + item + global.fd + "description.txt";
				
				if(fs.existsSync(pathFile)){
					fs.readFile(pathFile,function read(err, data) {
						if(err){
							global.plugins.store.push(plugItem);
						}
						plugItem.description = data;
						global.plugins.store.push(plugItem);
					});
				}else{
					global.plugins.store.push(plugItem);
				}
				
				
				
			}
		})
	});
	
}

function loadDataDist(){

	var fs = require('fs');
	var pathFile = getfWf("params") + 'data.json';

	if(fs.existsSync(pathFile)){
		fs.readFile(pathFile,function read(err, data) {
			if(err){
				global.sharedFiles.distData = new Object();
			}
			global.sharedFiles.distData = JSON.parse(data);
			console.log('data.json is load');
		});
	}

}
exports.loadDataDist = loadDataDist;

function listOfInterface(){
	loadInterface('chamilo');
	loadInterface('moodle');
}

function loadInterface(intef){

	var fs = require('fs');
	var pathFile = getfWf("finalHtml") + 'scorm' + intef +'.js';

	if(fs.existsSync(pathFile)){
		fs.readFile(pathFile,function read(err, data) {
			if(err){
				global.sharedScorm["scorm" + intef] = '';
			}
			data = parseText(data);
			global.sharedScorm["scorm" + intef] = data;
		});
	}else{
		global.sharedScorm["scorm" + intef] = '';
	}
	
}

function listOfPluginsX(){
	
	console.log('listOfPluginsX');

	global.plugins.allData = new Array();
	global.plugins.xData = new Array();
	global.plugins.jsData = new Array();
	global.plugins.cssData = new Array();
	
	var fs = require('fs');
	var dir = getfWf("plugins");

	var tmp = 0;

	fs.readdir(dir,function(err,items){
		
		if(err){
			return console.log(err);
		}
		items.forEach(function(item){
			setTimeout(function(){
				loadOnePlug(dir,item);
			},tmp);
			tmp = tmp + 500;
		})
	});

}
exports.listOfPluginsX = listOfPluginsX;

function loadOnePlug(dir,item){
	
	var haveLog = false;

	var fs = require('fs');
	
	var filepath = dir + item;
	
	console.log('loadOnePlug => ' + item);

	if(item.indexOf('.')==-1&&item!='.'&&item!='..'){
		
		var fileClue = dir+item+'/plugin.xml';
		var fileRunJs = dir+item+'/run.js';
		var fileRunCss = dir+item+'/run.css';

		if(fs.existsSync(fileClue)){//fileClue plugin.xml
			if(fs.existsSync(fileRunJs)){
				if(fs.existsSync(fileRunCss)){

					global.plugins.allData.push(item);

					fs.openSync(fileClue,'r+');
					fs.readFile(fileClue,function read(err,fxml){
						
						var pluginXml = fxml;
						
						if(err){
							GlobalLogScreen("loadOnePlug ==> Could not open file plugin.xml "+ err);
							process.exit(1);
						}
						if(typeof fxml === 'undefined'){
							GlobalLogScreen("loadOnePlug ==> Could not open file plugin.xml "+ err);
							process.exit(1);
						}

						processCopyAlterFilesOfPlugins(dir,item,pluginXml);

						fxml = parseText(fxml);

						fxml = strReplace("\n",'',fxml);
						fxml = fxml.replace(/[\n]/gi,"");
						fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
						global.plugins.xData.push(fxml);

						GlobalLogScreen('loadOnePlug ==>'+item+' plugin.xml');
						
					});

					fs.openSync(fileRunJs,'r+');
					fs.readFile(fileRunJs,function read(err,fjs){
						
						if(err){
							GlobalLogScreen("loadOnePlug ==> Could not open file run.js "+ err);
							process.exit(1);
						}
						if(typeof fjs === 'undefined'){
							GlobalLogScreen("loadOnePlug ==> Could not open file run.js "+ err);
							process.exit(1);
						}

						fjs = parseText(fjs);
						global.plugins.jsData.push(fjs);
						GlobalLogScreen('loadOnePlug ==>'+item+' run.js');
					
					});//readFile
					
					fs.openSync(fileRunCss,'r+');
					fs.readFile(fileRunCss,function read(err,fcss){
						
						if(err){
							GlobalLogScreen("loadOnePlug ==> Could not open file run.css " + err);
							process.exit(1);
						}
						if(typeof fcss === 'undefined'){
							GlobalLogScreen("loadOnePlug ==> Could not open file run.css " + err);
							process.exit(1);
						}

						fcss = parseText(fcss);
						global.plugins.cssData.push(fcss);
						GlobalLogScreen('loadOnePlug ==>' + item + ' run.css');
						
					});//readFile
					
				}//fileRunCss
			}//fileRunJs
		}//fileClue plugin.xml
		
	}

}

function GlobalLogScreen(mess){
	global.sharedLogs.logs += mess+ '<br>';
	console.log(mess);
}

function processCopyAlterFilesOfPlugins(dir,item,xml){

	xml = parseText(xml)
	
	let re = new RegExp(/<file>(.|\r\n)*?<\/file>/g);
	let result = xml.match(re);
	
	if(result){
		
		result.forEach(function(entry){
			if(entry.indexOf(".js")!=-1){
				
				entry = entry.replace('<file>','');
				entry = entry.replace('<\/file>','');
				
				let filebasetxt = dir + item + '/resources/' + entry;
				copyFilePromise(filebasetxt,getfWf("assets") + entry);

				let entrytxt = entry.replace('.js','.txt');
				copyFilePromise(filebasetxt,getfWf("assets") + entrytxt);
			
			}
		});

	}


}

function parseText(str){

	if(typeof str === "undefined"){
		str = '';
	}
	if(typeof str !== 'string'){
		str = str.toString('utf8');
	}
	
	return str;
	
}

function loadLibs(){
	
	global.sharedLibs.lcm3 = rfsbp.readFileSyncByPath("assets-t-lcm3.xml");
	global.sharedLibs.lcm4 = rfsbp.readFileSyncByPath("assets-t-lcm4.xml");
	global.sharedLibs.lcm5 = rfsbp.readFileSyncByPath("assets-t-lcm5.xml");
	global.sharedLibs.lcm6 = rfsbp.readFileSyncByPath("assets-t-lcm6.xml");
	global.sharedLibs.life = rfsbp.readFileSyncByPath("assets-t-life.xml");
	global.sharedLibs.speech = rfsbp.readFileSyncByPath("assets-t-speech.xml");
	global.sharedLibs.bilan = rfsbp.readFileSyncByPath("assets-t-bilan.xml");
	global.sharedLibs.plugin = rfsbp.readFileSyncByPath("assets-t-plugin.xml");
	global.sharedLibs.tablescore = rfsbp.readFileSyncByPath("assets-t-tablescore.xml");
	global.sharedLibs.lependu = rfsbp.readFileSyncByPath("assets-t-lependu.xml");

	global.sharedFiles.allData["lependu"] = rfsbp.readFileSyncByPath("assets-t-lependu.xml");
	global.sharedFiles.allData["tablescore"] = rfsbp.readFileSyncByPath("assets-t-tablescore.xml");
	var fs = require('fs');
	
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

function deleteFolder(fileFolder) {
	
	var fs = require('fs');
	fs.readdir(fileFolder,function(err,items){
		if(err){
			return console.log(err);
		}
		items.forEach(function(item){
			if(item!='.'&&item!='..'){
				if(item.indexOf('.')!=-1||item=='LICENSE'){
					deleteFileDeleteLink(fileFolder + global.fd  + item);
				}else{
					deleteFolder(fileFolder + global.fd  + item)
				}
			}
		})
	});
	
}
exports.deleteFolder = deleteFolder;

function deleteFolderPLugin(fileFolder) {
	
	var fs = require('fs');
	fs.readdir(fileFolder,function(err,items){
		if(err){
			return console.log(err);
		}
		items.forEach(function(item){
			if(item!='.'&&item!='..'){
				if(item=='plugin.xml'){
					deleteFileDeleteLink(fileFolder + global.fd  + item);
				}
			}
		})
	});
	
}
exports.deleteFolderPLugin = deleteFolderPLugin;

function deleteFileDeleteLink(filepath) {
	
	var fs = require('fs');
	if (fs.existsSync(filepath)) {
		fs.unlink(filepath, (err) => {
			if(err){
				console.log("An error ocurred updating the file" + err.message);
				console.log(err);
				return;
			}
			console.log("File " + filepath + " succesfully deleted");
		});
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
	return "";
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

function getFileUpdatedSize(path){
	var fs = require('fs');
	var sizeM = 0;
	if(fs.existsSync(path)){
		const stats = fs.statSync(path);
		sizeM = stats.size;
	}
	return sizeM;
}

function getFileUpdatedDate(path){
	var fs = require('fs');
	const stats = fs.statSync(path)
	return stats.mtime
}

function copyFile(source, target, cb) {
	
	var sizeSource = getFileUpdatedSize(source);
	var sizeTarget = getFileUpdatedSize(target);

	if(sizeSource!=sizeTarget){

		console.log("CopyFile to ", target);

		var fs = require('fs');
		var cbCalled = false;
		var rd = fs.createReadStream(source);
		rd.on("error", function (err) {
			global.sharedLogs.logs += 'copy error ReadStream source:' + dest + '<br>';
			done(err);
		});
		var wr = fs.createWriteStream(target);
		wr.on("error", function (err) {
			global.sharedLogs.logs += 'copy error WriteStream source:' + dest + '<br>';
			done(err);
		});
		wr.on("close", function (ex) {
			done();
		});
		rd.pipe(wr);
		
		function done(err) {
			if (!cbCalled) {
				cb(err);
				cbCalled = true;
			}
		}
				
	}

}

function copyFilePromise(source, target) {
    return new Promise(function (accept, reject) {
        copyFile(source, target, function (data) {
            if (data === undefined) {
                accept();
            } else {
                reject(data);
            }
        });
    });
}

function copyMultiFilePromise(srcTgtPairArr) {
    var copyFilePromiseArr = new Array();
    srcTgtPairArr.forEach(function (srcTgtPair) {
        copyFilePromiseArr.push(copyFilePromise(srcTgtPair[0], srcTgtPair[1]));
    });
    return Promise.all(copyFilePromiseArr);
}

exports.copyFileAsync = copyFilePromise;


function strReplace(s1,par,str){
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	if(str.indexOf(s1)!=-1){
		str = strReplace(s1,par,str);
	}
	return str;
}