
var CacheCacheMot = "FRAISAGE";
var CacheCacheLength = 0;
var CacheCacheWin = 0;
var CacheCacheDes = "Trouver le mot caché";
var CacheCacheObj;
var CacheCacheIsOk = false;
var CacheCacheLETTERS = ('abcdefghijklmnoprstuvwy').toUpperCase();

function onPaint(obj){
	
	CacheCacheObj = obj;
	var h = '';
	if(obj.fields[0]!=''){
		CacheCacheMot = obj.fields[0];
	}
	if(obj.fields[1]!=''){
		CacheCacheDes = obj.fields[1];
	}
	h += '<div style="position:absolute;" ';
	h += ' id="bloc' + obj.id + '" ';
	h += ' class="bloc' + obj.id + ' tableCache" >';
	CacheCacheLength = CacheCacheMot.length;
	h += '<table class="CachDescription" ><tr><td style="text-align:center;" >';
	h += CacheCacheDes;
	h += '</td></tr></table>';
	h += '<div class="CachWord" >' + installTuiles(obj) + '</div>';
	h += '</div>';
	return h;
	
}

function installTuiles(obj){
	
	var nbT = 1;

	var goodAnswerT = 0;

	var posDec = 43;
	var posLeft = 7;
	CacheCacheWin = CacheCacheLength;
	var h = '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter"  >' + getRandomCacheCacheLetter() +'</div>';
	posLeft = posLeft + posDec;
	for(i=0;i<=(CacheCacheLength-1); i++){

		var rdm = Math.floor(Math.random() * 3);
		
		if(rdm==1&&nbT<12){
			nbT++;
			h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
			posLeft = posLeft + posDec;
		}
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="yesTuile('+ nbT +','+ goodAnswerT +')" id="CachLetter'+ nbT +'" class="CachLetter" >' + CacheCacheMot.substring(i,i+1) +'</div>';
		posLeft = posLeft + posDec;
		goodAnswerT++;
	}

	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}
	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}
	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

	return h;

}

function onZoom(obj){
	
}

function yesTuile(idt,pos){
	
	$('#CachLetter'+idt).css("top","50px");
	$('#CachLetter'+idt).css("left",((pos * 44) + 5) + "px");
	$('#CachLetter'+idt).css("background","#D0F5A9");
	$('#CachLetter'+idt).prop("onclick", null).off("click");

	CacheCacheWin = CacheCacheWin - 1;

	if(CacheCacheWin==0){
		setTimeout(function(){
			processTuileWin();
		},600);
	}

	for(i=1;i<=(CacheCacheLength+10);i++){
		correctTuile(idt+i);
	}
	
}

function correctTuile(idt){

	var position = $('#CachLetter' + (idt)).position();
	if(position.top<30){
		$('#CachLetter' + (idt)).css("left",(position.left-43) + "px");
	}

}

function processTuileWin(){

	CacheCacheIsOk = true;

	for(i=0;i<=(CacheCacheLength+30);i++){
		correctTuileWin(i);
	}
}

function correctTuileWin(idt){

	var position = $('#CachLetter' + idt).position();

	if(position){
		if(position.top){
			if(position.top<30){
				$('#CachLetter' + idt ).css("left","-103px");
			}else{
				$('#CachLetter' + idt ).css("background","yellow");
			}
		}	
	}

}

function noTuile(){

	$(".CachLetter").each(function(index){

		$(this).prop("onclick", null).off("click");
		var rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-top","30px");			
		}else{
			$(this).css("margin-top","40px");
		}
		rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-left","5px");
		}else{
			$(this).css("margin-left","15px");
		}

		$(this).css("background","red");
		$(this).css("transform","scale(1.2) rotate(45deg)");
	});
	setTimeout(function(){ cleanTuile(); }, 1000);
}
function cleanTuile(){

	$(".CachLetter").each(function(index){

		var rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-top","130px");			
		}else{
			$(this).css("margin-top","140px");
		}
		rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-left","0px");
		}else{
			$(this).css("margin-left","50px");
		}
		$(this).css("opacity","0.5");
		$(this).css("background","red");
		$(this).css("transform","scale(1) rotate(135deg)");

	});
	setTimeout(function(){
		$(".CachLetter").css("left","-100px");
	},400);
	setTimeout(function(){
		$(".CachWord").html(installTuiles(CacheCacheObj));
	},2000);

}
function getRandomCacheCacheLetter(){

	var lt =  CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];

	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	return lt;

}

function isOK(obj){
	return CacheCacheIsOk;
}

