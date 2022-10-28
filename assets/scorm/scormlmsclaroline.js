/* Open elearning 09092020 */

var autoFinishScore = true;
var sendInteractionsScorm = true;

/* SCORM API 1.2 & 2004 */
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
			API.LMSSetValue('cmi.core.lesson_status', 'incomplete');
			API.LMSSetValue('cmi.core.score.min', 0);
			API.LMSSetValue('cmi.core.score.max', 100);
			API.LMSCommit('');
			logconsole("Initialize ScormStartCom SCORM 1.2");
		}
		
		//SCORM 2004
		if (typeof(API.Initialize) != "undefined"){
			var r = API.Initialize('');
			if(r==true||r=='true'){
				API.SetValue('cmi.core.lesson_status', 'incomplete');
				API.SetValue('cmi.core.score.min', 0);
				API.SetValue('cmi.core.score.max', 100);
				API.Commit('');
				API.SetValue('cmi.lesson_status', 'incomplete');
				API.SetValue('cmi.score.min', 0);
				API.SetValue('cmi.score.max', 100);				
				API.Commit('');
				logconsole("Initialize ScormStartCom SCORM 2004");
			}else{
				logconsole("Initialize Error");
			}
			
		}
	}
	
}

function ScormInteractionCom(n,id,type,latency,result,answers,description,correctAnswer){
	
	if(sendInteractionsScorm){

		//n : Ludiscape transmet le numÃ©ro de l'intÃ©raction
		//id : Ludiscape transmet une sÃ©rie de donnÃ©es pour cette chaÃ®ne afin d'identifier la question
		//type : Type de question : qcm tcm drop etc
		//latency : Temps de rÃ©ponse
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
				if (FormatAnswersScorm.length > 250){
					FormatAnswersScorm = FormatAnswersScorm.substr(0, 250);
				}
				
				var FormatcorrectAnswer = correctAnswer;
				FormatcorrectAnswer = escapeSco(FormatcorrectAnswer);
				if (FormatcorrectAnswer.length > 150){
					FormatcorrectAnswer = FormatcorrectAnswer.substr(0, 150);
				}

				if (typeof(API.LMSSetValue) != "undefined") {

					try{
						API.LMSSetValue('cmi.objectives.' + n + '.id', id);
					}catch(exception){
					}
					
					//Hack talent
					try{
						if (typeof(API.UpdateInteraction) != "undefined") {
							API.UpdateInteraction('interaction.id',n,id);
						}
					}catch(exception){}
					
					try{
						API.LMSSetValue('cmi.interactions.' + n + ".objectives.0.id", id ); 
					}catch(exception){}
					
					try{
						
						API.LMSSetValue('cmi.objectives.' + n + '.status', API.LMSGetValue('cmi.core.lesson_status'));
						API.LMSSetValue('cmi.objectives.' + n + '.score.min', '0');
						API.LMSSetValue('cmi.objectives.' + n + '.score.max', '100');
						
						
						if(result){
							API.LMSSetValue('cmi.objectives.' + n + '.score.raw', '100');
						}else{
							API.LMSSetValue('cmi.objectives.' + n + '.score.raw', '0');
						}
						
					}catch(exception){}
					
					try{
						
						API.LMSSetValue('cmi.interactions.' + n + '.id', id)
						API.LMSSetValue('cmi.interactions.' + n + '.type', type);
						API.LMSSetValue('cmi.interactions.' + n + '.latency', latency);
					}catch(exception){}

					if(result=="false"){
						result = false;
					}
					
					try{
						if(result){
							API.LMSSetValue('cmi.interactions.' + n + '.result', 'correct');
						}else{
							API.LMSSetValue('cmi.interactions.' + n + '.result', 'incorrect');
						}
					}catch(exception){}
					
					
					try{
						API.LMSSetValue('cmi.interactions.' + n + '.result', result);
					}catch(exception){}
					
					try{
					API.LMSSetValue('cmi.interactions.' + n + '.student_response', FormatAnswersScorm);}catch(exception){}
					try{
					API.LMSSetValue('cmi.interactions.' + n + '.student_response_text', FormatAnswersScorm);}catch(exception){}
					try{
					API.LMSSetValue('cmi.interactions.' + n + '.description', description);}catch(exception){}
					
					if (FormatcorrectAnswer != undefined && FormatcorrectAnswer != null && FormatcorrectAnswer != ""){
						try{
							API.LMSSetValue("cmi.interactions." + n + ".correct_responses.0.pattern", FormatcorrectAnswer);
						}catch(exception){}
						try{
							API.LMSSetValue("cmi.interactions." + n + ".correct_response_text", FormatcorrectAnswer);
						}catch(exception){}
					}
					
					
					try{
						API.LMSSetValue('cmi.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
					}catch(exception){}
					
					try{
					API.LMSCommit('');}catch(exception){}
					
				}
				
				if (typeof(API.Initialize) != "undefined") {
					
					//Hack talent
					try{
						if (typeof(API.UpdateInteraction) != "undefined") {
							API.UpdateInteraction('interaction.id',n,id);
						}
					}catch(exception){}
					
					try{
					API.SetValue('cmi.objectives.' + n + '.id', id);}catch(exception){}
					try{
					API.SetValue('cmi.objectives.' + n + '.status', API.LMSGetValue('cmi.core.lesson_status'));}catch(exception){}
					try{
					API.SetValue('cmi.objectives.' + n + '.score.min', '0');}catch(exception){}
					try{
					API.SetValue('cmi.objectives.' + n + '.score.max', '100');}catch(exception){}
					try{
					API.SetValue('cmi.objectives.' + n + '.score.raw', '100');}catch(exception){}
					
					try{
					API.SetValue('cmi.interactions.' + n + '.id', id);
					}catch(exception){}
					
					try{
						API.SetValue('cmi.interactions.' + n + '.type', type);
					}catch(exception){}
					
					try{
					API.SetValue('cmi.interactions.' + n + '.latency', MillisecondsToTime2004(latency));
					}catch(exception){}
					
					try{
					API.SetValue('cmi.interactions.' + n + '.latency', latency);
					}catch(exception){}
					
					try{
						if(result=='true'){
							API.SetValue('cmi.interactions.' + n + '.result', 'correct');
						}else{
							API.SetValue('cmi.interactions.' + n + '.result', 'incorrect');
						}
					}catch(exception){}
					
					try{
					API.SetValue('cmi.interactions.' + n + '.student_response', FormatAnswersScorm);}catch(exception){}
					
					try{
					API.SetValue('cmi.interactions.' + n + '.student_response_text', FormatAnswersScorm);}catch(exception){}
					
					try{
					API.SetValue('cmi.interactions.' + n + '.description', description);}catch(exception){}
					
					if (FormatcorrectAnswer != undefined && FormatcorrectAnswer != null && FormatcorrectAnswer != ""){
							
						try{
							API.SetValue("cmi.interactions." + n + ".correct_responses.0.pattern", FormatcorrectAnswer);
						}catch(exception){}
						
						try{
							API.SetValue("cmi.interactions." + n + ".correct_response_text", FormatcorrectAnswer);
						}catch(exception){}
					
					}
					
					try{
						var d = new Date();
						API.SetValue("cmi.interactions." + n + ".timestamp", ISODateString(d))
						logconsole("cmi.interactions." + n + ".timestamp : " + ISODateString(d));
					}catch(exception){}
					
					try{
					API.Commit('');}catch(exception){}
					
					//Temps
					try{
						var timefull = MillisecondsToTime2004((new Date()).getTime() - ScormStartTime);
						API.SetValue('cmi.core.session_time', timefull);
						API.Commit('');
					}catch(exception){}
					try{
						var timefull = MillisecondsToTime2004((new Date()).getTime() - ScormStartTime);
						API.SetValue('cmi.session_time', timefull);
						API.Commit('');
					}catch(exception){}
					
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
		
		if(ScormSubmitted == false){
			
			//SCORM 1.2
			if (typeof(API.LMSCommit) != "undefined"){
				
				try{
					API.LMSSetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
					API.LMSSetValue('cmi.core.lesson_status', 'completed');
					API.LMSCommit('');
				}catch(exception){}
				
				if (typeof(API.LMSFinish) != "undefined"){
					API.LMSFinish('');
				}
				
			}
			//SCORM 2004
			if (typeof(API.Terminate) != "undefined"){
				
				try{
				API.SetValue('cmi.core.lesson_status', 'completed');
				API.SetValue('cmi.lesson_status', 'completed');
				API.SetValue('cmi.completion_status', 'completed');
				API.Commit('');
				}catch(exception){}
				
				try{
				var timefull = MillisecondsToTime2004((new Date()).getTime() - ScormStartTime);
				API.SetValue('cmi.core.session_time', timefull);
				API.SetValue('cmi.session_time', timefull);
				logconsole("session_time = " + timefull);
				API.Commit('');
				}catch(exception){}
				
				API.Terminate('');
				logconsole("Terminate CheckLMSFinish");
			}
			
			ScormSubmitted = true;
			globalCompteurDecompt = false;
			
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
	
	logconsole("SetScormComplete");
	
	if(isScormFinish==false){
		
		if (API != null){
			
			//SCORM 1.2
			if (typeof(API.LMSSetValue) != "undefined") {

				SetScormScore();
				API.LMSCommit('');
				
				if(autoFinishScore){
					CheckLMSFinish();
					API.LMSFinish('');
					isScormFinish = true;
				}
			}
			
			//SCORM 2004
			if (typeof(API.Terminate) != "undefined") {
				
				SetScormScore();
				API.Commit('');
				
				if(autoFinishScore){
					CheckLMSFinish();
					API.Terminate('');
					logconsole("Terminate SetScormComplete");
					isScormFinish = true;
				}
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
	
}

function escapeSco(unsafe){
	
	unsafe = unsafe.toLowerCase();
	unsafe = unsafe.replace(/,/g, "virgulebase")
	unsafe = unsafe.replace(/[^a-zA-Z0-9]/g,'-');
	unsafe = unsafe.replace(/virgulebase/g, ",")
	return unsafe;
	
}

