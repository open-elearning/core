'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const settingsE1 = document.querySelector('#tpl01');
settingsE1.addEventListener('click', function () {	
	var tabl = new Array();
	tabl[0] = 'pre-welcome-campus';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
});

const settingsE2 = document.querySelector('#tpl02');
settingsE2.addEventListener('click', function () {	
	var tabl = new Array();
	tabl[0] = 'pre-quizacademy';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
});

const settingsE3 = document.querySelector('#tpl03');
settingsE3.addEventListener('click', function () {	
	var tabl = new Array();
	tabl[0] = 'pre-newcomers';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
});

const settingsE4 = document.querySelector('#tpl04');
settingsE4.addEventListener('click', function () {	
	var tabl = new Array();
	tabl[0] = 'pre-littleguy';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
});

const settingsE5 = document.querySelector('#tpl05');
settingsE5.addEventListener('click', function () {	
	var tabl = new Array();
	tabl[0] = 'pre-proelearning';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
});

const settingsE6 = document.querySelector('#tpl06');
settingsE6.addEventListener('click', function () {	
	var tabl = new Array();
	tabl[0] = 'pre-corporate1';
	ipc.send('message',{key:'openfile',val:tabl,tpl:true});
	ipc.send('ShowEditorWindow');
});

const settingsReturnArrow = document.querySelector('#returnHouse');
settingsReturnArrow.addEventListener('click', function () {
	ipc.send('index');
});