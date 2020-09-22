"use strict";

const fs = require('fs');
const electron = require('electron');
const nativeImage = require('electron').nativeImage

const ipcMain = electron.ipcMain;
const app = electron.app;
const appName = "openelearning";
const dialog = electron.dialog;
const window = electron.BrowserWindow;

function uplimg(event,data){
	
	var easyfile =  require('./easyfile');
	
	global.sharedObj.listassets = '';
	global.sharedObj.imgassets = '';
	var path = openDialogOpenIMG();
	
	if(!fs.existsSync(path)){
		if (path === undefined) return;
		var path2 = path[0];

		if(path2 === undefined){
			path2 = '';
		}
		if(path2!=''){
			var nameImg2 = findNameImg(path2);
			var ptarget = easyfile.getfWf("assets") + nameImg2;
			global.sharedObj.imgassets = nameImg2;
			copyFileImgAndResize(path2,ptarget);
			refreshImgsAll();
			setTimeout(function(){
				refreshImgsAll();
			},500);
		}else{
			refreshImgsAll();
		}
		
	}else{
		setTimeout(function(){
			refreshImgsAll();
		},500);
	}

}
exports.uplimg = uplimg;

function openDialogOpenIMG(){
	
	if(global.editorWind){
		global.editorWind.hide();
	}

	var dlgResult = dialog.showOpenDialogSync(window,{
		defaultPath: 'c:/',
		filters:[{
			name:'images',
			extensions:['jpg','png','svg']
		}]
	,properties: ['openFile']});

	if(global.editorWind){
		global.editorWind.show();
	}
	if(typeof dlgResult === "undefined") {
		dlgResult = '';
	}	
	return dlgResult;

}
exports.openDialogOpenIMG = openDialogOpenIMG;


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
exports.copyFileImg = copyFileImg;


function copyFileImgAndResize(src,dest){
	
	let image = nativeImage.createFromPath(src)
	
	let sizes = image.getSize();

	if(sizes.width>960||sizes.height>720){
		
		let ratio = sizes.height/sizes.width;

		let imgWidth = sizes.width;
		let imgHeight = sizes.height;

		if(imgWidth>960){
			imgWidth = 960;
			imgHeight = imgWidth * ratio;
		}
		if(imgHeight>720){
			imgHeight = 720;
			imgWidth = imgHeight / ratio;
		}

		console.log('image resizing to ' + imgWidth + 'px ' + imgHeight + 'px ');

		let conv = image.resize({
			width: imgWidth,
			height: imgHeight,
			quality: 'best'
		}).toPNG(1.0);
		
		fs.writeFile(dest, conv, err => {
			if (err) console.log(err)
		});

	}else{
		copyFileImg(src,dest);
	}

}
exports.copyFileImgAndResize = copyFileImgAndResize;


function findNameImg(source){
	
	if(typeof source === "undefined"){
		source = '';
	}

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
	if(src.indexOf('.JPG')!=-1){
		ext = '.jpg';
	}
	if(src.indexOf('.jpeg')!=-1){
		ext = '.jpg';
	}
	if(src.indexOf('.png')!=-1){
		ext = '.png';
	}
	if(src.indexOf('.PNG')!=-1){
		ext = '.png';
	}
	if(src.indexOf('.gif')!=-1){
		ext = '.gif';
	}
	if(src.indexOf('.GIF')!=-1){
		ext = '.gif';
	}
	if(src.indexOf('.svg')!=-1){
		ext = '.svg';
	}
	if(ext==''){
		ext = '.jpg';
	}
	return nam + ext;
}
exports.findNameImg = findNameImg;


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
exports.refreshImgsAll = refreshImgsAll;