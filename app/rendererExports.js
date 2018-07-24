'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const settingscancel = document.getElementById('extensions-graphic')
settingscancel.addEventListener('click',function(event){
	
	var filepath = dialog.showSaveDialog({
	title: 'save package',
	filters: [{
		name: 'file',
		extensions: ['zip']
	}]
	},function(path){
		if(typeof path === "undefined") {
			path = '';
		}
		if(path!=''){
			ipc.send('message',{key:'export',path:path})
		}
	});
	

	
});




