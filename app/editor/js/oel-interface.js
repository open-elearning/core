
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
	
	var ret = false;
	
	var jsonObject = require(pathTemp);

	if(typeof jsonObject !="undefined"){
		if(typeof jsonObject[0] !="undefined"){
			if(typeof jsonObject[0].pageId !="undefined"){
				ret = true;
				return jsonObject;
			}
		}
	}

	if(!ret){
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

}
