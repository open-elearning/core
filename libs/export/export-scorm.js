"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const appName = "openelearning";
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');
const ncp = require('./../easyncp').ncp;
const rfsbp = require('./../rfsbp');

function exportAll(filename,typlms,ms,acpl) {
	
	global.renderprocess = true;
	
	var zip = new require("node-zip")();
	var fs = require('fs');
	var easyfile = require('./../easyfile');
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
			
			//CSS Icons
			var fileIcons = [];
			var dirCssIcons = dir + "/css/icons"
			fs.readdir(dirCssIcons,function (err, itemsIcons) {
				if(err){return onError(err);}
				itemsIcons.forEach(function (itemIc) {
					if(itemIc.indexOf('.css')!=-1
					||itemIc.indexOf('.jpg')!=-1
					||itemIc.indexOf('.gif')!=-1
					||itemIc.indexOf('.png')!=-1
					){
						fileIcons.push(itemIc);
					}
					console.log("item css icon :" + itemIc);
				});
				for(var i = 0; i < fileIcons.length; i++) {
					var txtw = fs.readFileSync(src + '/css/icons/' + fileIcons[i]);
					zip.file('css/icons/' + fileIcons[i],txtw);
				}
			});//CSS Icons
			
		//JAVASCRIPT
		var filejs = [];
		var dirjs = dir + "/javascript";
		fs.readdir(dirjs, function (err,items){
			if(err){return onError(err);}
			items.forEach(function (item){
				if(haveRightFiles(item)){
					if(item.indexOf('.js')!=-1){
						filejs.push(item);
					}
				}
				console.log("item js :" + item);
			});

			for(var i = 0; i < filejs.length; i++) {
				var txtw = fs.readFileSync(src + '/javascript/' + filejs[i]);
				zip.file('javascript/' + filejs[i],txtw);
			}
			
			global.sharedObj.datascorm = global.sharedScorm["scormlms" + typlms];
			
			if(typeof global.sharedObj.datascorm === 'undefined'){
				global.sharedObj.datascorm = '';
			}
			if(global.sharedObj.datascorm==''){
				global.sharedObj.datascorm = rfsbp.readFileJsSyncByPath(typlms);
			}
			
			global.sharedObj.datascorm = global.sharedObj.datascorm.replace('finalMasteryScore=100;','finalMasteryScore=' + ms + ';');
			if(acpl==0){
				global.sharedObj.datascorm = global.sharedObj.datascorm.replace('completedMasteryScore=true;','completedMasteryScore=false;');
			}
			
			zip.file('javascript/scorm.js',global.sharedObj.datascorm);
				
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
						||item.indexOf('.svg')!=-1
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
								||item.indexOf('.svg')!=-1
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
										||item.indexOf('.svg')!=-1
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
exports.exportAll = exportAll;

function haveRightFiles(filename){

	if(filename.indexOf('retour.png')!=-1){
		return false;
	}
	if(filename.indexOf('scorm.js')!=-1){
		return false;
	}
	if(filename.indexOf('scorm-1.2.js')!=-1){
		return false;
	}
	if(filename.indexOf('scorm-1-2-cloud.js')!=-1){
		return false;
	}
	if(filename.indexOf('scorm-chamilo.js')!=-1){
		return false;
	}
	if(filename.indexOf('scormchamilo.js')!=-1){
		return false;
	}
	if(filename.indexOf('scormmoodle.js')!=-1){
		return false;
	}
	if(filename.indexOf('scormlmschamilo.js')!=-1){
		return false;
	}
	if(filename.indexOf('scormlmsmoodle.js')!=-1){
		return false;
	}
	if(filename.indexOf('scormmoodle-v1.js')!=-1){
		return false;
	}
	if(filename.indexOf('scormlmsclaroline.js')!=-1){
		return false;
	}
	if(filename.indexOf('scormclaroline.js')!=-1){
		return false;
	}
	return true;

}
