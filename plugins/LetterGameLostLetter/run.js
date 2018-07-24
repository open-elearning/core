
var PassChoixLettreLL = false;

function onPaint(obj){
	
	PassChoixLettreLL = false;
	
	var color = "black";
	if(obj.color){color = obj.color;}
	
	var colspan = 2;
	
	var MOT = "Frigo";
	var MOTOK = "";
	var MOTKO = "";
	var MOTKO2 = "";
	var MOTKO3 = "";
	var MOTKO4 = "";
	
	var LET1 = "";
	var LET2 = "";
	var LET3 = "";
	var LET4 = "";
	var LET5 = "";
	
	if(obj.field1!=''){
		MOT = obj.field1;
	}
	
	if(obj.field2==''){
		obj.field2 = "F;V";
	}
	
	if(obj.field3!=''){
		var newField1 = window[obj.field3];
		MOT = replaceAt(newField1,0,'_');
		var lett = newField1.charAt(0).toUpperCase();
		obj.field2 = lett + getLettersRandom(lett);
	}
	
	if(obj.field2!=''){
		
		var mySplitResult = obj.field2.split(";");
		
		for(i = 0; i < mySplitResult.length; i++){
			if(mySplitResult[i]!=''){
				
				if(i==0){
					LET1 = mySplitResult[i];
				}
				if(i==1){
					LET2 = mySplitResult[i];
					colspan = 2;
				}
				if(i==2){
					LET3 = mySplitResult[i];
					colspan = 3;
				}
				if(i==3){
					LET4 = mySplitResult[i];
					colspan = 4;
				}
				if(i==4){
					LET5 = mySplitResult[i];
					colspan = 5;
				}
			}
		}
		
	}
	
	MOT = replaceAt(MOT,0,"_");
	MOTOK = MOT.replace("_","<span style='color:green;' >" + LET1 + "</span>");
	MOTKO = MOT.replace("_","<span style='color:red;' >" + LET2 + "</span>");
	if(colspan>2){
		MOTKO2 = MOT.replace("_","<span style='color:red;' >" + LET3 + "</span>");
	}
	if(colspan>3){
		MOTKO3 = MOT.replace("_","<span style='color:red;' >" + LET4 + "</span>");
	}
	if(colspan>4){
		MOTKO4 = MOT.replace("_","<span style='color:red;' >" + LET5 + "</span>");
	}
	var h = '';
	
	h += '<a id="fakeBtnAnimLetter" class="fakebtn" >X</a>';
	
	h += '<table style="border:dotted 1px gray;color:' + color + ';" ';
	h += ' class="bloc' + obj.id + '" >';
	h += '<tr>';
	h += '<td colspan=' + colspan + ' style="text-align:center;" >';
	
	h += '<p id="ilc' + obj.id + '" >' + MOT + '</p>';
	h += '<p id="ilok' + obj.id + '" style="display:none;" >' + MOTOK + '</p>';
	h += '<p id="ilko' + obj.id + '" style="display:none;" >' + MOTKO + '</p>';
	
	if(colspan>2){
		h += '<p id="ilko2' + obj.id + '" style="display:none;" >' + MOTKO2 + '</p>';
	}
	if(colspan>3){
		h += '<p id="ilko3' + obj.id + '" style="display:none;" >' + MOTKO3 + '</p>';
	}
	if(colspan>4){
		h += '<p id="ilko4' + obj.id + '" style="display:none;" >' + MOTKO4 + '</p>';
	}
	h += '</td>';
	h += '</tr>';
	
	h += '<tr>';
	
	var r = Math.floor((Math.random() * 6) + 1);
	
	if(r<4){
		h += '<td style="text-align:center;" >';
		h += '<a class="passbtn" onClick="onPassCl(' + obj.id + ',this,\''+LET1+'\');" >' + LET1 + '</a>';
		h += '</td>';
	}
	
	h += '<td style="text-align:center;" >';
	h += '<a class="passbtn" onClick="onPassKo(' + obj.id + ',this,\''+LET2+'\');" >' + LET2 + '</a>';
	h += '</td>';
	
	
	if(r>3){
		h += '<td style="text-align:center;" >';
		h += '<a class="passbtn" onClick="onPassCl(' + obj.id + ',this,\''+LET1+'\');" >' + LET1 + '</a>';
		h += '</td>';
	}
	
	if(colspan>2){
		h += '<td style="text-align:center;" >';
		h += '<a class="passbtn" onClick="onPassKo2(' + obj.id + ',this,\''+LET3+'\');" >' + LET3 + '</a>';
		h += '</td>';
	}
	
	if(colspan>4){
		h += '<td style="text-align:center;" >';
		h += '<a class="passbtn" onClick="onPassKo4(' + obj.id + ',this,\''+LET5+'\');" >' + LET5 + '</a>';
		h += '</td>';
	}
	
	if(colspan>3){
		h += '<td style="text-align:center;" >';
		h += '<a class="passbtn" onClick="onPassKo3(' + obj.id + ',this,\''+LET4+'\');" >' + LET4 + '</a>';
		h += '</td>';
	}
	
	
	h += '</tr>';
	
	h += '</table>';
	
	return h;
	
}

function onZoom(obj){
		
}

function isOK(obj){
	return PassChoixLettreLL;
}


function getLettersRandom(letter){
	
	switch (letter) {
    case "A":
        return ";O;U";
        break;
    case "B":
        return ";D;P";
        break;
    case "C":
        return ";D;B";
        break;
    case "D":
        return ";P;B";
        break;
    case "E":
        return ";O;U";
        break;
    case "F":
        return ";P;M";
        break;
    case "G":
        return ";P;M";
        break;
    case "H":
        return ";F;M";
        break;
    case "I":
        return ";O;E";
        break;
    case "J":
        return ";L;H";
        break;
    case "K":
        return ";L;H";
        break;
    case "L":
        return ";G;H";
        break;
    case "M":
        return ";N;H";
        break;
    case "N":
        return ";M;H";
        break;
    case "O":
        return ";U;I";
        break;
    case "P":
        return ";L;M";
        break;
    case "Q":
        return ";K;M";
        break;
    case "R":
        return ";T;M";
        break;
    case "S":
        return ";H;C";
        break;
    case "T":
        return ";R;C";
        break;
    case "U":
        return ";A;E";
        break;
    case "V":
        return ";W;F";
        break;
    case "W":
        return ";V;M";
        break;
    case "X":
        return ";S;F";
        break;
    case "Y":
        return ";I;U";
        break;
    case "Z":
        return ";S;C";
        break;
	}
	
	
}

//Yeaah
function onPassCl(id,dobj,letter){
	
	placeLetterAnim(id,dobj,letter,'ilok');
	PassChoixLettreLL = true;
	
}

//Fail
function onPassKo(id,dobj,letter){
	placeLetterAnim(id,dobj,letter,'ilko');
}

function onPassKo2(id,dobj,letter){
	placeLetterAnim(id,dobj,letter,'ilko2');
}

function onPassKo3(id,dobj,letter){
	placeLetterAnim(id,dobj,letter,'ilko3');
}

function onPassKo4(id,dobj,letter){
	placeLetterAnim(id,dobj,letter,'ilko4');
}

function placeLetterAnim(id,dobj,letter,lib){

	$(dobj).css("visibility","hidden");

	var obj = CObjets[id];
	
	var objX = obj.x * zoom;
	var objY = obj.y * zoom;
	
	var position = $(dobj).position();
	
	var CobjX = objX + position.left;
	var CobjY = objY + position.top;
	
	$('#fakeBtnAnimLetter').html(letter);
	$('#fakeBtnAnimLetter').css("left",CobjX + "px").css("top" ,CobjY + "px");
	$('#fakeBtnAnimLetter').css("opacity" ,0.5).css("display","block");
	
	var MobjX = objX + ((obj.w * zoom)/2) - 35;
	var MobjY = objY + ((obj.h * zoom)/5);
	
	$("#fakeBtnAnimLetter").animate({
		left: MobjX + "px",
		top : MobjY + "px",
		opacity : 0.2
	},500, function(){
		
		if($('#ilok' + id).is(':visible')){
			
		}else{
			eraseLetterPlace(id);
			$('#ilc' + id).css("display","none");
			$('#' + lib + id).css("display","block");
		}
		if(lib!='ilok'){
			$('#' + lib + id).addClass("shakeWinface");
		}
		
		$('#fakeBtnAnimLetter').css("display","none");
	});
  
}


function eraseLetterPlace(id){
	$('#ilc' + id).css("display","none");
	$('#ilok' + id).css("display","none");
	$('#ilko' + id).css("display","none");
	$('#ilko2' + id).css("display","none");
	$('#ilko3' + id).css("display","none");
	$('#ilko4' + id).css("display","none");
}

function replaceAt(str,index, character) {
    return str.substr(0, index) + character + str.substr(index + character.length);
}
