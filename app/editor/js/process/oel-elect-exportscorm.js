
function exportToScorm(lms,msc,autc,title){

	$('.opacedit').css("display","block");
	$("#barreGeneration").css("display","block");
	$('.barreProgress').css("width","10%");

	setTimeout(function(){
		$('.barreProgress').css("width",'40%');
	},500);

	setTimeout(function(){
		$('.barreProgress').css("width",'60%');
	},700);

	setTimeout(function(){
		exportToScormSecond(lms,msc,autc,title);
	},1200);

}

function exportToScormSecond(lms,msc,autc,title){
	
	var remote = require('electron').remote;
	var dialog = remote.dialog;
	var ipc = require('electron').ipcRenderer;

	if(haveRenderProcess()){

		setTimeout(function(){
			exportToScorm(lms,msc,autc,title);
		},1000);

	}else{
		
		var filepath = dialog.showSaveDialogSync({
			title: 'save package',
			filters: [{
				name: 'file',extensions: ['zip']
			}]
		});
		
		if(typeof filepath === "undefined") {
			filepath = '';
		}

		if(filepath!=''){

			ipc.send('message',{key:'export',path:filepath,typlms:lms,ms:msc,acpl:autc,title:title})
			
			$('.barreProgress').css("width",'99%');

			setTimeout(function(){
				
				$("#barreGeneration").css("display","none");

				let obj = {type:"process_infos"};
				constructWindEdit(obj);
				
				if(lms=='moodle'){
					var m = '<p><span style="font-weight:bold;">Next&nbsp;step&nbsp;:&nbsp;';
					m += '</span>Import the package to Moodle<br><br>';
					m += '1.&nbsp;Then either with editing turned on,<br>';
					m += '<img src="images/edit-turn-on.jpg" /><br><br>';
					m += '2.&nbsp;Select "add an activity > SCORM/AICC", choose the SCORM course format '; 
					m += 'and you will be prompted to upload it there.<br>';
					m += '<img src="images/moodle-scorm.jpg" /><br><br>';
					m += '3. Click on "Add"<br></p>';
					$("#htmlinfos").html(m);
				}
				if(lms=='chamilo'){
					var c = '<p><span style="font-weight:bold;">Next&nbsp;step&nbsp;:&nbsp;';
					c += '</span>Import the package to Chamilo<br><br>';
					c += '1.&nbsp;Open "learningpath tool" in a course,<br>';
					c += '<img src="images/learningpath.jpg" /><br><br>';
					c += '2.&nbsp;Select "Import SCORM course" and you will be prompted to upload it there.<br>';
					c += '<img src="images/learningpath2.jpg" /><br><br>';
					c += '3. Click on "Upload"<br></p>';
					$("#htmlinfos").html(c);
				}
			},500);

		}


	}
	
}
