"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const appName = "openelearning";
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');
const ncp = require('./../easyncp').ncp;

function exportAllLocal(path){
	
	console.log("exportAllLocal:ok");
	var easyfile = require('./../easyfile');
	var dir = easyfile.getfWf("finalHtml");
	var fd = global.fd;

	if (typeof path === "undefined") {
		path = '';
	}
	if(typeof path !== 'string'){
		path = path.toString('utf8');
	}

	if(typeof path !== ''){
		
		ncp(dir,path,function(err) {
			if (err){
				global.sharedLogs.logs += 'exportAllLocal error:' + err + '<br>';
				return console.error(err);
			}
			console.log('exportAllLocal init done !');
			global.sharedLogs.logs += 'exportAllLocal init done !<br>';

			fs.readdir(path, function (err, items) {
				if(err){
					return console.log(err);
				}
				items.forEach(function (item){
					if(haveRightFileCopy(item)===false){
						var filepathDel = path + fd + item;
						deleteFileNothingLocal(filepathDel);
					}
				});	  
			});

		});

	}

}
exports.exportAllLocal = exportAllLocal;

function haveRightFileCopy(filename){

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
	if(filename.indexOf('.xsd')!=-1){
		return false;
	}
	if(filename.indexOf('imsmanifest.xml')!=-1){
		return false;
	}
	if(filename.indexOf('.txt')!=-1){
		return false;
	}
	return true;

}

function deleteFileNothingLocal(filepath) {
	
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