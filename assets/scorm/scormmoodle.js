
/* DUAL SCORM API 1.2 & 2004 MOO CLA */

var API = null; 

//Log Console
function logconsole(msg){

	if (typeof console === "undefined" || typeof console.log === "undefined"){

	}else{
		console.log(msg)
	}

}

/* Check SCORM API or AlterScorm */
function findAPI(win){

	try{

		if (typeof(win.API_1484_11) != "undefined") {
			if(win.API_1484_11!=null){
				API = win.API_1484_11;
				logconsole("FIND win.API_1484_11");
				return true;
			}
		}

		while ((win.API_1484_11 == null) && (win.parent != null) && (win.parent != win))
		{

			var alterwin = win.parent;

			if (typeof(alterwin.API_1484_11) != "undefined") {

				if(alterwin.API_1484_11!=null){

					API = alterwin.API_1484_11;
					logconsole("FIND win.API_1484_11");
					return true;

				}

			}

		}

		while ((win.API == null) && (win.parent != null) && (win.parent != win))
		{
			win = win.parent;
			logconsole("win = win.parent");
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

	}catch(exception){

		logconsole("findAPI error");
		return false;
		
	}



}

var ScormSubmitted = false; //use this to check whether LMSFinish has been called later.
 
function ScormStartCom(){

	initAPI(window);

	if (API != null){


		//SCORM 1.2
		if (typeof(API.LMSInitialize) != "undefined") {

			API.LMSInitialize(''); 
			API.LMSSetValue('cmi.core.lesson_status', 'browsed');
			API.LMSSetValue('cmi.core.score.min', 0);
			API.LMSSetValue('cmi.core.score.max', 100);
			API.LMSCommit('');

		}

		//SCORM 2004

		if (typeof(API.Initialize) != "undefined") {

			var r = API.Initialize('');

			if(r==true||r=='true'){

				API.SetValue('cmi.core.lesson_status', 'browsed');
				API.SetValue('cmi.core.score.min', 0);
				API.SetValue('cmi.core.score.max', 100);
				API.Commit('');
				API.SetValue('cmi.lesson_status', 'browsed');
				API.SetValue('cmi.score.min', 0);
				API.SetValue('cmi.score.max', 100);				
				API.Commit('');
				logconsole("Initialize ScormStartCom");

			}else{

				logconsole("Initialize Error");

			}

		}

	}



}

function ScormInteractionCom(id,type,latency,result){

	//id : Ludiscape transmet une série de données pour cette chaîne afin d'identifier la question
	//type : Type de question : qcm tcm drop etc
	//latency : Temps de réponse
	//result : Indique si l'utilisateur a répondu correctement à la question ou non.
	if (API != null){

		if (typeof(API.LMSSetValue) != "undefined") {
			API.LMSSetValue('cmi.core.interactions.' + id + '.type', type);
			API.LMSSetValue('cmi.core.interactions.' + id + '.latency', latency);
			API.LMSSetValue('cmi.core.interactions.' + id + '.result', result);
		}

		if (typeof(API.Initialize) != "undefined") {
			API.SetValue('cmi.interactions.' + id + '.type', type);
			API.SetValue('cmi.interactions.' + id + '.latency', latency);
			API.SetValue('cmi.interactions.' + id + '.result', result);
		}

	}
	
}

function CheckLMSFinish(){

	if (API != null){

		if (ScormSubmitted == false){

			//SCORM 1.2
			if (typeof(API.LMSCommit) != "undefined") {
				API.LMSCommit('');
				API.LMSFinish('');
			}

			//SCORM 2004
			if (typeof(API.Terminate) != "undefined") {
				API.Commit('');
				API.Terminate('');
				logconsole("Terminate CheckLMSFinish");
			}

			ScormSubmitted = true;

		}

	}

}

function CheckLMSLearnerName(){
	
	var userN = '';
	
	//SCORM 2004
	if (API != null){
		
		logconsole("CheckLMSLearnerName API.data.learner_name");
		if (typeof(API.data)!="undefined"){
			if (typeof(API.data.learner_name)!="undefined"){
				userN = API.data.learner_name;
			}
		}
		
		logconsole("cmi.core.student_name");
		if(userN==''){
			if (typeof(API.LMSGetValue)!="undefined"){
				userN = API.LMSGetValue("cmi.core.student_name") ;
			}
		}
		
		logconsole("CheckLMSLearnerName cmi.student_name");
		if(userN==''){
			if (typeof(API.LMSGetValue)!="undefined"){
				userN = API.LMSGetValue("cmi.student_name");
			}
		}
		
		logconsole("CheckLMSLearnerName cmi.core.student_id");
		if(userN==''){
			if (typeof(API.LMSGetValue)!="undefined"){
				userN = API.LMSGetValue("cmi.core.student_id");
			}
		}
		
	}

	return userN;

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

		//SCORM 2004

		if (typeof(API.Terminate) != "undefined") {
			API.SetValue('cmi.core.lesson_status', 'incomplete');
			API.SetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
			API.SetValue('cmi.lesson_status', 'incomplete');
			API.SetValue('cmi.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
			API.Commit('');
		}

	}

}

var isScormFinish = false;

function SetScormComplete(){

	if(isScormFinish==false){

		if(API != null){

			//SCORM 1.2
			if (typeof(API.LMSSetValue) != "undefined") {
				API.LMSSetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
				API.LMSSetValue('cmi.core.lesson_status', 'completed');
				SetScormScore();
				API.LMSCommit('');
				API.LMSFinish('');
				isScormFinish = true;
			}

			//SCORM 2004
			if (typeof(API.Terminate) != "undefined") {
				var timefull = MillisecondsToTime2004((new Date()).getTime() - ScormStartTime);
				API.SetValue('cmi.core.session_time', timefull);
				API.SetValue('cmi.session_time', timefull);
				logconsole("session_time = " + timefull);
				API.SetValue('cmi.core.lesson_status', 'completed');
				API.SetValue('cmi.lesson_status', 'completed');
				API.SetValue('cmi.completion_status', 'completed');
				SetScormScore();
				API.Commit('');
				API.Terminate('');
				logconsole("Terminate SetScormComplete");
				isScormFinish = true;
			}

			ScormSubmitted = true;

		}

	}

}

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

			//SCORM 2004
			if (typeof(API.Terminate) != "undefined") {
				SetScormScore();
				API.SetValue('cmi.core.exit', 'time-out');
				API.SetValue('cmi.exit', 'time-out'); 
				API.Commit('');
				API.Terminate('');
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
				API.LMSCommit('');
			}

			//SCORM 2004

			if (typeof(API.Terminate) != "undefined") {
				API.SetValue('cmi.comments', m); 
				API.Commit('');
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

//SetScormScore
function SetScormScore(score){

	if (score != null){

		if (API != null){
			
			//SCORM 1.2
			if (typeof(API.LMSSetValue) != "undefined") {
				API.LMSSetValue('cmi.core.score.raw', score);
			}

			//SCORM 2004
			if (typeof(API.Terminate) != "undefined") {
				API.SetValue('cmi.core.score.raw', score);
				API.SetValue('cmi.score.raw', score);
				API.SetValue('cmi.score.scaled', score/100);
			}

		}

		logconsole("SetScormScore " + score);

	}	

}

