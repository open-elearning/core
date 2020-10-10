
(function($){

    $.fn.extend({

    animateImages: function(options) {  

	var timer;
	
	var defaults = { folder: "img" , loop: "true" };
	var options = $.extend(defaults, options);
	var $this = $(this);
	
	var coll = parseimages(options.data);
	var colldata = options.data;
	
	var tim = parseimages(options.time);
	var colltime = options.time;
	
	var i_time = 0;
	var i_full = coll.length - 1;
	var folder = options.folder;
	var i_delay = 0;
	var loop = options.loop;
	var isIMG =0;
	
	var randomnumber = Math.floor(Math.random()*10000);
	var randomnumber2 = Math.floor(Math.random()*10000);
	var randomnumber3 = Math.floor(Math.random()*10000);
	var idL = $this.attr('id') + randomnumber + randomnumber2 + randomnumber3;
	
		if(coll[0].indexOf('.png')!=-1||coll[0].indexOf('.gif')!=-1||coll[0].indexOf('.jpg')!=-1){
			var imgstr = '<img id="img' + idL + '" src="' + options.folder + "\/" + coll[0] + '" ';
			imgstr = imgstr + ' style="position:absolute;top:0px;left:0px;width:100%;height:100%;" />';
			isIMG=1;
			$this.append(imgstr);
		}

		var animImg = function(idL,colldata,colltime,i_time,i_delay,folder,loop){
		
			var coll = parseimages(colldata);
			var tim = parseimages(colltime);
			var i_full = coll.length - 1;
		
			if(document.getElementById('img' + idL )){

				if(i_time<i_full){
				
					var urlimage = appliqueImage(coll,folder,i_time);
					var urlimageIMG = folder + "\/" + coll[i_time];
					
					$('#img' + idL ).attr('src', urlimageIMG );
					
					if(i_delay>=tim[i_time]){
						i_delay = 0;
						i_time = i_time + 1;
					}else{
						i_delay = i_delay +1;
					}
					
				}else{
				   if(loop=="true"||loop=="True"||loop=="1"){
					   i_time = 0;
					   i_delay = 0;
				   }
				}
				
				setTimeout(function(){animImg(idL,colldata, colltime,i_time,i_delay,folder,loop);},100);
  
            }

		}
        
		setTimeout(function(){animImg(idL,colldata, colltime,i_time,i_delay,folder,loop);},100);
        
		return this;    
        
        }
    
    });
    
    function appliqueImage(coll,folder,i){
        var fileTrouve = coll[i];
        var imageUrl = "url(\"" + folder + "\/" + fileTrouve + "\")" ;    
        return $.trim(imageUrl);
    }

	function parseimages(data) {
		var parsed = [];
		parsed = data.split("|");
		return parsed;
	};

})(jQuery);
