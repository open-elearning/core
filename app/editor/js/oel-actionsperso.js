
var globalSortable = '';

function actionsEdit(){
	
	var p = '';
	
	p += '<div id="actionseditzone" class="editImage pan ' + TYPEWIND + 'osBorder" >';
	p += '</div>';
	
	return p;
	
}

function fctInnerActionsEdit(lst,lst2){
	
	var p = '';
	
	if(lst.indexOf("|")==-1){
		p += '<div class="actionslistehelp" >Drag actions here</div>';
	}
	
	p += '<ul id="listactions1" class="actionsliste '+globalSortable+'" >';
	
	var actions =  lst.split('|');
	var params =  lst2.split('|');
	
	var i = 0;
	for (i=0;i<actions.length;i++){
		p += lineActionsEdit(actions[i],params[i]);
	}

	p += '</ul>';
	
	p += '<ul id="listactions2" style="background-color:gray;" class="actionsliste '+globalSortable+'" >';
	
	if(lst.indexOf("cod1")==-1){p += lineActionsEdit("cod1");}
	if(lst.indexOf("cod2")==-1){p += lineActionsEdit("cod2");}
	if(lst.indexOf("act1")==-1){p += lineActionsEdit("act1");}
	if(lst.indexOf("act2")==-1){p += lineActionsEdit("act2");}
	
	p += lineActionsEdit("act3");
	p += lineActionsEdit("act4");
	p += lineActionsEdit("act5");
	p += lineActionsEdit("act6");
	p += lineActionsEdit("act8");
	p += lineActionsEdit("act7");
	
	p += '</ul>';
	
	p += '<div class="toolBas2" >';
	p += '<a onclick="saveActionsPerso();" ';
	p += ' style="margin-right:13px;margin-top:1px;" class="btnSave" >Save</a>';
	p += '</div>';
	
	return p;
		
}

function lineActionsEdit(id,pa){
	
	var p = '';
	
	switch(id){
		case "cod1":
			p = '<li id="cod1" ><div class="minCondi Pos" >&nbsp;If the question objects are OK</div></li>';
			break;
		case "cod2":
			p = '<li id="cod2" ><div class="minCondi Neg" >&nbsp;If the question objects are KO</div></li>';
			break;
		case "act1":
			p = '<li id="act1" ><div class="minAction" >Delete life</div></li>';
			break;
		case "act2":
			p = '<li id="act2" ><div class="minAction" >Add life</div></li>';
			break;
		case "act3":
			p = '<li id="act3" ><div class="minAction" >Next page</div></li>';
			break;
		case "act4":
			p = '<li id="act4" ><div class="minAction" >Next page + 1</div></li>';
			break;
		case "act5":
			p = '<li id="act5" ><div class="minAction" >Pause 2 sec</div></li>';
			break;
		case "act6":
			p = '<li id="act6" ><div class="minAction" >Reset</div></li>';
			break;
		case "act7":
			var pasc = parseFctTxt(pa);
			p = '<li id="act7" ><div class="minAction" >F:&nbsp;';
			p += '<input type="text" class="minFct valFct" value="'+pasc+'" /></div></li>';
			break;
		case "act8":
			var pasc = parseFctTxt(pa);
			p = '<li id="act8" ><div class="minAction" >goPage:&nbsp;';
			p += '<input type="number" class="numFct valFct" value="'+pasc+'" /></div></li>';
			break;
	}
	
	return p;
	
}

function scActionsEdit(id,pa){
	
	var p = '';
	
	pa = parseFctTxt(pa);
	
	switch(id){
		case "cod1":
			p = 'if(LUDI.pageIsOk()){';
			break;
		case "cod2":
			p = 'if(!LUDI.pageIsOk()){';
			break;
		case "act1":
			p = 'LUDI.deleteLife();';
			break;
		case "act2":
			p = 'LUDI.addLife();';
			break;
		case "act3":
			p = 'LUDI.nextPage();';
			break;
		case "act4":
			p = 'LUDI.nextPageAnd1();';
			break;
		case "act5":
			p = 'LUDI.wait(2000);';
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
				p = 'LUDI.goPage(' + parseInteger(pa) + ');';
			}
			break;
	}
	
	return p;
	
}

function actionspersoShow(){
	
	if(GlobalUid==-1){return false;}
	oeEditorShow('editor-action');
	$('#actioneditbtn').css("display","none");
	$('.classWindow').css("display","none");

}

function saveActionsPerso(){
	
	if(GlobalUid==-1){return false;}
	var obj = CLudis[GlobalUid];
	
	var lst = recupActionsPerso();
	obj.text3 = lst;
	
	var lst2 = recupParamsPerso();
	obj.text5 = lst2;
	
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
		sc = sc + scActionsEdit(actions[i],params[i]);
		
	}
	
	if(condiopen){sc = sc+'}';}
	
	sc = sc + 'LUDI.waitReset();';
	
	obj.text4 = sc;
	
	$("." + globalSortable).sortable('disable');
	
	closePan();
	
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
        r = r + parseFctTxt($(this).find('.valFct').val()) + "|";
    });
	
	return r;
}
