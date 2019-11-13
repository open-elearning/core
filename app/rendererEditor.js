'use strict';

const electron = require('electron');
const shell = electron.shell;
const os = require('os');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const dialog = remote.dialog;

var btn = document.querySelector('#saveBtnProject');
btn.addEventListener('click', function (e) {
	e.preventDefault();
	ipc.send('message',{key:'save'});
})

var exportP = document.querySelector('#exportBtnProject');
exportP.addEventListener('click', function (e) {
	e.preventDefault();
	ipc.send('exports');
})

//SCORM
/*
var exportL = document.querySelector('#exportBtnProjectLink');
exportL.addEventListener('click', function (e) {
	e.preventDefault();
	ipc.send('exports');
})
*/

var exportPH = document.querySelector('#exportBtnProjectHtml');
exportPH.addEventListener('click', function(e){
	
	e.preventDefault();

	setTimeout(function(){
		ipc.send('message',{key:'exportlocal'});
	},5000);

})

var quit = document.querySelector('#quitBtnProject');
quit.addEventListener('click', function (e) {
	e.preventDefault();
	ipc.send('message',{key:'quit'});
})


