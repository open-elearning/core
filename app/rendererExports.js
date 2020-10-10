'use strict';

const shell = require('electron').shell;
const os = require('os');
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = remote.dialog;
const nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var easyfile =  require('../libs/easyfile');

const settingscancel = document.getElementById('extensions-graphic');
settingscancel.addEventListener('click',function(event){
	
	var masterTitle = document.getElementById('inputTitleScorm').value;
	var masterScore = document.getElementById('inputmasterscore').value;
	var inputautocompleted = 0;
	
	if(document.getElementById('inputautocompleted').checked){
		inputautocompleted = 1;
	}
	
	var lms = gei("selectlms");
	
	var filepath = dialog.showSaveDialogSync({
		title: 'save package',
		filters: [{
			name: 'file',extensions: ['zip']
		}]
	});
	if(typeof filepath === "undefined") {
		filepath = '';
	}
	if(filepath!=''){
		loadProg();
		ipc.send('message',
		{
			key:'export',
			path:filepath,
			typlms:lms,
			ms:masterScore,
			acpl:inputautocompleted,
			title:masterTitle
		})
	}

});


function gei(n){

	if(document.getElementById(n)){
	
		var tagName = document.getElementById(n).tagName;
		
		if(tagName=='SELECT'){
			var get_id = document.getElementById(n);
			var resultselect = get_id.options[get_id.selectedIndex].value;
			return resultselect;
		}
		
		if(tagName=='INPUT'){
			return document.getElementById(n).value;
		}
		
		if(tagName=='TEXTAREA'){
			var ct = document.getElementById(n).value;
			ct = ct.replace('\n','<br />');
			return ct;
		}
	
	}else{
	
		return "-"
		
	}
	
}