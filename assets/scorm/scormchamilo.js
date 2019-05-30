/* SCORM API LMS PERFECT */

var QueueInteractions = new Array();
var QueueInteractions_count=0;
var LimitExecute=0;
var completedMasteryScore=true;
var progressByScore=true;
var finalMasteryScore=100;
var LastScore = -1;
var LimitInteraction='';
var TotalExecute = -1;

function QueueInteraction(){
	
	this.idnum;
	this.n;
	this.id;
	this.type;
	this.latency;
	this.result;
	this.answers;
	this.description;
	this.correctAnswer;
	this.isProcess;
	
	this.processQueue=function(){
		ScormInteractionChamilo(this.n,this.id,this.type,this.latency,this.result,this.answers,this.description,this.correctAnswer);
		this.isProcess = true;
	}
	
}

function QueueInteractions_Add(n,id,type,latency,result,answers,description,correctAnswer){
	
	Elem = new QueueInteraction();
	Elem.n = n;
	Elem.id = id;
	Elem.type = type;
	Elem.latency = latency;
	Elem.result = result;
	Elem.answers = answers;
	Elem.description = description;
	Elem.correctAnswer = correctAnswer;
	Elem.isProcess = false;
	Elem.idnum = QueueInteractions_count;
	QueueInteractions.push(Elem);
	QueueInteractions_count = QueueInteractions_count +1;
}

function QueueInteractionsExist(id){
	
	for(var i=0; i < QueueInteractions_count; i++){
		if(QueueInteractions[i].id==id){
			return true;
		}
	}
	return false;
}

function QueueInteractionsMaj(id,answers){
	
	for(var i=0; i < QueueInteractions_count; i++){
		if(QueueInteractions[i].id==id){
			QueueInteractions[i].answers = answers;
		}
	}

}

function QueueInteractionsProcessAll(){
	
	var t = 250;
	for(var i=0; i < QueueInteractions_count; i++){
		setTimeout("QueueInteractionsProcessOne(" + i + ");", t);
		t = t + 250;
	}
	t = t + 250;
	setTimeout("QueueInteractionsisProcess();", t);
	
}

function QueueInteractionsisProcess(){
	
	for(var i=0; i < QueueInteractions_count; i++){
		if(QueueInteractions[i].isProcess==false){
			setTimeout("QueueInteractionsisProcess();", 1000);
			return false;
		}
	}
			
	if (typeof(API.LMSCommit) != "undefined") {
		API.LMSCommit('');
	}
	InteractionsSubmitted = true;
	CheckLMSFinishFinal();
	return true;
}	

function QueueInteractionsProcessOne(i){
	
	if(QueueInteractions[i].isProcess==false){QueueInteractions[i].processQueue();}
	
}

var autoFinishScore = true;
var sendInteractionsScorm = true;

var API = null;
var callAPI = 0;

//Log Console
function logconsole(msg){

	if (typeof console === "undefined" || typeof console.log === "undefined"){
		
	}else{
		console.log(msg)
	}

}

/* Check SCORM API or AlterScorm */
function findAPI(win){

	callAPI = callAPI + 1;

	try{

		if (typeof(win.API_1484_11) != "undefined") {
			if(win.API_1484_11!=null){
				API = win.API_1484_11;
				logconsole("FIND win.API_1484_11");
				return true;
			}
		}
		
		while ((win.API_1484_11 == null) && (win.parent != null) && (win.parent != win) && callAPI<10)
		{
			
			var alterwin = win.parent;
			
			if (typeof(alterwin.API_1484_11) != "undefined") {
				if(alterwin.API_1484_11!=null){
					API = alterwin.API_1484_11;
					logconsole("FIND win.API_1484_11");
					return true;
				}
			}
			
			callAPI = callAPI + 1;

		}
		
		callAPI = 0;
		
		while ((win.API == null) && (win.parent != null) && (win.parent != win) && callAPI<10)
		{
			win = win.parent;
			logconsole("win = win.parent");

			callAPI = callAPI + 1;

		}
		
		API = win.API;
		
	}catch(exception){
		
		logconsole("findAPI error");
		return false;
		
	}

}

/* initialize the SCORM API */
function initAPI(win){
	
	logconsole("initAPI start");
	
	try{

		/* look for the SCORM API up in the frameset */
		findAPI(win);
		
		/* if we still have not found the API, look at the opener and its frameset */
		if ((API == null) && (win.opener != null))
		{
			findAPI(win.opener);
		}
		
		logconsole("initAPI end");
		
		getTotalExecute();
		
	}catch(exception){

		logconsole("findAPI error");
		return false;

	}

}

var ScormSubmitted = false; //use this to check whether LMSFinish has been called later.
var InteractionsSubmitted = false; //use this to check whether LMSFinish has been called later.

function getParamValueScormControler(param){
	var u = window.top.location.href;var reg=new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches=u.match(reg);
	if(matches==null){return '';}
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	return vari;
}

function ScormStartCom(){

	ScormStartComProcess();
	
}

function ScormStartComProcess(){
	
	initAPI(window);
	
	if (API != null){
		
		var initOk = false;
		
		//SCORM 1.2
		if (typeof(API.LMSInitialize) != "undefined") {
			API.LMSInitialize(''); 
						  
			API.LMSSetValue('cmi.core.lesson_status', 'incomplete');
			API.LMSSetValue('cmi.core.score.min', 0);
			API.LMSSetValue('cmi.core.score.max', 100);
			API.LMSCommit('');
			logconsole("Initialize SCORM 1.2");
			initFinishScore();
		}

	}
	
}

function ScormInteractionCom(n,id,type,latency,result,answers,description,correctAnswer){
	
	if(id!=''){
		
		if(LimitInteraction.indexOf(id)!=-1||LimitInteraction==''){
			
			correctAnswer =  "P" + LUDI.getNumPage() + '|' + stripAnswers(correctAnswer);
			answers =  "P" + LUDI.getNumPage() + '|' + stripAnswers(answers);
			
			if(QueueInteractionsExist(id)){
				QueueInteractionsMaj(id,answers);
			}else{
				QueueInteractions_Add(n,id,type,latency,result,answers,description,correctAnswer);
			}

		}
			
	}
}

function stripAnswers(html){
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function ScormInteractionChamilo(n,id,type,latency,result,answers,description,correctAnswer){
	
	if(sendInteractionsScorm){
		
		//n : oe transmet le numÃ©ro de l'interaction
		//id : oe transmet une serie de donnes pour cette chaÃ®ne afin d'identifier la question
		//type : Type de question : qcm tcm drop etc
		//latency : Temps de reponse
		//result : Indique si l'utilisateur a rÃ©pondu correctement Ã  la question ou non.
		//answers : reponse de l'apprenant
		if (API != null){
			
			if (API){
				
				if(type=='qcm'||type=='qcmunique'||type=='choice'){
					type='choice';
				}else{
					type='performance';
				}
				
				type='choice';
				
				var FormatAnswersScorm = answers;
				FormatAnswersScorm = FormatAnswersScorm.replace("<strike>","");
				FormatAnswersScorm = FormatAnswersScorm.replace("</strike>","");
				if (FormatAnswersScorm.length > 250){
					FormatAnswersScorm = FormatAnswersScorm.substr(0, 250);
				}
				
				var FormatcorrectAnswer = correctAnswer;
				FormatcorrectAnswer = escapeSco(FormatcorrectAnswer);
				if (FormatcorrectAnswer.length > 150){
					FormatcorrectAnswer = FormatcorrectAnswer.substr(0, 150);
				}
				
				if (typeof(API.LMSSetValue) != "undefined") {

				
					API.LMSSetValue('interactions',"true");
				
					API.LMSSetValue('cmi.objectives.' + n + '.id', id);
					API.LMSSetValue('cmi.interactions.' + n + ".objectives.0.id", id ); 					
					API.LMSSetValue('cmi.objectives.' + n + '.status', API.LMSGetValue('cmi.core.lesson_status'));
					API.LMSSetValue('cmi.objectives.' + n + '.score.min', '0');
					API.LMSSetValue('cmi.objectives.' + n + '.score.max', '100');
					
					if(result){
						API.LMSSetValue('cmi.objectives.' + n + '.score.raw', '100');
					}else{
						API.LMSSetValue('cmi.objectives.' + n + '.score.raw', '0');
					}
						
					
					
					API.LMSSetValue('cmi.interactions.' + n + '.id', id)
					API.LMSSetValue('cmi.interactions.' + n + '.type', type);
					API.LMSSetValue('cmi.interactions.' + n + '.latency', latency);

					if(result){
						API.SetValue('cmi.interactions.' + n + '.result', 'correct');
					}else{
						API.SetValue('cmi.interactions.' + n + '.result', 'incorrect');
					}
					
					API.LMSSetValue('cmi.interactions.' + n + '.student_response', FormatAnswersScorm);
					API.LMSSetValue('cmi.interactions.' + n + '.student_response_text', FormatAnswersScorm);
					API.LMSSetValue('cmi.interactions.' + n + '.description', description);
					API.LMSSetValue('cmi.interactions.' + n + '.weighting', '1');
					
					if (FormatcorrectAnswer != undefined && FormatcorrectAnswer != null && FormatcorrectAnswer != ""){
						API.LMSSetValue("cmi.interactions." + n + ".correct_responses", FormatcorrectAnswer);
					}else{
						API.LMSSetValue("cmi.interactions." + n + ".correct_responses", '?');
					}
	 
													
	 
																																													 

	 
				}
				
				
			}
		}
	
	}
	
}

function sendLMSFinish(){
	
	if('function'==typeof(CheckLMSFinish)){
		ScormSubmitted = false;
		globalCompteurDecompt = false;
		CheckLMSFinish();
		$("#main").animate({marginTop : "-750px",height:"100px",opacity: 0},1500);
	}
	
}

function CheckLMSFinish(){
	
	if (API != null){
		if (ScormSubmitted == false){
			
			TotalExecute = TotalExecute + 1;
			extraFinishScore(100);
			
			setTimeout(function(){
				miniScormMessage();
				QueueInteractionsProcessAll();
			},
			500);
			
		}
	}
}

function miniScormMessage(){
	
	if(!gebi("scormmessage")){
		var h = '<div id="scormmessage" ';
		h += 'style="position:absolute;left:0px;top:0px;background-color:white;padding:4px;z-index:25;" >';
		h += 'Sauvegarde des données ...</div>';
		$("#main").append(h);
	}
	
	setTimeout("$(\"#scormmessage\").fadeOut();", 2000);
	
}

function CheckLMSFinishFinal(){
	
	if (ScormSubmitted == false&&InteractionsSubmitted){
		
		var cpl = 'completed';
		
		if(completedMasteryScore){
			if(LastScore<finalMasteryScore){
				cpl = 'incomplete';
			}
		}
		
		if (typeof(API.LMSSetValue)!= "undefined"){
			API.LMSSetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
			API.LMSSetValue('cmi.core.lesson_status',cpl);

			API.LMSCommit('');
		}
		
		if (typeof(API.LMSCommit) != "undefined") {
			API.LMSCommit('');
		}
		if (typeof(API.LMSFinish) != "undefined") {
			API.LMSFinish('');
		}
		
		ScormSubmitted = true;
		globalCompteurDecompt = false;
		
		if(progressByScore){
			if(parent.update_progress_bar){
				parent.update_progress_bar(LastScore, '100', '%');
			}
		}
		
	}	

}

/* Extra Scorm */

function extraFinishScore(itime){
	
	if(progressByScore){
		progressByScoreScorm(LastScore);
		parent.update_progress_bar(LastScore, '100', '%');
	}
	itime = itime + 1500;
	setTimeout(function(){extraFinishScore(itime);}, itime);
}

function initFinishScore(){
	if(progressByScore){
		parent.update_progress_bar('0', '100', '%');
	}
}

function archivesInteractionsScorm(){
	
	for(var i=0; i < QueueInteractions_count; i++){
		
		var lk = '../../../../../plugin/reporting_interactions_archives/ajax.arch.php?';
		var inte = QueueInteractions[i];
		var sessionid = getParamValueScormControler("id_session");
		var lpid = getParamValueScormControler("lp_id");
		
		$.ajax({
			url: lk + "interactionid=" + inte.id + "&studentresponse=" + inte.answers + "&sessionid=" + sessionid + "&lpid=" + lpid
		}).done(function(){
			logconsole("Stck Scorm:" + inte.id);
		});
		
	}
	
}

function progressByScoreScorm(score){
	
	if(progressByScore){
		
		if(typeof(score)!="undefined"){
			
			var lk = '../../../../../plugin/scorm_progress_by_score/ajax.progressbyscore.php?';
			var sessionid = getParamValueScormControler("id_session");
			var lpid = getParamValueScormControler("lp_id");
			
			if(isNaN(TotalExecute)){
				TotalExecute = 1;
			}
			if(TotalExecute=='NaN'){
				TotalExecute = 1;
			}
			
			$.ajax({
				url: lk + "score=" + score + "&sessionid=" + sessionid + "&lpid=" + lpid + "&te=" + TotalExecute
			}).done(function(){	
				logconsole("progressByScoreScorm ok");
			});
			
		}
		
	}
	
}

function getTotalExecute(){
	
	if(LimitExecute>0&&TotalExecute==-1){
		
		var lk = '../../../../../plugin/scorm_progress_by_score/ajax.gettotalexecute.php?';
		var sessionid = getParamValueScormControler("id_session");
		var lpid = getParamValueScormControler("lp_id");
		
		$.ajax({
			url: lk + "sessionid=" + sessionid + "&lpid=" + lpid
		}).done(function(data){
			TotalExecute = parseInt(data);
			if(TotalExecute==LimitExecute||TotalExecute>LimitExecute){
				scormFullAttemps();
			}
		});
		
	}
	
}

function scormFullAttemps(){
	
	if(!gebi("scormMessageAttemps")){
		var h = '<div id="scormMessageAttemps" ';
		h += 'style="position:absolute;left:0px;top:0px;right:0px;bottom:0px;text-align:center;background-color:white;z-index:25;" >';
		h += '<br><br>Nombre de tentatives dépassées...<br><br>';
		h += '<img src="data:image/png;base64,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" />';
		h += '</div>';
		$("#main").append(h);
	}
	if(lastPage0>0){
		LUDI.goPage(0);
	}
	setTimeout(function(){scormFullAttemps();},500);
	
}

/* Extra Scorm */

var MemUserN = '';

function CheckLMSLearnerName(){
	
	var userN = '';
	
	if(MemUserN!=''){
		return MemUserN;
	}
	
	//SCORM 2004
	if (API != null){
		if (typeof(API.data)!="undefined"){
			if (typeof(API.data.learner_name)!="undefined"){
				userN = API.data.learner_name;
			}
		}
		if(userN==''){
			if (typeof(API.LMSGetValue)!="undefined"){
				userN = API.LMSGetValue("cmi.core.student_name") ;
			}
		}
		if(userN==''){
			if (typeof(API.LMSGetValue)!="undefined"){
				userN = API.LMSGetValue("cmi.student_name");
			}
		}
		if(userN==''){
			if (typeof(API.LMSGetValue)!="undefined"){
				userN = API.LMSGetValue("cmi.core.student_id");
			}
		}
	}
	MemUserN = userN;
	return MemUserN;

}

function SetScormIncomplete(){
	
	if (ScormSubmitted == true){
		return;
	}
	SetScormScore();
	if (API != null){
		//SCORM 1.2
		if (typeof(API.LMSSetValue) != "undefined") {
			API.LMSSetValue('cmi.core.lesson_status', 'incomplete');
			API.LMSSetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
			API.LMSCommit('');
		}

	}
}

var isScormFinish = false;

function SetScormComplete(){
	
	logconsole("SetScormComplete");
	
	if(isScormFinish==false){
		
		if (API != null){
			
			//SCORM 1.2
			if (typeof(API.LMSSetValue) != "undefined") {

				SetScormScore();
				if(autoFinishScore){
					CheckLMSFinish();
					API.LMSFinish('');
					isScormFinish = true;
				}
				
			}else{
				
				//SCORM 2004
				if (typeof(API.Terminate) != "undefined") {
					SetScormScore();
					if(autoFinishScore){
						CheckLMSFinish();
						isScormFinish = true;
					}

				}
				
				
			}
			


		}

	}

}

function ScormProgressSave(){
	
	if(typeof(API.LMSSetValue)!="undefined"){
		
		try{
			API.LMSSetValue('cmi.core.lesson_location',lastPage0);
			API.LMSCommit('');
		}catch(exception){
			
		}
		
	}
	
	setTimeout(function(){
		ScormProgressSave(true);
	},280000);
	
}

setTimeout(function(){
	ScormProgressSave(true);
},280000);

var ScormStartTime = (new Date()).getTime();
var SuspendData = '';

function SetScormTimedOut(){
	if (API != null){
		if (ScormSubmitted == false){
			
			//SCORM 1.2
			if (typeof(API.LMSSetValue) != "undefined") {
				SetScormScore();
				API.LMSSetValue('cmi.core.exit', 'time-out'); 
				API.LMSCommit('');
				CheckLMSFinish();
			}
			
		}
	}
}

function SetScormComments(m){
	if (API != null){
		if (ScormSubmitted == false){

			//SCORM 1.2
			if (typeof(API.LMSSetValue) != "undefined") {
				API.LMSSetValue('cmi.comments', m); 
			}

		}
	}
} 

//TIME RENDERING FUNCTION
function MillisecondsToTime(Seconds){
	Seconds = Math.round(Seconds/1000);
	var S = Seconds % 60;
	Seconds -= S;
	if (S < 10){S = '0' + S;}
	var M = (Seconds / 60) % 60;
	if (M < 10){M = '0' + M;}
	var H = Math.floor(Seconds / 3600);
	if (H < 10){H = '0' + H;}
	return H + ':' + M + ':' + S;
}

//TIME RENDERING FUNCTION
function MillisecondsToTime2004(Seconds){
	Seconds = Math.round(Seconds/1000);
	var S = Seconds % 60;
	Seconds -= S;
	if (S < 10){S = '0' + S;}
	var M = (Seconds / 60) % 60;
	if (M < 10){M = '0' + M;}
	var H = Math.floor(Seconds / 3600);
	if (H < 10){H = '0' + H;}
	return 'PT' + H + 'H' + M + 'M' + S + 'S';
}

//ISO Date String
function ISODateString(d) {
    function pad(n) {return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
         + pad(d.getUTCMonth()+1)+'-'
         + pad(d.getUTCDate())+'T'
         + pad(d.getUTCHours())+':'
         + pad(d.getUTCMinutes())+':'
         + pad(d.getUTCSeconds())+'Z'
}

//SetScormScore
function SetScormScore(score){
	
	if(typeof(score) != "undefined"){
		
		if (score != null){
			if (API != null){
				
				LastScore = score;
				//SCORM 1.2
				if (typeof(API.LMSSetValue) != "undefined") {
					API.LMSSetValue('cmi.core.score.raw', score);
				}
				
			}
			logconsole("SetScormScore " + score);
		}
		
	}
	
}

function escapeSco(unsafe){
	
	unsafe = unsafe.toLowerCase();
	unsafe = unsafe.replace(/,/g, "virgulebase")
	unsafe = unsafe.replace(/[^a-zA-Z0-9]/g,'-');
	unsafe = unsafe.replace(/virgulebase/g, ",")
	return unsafe;
	
}

