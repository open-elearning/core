'use strict';

const shell = require('electron').shell
const os = require('os')
const ipc = require('electron').ipcRenderer
const remote = require('electron').remote
const dialog = remote.dialog

const settde = document.querySelector('#lang-de');
settde.addEventListener('click', function () {
	ipc.send('message',{key:'lang',val:'de'})
});

const settfr = document.querySelector('#lang-fr');
settfr.addEventListener('click', function () {
	ipc.send('message',{key:'lang',val:'fr'})
});

const setten = document.querySelector('#lang-en');
setten.addEventListener('click', function () {
	ipc.send('message',{key:'lang',val:'en'})
});

const settes = document.querySelector('#lang-es');
settes.addEventListener('click', function () {
	ipc.send('message',{key:'lang',val:'es'})
});

const settIT = document.querySelector('#lang-it');
settIT.addEventListener('click', function () {
	ipc.send('message',{key:'lang',val:'it'})
});

const settNE = document.querySelector('#lang-ne');
settNE.addEventListener('click', function () {
	ipc.send('message',{key:'lang',val:'ne'})
});

const settPO = document.querySelector('#lang-po');
settPO.addEventListener('click', function () {
	ipc.send('message',{key:'lang',val:'po'})
});