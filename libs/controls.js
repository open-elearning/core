"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const appName = "openelearning";
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');
const ncp = require('./easyncp').ncp;
const ctrimages = require('./controls-upload-image');
const ctrimport = require('./import/uploadfiles');
const ctrexports = require('./export/export-scorm');
const ctrexportlocal = require('./export/export-local');
const ctropenfile = require('./open/open-file');
const ctrdownloadfile = require('./download/download-file')

function exec(event,data){
	
	var easyfile =  require('./easyfile');
	
	if(data.key=='openfile'){
		
		var recent0 = "";

		try{
			recent0 = data.val[0];
		}catch(e){}
		
		if(typeof recent0 === 'undefined') {
			recent0 = '';
		}

		if(typeof recent0 !== 'string'){
			recent0 = recent0.toString('utf8');
		}
		if(recent0!=''){
			ctropenfile.openFileProcess(recent0,data.tpl);
		}
		
	}
	
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

	if(data.key=='saveJsonCParams'){
		var jsonCLudisPath = easyfile.getfWf("temp") + "params.json";	
		easyfile.writeText(jsonCLudisPath,data.text);
		console.log("saveJsonCParams:ok");
	}
	
	if(data.key=='saveExtraCode'){
		if(data.tc==0){
			global.sharedObj.extracode = data.text;
		}
		if(data.tc==1){
			global.sharedObj.extracodecss = data.text;
		}
	}
	
	if(data.key=='downdata'){
		ctrdownloadfile.downloadFile('https://openelearning.org/dist/data.json',easyfile.getfWf("params") + 'data.json');
		console.log("downdata");
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
		ctrimages.refreshImgsAll();
	}
	
	if(data.key=='addpluginbtn'){
		
		var refStore = easyfile.getfWf("store") + data.val;
		var refDesti = easyfile.getfWf("plugins") + data.val;
		
		ncp(refStore,refDesti,function(err){
			if(err){
				console.log('error' + refStore);
				global.sharedLogs.logs += 'addpluginbtn error:' + refStore + '<br>';
				return console.error(err);
			}
			console.log('addpluginbtn init done !');
			global.sharedLogs.logs += 'addpluginbtn init done !<br>';
		});

	}
	
	if(data.key=='delpluginbtn'){
		
		var refDesti = easyfile.getfWf("plugins") + data.val
		
		easyfile.deleteFolderPLugin(refDesti);
		easyfile.deleteFolder(refDesti);

		var refDestiClue = refDesti + global.fd + "plugin.xml";
		if(!fs.existsSync(refDestiClue)){
			global.plugins.deleteStore += data.val + ';';
		}

	}
	
	if(data.key=='modifProcess'){
		app.showExitPrompt = true;
	}

	if(data.key=='savefile'){
		
		var path = global.sharedObj.dataFile;
		
		if(path==''){
			
			//showSaveDialog
			var filepath = dialog.showSaveDialogSync({
				title: 'save File',
				filters: [{
					name: 'file',extensions: ['openelearning']
				}]
			});

			if(filepath.indexOf(".openelearning")==-1){
				if(filepath!=''){
					filepath = filepath + ".openelearning";
				}
			}

			if(filepath!=''){
				console.log("save:ok path:" + filepath);
				ctropenfile.addRecentFile(filepath);
				global.sharedObj.dataFile = filepath;
				saveAll(filepath);
				app.showExitPrompt = false;
			}
			  
		}else{
			saveAll(path);
			app.showExitPrompt = false;
		}
		
	}
	
	if(data.key=='activeFile'){
		global.sharedObj.activeFile = data.val;
		console.log("global.sharedObj.activeFile = " + global.sharedObj.activeFile);
	}
	
	if(data.key=='export'){
		if(data.path!=''&&data.typlms!=''){
			ctrexports.exportAll(data.path,data.typlms,data.ms,data.acpl);
		}
	}

	if(data.key=='exportlocal'){

		console.log("exportAllLocal");

		var filePath = dialog.showOpenDialogSync({
			title: 'open Directory',
			properties: ['openDirectory'],
			filters: [{
				name: 'file',
				extensions: ['openelearning']
			}]
		});
		if(typeof filePath === "undefined") {
			filePath = '';
		}
		if(filePath!=''){
			ctrexportlocal.exportAllLocal(filePath);
			console.log("exportAllLocal:" + filePath);
		}
		
	}
	
	if(data.key=='uploadfile'){
		ctrimport.uplfiles(event,data);
	}
	
	if(data.key=='uploadimage'){
		ctrimages.uplimg();
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

	if(data.key=='uploadaudio'){
		
		global.sharedObj.dataAudio = "";
		
		var path = openDialogOpenMP3();
		if(!fs.existsSync(path)){
		    if (path === undefined) return;
			var path2 = path[0];
			var naudio = findNameMp3(path2);
			var ptarget = easyfile.getfWf("assets") + naudio;
			if(naudio.indexOf(".mp3")!=-1){
				
				if(!fs.existsSync(ptarget)){
					copyFileImg(path2,ptarget);
					console.log("copy:" + ptarget);
				}else{
					console.log("allready exists:" + ptarget);
				}
				
				global.sharedObj.dataAudio = naudio;
			
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
			var nameF = extractNameImg(path);
			nameF = nameF.replace(".js",".txt");
			var ptarget = easyfile.getfWf("assets") + nameF;
			console.log("path:" + path);
			console.log("ptarget:" + ptarget);
			copyFileImg(path,ptarget);
		}
		
	}

	//console.log("exec:" + data.key);
	
}
exports.exec = exec;

function saveAll(filename){
	
	var zip  = new require("node-zip")();
	var easyfile =  require('./easyfile');
	var src = easyfile.getfWf("temp");
	var srcAssets = easyfile.getfWf("assets");
	
	var listfile =  '';
	
	zip.file('openelearning.txt', 'v1');
	zip.file('extracode.txt', global.sharedObj.extracode);
	zip.file('extracodecss.txt', global.sharedObj.extracodecss);
	//console.log("extracode:" + global.sharedObj.extracode);
	
	var file = [];
	file.push( "cludis.json");
	file.push( "pages.json");
	file.push( "params.json");
	for (var i = 0; i < file.length; i++) {
		var txtw = fs.readFileSync(src + file[i]);
		var namt = file[i].replace('.json','.txt');
		zip.file(file[i],txtw);
		zip.file(namt,txtw);
	}
	
	//Background image for page
	var path2 = src + "pages.json";
	
	var jsonPagesData = fs.readFileSync(path2);
	var datapages = JSON.parse(jsonPagesData);
	
	//One screen Only
	var oneScreen = true;

	for(var i=0;i<datapages.length;i++){

		var obj = datapages[i];

		if(obj.back==''||obj.back=='white.jpg'){

		}else{

			var fnam2 = obj.back.trim();
			
			var path2 = srcAssets + fnam2;
			if(fs.existsSync(path2)){
				var srcData = fs.readFileSync(path2);
				console.log('inc:' + fnam2);
				listfile = listfile + fnam2 + ';';
				zip.file(fnam2.trim(),srcData);
			}

		}

		if(oneScreen){

			if(obj.screen==''){
			
			}else{
				var fnam5 = obj.screen.trim();
				var path5 = srcAssets + fnam5;
				if(fs.existsSync(path5)){
					var srcData = fs.readFileSync(path5);
					console.log('inc:' + fnam5);
					listfile = listfile + fnam5 + ';';
					zip.file(fnam5.trim(),srcData);
				}
			}
			oneScreen = false;	
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
			
			var path3 = srcAssets + fnam3.trim();
			if(fs.existsSync(path3)){
				
				try {
					var srcData3 = fs.readFileSync(path3);
					console.log('inc:' + fnam3);
					listfile = listfile + fnam3.trim() + ';';
					zip.file(fnam3.trim(),srcData3);
				}catch(err){
					if(err.code==='ENOENT'){
						
					}
				}
				
			}
		}
		
		if(objLudi.type=='videomp4'
		||objLudi.type=='audio'){
			
			var fnam4 = objLudi.text;
			
			var fnamMedia = fnam4.replace(/^.*[\\\/]/, '');
			
			if(fnamMedia.indexOf(".mp4")!=-1||fnamMedia.indexOf(".mp3")!=-1){
				
				var pathMedia = srcAssets + fnamMedia.trim();
				
				console.log('inc:' + pathMedia);

				if(fs.existsSync(pathMedia)){
					
					try {
						var srcDataMedia = fs.readFileSync(pathMedia);
						listfile = listfile + fnamMedia + ';';
						console.log('inc:' + fnamMedia);
						zip.file(fnamMedia.trim(),srcDataMedia);//, {binary:false}
					}catch(err){
						if(err.code==='ENOENT'){
							
						}
						console.log('err:' + err.code + ' ' + fnamMedia);
					}
					
				}
			}
			
		}
		
	}
	
	zip.file('listfile.txt',listfile);
	
	var data = zip.generate({base64:false,compression:'STORE'});
	
	try{
		
		fs.writeFileSync(filename, data, 'binary');
		
	}catch(err){
		
		if(err.code==='EACCES'||err.code==='EPERM'){
			global.sharedLogs.logs = 'Permission denied in this folder <br>';
			global.cwle();
		}
		
	}
	
}

function exportAll(filename){
	
	global.renderprocess = true;
	
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
			if(item.indexOf('.html')!=-1
			||item.indexOf('.xml')!=-1
			||item.indexOf('.xsd')!=-1){
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

			var fileIcons = [];
			//Css Icons
			var dirCssIcons = dir + "/css/icons"
			fs.readdir(dirCssIcons,function (err, items) {
				if(err){return onError(err);}
				items.forEach(function (item) {
					if(item.indexOf('.css')!=-1
					||item.indexOf('.jpg')!=-1
					||item.indexOf('.gif')!=-1
					||item.indexOf('.png')!=-1
					){
						fileIcons.push(item);
					}
					console.log("item css icon :" + item);
				});
				for(var i = 0; i < fileIcons.length; i++) {
					var txtw = fs.readFileSync(src + '/css/icons/' + fileIcons[i]);
					zip.file('css/icons/' + fileIcons[i],txtw);
				}
			});//Css Icons
			
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
							
								//DATA
								var filedata = [];
								var dirdata = dir + "/data"
								fs.readdir(dirdata,function (err,items){
									if(err){return onError(err);}
									items.forEach(function (item) {
										if(item.indexOf('.css')!=-1||item.indexOf('.jpg')!=-1
										||item.indexOf('.gif')!=-1||item.indexOf('.png')!=-1
										||item.indexOf('.xml')!=-1||item.indexOf('.mp4')!=-1
										||item.indexOf('.html')!=-1||item.indexOf('.mp3')!=-1
										){
											if(haveRightFiles(item)){
												filedata.push(item);
												console.log("item data :" + item);
											}
										}
										
									});
									for(var i = 0; i < filedata.length; i++){
										var txtdatab = fs.readFileSync(src+'/data/'+filedata[i]);
										zip.file('data/'+filedata[i],txtdatab);
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
											try{
												
												fs.writeFileSync(filename, data, 'binary');
												global.renderprocess = false;
												
											}catch(err){
												
												if(err.code==='EACCES'){
													global.sharedLogs.logs = 'Permission denied in this folder <br>';
													global.cwle();
												}
												
											}
										});//END FX QCM
								
								});//END DATA
							
						});//END FX
					
				});//END IMAGES
			
		});//END JAVASCRIPT
			
		});//END CSS

	});
	
}

function haveRightFiles(filename){
	if(filename.indexOf('retour.png')!=-1){
		return false;
	}
	return true;
}

function transformTarget(filename){
	return new CustomTransformStream()
}

function openDialogOpenExtensions(){
	
    return dialog.showOpenDialogSync(window,
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
	
	return dialog.showOpenDialogSync(window,
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

function openDialogOpenMP3(){
	
	return dialog.showOpenDialogSync(window,
		{
			defaultPath: 'c:/',
			filters:[
			{
				name:'audio mp3',
				extensions:['mp3','mp3']
			}
			],properties: ['openFile']
		}
    );

}

function openDialogOpenCsv(){
	
	return dialog.showOpenDialogSync(window,
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

function findNameMp4(source){
	
	if (typeof source === "undefined") {
		source = '';
	}
	if(typeof source !== 'string'){
		source = source.toString('utf8');
	}
	source = cleanNameParasits(source);
	
	var namsource = source.replace(/^.*[\\\/]/, '');
	var nam = 'aaoel' + namsource;
	
	return nam;
}

function findNameMp3(source){
	
	if (typeof source === "undefined") {
		source = '';
	}
	if(typeof source !== 'string'){
		source = source.toString('utf8');
	}
	source = cleanNameParasits(source);
	
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

function cleanNameParasits(source){
	source = replaceAll(source,'-','o');
	source = replaceAll(source,' ','o');
	source = replaceAll(source,'(','p');
	source = replaceAll(source,')','p');
	source = replaceAll(source,'é','e');
	source = replaceAll(source,'è','e');
	source = replaceAll(source,'ê','e');
	source = replaceAll(source,'ô','o');
	source = replaceAll(source,'à','a');
	source = replaceAll(source,'.com','dcom');
	
	return source;
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