
var globalAnimChoice = 0;

function showEditAnim(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var obj = CLudis[GlobalUid];
	
	$('.opacedit').css("display","block");
	$('#editAnim').css("display","block");
	
	$('.toolAnimBl').css('background-color','transparent');
	
	if (typeof obj.anim === "undefined") {obj.anim = 1;}
	
	if(obj.anim==0||obj.anim==1){
	$('.toolAnim01').css('background-color','#BCF5A9');}
	if(obj.anim==3){
	$('.toolAnim03').css('background-color','#BCF5A9');}
	if(obj.anim==4){
	$('.toolAnim04').css('background-color','#BCF5A9');}
	if(obj.anim==5){
	$('.toolAnim05').css('background-color','#BCF5A9');}
	if(obj.anim==12){
	$('.toolAnim12').css('background-color','#BCF5A9');}
	if(obj.anim==17){
	$('.toolAnim17').css('background-color','#BCF5A9');}
	if(obj.anim==18){
	$('.toolAnim18').css('background-color','#BCF5A9');}
	globalAnimChoice = obj.anim;
}

function saveAnimChoice(){
	if(GlobalUid==-1){
		return false;
	}
	var obj = CLudis[GlobalUid];
	obj.anim = 	globalAnimChoice;
	closeEdit();
}

function showClickAnim(i,elm){
	globalAnimChoice = i;
	$('.toolAnimBl').css('background-color','transparent');
	elm.style.backgroundColor = '#BCF5A9';
}

function animEditObject(){
	
	var p = '';
	p += '<div id="editAnim" class="editAnim pan ' + TYPEWIND + 'osBorder" >';
	
	p += '<div class="toolbar-w toolbar-header">';
	p += '<div onClick="closeEdit();" class="closehead" ></div>';
	p += '<h1 class="titlehead">Animation</h1>';
	p += '</div>';
	
	p += '<div id="editAnimList" class="editAnimList" >';
	
	p += '<div onClick="showClickAnim(1,this);" class="toolAnim01 toolAnimBl" ></div>';
	p += '<div onClick="showClickAnim(3,this);" class="toolAnim03 toolAnimBl" ></div>';
	p += '<div onClick="showClickAnim(4,this);" class="toolAnim04 toolAnimBl" ></div>';
	p += '<div onClick="showClickAnim(5,this);" class="toolAnim05 toolAnimBl" ></div>';
	p += '<div onClick="showClickAnim(12,this);" class="toolAnim12 toolAnimBl" ></div>';
	p += '<div onClick="showClickAnim(17,this);" class="toolAnim17 toolAnimBl" ></div>';
	p += '<div onClick="showClickAnim(18,this);" class="toolAnim18 toolAnimBl" ></div>';
	
	p += '</div>';
	
	p += '<a style="position:absolute;right:10px;bottom:10px;" ';
	p += ' onClick="saveAnimChoice();" class="btnSave">Save</a>';
	
	p += '</div>';	
	
	return p;
	
}

