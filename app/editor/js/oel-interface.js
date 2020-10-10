
function loadLocalJSON(name){
	
	var remote = require('electron').remote;
	var gPath = remote.getGlobal('sharedObj').gpath;
	var pathTemp = gPath;
	var actos = haveActiveOS();
	if(actos=='linux'||actos=='darwin'){
		pathTemp = pathTemp + '/openelearning/extract/';
	}else{
		pathTemp = pathTemp + '\\openelearning\\extract\\';
	}
	pathTemp = pathTemp + name;
	
	var jsonObject = require(pathTemp);
	
	if(typeof jsonObject ==="undefined"){
		return JSON.parse('{}');
	}else{
		if(typeof jsonObject._data ==="undefined"){
			return JSON.parse('{}');
		}else{	
			return JSON.parse(jsonObject._data);
		}
	}
	
}
