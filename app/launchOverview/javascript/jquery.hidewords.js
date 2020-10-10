
var lastSelectW = "";
var lastSelectI = 0;
var lastSelectJ = 0;

var wordSelectI = 0;
var wordSelectJ = 0;

var motsColl = [];
var startColl = [];
var endColl = [];
var wordIsOkColl = [];

var NumLetterColl = [];
var modeColl = [];

var tableMemColl = [];

var variablesGLOB = "";
var hidewordisok = 0;
var onMoveHideWord = false;
var onDownHideWord = false;

(function($){
	
    $.fn.extend({

            hideWords: function(options) {  
            
            var navigateur = '';
            
            if(navigator.userAgent.indexOf("MSIE 6") != -1){
              navigateur = 'IE6';
            }
            if(navigator.userAgent.indexOf("Firefox") != -1){
              navigateur = 'FIREFOX';
            }
            
            var defaults = { large: "25" , words: "FASTWEB" , width: "300", height: "300" };
            var options = $.extend(defaults, options);  
            
            $(this).css('border', 'solid 1px white');
            $(this).css('margin', '1px');
            
            $(this).css('margin', '0px' );
            $(this).css('padding', '0px'  );
			
            tableMemColl = [];
        	
			var $this = $(this);
        	
            var nbx = parseInt(parseInt(options.width)/(parseInt(options.large))) ;
            var nby = parseInt(parseInt(options.height)/(parseInt(options.large))) ;
			
            var i=0;
            var j=0;
            
            hidewordisok = 0;
            
            var ligne = "";
            
			wordIsOkColl[0] = 0;
			motsColl[0] = "";
			startColl[0] = "";
			endColl[0] = "";
			NumLetterColl[0] = 0;
            modeColl[0] = 0;
			
			wordIsOkColl[1] = 0;
			motsColl[1] = "";
			startColl[1] = "";
			endColl[1] = "";
			NumLetterColl[1] = 0;
			modeColl[1] = 0;
			
			wordIsOkColl[2] = 0;
			motsColl[2] = "";
			startColl[2] = "";
			endColl[2] = "";
			NumLetterColl[2] = 0;
			modeColl[2] = 0;
			
			modeColl[0] = returnMode();
			modeColl[1] = returnMode();
			modeColl[2] = returnMode();
			
			if(modeColl[1]==modeColl[0]){modeColl[1]=returnMode();}
			if(modeColl[1]==modeColl[0]){modeColl[1]=returnMode();}
			if(modeColl[1]==modeColl[0]){modeColl[1]=returnMode();}
			if(modeColl[1]==modeColl[0]){modeColl[1]=returnMode();}
			if(modeColl[1]==modeColl[0]){modeColl[1]=returnMode();}
			if(modeColl[1]==modeColl[0]){modeColl[1]=returnMode();}
			
			if(modeColl[2]==modeColl[0]||modeColl[2]==modeColl[1]){modeColl[2]=returnMode();}
			if(modeColl[2]==modeColl[0]||modeColl[2]==modeColl[1]){modeColl[2]=returnMode();}
			if(modeColl[2]==modeColl[0]||modeColl[2]==modeColl[1]){modeColl[2]=returnMode();}
			if(modeColl[2]==modeColl[0]||modeColl[2]==modeColl[1]){modeColl[2]=returnMode();}
			if(modeColl[2]==modeColl[0]||modeColl[2]==modeColl[1]){modeColl[2]=returnMode();}
			if(modeColl[2]==modeColl[0]||modeColl[2]==modeColl[1]){modeColl[2]=returnMode();}
			
			var coll = parseWords(options.words);
		    motsColl[0] = coll[0];	    
			motsColl[1] = "";
			motsColl[2] = "";
			if(parseInt(coll.length)>1){
				motsColl[1] = coll[1];
			}
			if(parseInt(coll.length)>2){
				motsColl[2] = coll[2];
			}
				
            ligne = '<table id="HIDESWORDS" style="border:solid 0px red;float:left;" >';
            
            for (i=0;i<=(nby-1);i++)
            {
			
				j=0;
                
				ligne = ligne + '<tr>';
            
				for (j=0;j<=(nbx-1);j++)
				{
					
					var specolor = "";
					var motaff = returnLetterAff(i,j,0,nbx,nby);
					if(motaff==""){
						motaff = returnLetterAff(i,j,1,nbx,nby);
					}
					if(motaff==""){
						motaff = returnLetterAff(i,j,2,nbx,nby);
					}
					
					if(motaff==""){
						motaff = returnRandomLetter();
					}else{
						specolor = "background:#F5ECCE;";
						specolor = "background:white";
					}
					
					var IDstr = 'CELL' + j + '_' + i ;
					
					tableMemColl[IDstr] = true;
					
					var actionstr = "TraiteCase(" + j + "," + i + ");";
					
					var stylenoselect = "-moz-user-select: none;-khtml-user-select: none;user-select: none;" + specolor;
					
					ligne = ligne + '<td id="' + IDstr + '" ';
					
					ligne = ligne + ' onMouseDown="' + actionstr + 'onDownHideWord=true;" ';
					//onMoveHideWord=true;
					var actionbrillance = "if(onDownHideWord){onMoveHideWord=true;brillance(" + j + "," + i + ");}";
					
					ligne = ligne + ' onMouseMove="' + actionbrillance + '" ';
					
					ligne = ligne + ' onMouseUp="if(onMoveHideWord){' + actionstr + ';wordSelectI=-1;whiteAllTD();onDownHideWord=false;onMoveHideWord=false;}" ';
					
					ligne = ligne + 'style="font-weight:bold;font-size:' + parseInt(parseInt(options.large)/2) + 'px;cursor:pointer;border:solid 1px gray;color:black;text-align:center;' + stylenoselect + '" >' + motaff.toUpperCase() + '</td>';
					
				}
                
                ligne = ligne + '</tr>';
                
            }
            
            ligne = ligne + '</table>';
      
            $(this).append(ligne);
             	      
            $("#HIDESWORDS").css('width', options.width + 'px' );
            $("#HIDESWORDS").css('height', options.height + 'px' );
            
            return this;
        }  
    
    });

  	function returnRandomLetter() {
		
		var randomnumber=Math.floor(Math.random()*26);
		if(randomnumber==0){randomnumber=1;}
		var lettres = "ABCDEFTGHIJKLMNOPQRSTUVWXYZAX";
		return lettres.substr(randomnumber, 1);
    
	}
    
    function returnMode() {
		
		var randomnumber=Math.floor(Math.random()*8);
		
		if(randomnumber==0){randomnumber=1;}
		if(randomnumber==8){randomnumber=7;}
		
		return randomnumber;
		
    }
	
  	function parseWords(data){
		
		var parsed = [];
		
		if(data.indexOf(";")!=-1){
			parsed = data.split(";");
		}
		if(data.indexOf("|")!=-1){
			parsed = data.split("|");
		}
		
		return parsed;
		
	}
  	
})(jQuery);

	function returnLetterAff(i,j,index,nbx,nby){
		
		var motaff = "";
		var mot1 = motsColl[index];
		var mode1 = modeColl[index];
		
		if(mot1==""){
			return "";
		}
		
		//MODE 1 H
		if(mode1==1){
			if(i==1&&j>1&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
		}
		
		//MODE 2 V
		if(mode1==2){
			if(i>1&&j==1&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
		}
		
		//MODE 3 D
		if(mode1==3){
		  
			if(i>0&&j==i&&NumLetterColl[index]<mot1.length){

				if(NumLetterColl[index]==0){
				  startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
				  endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
		  
		}
		
		//MODE 4 V
		if(mode1==4){
			if(i>0&&j==(nbx-1)&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
		}
		
		//MODE 5 H
		if(mode1==5){
			
			if(i==(nby-1)&&j>0&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
			
		}
		
		//MODE 6 H
		if(mode1==6){
		
			if(i==(nby-2)&&j>0&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
		
		}
		
		//MODE 7 D
		if(mode1==7){
		
			if(i>2&&j==(i-1)&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1;
			}
		  
		}
		
		//MODE 8 H
		if(mode1==8){
			if(i==0&&j>1&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
		}
		
		//MODE 9 V
		if(mode1==9){
			if(i>0&&j==0&&NumLetterColl[index]<mot1.length){
				if(NumLetterColl[index]==0){
					startColl[index] = "CELL" + j + "_" + i;
				}
				if(NumLetterColl[index]==(mot1.length-1)){
					endColl[index] = "CELL" + j + "_" + i;
				}
				motaff = mot1.substr(NumLetterColl[index], 1);
				NumLetterColl[index] = NumLetterColl[index] + 1 ;
			}
		}
		
		return motaff;
    
	}
	


	function brillance(j,i){
		
		if(wordSelectI==-1){
			return false;
		}
		
		var rat1 = (wordSelectJ+1)-(wordSelectI+1);
		var rat2 = (j+1)-(i+1);
		
		var rat3 = (wordSelectJ+1)+(wordSelectI+1);
		var rat4 = (j+1)+(i+1);
		
		//Diagonale
		if(rat1==rat2||rat3==rat4){
			
			whiteAllTD();
			
			if(j>wordSelectJ&&i>wordSelectI){
				var pj = j;
				var pi = i;
				for(pj=j;pj>wordSelectJ;pj--) {
					var IDstr = "CELL" + pj + "_" +  pi ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
					pi = pi - 1;
				}
			}
			if(j>wordSelectJ&&i<wordSelectI){
				var pj = j;
				var pi = i;
				for(pj=j;pj>wordSelectJ;pj--) {
					var IDstr = "CELL" + pj + "_" +  pi ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
					pi = pi + 1;
				}
			}
			
			if(j<wordSelectJ&&i>wordSelectI){
				var pj = j;
				var pi = i;
				for(pj=j;pj<wordSelectJ;pj++) {
					var IDstr = "CELL" + pj + "_" +  pi ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
					pi = pi - 1;
				}
			}
			if(j<wordSelectJ&&i<wordSelectI){
				var pj = j;
				var pi = i;
				for(pj=j;pj<wordSelectJ;pj++) {
					var IDstr = "CELL" + pj + "_" +  pi ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
					pi = pi + 1;
				}
			}
			
			var IDone = "CELL" + wordSelectJ + "_" +  wordSelectI ;
			if(tableMemColl[IDone]){
				if(document.getElementById(IDone).style.backgroundColor!="black"){
					document.getElementById(IDone).style.backgroundColor = "#0080FF";
				}
			}
			
		}
		
		if(wordSelectI==i){
			
			whiteAllTD();
			
			if(j>wordSelectJ){
				var pj = j;
				for(pj=j;pj>wordSelectJ;pj--) {
					var IDstr = "CELL" + pj + "_" +  i ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
				}
			}
			
			if(j<wordSelectJ){
				var pj = j;
				for(pj=j;pj<wordSelectJ;pj++) {
					var IDstr = "CELL" + pj + "_" +  i ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
				}
			}
			
			var IDone = "CELL" + wordSelectJ + "_" +  wordSelectI ;
			if(document.getElementById(IDone).style.backgroundColor!="black"){
				document.getElementById(IDone).style.backgroundColor = "#0080FF";
			}

		}
		
		if(wordSelectJ==j){
			
			whiteAllTD();
			
			if(i>wordSelectI){
				var pi = i;
				for(pi=i;pi>wordSelectI;pi--){
					var IDstr = "CELL" + j + "_" +  pi ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
				}
				var IDone = "CELL" + wordSelectJ + "_" +  wordSelectI ;
				if(tableMemColl[IDstr]){
					if(document.getElementById(IDstr).style.backgroundColor!="black"){
						document.getElementById(IDone).style.backgroundColor = "#0080FF";
					}
				}
			}
			
			if(i<wordSelectI){
				var pi = i;
				for(pi=i;pi<wordSelectI;pi++){
					var IDstr = "CELL" + j + "_" +  pi ;
					if(tableMemColl[IDstr]){
						if(document.getElementById(IDstr).style.backgroundColor!="black"){
							document.getElementById(IDstr).style.backgroundColor = "#FE9A2E";
						}
					}
				}
				
				var IDone = "CELL" + wordSelectJ + "_" +  wordSelectI ;
				if(tableMemColl[IDstr]){
					if(document.getElementById(IDstr).style.backgroundColor!="black"){
						document.getElementById(IDone).style.backgroundColor = "#0080FF";
					}
				}
				
			}
			
		}
		
	}
	
    function TraiteCase(j,i){
		
		var IDstr = "CELL" + j + "_" +  i ;
		if(tableMemColl[IDstr]==false){
			return false;
		}
			
		wordSelectI = i;
		wordSelectJ = j;
	  
		/*startColl[index];
		endColl[index];
		alert(IDstr + " - " + startW1);*/
		
		if(!document.getElementById(IDstr)){
			return false;
		}
		
		/*if(document.getElementById(IDstr).style.backgroundColor=="black"){
			EffaceAllTD();
			lastSelectW="";
			return false;
		}*/
		
		var cob = document.getElementById(IDstr);
		
		for (index=0;index<=2;index++){
			
			if(motsColl[index]==""){return;}
			
			/*if(IDstr!=startColl[index]&&IDstr!=endColl[index]){
				lastSelectW="";
			}*/
			
			//Premiére lettre mot
			if(IDstr==startColl[index]){
				
				if(lastSelectW==""){
				  
					lastSelectW = startColl[index];
					lastSelectI = i;
					lastSelectJ = j;
					cob.style.backgroundColor = "red";

				}else{

					if(lastSelectW!=endColl[index]){
						cob.style.backgroundColor = "white";
					}else{
						cob.style.backgroundColor = "green";
						colorW(i,j,lastSelectI,lastSelectJ,motsColl[index]);
					}
					lastSelectW="";
				}

			}
			
			//Deuxieme lettre mot
			if(IDstr==endColl[index]){

				if(lastSelectW==""){
						
				  lastSelectW = endColl[index];
				  lastSelectI = i;
				  lastSelectJ = j;
				  cob.style.backgroundColor = "red";
				  
				}else{
				  
				  if(lastSelectW!=startColl[index]){
					cob.style.backgroundColor = "white";
				  }else{
					cob.style.backgroundColor = "green";
					colorW(lastSelectI,lastSelectJ,i,j,motsColl[index]);
				  }
				  lastSelectW="";
				}

			}
			
		}
      
		if(lastSelectW==""){
			EffaceAllTD();
			if(cob.style.backgroundColor!="black"){
					cob.style.backgroundColor = "red";
			}
		}
		
    }
    
    function colorW(dj,di,fj,fi,strWord){
    
		variablesGLOB = variablesGLOB + 'WH_' + strWord;
		
		if(motsColl[0]==strWord||motsColl[0]==''){
			wordIsOkColl[0] = 1;
		}
		if(motsColl[1]==strWord||motsColl[1]==''){
			wordIsOkColl[1] = 1;
		}	
		if(motsColl[2]==strWord||motsColl[2]==''){
			wordIsOkColl[2] = 1;
		}
		
		//Si tout est OK
		if(wordIsOkColl[0]==1){
			if(wordIsOkColl[1]==1){
				if(wordIsOkColl[2]==1){
					hidewordisok = 1;
				}
			}
		}
		
      //diagonal
      if(dj!=fj&&di!=fi){
       var pj = dj;
       var pi = di;
        for (j=dj;j<=fj;j++)
        {
          var IDstr = "CELL" + pi + "_" +  pj ;
          document.getElementById(IDstr).style.backgroundColor = getForColor(strWord); 
          document.getElementById(IDstr).style.color = "white";
		  tableMemColl[IDstr] = false;
          pj++;
          pi++;
        }
      
      }
    
      //Horizontal
      if(dj==fj){
       
		var pj = dj;
		var pi = di;

		for (j=di;j<=fi;j++)
		{
			var IDstr = "CELL" + pi  + "_" + pj  ;

			document.getElementById(IDstr).style.backgroundColor = getForColor(strWord); 
			document.getElementById(IDstr).style.color = "white";
			tableMemColl[IDstr] = false;
			pi++;
		}
      
      }
      
	//Vertical
	if(di==fi){
		var pj = dj;
		var pi = di;
		for (j=dj;j<=fj;j++)
		{
			var IDstr = "CELL" + pi  + "_" + pj  ;
			document.getElementById(IDstr).style.backgroundColor = getForColor(strWord); 
			document.getElementById(IDstr).style.color = "white";
			tableMemColl[IDstr] = false;
			pj++;
		}
	}
    
    }
	
	function getForColor(strWord){
		
		if(motsColl[0]==strWord){
			return '#0B610B'
		}
		if(motsColl[1]==strWord){
			return '#B40404'
		}
		if(motsColl[2]==strWord){
			return '#08298A'
		}
		
	}
    
    function EffaceAllTD(){
    
        var x = document.getElementsByTagName('td');
    
        for(j=0;j<x.length;j++) {
        
          try{
				var IDstr = x[j].getAttribute('id')
				if(IDstr.indexOf('CELL')!=-1){        
                
					if(tableMemColl[IDstr]){
					
						if(x[j].style.backgroundColor!="black"){
						  x[j].style.backgroundColor="white";
						}
					}
				
				
              }
          }catch(err){}
            
        }
    
    } 

    function whiteAllTD(){
    
        var x = document.getElementsByTagName('td');
    
        for(j=0;j<x.length;j++) {
        
          try{
			var IDstr = x[j].getAttribute('id')
			  
			if(IDstr.indexOf('CELL')!=-1){
					
                if(tableMemColl[IDstr]){
					if(x[j].style.backgroundColor!="black"){
					  x[j].style.backgroundColor="white";
					}
				}
            }
          }catch(err){}
            
        }
    
    }   	
    
