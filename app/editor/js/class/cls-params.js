
//Objets CParam
function CParam(){
	
	this.id;
	this.type;//string,integer
	this.key;
	this.value;
	
	this.getValue = function(){
		return this.value;
	}
	
}

var CParams = new Array();
var CParamsCount = 0;

function getParamsGlobal(key,typ){
	
	if(CParamExists(key)==false){
		var elem = new CParam();
		elem.id = CParamsCount;
		elem.key = key;
		elem.type = typ;
		elem.value = "";
		CParams.push(elem);
		CParamsCount = CParamsCount + 1;
	}

	return getParamByKey(key);
	
}

function getParamByKey(key){
	
	for (var i = 0; i < CParamsCount; i++){
		if(CParams[i].key==key){
			return CParams[i];
		}
	}
	return false;
	
}

function CParamExists(key){
	
	for (var i = 0; i < CParamsCount; i++){
		if(CParams[i].key==key){
			return true;
		}
	}
	return false;
	
}

