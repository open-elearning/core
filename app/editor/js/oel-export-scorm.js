
function lauchExportsScorm(){
    
    closeMove();
	
	$('.barreProgress').css("width","0%");

	eventPages = true;
	eventObjects = true;
	
	createRenderJSON();
	
    var objTitleScorm = getParamsGlobal("titleScorm","text");
    if(objTitleScorm.value==''){
        objTitleScorm.value = "Title of content";
    }
    var objSelectScorm = getParamsGlobal("selectScorm","text");
    if(objSelectScorm.value==''){
        objSelectScorm.value = "moodle";
    }
    var objScoreMasterScorm = getParamsGlobal("scoreMasterScorm","text");
    if(objScoreMasterScorm.value==''){
        objScoreMasterScorm.value = '80';
    }
    var objStatusScorm = getParamsGlobal("statusScorm","text");
    if(objStatusScorm.value==''){
        objStatusScorm.value = 1;
    }
    
    $('.opacedit').css("display","block");
    
    setTimeout(function(){
        launchProcessRender();
        let obj = {type:"exportsScorm"};
        constructWindEdit(obj);
    },400);

}

function exec_ExportsScorm(){

    var title = getParamsGlobal("titleScorm","text").value;
    var lms = getParamsGlobal("selectScorm","text").value;
    var msc = getParamsGlobal("scoreMasterScorm","text").value;
    var autc = getParamsGlobal("statusScorm","text").value;

    //alert("exec_ExportsScorm "  + title + " " + lms + " " + msc + " " + autc);

    exportToScorm(lms,msc,autc,title);

}