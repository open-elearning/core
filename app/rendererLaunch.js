'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const settingsEl = document.querySelector('#newProject');
settingsEl.addEventListener('click', function(){
	ipc.send('ShowModelsWindow');
});

const fileManagerBtn = document.getElementById('openProject')
fileManagerBtn.addEventListener('click',function(event){

	var path = openDialogOpenEL();
	if(path){
		ipc.send('message',{key:'openfile',val:path,tpl:false});
		ipc.send('ShowEditorWindow');
	}
	
});

const choicelangBtn = document.getElementById('choicelang')
choicelangBtn.addEventListener('click', function (event) {
	ipc.send('changlang');
});

const choiceExtensionsBtn = document.getElementById('extensions')
choiceExtensionsBtn.addEventListener('click', function (event) {
	ipc.send('extensions');
});

const settingsopenelearninglink = document.querySelector('#openelearninglink');
settingsopenelearninglink.addEventListener('click', function () {
shell.openExternal('http://www.openelearning.org/')
});

const settingsdebugBtn = document.querySelector('#debugBtn');
settingsdebugBtn.addEventListener('click', function () {
	ipc.send('debugMode');
});

function openDialogOpenEL(){
	
    return dialog.showOpenDialog(
		remote.getCurrentWindow(),
		{
			defaultPath: 'c:/',
			filters: [
				{name:'Open EL',
				extensions:['openelearning']}
			],properties: ['openFile']
		}
    );

}



