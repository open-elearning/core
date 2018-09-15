
function onPaint(obj){
	
	var h = '<div style="border-bottom:dotted 1px gray;text-align:center;" ';
	h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" >';
	h += '<img class="graphdatelineload" src="data/graphdatelineload.gif" /></div>';
	

	setTimeout("appliqueChartDateLine(" + obj.id + ")",2000);
	
	return h;
	
}

function appliqueChartDateLine(i){
	
	$(".graphdatelineload").css("display","none");
	
		if(Chartist){
		
		var obj = CObjets[i];
		
		var dateFields = [1,2,3,4,5,6,7,8,9,10,11,12];
		
		var base1 = obj.fields[0].split(',');
		if(base1!=''&&base1.length>5){
			dateFields[0] = base1[0];
			dateFields[1] = base1[1];
			dateFields[2] = base1[2];
			dateFields[3] = base1[3];
			dateFields[4] = base1[4];
			dateFields[5] = base1[5];
		}
		
		var base2 = obj.fields[1].split(',');
		if(base2!=''&&base2.length>5){
			dateFields[6] = base2[0];
			dateFields[7] = base2[1];
			dateFields[8] = base2[2];
			dateFields[9] = base2[3];
			dateFields[10]= base2[4];
			dateFields[11]= base2[5];
		}

		var data = {
		  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			series: [dateFields]
		};

		var options = {
		  seriesBarDistance: 15
		};

		var responsiveOptions = [
		  ['screen and (min-width: 641px) and (max-width: 1024px)', {
			seriesBarDistance: 10,
			axisX: {
			  labelInterpolationFnc: function (value) {
				return value;
			  }
			}
		  }],
		  ['screen and (max-width: 640px)', {
			seriesBarDistance: 5,
			axisX: {
			  labelInterpolationFnc: function (value) {
				return value[0];
			  }
			}
		  }]
		];

		new Chartist.Bar('#bloc' + i, data, options, responsiveOptions);
	
	}
	
}

function onZoom(obj){

}

function isOK(obj){
	return true;
}
