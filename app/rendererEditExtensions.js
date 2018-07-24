'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const fs = require('fs');

const settingsreturnpage = document.getElementById('returnpage')
	settingsreturnpage.addEventListener('click',function(event){
		ipc.send('index');
	}
);

const settingsfolderadd = document.getElementById('folderadd')
	
	settingsfolderadd.addEventListener('click',function(event){
		ipc.send('message',{key:'addplugin',val:''})
	}
	
);






