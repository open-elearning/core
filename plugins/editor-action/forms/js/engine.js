
//WORKINGOBJ

var globalSortable;

var globalActionTab = 0;
var globalObjT = '';

//init
function actionspersoShow(){
	
	var obj = WORKINGOBJ;
	
	globalSortable = 'list' + guid();
	
	var h = fctInnerActionsEdit(obj.actionLine1,obj.actionLine2);
	
	$('#actionseditzone').html(h);
	$('.actionslistehelp').css("display","block");
	
	var adjustment;
	
	$("ul." + globalSortable).sortable({
	  group: globalSortable,
	  pullPlaceholder: false,
	  // animation on drop
	  onDrop: function  ($item, container, _super) {
			var $clonedItem = $('<li/>').css({height: 0});
			$item.before($clonedItem);
			$clonedItem.animate({'height': $item.height()},100);
			$('.actionslistehelp').css("display","none");
			$item.animate($clonedItem.position(),100, function  () {
				$clonedItem.detach();
				_super($item, container);
			});
	  },
		
	  // set $item relative to cursor position
	  onDragStart: function ($item, container, _super) {
		var offset = $item.offset(),
			pointer = container.rootGroup.pointer;
		$('.actionslistehelp').css("display","none");
		adjustment = {
		  left: pointer.left - offset.left,
		  top: pointer.top - offset.top
		};

		_super($item, container);
	  },
	  onDrag: function ($item, position) {
			$item.css({
				left: position.left - adjustment.left,
				top: position.top - adjustment.top
			});
	  }
	});
	
	$("." + globalSortable).sortable('enable');
	
	saveActionsPerso();
	setTimeout(function(){ controlDualActions() }, 500);

}
actionspersoShow();

function fctInnerActionsEdit(lst,lst2) {
	
	var p = '';
	
	var actions =  lst.split('|');
	var params =  lst2.split('|');

	p += '<div class="actionsThemes" >';
	p += '<a class="tabMain tabBtn" onClick="showTabMain();" >Main</a>';
	p += '<a class="tabGame tabBtn" onClick="showTabGame();" >Game</a>';
	p += '<a class="tabCondi tabBtn" onClick="showTabCondi();" >Condi</a>';
	p += '<a class="tabObject tabBtn" onClick="showTabObj();" >Object</a>';
	p += '</div>';

	p += '<ul id="listactions2" style="background-color:#BDBDBD;" ';
	p += ' class="actionsliste '+ globalSortable +'" >';
	
	if(lst.indexOf("cod1",'',1)==-1){p += lineActionsEdit("cod1",'',1);}
	if(lst.indexOf("cod2",'',1)==-1){p += lineActionsEdit("cod2",'',1);}
	if(lst.indexOf("cod3",'',1)==-1){
		p += lineActionsEdit("cod3",'75',0);
	}
	if(lst.indexOf("cod4",'',1)==-1){
		p += lineActionsEdit("cod4",'75',0);
	}
	if(lst.indexOf("cod5",'',0)==-1){p += lineActionsEdit("cod5",'',0);}
	if(lst.indexOf("cod100",'',0)==-1){p += lineActionsEdit("cod100",'',0);}

	if(lst.indexOf("cod6",'',0)==-1){
		p += lineActionsEdit("cod6",'',0);
	}
	if(lst.indexOf("cod6B",'',0)==-1){
		p += lineActionsEdit("cod6B",'',0);
	}
	if(lst.indexOf("cod6C",'',0)==-1){
		p += lineActionsEdit("cod6C",'',0);
	}
	if(lst.indexOf("cod6D",'',0)==-1){
		p += lineActionsEdit("cod6D",'',0);
	}
	if(lst.indexOf("cod6E",'',0)==-1){
		p += lineActionsEdit("cod6E",'',0);
	}
	
	p += lineActionsEdit("act3",'',1);
	p += lineActionsEdit("act4",'',1);
	p += lineActionsEdit("act5",'',1);
	p += lineActionsEdit("act6",'',1);
	p += lineActionsEdit("act8",'0',1);
	p += lineActionsEdit("act7",'',1);
	p += lineActionsEdit("cor3",'',1);

	p += lineActionsEdit("fx1",'',0);
	p += lineActionsEdit("fx2",'',0);

	if(lst.indexOf("act1",'',1)==-1){p += lineActionsEdit("act1",'',0);}
	if(lst.indexOf("act2",'',1)==-1){p += lineActionsEdit("act2",'',0);}

	p += '</ul>';

	if(lst.indexOf("|")==-1){
		p += '<div class="actionslistehelp" >Drag actions here</div>';
	}

	p += '<ul id="listactions1" style="border:dotted 1px gray;" class="actionsliste '+globalSortable+'" >';

	var i = 0;
	for (i=0;i<actions.length;i++){
		p += lineActionsEdit(actions[i],params[i],1);
	}
	p += '</ul>';

	return p;
		
}

function lauchSelectorIds(typ,objId) {
	
	var allIdBlock = '';
	if (WORKINGOBJ.idsDico!='') {
		if (WORKINGOBJ.idsDico.indexOf(';')!=-1) {
			var ids = WORKINGOBJ.idsDico.split(';');
			for (i=0;i<ids.length;i++) {
				if (ids[i]!=''&&ids[i].indexOf(typ)!=-1) {
					allIdBlock += '<div class="blockSelectorIds" onClick="putIdToImput(\'' + ids[i] + '\')" >';
					allIdBlock +=  ids[i] + '</div>';
				}
			}
			for (i=0;i<ids.length;i++) {
				if (ids[i]!=''&&ids[i].indexOf(typ)==-1) {
					allIdBlock += '<div class="blockSelectorIds" onClick="putIdToImput(\'' + ids[i] + '\')" >';
					allIdBlock +=  ids[i] + '</div>';
				}
			}
		}
	}

	if (allIdBlock!='') {

		globalObjT = objId;
		
		if (!document.getElementById('windowSelectorIds')) {
			var h = '';
			h += '<div class="windowLayer" onClick="closeSelectorIds()" ></div>';
			h += '<div id="windowSelectorIds" class="windowSelectorIds" >';
			h += '</div>';
			$('#actionseditzone').append(h);
		}
		$('#windowSelectorIds').html(allIdBlock);
		$('.windowSelectorIds').css('margin-top','100px');
		$('.windowSelectorIds').css('height','10px');
		$('.windowLayer').css('display','block');
		$('.windowSelectorIds').css('display','block');

		$('.windowSelectorIds').animate({
			height : '200px',
			marginTop : '0px'
		},250,function(){

		});
			
	}

}

function putIdToImput(idsel) {
	if (globalObjT!='') {
		$('#'+globalObjT).find('.valFct').val(idsel);
	}
	closeSelectorIds();
}

function closeSelectorIds() {
	$('.windowSelectorIds').animate({
		height : '10px',
		marginTop : '100px'
	},250,function(){
		$('.windowLayer').css('display','none');
		$('.windowSelectorIds').css('display','none');
	});
}

function findBetterId(typ) {

	var selectIdBlock = '';
	if (WORKINGOBJ.idsDico!='') {
		if (WORKINGOBJ.idsDico.indexOf(';')!=-1) {
			var ids = WORKINGOBJ.idsDico.split(';');
			for (i=0;i<ids.length;i++) {
				if (ids[i]!=''&&ids[i].indexOf(typ)!=-1) {
					selectIdBlock =  ids[i];
				}
			}

		}
	}
	return selectIdBlock;

}


function noneTabM(){

	$("#listactions2 .cod1").css("display","none");
	$("#listactions2 .cod2").css("display","none");
	
	$("#listactions2 .act1").css("display","none");
	$("#listactions2 .act2").css("display","none");
	$("#listactions2 .act3").css("display","none");
	$("#listactions2 .act4").css("display","none");
	$("#listactions2 .act5").css("display","none");
	$("#listactions2 .act6").css("display","none");
	$("#listactions2 .act7").css("display","none");
	$("#listactions2 .act8").css("display","none");
	$("#listactions2 .cor3").css("display","none");

	$("#listactions2 .cod3").css("display","none");
	$("#listactions2 .cod4").css("display","none");
	$("#listactions2 .cod5").css("display","none");

	$("#listactions2 .cod6").css("display","none");
	$("#listactions2 .cod6B").css("display","none");
	$("#listactions2 .cod6C").css("display","none");
	$("#listactions2 .cod6D").css("display","none");
	$("#listactions2 .cod6E").css("display","none");

	$("#listactions2 .cod100").css("display","none");

	$("#listactions2 .fx1").css("display","none");
	$("#listactions2 .fx2").css("display","none");

}

function showTabMain(){

	globalActionTab = 0;

	$(".tabBtn").css("border","solid 1px transparent");
	$(".tabMain").css("border","solid 1px gray");
	$(".tabBtn").css("border-bottom","none");

	$("#listactions2").css("background-color","#BDBDBD");

	noneTabM();

	$("#listactions2 .cod1").css("display","block");
	$("#listactions2 .cod2").css("display","block");
	$("#listactions2 .act3").css("display","block");
	$("#listactions2 .act4").css("display","block");
	$("#listactions2 .act5").css("display","block");
	$("#listactions2 .act6").css("display","block");
	$("#listactions2 .act7").css("display","block");
	$("#listactions2 .act8").css("display","block");
	$("#listactions2 .cor3").css("display","block");

}

function showTabGame(){

	globalActionTab = 1;

	$(".tabBtn").css("border","solid 1px transparent");
	$(".tabGame").css("border","solid 1px gray");
	$(".tabBtn").css("border-bottom","none");

	$("#listactions2").css("background-color","#A9E2F3");

	noneTabM();

	$("#listactions2 .act1").css("display","block");
	$("#listactions2 .act2").css("display","block");

}

function showTabCondi(){

	globalActionTab = 2;

	$(".tabBtn").css("border","solid 1px transparent");
	$(".tabCondi").css("border","solid 1px gray");
	$(".tabBtn").css("border-bottom","none");

	$("#listactions2").css("background-color","#ffdeff");
	noneTabM();
	$("#listactions2 .cod3").css("display","block");
	$("#listactions2 .cod4").css("display","block");
	$("#listactions2 .cod5").css("display","block");
	$("#listactions2 #cod6").css("display","block");
	$("#listactions2 .cod100").css("display","block");

}

function showTabObj(){

	globalActionTab = 3;

	$(".tabBtn").css("border","solid 1px transparent");
	$(".tabObject").css("border","solid 1px gray");
	$(".tabBtn").css("border-bottom","none");

	$("#listactions2").css("background-color","#E9F7EF");
	noneTabM();
	$("#listactions2 .fx1").css("display","block");
	$("#listactions2 .fx2").css("display","block");

}

function lineActionsEdit(id,pa,vi){

	var sty = '';
	if (vi==0) {
		sty = 'style="display:none;" ';
	}
	var p = '';
	
	switch(id){
		case "cod1":
			p = '<li ' + sty + ' id="cod1" class="cod1" ><div class="minCondi Pos" >&nbsp;If the question objects are OK</div></li>';
			break;
		case "cod2":
			p = '<li ' + sty + ' id="cod2" class="cod2" ><div class="minCondi Neg" >&nbsp;If the question objects are KO</div></li>';
			break;
		case "cod3":
			var pasc = parseFctTxt(pa);
			if (pasc=='') {
				pasc = 0;
			}
			p = '<li ' + sty + ' id="cod3" class="cod3" ><div class="minCondi ScoCondi" >&nbsp;If the score is ';
			p += '<input type="number" min=0 max=100 class="scoreFct valFct" value="'+pasc+'" /> min</div></li>';
			break;
		case "cod4":
			var pasc = parseFctTxt(pa);
			if (pasc=='') {
				pasc = 0;
			}
			p = '<li ' + sty + ' id="cod4" class="cod4" ><div class="minCondi ScoCondi2" >&nbsp;If the score is ';
			p += '<input type="number" min=0 max=100 class="scoreFct valFct" value="'+pasc+'" /> max</div></li>';
			break;
		case "cod5":
			p = '<li ' + sty + ' id="cod5" class="cod5" ><div class="minCondi ScoCondi" >&nbsp;If questions have been filled in</div></li>';
			break;
		case "cod100":
			p = '<li ' + sty + ' id="cod100" class="cod100" ><div class="minCondi ScoCondi" >&nbsp;ELSE</div></li>';
			break;
		case "act1":
			p = '<li ' + sty + ' id="act1" class="act1" ><div class="minAction" >Delete&nbsp;life&nbsp;<img src="img/life.png" /></div></li>';
			break;
		case "act2":
			p = '<li ' + sty + ' id="act2" class="act2" ><div class="minAction" >Add&nbsp;life&nbsp;<img src="img/life.png" /></div></li>';
			break;
		case "act3":
			p = '<li ' + sty + ' id="act3" class="act3" ><div class="minAction" >Next page</div></li>';
			break;
		case "act4":
			p = '<li ' + sty + ' id="act4" class="act4" ><div class="minAction" >Next page + 1</div></li>';
			break;
		case "act5":
			p = '<li ' + sty + ' id="act5" class="act5" ><div class="minAction" >Pause 2 sec</div></li>';
			break;
		case "act6":
			p = '<li ' + sty + ' id="act6" class="act6" ><div class="minAction" >Reset</div></li>';
			break;
		case "act7":
			var pasc = parseFctTxt(pa);
			p = '<li ' + sty + ' id="act7" class="act7" ><div class="minAction" >F:&nbsp;';
			p += '<input type="text" class="minFct valFct" value="'+pasc+'" /></div></li>';
			break;
		case "act8":
			var pasc = parseFctTxt(pa);
			p = '<li ' + sty + ' id="act8" class="act8" ><div class="minAction" >goPage:&nbsp;';
			p += '<input type="number" class="numFct valFct" value="'+pasc+'" /></div></li>';
			break;
		case "cor3":
			p = '<li ' + sty + ' id="cor3" class="cor3" ><div class="minAction" >&nbsp;Correction&nbsp;+&nbsp;Next</div></li>';
			break;
		case "fx1":
			var pasc = parseFctTxt(pa);
			p = '<li ' + sty + ' id="fx1" class="fx1" ><div class="minAction ScoCondi3" >&nbsp;Display&nbsp;';
			p += '<input type="text" class="minFct valFct" value="'+pasc+'" /></div></li>';
			break;
		case "fx2":
			var pasc = parseFctTxt(pa);
			p = '<li ' + sty + ' id="fx1" class="fx1" ><div class="minAction ScoCondi3" >&nbsp;&nbsp;Hide&nbsp;';
			p += '<input type="text" class="minFct valFct" value="'+pasc+'" /></div></li>';
			break;
	}
	
	if (id=="cod6"||id=="cod6B"
	||id=="cod6C"||id=="cod6D"||id=="cod6E" ){
		var pasc = parseFctTxtIds(pa);
		if (pasc=='') { pasc = '*0'; }
		var params  = (pasc+'*0').split('*');
		if (params[0]=='') {
			params[0] = findBetterId('mcq');
		}
		p = '<li ' + sty + ' id="' + id + '" class="cod6" ><div class="minCondi ScoCondi4" >';
		p += '<div class="labelFctCond" >&nbsp;If question&nbsp;</div>';
		p += '<input type="text" class="selectIdFct valFct" value="' + params[0] + '" />';
		p += '&nbsp;<img onClick="lauchSelectorIds(\'mcq\',\''+ id +'\');" src="img/listview.png" style="cursor:pointer;" />';
		p += '</br><div class="labelFctCond" >&nbsp;have answer&nbsp;</div>';
		p += '<input type="text" class="selectAnswer valFct2" value="' + params[1] + '" />';
		p += '</div></li>';
	}

	return p;
	
}

function scActionsEdit(id,pa){
	
	var p = '';
	
	if(id=="cod6"||id=="cod6B"||id=="cod6C"||id=="cod6D"||id=="cod6E") {
		pa = parseFctTxtIds(pa);
		if(pa==''){pa = '*0';}
		var params  = pa.split('*');
		p = "if(OpEl.QcmControl('" + params[0] + "','" + params[1] + "')){";
	}

	pa = parseFctTxt(pa);

	switch(id){
		case "cod1":
			p = 'if(OpEl.pageIsOk()){';
			break;
		case "cod2":
			p = 'if(!OpEl.pageIsOk()){';
			break;
		case "cod3":
			p = 'if(OpEl.scoreIsMin(' + parseInt(pa) + ')){';
			break;
		case "cod4":
			p = 'if(OpEl.scoreIsMax(' + parseInt(pa) + ')){';
			break;
		case "cod5":
			p = 'if(OpEl.questionAreCompleted()){';
			break;
		case "cod100":
			p = 'else{';
			break;
		case "act1":
			p = 'OpEl.deleteLife();';
			break;
		case "act2":
			p = 'OpEl.addLife();';
			break;
		case "act3":
			p = 'OpEl.nextPage();';
			break;
		case "act4":
			p = 'OpEl.nextPageAnd1();';
			break;
		case "act5":
			p = 'OpEl.wait(2000);';
			break;
		case "act6":
			p = 'window.location.reload();';
			break;
		case "act7":
			if(pa!=''){
				p = pa + '();';
			}
			break;
		case "act8":
			if(pa!=''){
				p = 'OpEl.goPage(' + parseInt(pa) + ');';
			}
			break;
		case "cor3":
			p = "openCorrection('','');";
			break;
		case "fx1":
			if(pa!=''){
				p = "OpEl.fadeIn('" + parseFctTxt(pa) + "');";
			}
			break;
		case "fx2":
			if(pa!=''){
				p = "OpEl.fadeOut('" + parseFctTxt(pa) + "');";
			}
			break;
	}
	
	return p;
	
}

//Save to temp object WORKINGOBJ
function saveActionsPerso(){
	
	var obj = WORKINGOBJ;
	
	var lst = recupActionsPerso();
	//blocks
	obj.actionLine1 = lst;
	
	//blocks
	var lst2 = recupParamsPerso();
	obj.actionLine2 = lst2;
	
	var actions = lst.split('|');
	var params  = lst2.split('|');
	
	var sc = '';
	var condiopen = false;
	
	var i = 0;
	
	for (i=0;i<actions.length;i++){
		
		//Si condition
		if(actions[i].indexOf('cod')!=-1){
			if(condiopen){sc = sc+'}';}
			condiopen = true;
		}
		sc += scActionsEdit(actions[i],params[i]);
		
	}
	
	if(condiopen){sc = sc+'}';}
	
	sc += 'LUDI.waitReset();';
	
	//final script
	obj.actionData = sc;
	objetSendToString();
	
	setTimeout(function(){ saveActionsPerso() }, 300);

}

function recupActionsPerso(){
	
	var r = '';
	var idul = '#listactions1 li';
	$(idul).each(function(n){
        r = r + $(this).attr('id') + "|";
    });
    return r;
    
}

function recupParamsPerso(){
	
	var r = '';
	var idul = '#listactions1 li';
	$(idul).each(function(n){
		var secondV = '';
		if ($(this).find('.valFct2').length==1) {
			secondV = '*' + $(this).find('.valFct2').val();
			r += parseFctTxtIds($(this).find('.valFct').val()+secondV) + "|";
		}else{
			r += parseFctTxt($(this).find('.valFct').val()) + "|";
		}
    });
	return r;
}

function controlDualActions(){

	if (globalActionTab==2) {
		var idul = '#listactions1 li';
		$(idul).each(function(n){
			var objId = $(this).attr('id');
			if (objId=='cod6') {
				$("#listactions2 #cod6B").css("display","block");
			}
			if (objId=='cod6B') {
				$("#listactions2 #cod6C").css("display","block");
			}
			if (objId=='cod6C') {
				$("#listactions2 #cod6D").css("display","block");
			}
			if (objId=='cod6D') {
				$("#listactions2 #cod6E").css("display","block");
			}
		});
	}

	setTimeout(function(){ controlDualActions() },2000);

}

function parseFctTxt(str) {
	
	if(typeof(str)=='undefined'){
		return "";
	}
	if(str=='undefined'){
		return "";
	}
	str = str.replace("...",'');
	str = str.replace(" ",'');
	str = str.replace(" ",'');
	str = str.replace("(",'');
	str = str.replace(")",'');
	str = str.replace(";",'');
	str = str.replace("|",'');
	if(str==null){str = "";}
	
	return (str);
}

function parseFctTxtIds(str) {
	
	if(typeof(str)=='undefined'){
		return "";
	}
	if(str=='undefined'){
		return "";
	}
	str = str.replace("...",'');
	str = str.replace(" ",'');
	str = str.replace(" ",'');
	str = str.replace("(",'');
	str = str.replace(")",'');
	str = str.replace("|",'');
	if(str==null){str = "";}
	
	return (str);
}

function guid(){
	
	var tirage = new Array;
	var nombres="";
	var nombre = 0;
	nb = 7;
	
	for (i=1 ;i<nb ;i++)
	{
		nombre = nb_random(50);
		tirage[i]= nombre;
		for (t=1 ; t<i ;t++){
			if (tirage[t]==nombre)
			{
				i=i-1;
			}
		}
	}
	
	var characts = 'abcdefghijklmnopqrstuvwzabcdefghijklmnopqrstuvwz';
	
	for (i=1 ;i<nb ;i++)
	{
		nombre = nb_random(50);
		c = characts.substr(nombre,1)
		nombres= nombres + tirage[i] + c ;
	}
	
	return nombres;
	
}

function nb_random(nb){
	return Math.floor(Math.random() * nb)+1;
}
