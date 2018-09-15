
function onPaint(obj){
	
	var h = '<div style="border-bottom:dotted 1px gray;text-align:center;" ';
	h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" >';
	h += '<img class="graphdatelineload" src="data/graphdatelineload.gif" /></div>';
	

	setTimeout("appliqueChartSimplePie(" + obj.id + ")",2000);
	
	return h;
	
}

function appliqueChartSimplePie(i){
	
	$(".graphdatelineload").css("display","none");
	
	if(Chartist){
		
		var obj = CObjets[i];

		
		
		var data2 = {
		  labels: ['part1', 'part2', 'part3'],
		  series: [15, 3, 4]
		};
		
		var tl1 = obj.fields[0];
		var d1 = obj.fields[1];
		
		if(tl1&&d1){
			if(tl1.indexOf(',')!=-1&&d1.indexOf(',')!=-1){
				data2.labels = tl1.split(',');
				data2.series = d1.split(',');
			}
		}
		
		var options = {
		  labelInterpolationFnc: function(value) {
			return value[0]
		  }
		};

		var responsiveOptions = [
		  ['screen and (min-width: 640px)', {
			chartPadding: 60,
			labelOffset: 100,
			labelDirection: 'explode',
			labelInterpolationFnc: function(value) {
			  return value;
			}
		  }],
		  ['screen and (min-width: 1024px)', {
			labelOffset: 80,
			chartPadding: 60
		  }]
		];

		var cpie = new Chartist.Pie('#bloc' + i, data2, options, responsiveOptions);
				

	}
	
}

function onZoom(obj){

}

function isOK(obj){
	return true;
}
