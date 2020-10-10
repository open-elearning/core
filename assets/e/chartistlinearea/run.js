
function onPaint(obj){
	
	var h = '<div style="border-bottom:dotted 1px gray;text-align:center;" ';
	h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" >';
	h += '<img class="graphdatelineload" src="data/graphdatelineload.gif" /></div>';
	
	setTimeout("appliqueChartLineArea(" + obj.id + ")",2000);
	
	return h;
	
}

function appliqueChartLineArea(i){
	
	$(".graphdatelineload").css("display","none");
	
	if(Chartist){
		
		var obj = CObjets[i];
		
		var mychart = new Chartist.Line('#bloc' + i, {
		  labels: [1, 2, 3, 4],
		  series: [
			[1, 2, 3, 4]
		  ]
		}, {
		  low: 0,
		  showArea: true
		});
		
		
		var data2 = {
		  labels: ['part1','part2','part3'],
		  series: [[15, 3, 4]]
		};
		
		var tl1 = obj.fields[0];
		var d1 = obj.fields[1];
		
		if(tl1&&d1){
			if(tl1.indexOf(',')!=-1&&d1.indexOf(',')!=-1){
				data2.labels = tl1.split(',');
				data2.series[0] = d1.split(',');		
			}
		}
		if(data2.labels.length==data2.series[0].length){
			mychart.update(data2);
		}
		
		
		
		
	}
	
}

function onZoom(obj){

}

function isOK(obj){
	return true;
}
