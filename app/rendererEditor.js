'use strict';

const electron = require('electron')
const shell = electron.shell
const os = require('os')
const ipc = electron.ipcRenderer
const remote = electron.remote
const dialog = remote.dialog

var btn = document.querySelector('#saveBtnProject')
btn.addEventListener('click', function (e) {
	e.preventDefault()
	ipc.send('message',{key:'save'})
})

var exportP = document.querySelector('#exportBtnProject')
exportP.addEventListener('click', function (e) {
	e.preventDefault()
	ipc.send('exports')
})

var quit = document.querySelector('#quitBtnProject')
quit.addEventListener('click', function (e) {
	e.preventDefault()
	ipc.send('message',{key:'quit'})
})


