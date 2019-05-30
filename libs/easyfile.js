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

function init(nameVersion){
	
	var fs = require('fs');
	
	console.log('init ' + appName);
	
	global.sharedLogs.logs += 'init:' + appName + '<br>';
	
	var haveNewVersion = false;
	var fileversion = getfWf("params") + nameVersion + "v.txt";
	
	if(!fs.existsSync(fileClue)){
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
	createFolderInWorkingFolder(appName,"assetsxml");
	createFolderInWorkingFolder(appName,"scorm");
	
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
			
			ncp(serv + "assets/t", getfWf("assetsxml"), function (err) {
				if (err){
					global.sharedLogs.logs += 'assetsxml error:' + err + '<br>';
					return console.error(err);
				}
				console.log('assetsxml init done !');
				global.sharedLogs.logs += 'assetsxml init done !<br>';
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
		
		loadLibs();
		listOfPluginsX();
		cleanImages();
		writeText(getfWf("dataFiles") + "texte.txt", "test");
		
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
		
		ncp(serv + "assets/scorm", getfWf("finalHtml"),function (err) {
			if(err){
				global.sharedLogs.logs += 'scorm error:' + err + '<br>';
				return console.error(err);
			}
			console.log('scorm init done !');
			global.sharedLogs.logs += 'scorm init done !<br>';
		});
		listOfStore();
		listOfInterface();	
	},2000);
	
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

//Old
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
				
				console.log("plugPath==>" + pathFile);
				console.log("plugItem.description==>" + plugItem.description);
				
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
			tmp = tmp + 300;
		})
	});

}
exports.listOfPluginsX = listOfPluginsX;

function loadOnePlug(dir,item){
	
	var haveLog = false;

	var fs = require('fs');
	
	var filepath = dir + item;
	
	if(item.indexOf('.')==-1&&item!='.'&&item!='..'){
		
		var fileClue = dir+item+'/plugin.xml';
		
		if(fs.existsSync(fileClue)){//fileClue plugin.xml
			
			global.plugins.allData.push(item);
			
			if(haveLog)
			console.log('loadOnePlug allData => ' + item);

			fs.openSync(fileClue,'r+');
			fs.readFile(fileClue,function read(err,fxml){
				
				fxml = parseText(fxml);

				fxml = strReplace("\n",'',fxml);
				fxml = fxml.replace(/[\n]/gi,"");
				fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
				global.plugins.xData.push(fxml);
				
				if(haveLog)
				console.log('loadOnePlug xData => ' + fxml);
				
				var fileRunJs = dir+item+'/run.js';
				
				if(fs.existsSync(fileRunJs)){
					
					fs.openSync(fileRunJs,'r+');
					fs.readFile(fileRunJs,function read(err,fjs){
						
						fjs = parseText(fjs);

						global.plugins.jsData.push(fjs);
						
						if(haveLog)
						console.log('loadOnePlug jsData => ' + fjs);
						
						var fileRunCss = dir+item+'/run.css';
						
						if(fs.existsSync(fileRunCss)){
							
							fs.openSync(fileRunCss,'r+');
							fs.readFile(fileRunCss,function read(err,fcss){
								
								fcss = parseText(fcss);
								
								global.plugins.cssData.push(fcss);
								
								if(haveLog)
								console.log('loadOnePlug cssData => ' + fcss);
								
								//preload all js
							
								fs.readFile(dir+item+'/plugin.xml','ascii', function(err,xml){
								
									if(err){
										console.log("Could not open file"+ err);
										process.exit(1);
									}
									
									if(typeof xml === 'undefined'){
										
									}else{
									
										let re = new RegExp(/<file>(.|\r\n)*?<\/file>/g);
										let result = xml.match(re);
										
										result.forEach(function(entry){
											if(entry.indexOf(".js")!=-1){
												
												entry = entry.replace('<file>','');
												entry = entry.replace('<\/file>','');
												console.log("File =>" + entry);
												
												let filebasetxt = dir + item + '/resources/' + entry;
												
												copyFilePromise(filebasetxt,getfWf("assets")+entry);
												let entrytxt = entry.replace('.js','.txt');
												copyFilePromise(filebasetxt,getfWf("assets") + entrytxt);
											
											}
										});
									
									}
								
								});
								
							});//readFile
						
						}//fileRunCss
							
					});//readFile
						
				}//fileRunJs
				
			});
			
		}//fileClue plugin.xml
				
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
	} else {
		console.log("This file " + filepath + " doesn't exist, cannot delete");
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

function copyFile(source, target, cb) {
	
    console.log("CopyFile", source, target);
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