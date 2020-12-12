"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const appName = "openelearning";
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');
const ncp = require('./../easyncp').ncp;

function uplfiles(event,data){
	
	var easyfile = require('./../easyfile');
	var path = openDialogOpenOneFile();
    
    global.sharedObj.stockmaj = 0;
    
	if(!fs.existsSync(path)){
		if (path === undefined) return;
		var path2 = path[0];
		if(path2 === undefined){
			path2 = '';
		}
		if(path2!=''){
			var nameImg2 = findNameFromFile(path2);
			var ptarget = easyfile.getfWf("stockfiles") + nameImg2;
			global.sharedObj.stockfiles = global.sharedObj.stockfiles +  nameImg2 + '|@';
            easyfile.copyFilePromise(path2,ptarget);
            global.sharedObj.stockmaj = 1;
		}
		
	}

}
exports.uplfiles = uplfiles;

function openDialogOpenOneFile(){
	
	if(global.editorWind){
		global.editorWind.hide();
    }
	var dlgResult = dialog.showOpenDialogSync(window,{
		defaultPath: 'c:/',
		filters:[{
			name:'images',
			extensions:['jpg','png','svg','zip','css','js']
		}]
	,properties:['openFile']});

	if(global.editorWind){
		global.editorWind.show();
	}
	if(typeof dlgResult === "undefined") {
		dlgResult = '';
	}
	return dlgResult;

}
exports.openDialogOpenOneFile = openDialogOpenOneFile;

function findNameFromFile(source){
	
	if(typeof source === "undefined"){
        source = '';   
	}
    var fname = '';
    if(source!=''&&source.indexOf("/")!=-1){
        fname = source.split("/").pop();
    }else{
        if(source!=''&&source.indexOf('\\')!=-1){
            fname = source.split('\\').pop();
        }
    }
    fname = strReplace(' ','-',fname);
    fname = strReplace('é','e',fname);
    fname = strReplace('è','e',fname);
    fname = strReplace('ê','e',fname);
    fname = strReplace('ô','o',fname);
    fname = strReplace("'",'-',fname);
    fname = strReplace("\"",'-',fname);
    return fname;

}
exports.findNameFromFile = findNameFromFile;

function strReplace(s1,par,str){
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	if(str.indexOf(s1)!=-1){
		str = strReplace(s1,par,str);
	}
	return str;
}