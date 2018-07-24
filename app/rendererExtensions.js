'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const settingsElearni = document.getElementById('extensions-elearni')  
settingsElearni.addEventListener('click',function(event){
	ipc.send('editextensions');
});

const settingslogs = document.getElementById('extensions-logs')
settingslogs.addEventListener('click',function(event){
	ipc.send('message',{key:'logs',path:'logs'})
});


const settingscancel = document.getElementById('extensions-cancel')
settingscancel.addEventListener('click',function(event){
	ipc.send('index');
});


function openDialogOpenExtensions(){
	
    return dialog.showOpenDialog(
		remote.getCurrentWindow(),
		{
			defaultPath: 'c:/',
			filters:[
				{name:'Plugins OEL',
				extensions:['zip']}
			],properties: ['openFile']
		}
    );

}



