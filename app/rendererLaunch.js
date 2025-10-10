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
	if (!inwaitmode) {
		ipc.send('ShowModelsWindow');
	}
});

//newProject2
const settingsEl2 = document.querySelector('#newProject2');
settingsEl2.addEventListener('click', function(){
	if (!inwaitmode) {
		ipc.send('ShowModelsWindow');
	}
});

const fileManagerBtn = document.getElementById('openProject')
fileManagerBtn.addEventListener('click',function(event){
	if (!inwaitmode) {
		var path = openDialogOpenEL();
		if(path){
			ipc.send('message',{key:'openfile',val:path,tpl:false});
			ipc.send('ShowEditorWindow');
		}
	}
});

const choicelangBtn = document.getElementById('choicelang')
choicelangBtn.addEventListener('click', function (event) {
	ipc.send('changlang');
});

const choiceExtensionsBtn = document.getElementById('extensions')
choiceExtensionsBtn.addEventListener('click', function (event) {
	if (!inwaitmode) {
		ipc.send('extensions');
	}
});

const settingsopenelearninglink = document.querySelector('#openelearninglink');
settingsopenelearninglink.addEventListener('click', function () {
	shell.openExternal('http://www.openelearning.org/');
});

const settingsopenpremiumlink = document.querySelector('#premium');
	if (settingsopenpremiumlink) {
		settingsopenpremiumlink.addEventListener('click', function () {
		ipc.send('ShowTplsWindow');
	});
}

const settingsdebugBtn = document.querySelector('#debugBtn');
settingsdebugBtn.addEventListener('click', function () {
	ipc.send('debugMode');
});

function openDialogOpenEL(){
	
    return dialog.showOpenDialogSync(
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



