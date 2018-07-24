"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const appName = "openelearning";
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');

function exec(event,data){
	
	var easyfile =  require('./easyfile');
	
	if(data.key=='saveJsonPages'){
		var jsonPagesPath = easyfile.getfWf("temp") + "pages.json";	
		easyfile.writeText(jsonPagesPath,data.text);
		console.log("saveJsonPages:ok");
	}
	
	if(data.key=='saveJsonCLudis'){
		var jsonCLudisPath = easyfile.getfWf("temp") + "cludis.json";	
		easyfile.writeText(jsonCLudisPath,data.text);
		console.log("saveJsonCLudis:ok");
	}
	
	if(data.key=='saveExtraCode'){
		global.sharedObj.extracode = data.text;
	}
	
	if(data.key=='lang'){
		var langPath = easyfile.getfWf("params") + "lang.txt";	
		easyfile.writeText(langPath,data.val);
		global.sharedObj.lang = data.val;
	}
	
	if(data.key=='render'){
		var render =  require('./render');
		render.generateHtml();
	}
	
	if(data.key=='refreshimgs'){
		refreshImgsAll();
	}
	
	if(data.key=='savefile'){
		
		var path = global.sharedObj.dataFile;
		
		if(path==''){
			
			var filepath = dialog.showSaveDialog({
			title: 'save File',
			filters: [{
				name: 'file',
				extensions: ['openelearning']
			}]
			}, function(path) {
				
				if(typeof path === "undefined") {
					path = '';
				}
				
				if(path!=''){
					easyfile.writeText(easyfile.getfWf("params") + "recent1.txt",path);
					global.sharedObj.dataFile = path;
					saveAll(path);
				}
				
			});
  
		}else{
			saveAll(path);
		}
		
	}
	
	if(data.key=='activeFile'){
		global.sharedObj.activeFile = data.val;
	}
	
	if(data.key=='export'){
		if(data.path!=''){
			exportAll(data.path);
		}
	}
	
	if(data.key=='uploadimage'){
		
		global.sharedObj.listassets = '';
		global.sharedObj.imgassets = '';
		var path = openDialogOpenIMG();
		if(!fs.existsSync(path)){
		    if (path === undefined) return;
			var path2 = path[0];
			var nameImg2 = findNameImg(path2);
			var ptarget = easyfile.getfWf("assets") + nameImg2;
			global.sharedObj.imgassets = nameImg2;
			copyFileImg(path2,ptarget);
			refreshImgsAll();
			setTimeout(function(){
				refreshImgsAll();
			},500);
		}else{
			setTimeout(function(){
				refreshImgsAll();
			},500);
		}
		
	}
	
	if(data.key=='dataupload'){
		
		global.sharedObj.dataUpload = "";
		
		var path = openDialogOpenCsv();
		if(!fs.existsSync(path)){
		    if (path === undefined) return;
			var path2 = path[0];
			
			if(path2.indexOf(".csv")!=-1){
				
				try{
					var fd = fs.openSync(path2,'r');
					var fr = fs.readFile(path2,function read(err,data){
						if(err){
							global.sharedObj.dataUpload = 'error';
							return false;
						}
						if(typeof data !== 'string'){
							data = data.toString('utf8');
						}
						
						//global.sharedObj.dataUpload = data;
						global.sharedObj.dataUpload = decodeURIComponent(data);
					});
				}catch(e){
					global.sharedObj.dataUpload = 'error';
				}
			
			}
		
		}
	}
	
	if(data.key=='uploadvideo'){
		
		global.sharedObj.dataVideo = "";
		
		var path = openDialogOpenMP4();
		if(!fs.existsSync(path)){
		    if (path === undefined) return;
			var path2 = path[0];
			var nvideo = findNameMp4(path2);
			var ptarget = easyfile.getfWf("assets") + nvideo;
			if(nvideo.indexOf(".mp4")!=-1){
				
				if(!fs.existsSync(ptarget)){
					copyFileImg(path2,ptarget);
					console.log("copy:" + ptarget);
				}else{
					console.log("allready exists:" + ptarget);
				}
				
				global.sharedObj.dataVideo = nvideo;
			
			}
		
		}
		
	}
	
	
	if(data.key=='addplugin'){
	
		global.sharedObj.dataZip = "";
		
		var path = openDialogOpenExtensions();
		if(!fs.existsSync(path)){
		    if (path === undefined) return;
			var path2 = path[0];
			var nZip = findNameZIP(path2);
			var ptarget = easyfile.getfWf("plugins") + nZip;
			if(nZip.indexOf(".zip")!=-1){
				
				if(!fs.existsSync(ptarget)){
					copyFileImg(path2,ptarget);
					console.log("copy:" + ptarget);
				}else{
					console.log("allready exists:" + ptarget);
				}
				
				global.sharedObj.dataZip = nZip;
				
				electron.shell.openItem(easyfile.getfWf("plugins"))
				
			}
		
		}
	
	}
	
	if(data.key=='copyFileProcess'){
		
		var path = data.filenam;
		
		if(fs.existsSync(path)){
		    if (path === undefined) return;
			var ptarget = easyfile.getfWf("assets") + extractNameImg(path);
			console.log("path:" + path);
			console.log("ptarget:" + ptarget);
			copyFileImg(path,ptarget);
		}
		
	}
	
	if(data.key=='openfile'){

		var recent0 = data.val[0];
		
		if(typeof recent0 !== 'string'){
			recent0 = recent0.toString('utf8');
		}
		
		if(fs.existsSync(recent0)){
			
			console.log('Open:' + recent0);
			
			try{	
				global.sharedObj.activeTitle = ("OPEN ELEARNING : " + recent0);
			}catch(e){
				
			}
			
			fs.readFile(recent0,function read(err, zipBuffer){
				
				if(err){throw err;}
				
				easyfile.writeText(easyfile.getfWf("params")+"recent2.txt",data.val[0]);
				
				var zip = new require('node-zip')(zipBuffer,{base64:false,checkCRC32:true})
				
				var listfile = zip.files['listfile.txt'];
				var datafile = listfile._data;
				var util = require('util');
				
				var listfilePath = easyfile.getfWf("extract") + "listfile.txt";	
				easyfile.writeText(listfilePath,datafile);
				
				var datacludis = zip.files['cludis.txt'];
				var cludisPath = easyfile.getfWf("extract") + "cludis.json";	
				easyfile.writeText(cludisPath,JSON.stringify(datacludis));
				
				var datapages = zip.files['pages.txt'];
				var pagesPath = easyfile.getfWf("extract") + "pages.json";	
				easyfile.writeText(pagesPath,JSON.stringify(datapages));
				
				
				var extraCodeData = zip.files['extracode.txt'];
				
				if (typeof extraCodeData === "undefined") {
					
					global.sharedObj.extracode = '';
					
				}else{
					
					console.log(extraCodeData);
					
					var extraPath = easyfile.getfWf("extract") + "extracode.txt";
					
					if(typeof extraCodeData !== 'string'){
						extraCodeData = extraCodeData._data;
					}
					
					extraCodeData = decodeURIComponent(escape(extraCodeData));
					
					global.sharedObj.extracode = extraCodeData;
					console.log("extracode:" + extraCodeData);
					
				}
				
				global.sharedObj.dataFile = data.val[0];
				getDependFiles(zip,datafile);
				global.sharedObj.activeFile = '1';
				
			});
			
		}else{
			
			easyfile.writeText(easyfile.getfWf("params") + "recent1.txt" , "");
			easyfile.writeText(easyfile.getfWf("params") + "recent2.txt" , "");
			
			global.cwle();
			global.errornb = 1;
			console.log('ERROR:', 'error open-file');
			
			global.sharedLogs.logs += 'ERROR:error open-file<br>';
			
		}
		
	}
	
	//console.log("exec:" + data.key);
	
}
exports.exec = exec;

function getDependFiles(zip,datafile){
	
	var easyfile =  require('./easyfile');
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
			console.log('fnam:' + fnam);
			if(fs.existsSync(path2)){
				console.log('exist:' + fnam);
			}else{
				var dataImg = zip.files[fnam];
				var bynaryImg = dataImg._data;
				
				console.log('exist:' + bynaryImg);
				easyfile.writeImg(path2,bynaryImg);
				console.log('complete:' + fnam);
			}
		}
	}

}

function refreshImgsAll(){
	
	var easyfile =  require('./easyfile');
	var directoryName = easyfile.getfWf("assets");
	var datalistassets = "";
	
	fs.readdir(directoryName, function (err, items) {
	  if (err) {
		return onError(err);
	  }
	  
	  datalistassets = datalistassets + directoryName + ';';
	  
	  items.forEach(function (item) {
		 datalistassets = datalistassets + item + ';';
	  });
	  
	  global.sharedObj.listassets = datalistassets;
		
	});
	
}

function saveAll(filename){
	
	var zip  = new require("node-zip")();
	var easyfile =  require('./easyfile');
	var src = easyfile.getfWf("temp");
	var srcAssets = easyfile.getfWf("assets");
	
	var listfile =  '';
	
	zip.file('openelearning.txt', 'v1');
	zip.file('extracode.txt', global.sharedObj.extracode);
	console.log("extracode:" + global.sharedObj.extracode);
	
	var file = [];
	file.push( "cludis.json");
	file.push( "pages.json");
	for (var i = 0; i < file.length; i++) {
		var txtw = fs.readFileSync(src + file[i]);
		var namt = file[i].replace('.json','.txt');
		zip.file(file[i],txtw);
		zip.file(namt,txtw);
	}
	
	//Fond images des pages
	var path2 = src + "pages.json";
	
	var jsonPagesData = fs.readFileSync(path2);
	var datapages = JSON.parse(jsonPagesData);
	
	for(var i=0;i<datapages.length;i++){
		var obj = datapages[i];
		if(obj.back==''||obj.back=='white.jpg'){
		}else{
			var fnam2 = obj.back;
			
			var path2 = srcAssets + fnam2;
			if(fs.existsSync(path2)){
				var srcData = fs.readFileSync(path2);
				console.log('inc:' + fnam2);
				listfile = listfile + fnam2 + ';';
				zip.file(fnam2,srcData);
			}
		}
	}
	
	//Images des objets
	var path3 = src + "cludis.json";	
	
	var jsonLudiData = fs.readFileSync(path3);
	var dataLudiFile = JSON.parse(jsonLudiData);
	
	for(var i = 0; i < dataLudiFile.length; i++){
		
		var objLudi = dataLudiFile[i];
		
		if(objLudi.type=='img'){
		
			var fnam3 = objLudi.text6.replace(/^.*[\\\/]/, '');
			
			var path3 = srcAssets + fnam3;
			if(fs.existsSync(path3)){
				
				try {
					var srcData3 = fs.readFileSync(path3);
					console.log('inc:' + fnam3);
					listfile = listfile + fnam3 + ';';
					zip.file(fnam3,srcData3);
				}catch(err){
					if(err.code==='ENOENT'){
						
					}
				}
				
			}
		}
	}
	
	zip.file('listfile.txt',listfile);
	
	var data = zip.generate({base64:false,compression:'DEFLATE'});
	
	fs.writeFileSync(filename, data, 'binary');
	
}

function exportAll(filename) {
	
	var zip = new require("node-zip")();
	var fs = require('fs');
	var easyfile = require('./easyfile');
	var src = easyfile.getfWf("finalHtml");
	var dir = easyfile.getfWf("finalHtml");
	
	zip.file('openelearning.txt', 'v1');
	
	var file = [];
	
	//ROOT
	fs.readdir(dir, function (err, items) {
		
		if(err){
			return onError(err);
		}
		items.forEach(function (item) {
			if(item.indexOf('.html')!=-1){
				file.push(item);
			}
			console.log("item:" + item);
		});
		
		for(var i = 0; i < file.length; i++) {
			var txtw = fs.readFileSync(src + file[i]);
			zip.file(file[i],txtw);
		}
		var filecss = [];
		//CSS
		var dircss = dir + "/css"
		fs.readdir(dircss, function (err, items) {
			if(err){return onError(err);}
			items.forEach(function (item) {
				if(item.indexOf('.css')!=-1
				||item.indexOf('.jpg')!=-1
				||item.indexOf('.gif')!=-1
				||item.indexOf('.png')!=-1
				){
					filecss.push(item);
				}
				console.log("item css :" + item);
			});
			for(var i = 0; i < filecss.length; i++) {
				var txtw = fs.readFileSync(src + '/css/' + filecss[i]);
				zip.file('css/' + filecss[i],txtw);
			}
			
		//JAVASCRIPT
		var filejs = [];
		var dirjs = dir + "/javascript"
		fs.readdir(dirjs, function (err, items) {
			if(err){return onError(err);}
			items.forEach(function (item) {
				if(item.indexOf('.js')!=-1){
					filejs.push(item);
				}
				console.log("item js :" + item);
			});
			for(var i = 0; i < filejs.length; i++) {
				var txtw = fs.readFileSync(src + '/javascript/' + filejs[i]);
				zip.file('javascript/' + filejs[i],txtw);
			}
			
				//IMAGES
				var fileimg = [];
				var dirimg  = dir + "/images"
				fs.readdir(dirimg,function (err,items){
					if(err){return onError(err);}
					items.forEach(function (item) {
						if(item.indexOf('.css')!=-1
						||item.indexOf('.jpg')!=-1
						||item.indexOf('.gif')!=-1
						||item.indexOf('.png')!=-1
						){
							fileimg.push(item);
						}
						console.log("item img :" + item);
					});
					for(var i = 0; i < fileimg.length; i++) {
						var txtw = fs.readFileSync(src + '/images/' + fileimg[i]);
						zip.file('images/' + fileimg[i],txtw);
					}
					
						//FX
						var filefx = [];
						var dirfx  = dir + "/fx"
						fs.readdir(dirfx,function (err,items){
							if(err){return onError(err);}
							items.forEach(function (item) {
								if(item.indexOf('.jpg')!=-1
								||item.indexOf('.gif')!=-1
								||item.indexOf('.png')!=-1
								){
									filefx.push(item);
								}
								console.log("item fx :" + item);
							});
							for(var i = 0; i < filefx.length; i++) {
								var txtw = fs.readFileSync(src + '/fx/' + filefx[i]);
								zip.file('fx/' + filefx[i],txtw);
							}
							
								//FX QCM
								var filefxqcm = [];
								var dirfxqcm  = dir + "/fx/qcm"
								fs.readdir(dirfxqcm,function (err,items){
									if(err){return onError(err);}
									items.forEach(function (item) {
										if(item.indexOf('.jpg')!=-1
										||item.indexOf('.gif')!=-1
										||item.indexOf('.png')!=-1
										){
											filefxqcm.push(item);
										}
										console.log("item fx :" + item);
									});
									for(var i = 0; i < filefxqcm.length; i++) {
										var txtw = fs.readFileSync(src + '/fx/qcm/' + filefxqcm[i]);
										zip.file('fx/qcm/' + filefxqcm[i],txtw);
									}
									
									//Save
									var data = zip.generate({base64:false,compression:'DEFLATE'});
									fs.writeFileSync(filename, data, 'binary');
									
								});//END FX QCM
							
						});//END FX
					
				});//END IMAGES
			
		});//END JAVASCRIPT
			
		});//END CSS

	});
	
	
	
}

function transformTarget(filename) {
	return new CustomTransformStream()
}

function openDialogOpenIMG(){
	
	return dialog.showOpenDialog(window,
		{
			defaultPath: 'c:/',
			filters:[
			{
				name:'images',
				extensions:['jpg','png']
			}
			],properties: ['openFile']
		}
    );

}

function openDialogOpenExtensions(){
	
    return dialog.showOpenDialog(window,
		{
			defaultPath: 'c:/',
			filters:[
				{name:'Plugins OEL',
				extensions:['zip']}
			],properties: ['openFile']
		}
    );

}


function openDialogOpenMP4(){
	
	return dialog.showOpenDialog(window,
		{
			defaultPath: 'c:/',
			filters:[
			{
				name:'video mp4',
				extensions:['mp4','mp4']
			}
			],properties: ['openFile']
		}
    );

}

function openDialogOpenCsv(){
	
	return dialog.showOpenDialog(window,
		{
			defaultPath: 'c:/',
			filters:[
			{
				name:'sheet csv',
				extensions:['csv','csv']
			}
			],properties: ['openFile']
		}
    );

}

function getData(tmpFolder, url, callback) {

	var request = require('request')
	var tempZipFilePath = tmpFolder + new Date().getTime() + Math.random()
	var tempZipFileStream = fs.createWriteStream(tempZipFilePath)
	request.get({
	url: url,
	encoding: null
	}).on('end', function() {
	fs.readFile(tempZipFilePath, 'base64', function (err, zipContent) {
	  var zip = new NodeZip(zipContent, { base64: true })
	  Object.keys(zip.files).forEach(function (filename) {
		var tempFilePath = tmpFolder + new Date().getTime() + Math.random()
		var unzipped = zip.files[filename].data
		fs.writeFile(tempFilePath, unzipped, function (err) {
		  callback(err, tempFilePath)
		})
	  })
	})
	}).pipe(tempZipFileStream)
}

function findNameImg(source){
	
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var mfl = Math.floor(Math.random()*100) + 1;
	var mf2 = Math.floor(Math.random()*100) + 1;
	var nam = 'aaoel' +  year + month + day + 'n' + mfl + 'o' + mf2;
	
	var ext = "";
	var src = source;
	console.log("src:" + src);
	if(src.indexOf('.jpg')!=-1){
		ext = '.jpg';
	}
	if(src.indexOf('.png')!=-1){
		ext = '.png';
	}
	if(src.indexOf('.gif')!=-1){
		ext = '.gif';
	}
	
	return nam + ext;
}

function findNameMp4(source){
	
	if (typeof source === "undefined") {
		source = '';
	}
	if(typeof source !== 'string'){
		source = source.toString('utf8');
	}
	source = replaceAll(source,'-','o');
	source = replaceAll(source,' ','o');
	
	var namsource = source.replace(/^.*[\\\/]/, '');
	var nam = 'aaoel' + namsource;
	
	return nam;
}

function findNameZIP(source){
	
	if (typeof source === "undefined") {
		source = '';
	}
	if(typeof source !== 'string'){
		source = source.toString('utf8');
	}
	source = replaceAll(source,'-','o');
	source = replaceAll(source,' ','o');
	
	var namsource = source.replace(/^.*[\\\/]/, '');
	var nam = 'aaoel' + namsource;
	
	return nam;
}

function extractNameImg(source){
	
	var nam = source.replace(/^.*[\\\/]/, '');
	
	var ext = "";
	var src = source;

	if(src.indexOf('.jpg')!=-1){
		ext = '.jpg';
	}
	if(src.indexOf('.png')!=-1){
		ext = '.png';
	}
	if(src.indexOf('.gif')!=-1){
		ext = '.gif';
	}
	
	return nam;
}


function copyFileImg(src,dest){
	
	let readStream = fs.createReadStream(src);
	
	readStream.once('error', (err) => {
		console.log(err);
	});
	
	readStream.once('end', () => {
		console.log('done copying');
	});
	
	readStream.pipe(fs.createWriteStream(dest));
    
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