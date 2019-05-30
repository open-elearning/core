
const electron = require('electron');

const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

// Module to control application life.
const app = electron.app;

app.showExitPrompt = true;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const urlFile = "";
var easyfile;

global.appVersion = "1.3.5";

global.sharedObj = {lang:'fr',dataElectronXml:'',dataUpload:'',dataZip:'',dataVideo:'',dataFile:'',activeFile:'0',gpath:'',listassets:'',imgassets:'',activeTitle:'OPEN ELEARNING',extracode:'',activeOS:'',datascorm:''};

global.sharedScorm = {scormchamilo:'',scormmoodle:'',scormclaroline:''};

global.sharedLibs = {lcm3:'',lcm4:'',lcm5:'',lcm6:'',life:'',speech:'',bilan:'',plugin:'',basetxt:''};
global.sharedFiles = {nofile:'',allData:'',recent1:'',recent2:'',recent3:'',recent4:''};
global.plugins = {allData:'',xData:'',jsData:'',cssData:'',filesData:'',store:'',pathStore:''};
global.embeddedFiles = '';
global.listPluginsRender = '';
global.errornb = 0;
global.exitprocess = false;
global.renderprocess = false;
global.debugEditor = false;
global.fd = "\\";
global.activeOS = "";
global.editorWind;
global.editorWindReloadPlugins = 0;
global.sharedLogs = {logs:''};

let mainWindow;
let editorWindow;
let storeWindow;
let launchWindow;
let exportsWindow;
let littleErrorWindow;
let littleLogWindow;

function createWindow(){
	
	if(process.platform=='linux'){
		global.fd = "/"
		global.sharedObj.activeOS = 'linux';
	}
	
	if(process.platform=='darwin'){
		global.fd = "/"
		global.sharedObj.activeOS = 'darwin';
	}
	
	//Create the browser window.,maximize: true 496,500
	if(process.platform=='linux'||process.platform=='darwin'){
		mainWindow = new BrowserWindow({
			width: 610 + 0,
			height: 510,
			icon: __dirname + '/assets/icons/1024x1024.png',
			title: 'Open-eLearning'
		})
	}else{
		mainWindow = new BrowserWindow({
			width: 610 + 0,
			height: 510,
			icon: __dirname + '/app/images/ico64.ico',
			title: 'Open-eLearning'
		})
	}
	
	easyfile =  require('./libs/easyfile');

	var urlLaunch = path.join(__dirname, 'app/launch.html');
	var langfile = easyfile.getfWf("params") + "lang.txt";
	var fs = require('fs');
	
	if(!fs.existsSync(langfile)){
	
		urlLaunch = path.join(__dirname,'app/launchlang.html');
		
	}else{
		
		fs.readFile(langfile,function read(err, data) {
			if(err){
				throw err;
			}
			global.sharedObj.lang = data;
		});

	}
	
	mainWindow.loadURL(url.format({
		pathname:  urlLaunch,
		protocol: 'file:',
		slashes: true
	}));


	global.sharedFiles.allData = new Array();

	mainWindow.setMenu(null);
	
	console.log('Open elearning Start : ' + process.platform)
	
	mainWindow.on('closed', function () {
		killWindows();
	});
	
	setTimeout(function(){
		easyfile.init(global.appVersion);
	},200);
	setTimeout(function(){
		initLaunch();
	},3000);
}

function initLaunch(){
	
	createWindowEditor();
	createWindowLaunch();

	initRecent();
	
	setTimeout(function(){
		var controls =  require('./libs/controls');
		controls.exec('',{key:'refreshimgs'});
	},1000);
	
}

function initRecent(){

	var recent1 = easyfile.getfWf("params") + "recent1.txt";
	var recent2 = easyfile.getfWf("params") + "recent2.txt";
	var recent3 = easyfile.getfWf("params") + "recent3.txt";
	var recent4 = easyfile.getfWf("params") + "recent4.txt";
	
	var fs = require('fs');
	if(fs.existsSync(recent1)){
		fs.readFile(recent1,function read(err, data) {
			if(err){throw err;}
				if(typeof data !== 'string'){
					data = data.toString('utf8');
				}
			global.sharedFiles.recent1 = data;
			
			if(!fs.existsSync(global.sharedFiles.recent1)){
				global.sharedFiles.recent1 = "";
			}

		});
	}
	if(fs.existsSync(recent2)){
		fs.readFile(recent2,function read(err, data) {
			if(err){throw err;}
				if(typeof data !== 'string'){
					data = data.toString('utf8');
				}
			global.sharedFiles.recent2 = data;

			if(!fs.existsSync(global.sharedFiles.recent2)){
				global.sharedFiles.recent2 = "";
			}

		});
	}
	if(fs.existsSync(recent3)){
		fs.readFile(recent3,function read(err, data) {
			if(err){throw err;}
				if(typeof data !== 'string'){
					data = data.toString('utf8');
				}
			global.sharedFiles.recent3 = data;

			if(!fs.existsSync(global.sharedFiles.recent3)){
				global.sharedFiles.recent3 = "";
			}

		});
	}
	if(fs.existsSync(recent4)){
		fs.readFile(recent4,function read(err, data) {
			if(err){throw err;}
				if(typeof data !== 'string'){
					data = data.toString('utf8');
				}
			global.sharedFiles.recent4 = data;

			if(!fs.existsSync(global.sharedFiles.recent4)){
				global.sharedFiles.recent4 = "";
			}

		});
	}
	
}

function showWind(objw){
	
	if(!global.exitprocess){
		try {
			if(objw){
				objw.show();
			}
		}catch(e){
			console.log('showWind !')
		}
	}
	
}

function closeWind(objw){
	
	if(!global.exitprocess){
		try {
			if(objw){
				objw.close()
			}
		}catch(e){
			console.log('closeWind !')
		}
	}

}

function hideWind(objw){
	
	if(!global.exitprocess){
		try {
			if(objw){
				objw.hide()
			}
		}catch(e){
			console.log('hideWind !')
		}
	}
}

function maximizeWind(objw){
	
	if(!global.exitprocess){
		
		if(process.platform=='darwin'){
			showWind(objw);
		}
		
		try {
			if(objw){
				objw.maximize();
			}
		}catch(e){
			console.log('showWind !')
		}
	}
	
}

function createWindowEditor(){
	
	if(global.exitprocess){return false;}
	
	if(process.platform=='linux'||process.platform=='darwin'){
		editorWindow = new BrowserWindow({
			width: 1080,
			height: 800,
			icon: __dirname + '/assets/icons/1024x1024.png',
			show: false
		});
	}else{
		editorWindow = new BrowserWindow({
			width: 1080,
			height: 800,
			icon: __dirname + '/app/images/ico64.ico',
			show: false
		});
	}
	
	editorWindow.loadURL(url.format({
		pathname:  path.join(__dirname, 'app/editor.html'),
		protocol: 'file:',
		slashes: true
	}))

	app.showExitPrompt = true;

	editorWindow.on('close', (e) => {
		if (app.showExitPrompt) {
			e.preventDefault() // Prevents the window from closing 
			dialog.showMessageBox({
				type: 'question',
				buttons: ['Yes', 'No'],
				title: 'Confirm',
				message: 'Unsaved data will be lost. Are you sure you want to quit?'
			}, function (response) {
				if (response === 0) {
					app.showExitPrompt = false;
					showWind(mainWindow);
					closeWind(mainWindow);
				}
			})
		}else{
			showWind(mainWindow);
			closeWind(mainWindow);
		}
	})

	editorWindow.on('closed',function(){
		//showWind(mainWindow);
		//closeWind(mainWindow);
	})
	
	if(global.debugEditor){
		
	}else{
		editorWindow.setMenu(null);
	}
	global.editorWind = editorWindow;
}

function createStoreWindow(){
	
	if(global.exitprocess){return false;}
	
	if(process.platform=='linux'||process.platform=='darwin'){
		storeWindow = new BrowserWindow({
			width: 810, height: 800,
			icon: __dirname + '/assets/icons/1024x1024.png',
			show: false
		});
	}else{
		storeWindow = new BrowserWindow({
			width: 810, height: 800,
			icon: __dirname + '/app/images/ico64.ico',
			show: false
		});
	}
	
	storeWindow.loadURL(url.format({
		pathname:  path.join(__dirname, 'app/editStore.html'),
		protocol: 'file:',
		slashes: true
	}));
	
	storeWindow.setMenu(null);
	
	if(global.debugEditor){
		storeWindow.webContents.openDevTools();
	}
	
	storeWindow.on('closed',function(){

		easyfile.listOfPluginsX();
		setTimeout(function(){
			global.editorWindReloadPlugins = 1;
		},5000);
	});
	
}

function createWindowLaunch(){
	
	if(global.exitprocess){return false;}
	
	if(process.platform=='linux'||process.platform=='darwin'){
		launchWindow = new BrowserWindow({
			width: 1300, height: 810,
			icon: __dirname + '/assets/icons/1024x1024.png',
			show: false
		});
	}else{
		launchWindow = new BrowserWindow({
			width: 1300, height: 810,
			icon: __dirname + '/app/images/ico64.ico',
			show: false
		});
	}
	
	launchWindow.loadURL(url.format({
		pathname:  path.join(__dirname,'app/launchoverview/index.html'),
		protocol: 'file:',
		slashes: true
	}));
	
	if(global.debugEditor){
		
	}else{
		launchWindow.setMenu(null);
	}
	
	launchWindow.on('closed',function(){
		showWind(editorWindow)
		createWindowLaunch()
	});
	
	//launchWindow.webContents.openDevTools();
	
}

ipcMain.on('ShowModelsWindow',() => {
	
	if(global.exitprocess){return false;}
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/launchmodel.html'),
		protocol: 'file:',
		slashes : true
	}))
	
})

global.cwle = function createWindowLittleError(){
	
	if(global.exitprocess){return false;}
	
	if(process.platform=='linux'||process.platform=='darwin'){
		littleErrorWindow = new BrowserWindow({
			width: 610,
			height: 510,
			icon: __dirname + '/assets/icons/1024x1024.png',
			show: true
		});
	}else{
		littleErrorWindow = new BrowserWindow({
			width: 610,
			height: 510,
			icon: __dirname + '/app/images/ico64.ico',
			show: true
		});
	}
	
	littleErrorWindow.loadURL(url.format({
		pathname:  path.join(__dirname,'app/crash.html'),
		protocol: 'file:',
		slashes: true
	}));
	
	littleErrorWindow.setMenu(null);
	
	littleErrorWindow.on('closed',function(){});
	
}

function createWindowLogsError(){
	
	if(global.exitprocess){return false;}
	
	if(process.platform=='linux'||process.platform=='darwin'){
		littleLogWindow = new BrowserWindow({
			width: 610,
			height: 510,
			icon: __dirname + '/assets/icons/1024x1024.png',
			show: true
		});
	}else{
		littleLogWindow = new BrowserWindow({
			width: 610,
			height: 510,
			icon: __dirname + '/app/images/ico64.ico',
			show: true
		});
	}
	
	littleLogWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/detailLogs.html'),
		protocol: 'file:',
		slashes: true
	}));
	
	littleLogWindow.setMenu(null);
	
	littleLogWindow.on('closed',function(){});
	
	showWind(littleLogWindow);

}

ipcMain.on('littleError',() => {
	if(global.exitprocess){return false;}
	createWindowLittleError()
})

ipcMain.on('ShowEditorWindow',() => {
	
	if(global.exitprocess){return false;}
	
	maximizeWind(editorWindow)
	//editorWindow.webContents.openDevTools();
	mainWindow.hide()
})

ipcMain.on('message',function(event,data){
	
	var controls =  require('./libs/controls');
	console.log("send:" + data.key);
	
	if(data.key=='quit'){
		editorWindow.hide();
		closeWind(mainWindow);
	}
	
	controls.exec(event,data);
	
	if(data.key=='lang'){
		
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'app/launch.html'),
			protocol: 'file:',
			slashes : true
		}))
		
	}
	
	if(data.key=='launch'){
		
		var pn = path.join(__dirname, 'app/launchOverview/index.html');
		pn = path.join(easyfile.getfWf("finalHtml") + 'index.html');
		/*
		const {shell} = require('electron');
		shell.openExternal(pn);
		myConsole.log(pn)
		*/
		
		launchWindow.loadURL(url.format({
			pathname: pn,
			protocol: 'file:',
			slashes : true
		}))
		
		showWind(launchWindow);
		//launchWindow.maximize();
		//launchWindow.webContents.openDevTools();
		
	}
	
	if(data.key=='logs'){
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'app/detailLogs.html'),
			protocol: 'file:',
			slashes : true
		}))
	}
	
	if(data.key=='store'){
		global.editorWindReloadPlugins = 0;
		createStoreWindow();
		showWind(storeWindow);
	}
	
	if(data.key=='logsopt'){
		createWindowLogsError();
	}
	
});

ipcMain.on('changlang',function(event,data){
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/launchlang.html'),
		protocol: 'file:',
		slashes : true
	}))
	
});

ipcMain.on('extensions',function(event,data){
	
	if(global.exitprocess){return false;}
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/extensions.html'),
		protocol: 'file:',
		slashes : true
	}))
});

ipcMain.on('debugMode',function(event,data){
	
	global.debugEditor = true;

});

ipcMain.on('editextensions',function(event,data){
	
	if(global.exitprocess){return false;}
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/editextensions.html'),
		protocol: 'file:',
		slashes : true
	}))
	
});

ipcMain.on('index',function(event,data){
	
	if(global.exitprocess){return false;}
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/launch.html'),
		protocol: 'file:',
		slashes : true
	}))
});

ipcMain.on('exports',function(event,data){
	
	exportsWindow = new BrowserWindow({
		width: 610,
		height: 510,
		icon: __dirname + '/app/images/ico64.ico',
		title: 'Open eLearning'
	})
	
	exportsWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/export.html'),
		protocol: 'file:',
		slashes : true
	}))
	
	exportsWindow.setMenu(null);
	//exportsWindow.webContents.openDevTools();
	showWind(exportsWindow);
	
});

app.on('ready',createWindow)

app.on('window-all-closed', function(){
	if(global.exitprocess){return false;}
	killWindows();
})

function killWindows(){
	global.exitprocess = true;
	try {
		app.quit();
	}catch(e){
		console.log('showWind !')
	}
}

app.on('activate', function () {
	if(global.exitprocess){return false;}
	if(mainWindow === null) {
		createWindow();
	}
})


