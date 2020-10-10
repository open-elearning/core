
//SCORM RECUP
function AlterScorm() {
	
	this.min = 0;
	this.max = 0;
	this.score = 0;
	
    this.LMSInitialize = function(i) {
    
	};
	
	this.LMSSetValue = function(k,v) {
	
		if(k=='cmi.core.score.raw'){
			this.score = parseInt(v);
		}
		
		if(k=='cmi.core.score.min'){
			this.min = parseInt(v);
		}
		
		if(k=='cmi.core.score.max'){
			this.max = parseInt(v);
		}
		
	};
	
	this.LMSCommit = function() {
    
	};
	
	this.LMSFinish = function() {
		
		
		alert(this.score + '/' + this.max);
		
	};
	this.LMSGetValue = function() {
	};
	this.LMSGetLastError = function() {
	};
	this.LMSGetErrorString = function() {
	};
	this.LMSGetDiagnostic = function() {
	};

}

