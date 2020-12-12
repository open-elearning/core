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
	tabl[0] = 'tpl-world-learning';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
	
});
const settingsE3 = document.querySelector('#mod03');
settingsE3.addEventListener('click', function () {
	
	var tabl = new Array();
	tabl[0] = 'tpl-prof-fox';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
	
});
const settingsE4 = document.querySelector('#mod04');
settingsE4.addEventListener('click', function () {
	
	var tabl = new Array();
	tabl[0] = 'tpl-gameboard';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
	
});

const settingsReturnArrow = document.querySelector('#returnHouse');
settingsReturnArrow.addEventListener('click', function () {
	
	ipc.send('index');
	
});
