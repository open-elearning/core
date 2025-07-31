
/* cls-windows.js
* License: X11/MIT
* See LICENSE.md
*/
var TYPEWIND = 'win-';

function CWindow(){

    this.id = '';
    this.name = '';
    this.body = '';
    this.ind = 0;
    this.wh = 50;
    this.fwh = 50;
    this.isSplit = false;
    this.idSplt = '';

    this.showDialog = function(typ){
        
        var obj;

        if(typ==''){typ = 'Cludi';}

        if(typ=='Cludi'){
            if(GlobalUid==-1){
                return false;
            }
            obj = CLudis[GlobalUid];
        }

        if(!openelearning.gebi('win' + this.id)){
            
            var p = '<div id="win' + this.id + '" ';
            p += ' style="width:400px;height:' + this.wh + 'px;';
            p += 'margin-left:-200px;margin-top:-' + (this.wh/2) + 'px;" ';
            p += ' class="classWindow pan ' + TYPEWIND + 'osBorder" >';
            p += barEditWind(this.name);
            p += this.body;
            p += '<a style="position:absolute;';
            if(typ=='process_infos'){
                p += 'display:none;';
            }
            p += 'right:10px;bottom:10px;" ';
            if(typ=='Cludi'){
                p += 'onclick="setSourceWind(\'' + this.id + '\');';
                p += 'hideSplitElements(\'' + this.idSplt + '\',\'' + this.id + '\');" ';
                p += 'class="btnSave2" >' + getTrd('save') + '</a>';
            }else{
                p += 'onclick="setParamsWind(\'' + this.id + '\',\'' + typ + '\');';
                p += 'hideSplitElements(\'' + this.idSplt + '\',\'' + this.id + '\');" ';
                p += 'class="btnSave2" >Execute</a>';
            }
            
            p += '</div>';
            
            $('body').append(p);

            CWindows.push(this);
            CWindowsCount = CWindowsCount + 1;
            
        }
        
        if(typ=='Cludi'){
            setValuesWind('A',this.id,obj);
            setValuesWind('B',this.id,obj);
            setValuesWind('C',this.id,obj);
            setValuesWind('D',this.id,obj);
        }
        
        if(typ.indexOf('process_')!=-1){
            setValuesWind('A',this.id,obj);
            setValuesWind('B',this.id,obj);
            setValuesWind('C',this.id,obj);
            setValuesWind('D',this.id,obj);
        }

        $('.opacedit,#' + 'win' + this.id).css("display","block");

    }
    
    //text:Answer=>text
    this.addControl = function(params,Alst){
        
        var res = params.split(":");
        var typ = res[0];
        var res2 = res[1].split("=>");
        var lbl = res2[0];
        var res3 = res2[1].split("|");;

        var target = res3[0];
        var rules = res3[1];
        
        var letter = RefWindFields[this.ind];
        var p = '';
        
        var dno = '';

        if(this.isSplit){
            dno = 'display:none;';
        }

        if(typ=='text'){

            p = '<p ';
            if(this.isSplit){
                p += 'class="noselectmouse splitershow' + this.idSplt + '" ';
            }
            p += ' style="' + dno + '" id="label' + letter + this.id + '" >&nbsp;' + lbl + '&nbsp;:&nbsp;&nbsp;';
            p += '<input id="field' + letter + this.id + '" ';
            p += ' target="' + target + '" ';
            p += ' rules="' + rules + '" ';
            p += 'type="text" style="width:280px;" ';
            p += 'class="css-input" value="" /></p>';
            
            if(this.isSplit==false){
                this.wh = this.wh + 60;
            }
            this.fwh = this.fwh + 60;
            this.ind++;
        }

        if(typ=='htmlinfos'){
            p = '<div ';
            if(this.isSplit){
                p += 'class="noselectmouse splitershow' + this.idSplt + '" ';
            }
            p += ' style="' + dno + '" id="htmlinfos" >';
            p += '</div>';
            
            if(this.isSplit==false){
                this.wh = this.wh + 320;
            }
            this.fwh = this.fwh + 320;
            this.ind++;
        }

        if(typ=='spliter'){
            this.idSplt = guid();
            p += '<img class="noselectmouse spliter' + this.idSplt + '" ';
            p += ' style="position:absolute;left:5px;bottom:5px;cursor:pointer;" ';
            p += ' onClick="showSplitElements(\'' + this.idSplt + '\',\'' + this.id + '\');" ';
            p += ' src="img/params-add-tool.png" />';
            this.wh = this.wh + 10;
            this.isSplit = true;
        }

        if(typ=='area'){
            p  = '<p class="noselectmouse splitershow' + this.idSplt + '" style="' + dno + '" id="label' + letter + this.id + '" >&nbsp;' + lbl + '&nbsp;:&nbsp;</p>';
            p += '<textarea class="css-input splitershow' + this.idSplt + '"  id="field' + letter + this.id + '" ';
            p += ' target="' + target + '" ';
            p += ' rules="' + rules + '" ';
            p += ' style="width:320px;height:130px;' + dno;
            p += 'font-size:13px;',
            p += 'margin-top:-40px;margin-left:55px;" ></textarea>';
            
            if(this.isSplit==false){
                this.wh = this.wh + 140;
            }
            this.fwh = this.fwh + 140;

            this.ind++;
        }

        if(typ=='double'){
            
            p = '<p ';
            if(this.isSplit){
                p += 'class="noselectmouse splitershow' + this.idSplt + '" ';
            }
            p += ' style="' + dno + '" id="label' + letter + this.id + '" >&nbsp;' + lbl + '&nbsp;:&nbsp;&nbsp;';
   
            p += '<input id="field' + letter + this.id + '" ';
            p += ' target="' + target + '" ';
            p += ' rules="' + rules + '" ';
            p += getTypeInput(rules);
            p += 'style="width:90px;" ';
            p += 'class="css-input"  /></p>';

            if(this.isSplit==false){
                this.wh = this.wh + 60;
            }
            this.fwh = this.fwh + 60;
            this.ind++;
        }

        if(typ=='mindouble'){
           
            p = '<p class="noselectmouse" style="' + dno + '" id="label' + letter + this.id + '" >&nbsp;' + lbl + '&nbsp;:&nbsp;&nbsp;';
            p += '<input id="field' + letter + this.id + '" ';
            p += ' target="' + target + '" ';
            p += ' rules="' + rules + '" ';
            p += getTypeInput(rules);
            p += 'style="width:80px;" ';
            p += 'class="css-input" value="" />';

            this.fwh = this.fwh + 60;

            this.ind++;
        }
        
        if(typ=='enddouble'){
            p += '&nbsp;' + lbl + '&nbsp;';
            p += '<input id="field' + letter + this.id + '" ';
            p += ' target="' + target + '" ';
            p += ' rules="' + rules + '" ';
            p += getTypeInput(rules);
            p += 'style="width:80px;" ';
            p += 'class="noselectmouse css-input" value="" />';
            p += '</p>';
            this.wh = this.wh + 60;
            this.fwh = this.fwh + 60;

            this.ind++;
        }
        
        if(typ=='actionsel'){

            var idAct = letter + this.id;
            p += GetActionSel("selectChoiceAction" + idAct,80,92,idAct);   
            p += '&nbsp;' + lbl + '&nbsp;';
            p += '</span>';
            p += '&nbsp;:&nbsp;&nbsp;&nbsp;';
            p += '<span id="actioneditselect' + idAct + '" style="height:26px;width:220px;" ';
            p += ' onClick="$(\'#selectChoiceAction' + idAct + '\').toggle();" ';
            p += ' class="fakeSelect" >-</span>';

            p += '<input id="actioneditpage' + idAct + '" type="number" ';
	        p += 'style="width:40px;margin-left:2px;display:none" ';
	        p += ' class="css-input" min=0 max=100 value="" />';
            
            p += '<a onClick="actionspersoShow();" ';
            p += ' class="actionSlctPerso actionSlctPerso' + idAct ;
            p += ' actionSelectPersoBtn' + idAct + '" ></a>';
            
            p += '<a onClick="showSelImgDisplayImg();" ';
            p += ' class="actionSlctFileImg actionSlctFileImg' + idAct ;
            p += ' actionSelectFileImage' + idAct + '" ></a>';
            
            loadEdit = false;

            this.wh = this.wh + 60;
            this.fwh = this.fwh + 60;

            this.ind++;
        }

        if(typ=='select'){

            p = '<div class="pure-css-p noselectmouse" >'
            p += '<div class="pure-css-label" style="' + dno + '" id="label' + letter + this.id + '" >';
            p += '&nbsp;' + lbl + '&nbsp;:&nbsp;</div>';
            p += '<div class="pure-css-select-style theme-default" style="' + dno + '" >';
			p += '<select id="field' + letter + this.id + '" target="' + target + '" rules="' + rules + '" >';
            
            for (var key in Alst){
                var value = Alst[key];
                if(isValidKey(key,value)){
                    p += '<option value="' + key + '" >' + value + '</option>';
                }
               
            }

            p += '</select></div></br>';
            p += '</div>'
            
            if(this.isSplit==false){
                this.wh = this.wh + 60;
            }
            this.fwh = this.fwh + 60;
            this.ind++;

        }

        if(typ=='boolean'){

            p = '<div style="position:relative;margin-left:30px;' + dno;
            p += ';width:260px;margin-bottom:4px;" ';
            if(this.isSplit){
                p += 'class="noselectmouse splitershow' + this.idSplt + '" ';
            }
            p += '>';
            p += '<label style="margin-top:1px;' + dno + '" ';
            p += ' class="el-switch el-switch-green" >';
            p += '<input id="field' + letter + this.id + '" ';
            p += ' target="' + target + '" ';
            p += ' rules="' + rules + '" ';
            p += ' type="checkbox" name="switch" >';
            p += '<span class="el-switch-style"></span>';
            p += '</label>';
            p += '<span class="margin-r" ';
            p += ' style="position:absolute;left:50px;top:0px;"  >';
            p += '&nbsp;'+lbl+'</span>';
            p += '</div>';

            if(this.isSplit==false){
                this.wh = this.wh + 60;
            }
            this.fwh = this.fwh + 60;
            this.ind++;
        }
        
        if(typ=='textfile'){

            var idAct = letter + this.id;

            p = '<p ';
            if(this.isSplit){
                p += 'class="noselectmouse splitershow' + this.idSplt + '" ';
            }
            p += ' style="' + dno + '" id="label' + letter + this.id + '" >&nbsp;' + lbl + '&nbsp;:&nbsp;&nbsp;';
            p += '<input id="field' + letter + this.id + '" ';
            p += ' target="' + target + '" ';
            p += ' rules="' + rules + '" ';
            p += 'type="text" style="width:80px;" ';
            p += 'class="css-input" value="" />';
            
            p += '<a onClick="showSelFileGen(\'field' + letter + this.id + '\');" ';
            p += ' class="actionSlctFileGen actionSlctFileGen' + idAct ;
            p += ' actionSelectFileImage' + idAct + '" ></a>';

            p += '</p>';

            if(this.isSplit==false){
                this.wh = this.wh + 60;
            }
            this.fwh = this.fwh + 60;
            this.ind++;
        }


        this.body += p;

    }
    
}

function isValidKey(key,value){
    
    var control = true;
    if(key=='shuffle'||key=='clone'||key=='unique'){
        control = false;
    }
    if(typeof value === "function"){
        control = false;
    }
    return control;

}

function getWindowsByID(unikid){
	
	for (var i = 0; i < CWindowsCount; i++){
			if(CWindows[i].id==unikid){
				return CWindows[i];
			}
	}
	
	return new CWindow();
	
}

function showSplitElements(idSplt,idWind){
    
    $(".spliter" + idSplt).css("display","none");
    $(".splitershow" + idSplt).css("display","block");
    var nh = getWindowsByID(idWind).fwh;

    $('#win' + idWind).css("display","block");
    
    $('#win' + idWind).animate({
        marginTop : '-' + (nh/2) + 'px',
        height: nh + 'px'
    },500,function(){
        $('#win' + idWind).css("margin-top",'-' + (nh/2) + 'px');
        $('#win' + idWind).css("height",nh + "px");
    });

}

function hideSplitElements(idSplt,idWind){

    $(".spliter" + idSplt).css("display","block");
    $(".splitershow" + idSplt).css("display","none");
    var nh = getWindowsByID(idWind).wh;
    $('#win' + idWind).css("margin-top",'-' + (nh/2) + 'px');
    $('#win' + idWind).css("height",nh + 'px');

}

function GetActionSel(id,left,top,actId){

    var p = '<div id="' + id + '" class="selectChoice pan" style="left:' + left + 'px;top:' + top + 'px;" >';
    
    p += '<div onClick="selChAct(0,\'' + actId + '\');" class="actionSelect" >' + getTrd(refActs[0])+ '</div>';
	p += '<div onClick="selChAct(1,\'' + actId + '\');" class="actionSelect" >' + getTrd(refActs[1])+ '</div>';
	p += '<div onClick="selChAct(2,\'' + actId + '\');" class="actionSelect" >' + getTrd(refActs[2])+ '</div>';
	p += '<div onClick="selChAct(3,\'' + actId + '\');" class="actionSelect" >' + getTrd(refActs[3])+ '</div>';
    p += '<div onClick="selChAct(5,\'' + actId + '\');" class="actionSelect" >' + getTrd(refActs[5])+ '</div>';
    p += '<div onClick="selChAct(4,\'' + actId + '\');" class="actionSelect" >' + getTrd(refActs[4])+ '</div>';
    p += '<div onClick="selChAct(6,\'' + actId + '\');" class="actionSelect" >' + getTrd(refActs[6])+ '</div>';
    p += '<div onClick="selChAct(-1,\'' + actId + '\');" class="actionSelect" >-&nbsp;</div>';

    p += '</div>';
    
    return p;

}

function selChAct(i,actId){
	
	if(loadEdit==true){
		return false;
	}
	
	if(GlobalUid==-1){
		return false;
	}
	
	$('#actioneditpage'+ actId).css('display','none');
    $('.actionSelectPersoBtn'+ actId).css('display','none');
    $('.actionSelectFileImage'+ actId).css('display','none');
    $('.actionSlctPerso'+ actId).css('display','none');

	var obj = CLudis[GlobalUid];
    
    if(i==-1){
        obj.actionVal = '';
        $('#actioneditselect'+ actId).html('- &nbsp;');
        $('#selectChoiceAction'+ actId).css("display","none");
        return false;
    }

    obj.actionVal = refAct[i];
	
	if(obj.actionVal=='GO'){
		$('#actioneditpage'+ actId).css('display','inline-block');
	}
	if(obj.actionVal=='AP'){
        $('.actionSelectPersoBtn'+ actId).css('display','block');
        $('.actionSlctPerso'+ actId).css('display','inline-block');
	}
	if(obj.actionVal=='AI'){
        $('.actionSelectFileImage'+ actId).css('display','block');
        $('.actionSlctFileImg'+ actId).css('display','inline-block');
	}
	$('#actioneditselect'+ actId).html(getTrd(refActs[i]) + '&nbsp;');
	
	$('#selectChoiceAction'+ actId).css("display","none");
	
}

function getTypeInput(rule){
    var result = 'type="text" ';
    switch(rule){
        case "number":
            result = 'type="number" value="" ';
            break;
        case "pourcent":
            result = 'type="number" value="80" min=0 max=100 ';
                break;
        case "ratioid":
            result = 'type="number" value="" ';
            break;
        default:
            result = 'type="text" value="" ';
    }
    return result;
}

function setValuesWind(letter,id,obj){

    if(typeof obj === 'undefined'){
        obj = {data:'',text:'',actionVal:'',actionData:''};
    }
    var idwind = id;
    if(openelearning.gebi('actioneditselect'+ letter + id)){

        var targetObj = $('#actioneditselect' + letter + id);
        var actId = letter + id;
        
        $('#actioneditpage' + actId).css('display','none');
        $('.actionSlctPerso' + actId).css('display','none');
        $('.actionSlctFileImg' + actId).css('display','none');

        //Compatibility < 1.5 24042021
        if (obj.actionVal==''){
            if (obj.data==refAct[0]||obj.data==refAct[1] ||obj.data==refAct[2]
            ||obj.data==refAct[3]||obj.data==refAct[4]
            ||obj.data==refAct[5]||obj.data==refAct[6]){
                obj.actionVal = obj.data;
            }
        }
        if (obj.actionData==''){
            if (obj.actionVal==refAct[3]){
                obj.actionData = obj.val;
            }
        }
		//End Compatibility

        switch(obj.actionVal){
            case refAct[0]:
                targetObj.html(getTrd(refActs[0]));
                break;
            case refAct[1]:
                targetObj.html(getTrd(refActs[1]));
                break;
            case refAct[2]:
                targetObj.html(getTrd(refActs[2]));
                break;
            case refAct[3]:
                targetObj.html(getTrd(refActs[3]));
                $('#actioneditpage' + actId).css('display','inline-block');
                $('#actioneditpage' + actId).val(parseInteger(obj.actionData));
                break;
            case refAct[4]:
                targetObj.html(getTrd(refActs[4]));
                $('.actionSlctPerso' + actId).css('display','inline-block');
                break;
            case refAct[5]:
                targetObj.html(getTrd(refActs[5]));
                break;
            case refAct[6]:
                targetObj.html(getTrd(refActs[6]));
                $('.actionSlctFileImg' + actId).css('display','inline-block');
                break;
            default:
                targetObj.html('-');
        }
        return false;
    }

    if(openelearning.gebi('field' + letter + id)){
        
        var target = $('#field' + letter + id).attr("target");
        var result = "";

        switch(target){
            case "text":
                result = obj.text;
                break;
            case "text2":
                result = obj.text2;
                break;
            case "text3":
                result = obj.text3;
                break;
            case "text4":
                result = obj.text4;
                break;
            case "text5":
                result = obj.text5;
                break;
            case "text6":
                result = obj.text6;
                break;
            case "val2":
                result = obj.val2;
                break;
            case "fontSize":
                result = obj.fontSize;
                break;
            default:
                result = getParamsGlobal(target,"text").value;
        }

        $('#field' + letter + id).val(result);

        if($('#field' + letter + idwind).attr("type")=='checkbox'){
            if(parseInteger(result)==1){
                $('#field' + letter + idwind).attr('checked', true);
            }else{
                $('#field' + letter + idwind).attr('checked', false);
            }
        }
    
    }

}

function barEditWind(name){
    
	var p = '';
	p += '<div class="' + TYPEWIND + 'toolbar-w ' + TYPEWIND + 'toolbar-header" >';
	p += '<div onClick="closeEdit();" class="' + TYPEWIND + 'closehead" ></div>';
	p += '<h1 class="' + TYPEWIND + 'titlehead">' + name + '</h1>';
	p += '</div>';
	return p;
	
}

var CWindows = new Array();
var CWindowsCount = 0;

var RefWindFields = new Array();
RefWindFields[0] = 'A';
RefWindFields[1] = 'B';
RefWindFields[2] = 'C';
RefWindFields[3] = 'D';
RefWindFields[4] = 'E';
RefWindFields[5] = 'F';

function CWindowsAdd(Elem){

}

//Call windows by type
function constructWindEdit(obj){
	
	if(obj.type=='variable'){
		var objWind = new CWindow();
		objWind.id = obj.type;
        objWind.name = getTrd("edition") +  ' variable';
        objWind.addControl("text:Id=>text|ratioid");
        objWind.addControl("mindouble:Between=>text2|number");
        objWind.addControl("enddouble:To=>text3|number");
		objWind.showDialog('');
    }
    
    if(obj.type=='dom'){

        var objWind = new CWindow();
		objWind.id = obj.type;
        objWind.name = getTrd("edition") + '  DOM';
        objWind.addControl("text:Texte=>text|");
        
        //Caution include text3 text4 text5 data
        objWind.addControl("actionsel:Action=>text2|");

        objWind.addControl("spliter:options=>|");

        objWind.addControl("double:Size&nbsp;Text=>fontSize|number");
        objWind.addControl("area:CSS=>text6|");
        
		objWind.showDialog('');
    }

    if(obj.type=='exportsScorm'){

        var objWind = new CWindow();
		objWind.id = obj.type;
        objWind.name = getTrd("Export") + '  SCORM';

        objWind.addControl("text:Title=>titleScorm|");

        var myData = new Array();
        myData["chamilo"] = "interface for Chamilo";
        myData["claroline"] = "interface for Claroline";
        myData["moodle"] = "interface for Moodle";
        
        objWind.addControl("select:Interface=>selectScorm|",myData);
        objWind.addControl("double:Matery&nbsp;Score&nbsp;=>scoreMasterScorm|pourcent");
        objWind.addControl("boolean:Send&nbsp;the&nbsp;status&nbsp;completed=>statusScorm|");
        objWind.showDialog('process_ExportsScorm');
        
    }

    if(obj.type=='process_infos'){
        
        var objWind = new CWindow();
		objWind.id = obj.type;
        objWind.name = getTrd("Infos");
        objWind.addControl("htmlinfos:htmlinfos=>htmlinfos|");
        objWind.showDialog('process_infos');
        
    }

    if(obj.type=='process_params'){

        var objWind = new CWindow();
		objWind.id = obj.type;
        objWind.name = getTrd("Settings");
        objWind.addControl("text:Title=>titleScorm|");
        objWind.addControl("boolean:Send&nbsp;the&nbsp;status&nbsp;completed=>statusScorm|");
        objWind.addControl("boolean:Responsive <b>(Beta)</b>=>responsiveProject|");
        objWind.addControl("boolean:Large slide=>classiquelarge|");
        objWind.showDialog('process_params');
        
    }

    if(obj.type=='import_pdf'){
            
        var objWind = new CWindow();
        objWind.id = obj.type;
        objWind.name = getTrd("Settings");
        objWind.addControl("textfile:Fichier=>pathFichier|");
        objWind.showDialog('process_importpdf');
        
    }

}

function setSourceWind(idwind){

	if(GPageId==''){return false;}
    if(GlobalUid==-1){return false;}
    
    var obj = CLudis[GlobalUid];
    
    processSrcWind(idwind,obj,'A');
    processSrcWind(idwind,obj,'B');
    processSrcWind(idwind,obj,'C');
    processSrcWind(idwind,obj,'D');

	closePan();
	
	placeEditZone(GlobalUid);
	reloadObject(GlobalUid);
	showWiziZone();
    eventObjects = true;
    
}

function setParamsWind(idwind,processName){

	if(GPageId==''){return false;}

    processSrcParams(idwind,'A');
    processSrcParams(idwind,'B');
    processSrcParams(idwind,'C');
    processSrcParams(idwind,'D');

    closePan();
    eventObjects = true;

    var fnName = processName.replace('process_','exec_');
    if(typeof window[fnName] != "undefined"){
        var fn = window[fnName];
        if (typeof fn === "function") fn.apply(null, null);
    }else{
        alert("Error [" + fnName + "] not find !")
    }
    
}

function processSrcWind(idwind,obj,letter){

    var fieldValue = $('#field' + letter + idwind).val();
    var target = $('#field' + letter + idwind).attr("target");
    var rules  = $('#field' + letter + idwind).attr("rules");
    
    switch(rules) {
        case "ratioid":
        fieldValue = getRatioIdent(fieldValue);
            break;
        default:
    }

    switch(target){
        case "text":
            obj.text = fieldValue;
            break;
        case "text2":
            obj.text2 = fieldValue;
            break;
        case "text3":
            obj.text3 = fieldValue;
            break;
        case "text4":
            obj.text4 = fieldValue;
            break;
        case "text5":
            obj.text5 = fieldValue;
            break;
        case "text6":
            obj.text6 = fieldValue;
            break;
        case "val2":
            obj.val2 = fieldValue;
            break;
        case "fontSize":
            obj.fontSize = fieldValue;
            break;
        default:
    }

}

function processSrcParams(idwind,letter){

    var fieldValue = $('#field' + letter + idwind).val();

    if($('#field' + letter + idwind).attr("type")=='checkbox'){
        if($('#field' + letter + idwind).is(':checked')){
            fieldValue = 1;
        }else{
            fieldValue = 0;
        }
    }

    var target = $('#field' + letter + idwind).attr("target");
    var rules  = $('#field' + letter + idwind).attr("rules");
    
    switch(rules) {
        case "ratioid":
            fieldValue = getRatioIdent(fieldValue);
            break;
        default:
    }

    getParamsGlobal(target,"text").value = fieldValue;
    
}

function getRatioIdent(str){
    
    str = str.replace(/ /g, '');
    str = str.replace(/é/g, 'e');
    str = str.replace(/è/g, 'e');
    str = str.replace(/ô/g, 'e');
    str = replaceAllWind(str,"[^a-zA-Z0-9\\.\\-]", "_");

    return str;
}

function replaceAllWind(str, find, replace) {
    return str.replace(new RegExp(find), replace);
}