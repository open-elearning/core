'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const settingslogs = document.getElementById('extensions-logs')
settingslogs.addEventListener('click',function(event){
	ipc.send('message',{key:'logs',path:'logs'})
});





