'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const settingsEl = document.querySelector('#mod01');
settingsEl.addEventListener('click', function () {
	
	ipc.send('message',{key:'activeFile',val:'1'})
	ipc.send('ShowEditorWindow');
	
});

const settingsE2 = document.querySelector('#mod02');
settingsE2.addEventListener('click', function () {
	
	var tabl = new Array();
	tabl[0] = 'tpl-basecomics';
	ipc.send('message',{key:'openfile',val:tabl});
	ipc.send('ShowEditorWindow');
	
});
const settingsE3 = document.querySelector('#mod03');
settingsE3.addEventListener('click', function () {
	
	var tabl = new Array();
	tabl[0] = 'tpl-purple-splash';
	ipc.send('message',{key:'openfile',val:tabl});
	ipc.send('ShowEditorWindow');
	
});


const settingsReturnArrow = document.querySelector('#returnArrow');
settingsReturnArrow.addEventListener('click', function () {
	
	ipc.send('index');
	
});


