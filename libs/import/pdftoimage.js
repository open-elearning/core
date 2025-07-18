"use strict";

const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const appName = "openelearning";
const dialog = electron.dialog;
const window = electron.BrowserWindow;
const fs = require('fs');
const pdf2img = require('../transform/pdf2img');

function createImages(event,data) {
	
	var easyfile = require('./../easyfile');
    var filesolo = easyfile.getfWf("temp") + global.sharedObj.filesolo;
    
	if (!fs.existsSync(filesolo)) {
        let counter = 1;
        const document =  pdf2img.toimages(filesolo);
        for (const image of document) {
            fs.writeFile(easyfile.getfWf("temp") + `page${counter}.png`, image);
            counter++;
        }
	}

}
exports.createImages = createImages;