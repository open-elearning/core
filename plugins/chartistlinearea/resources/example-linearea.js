

var mychart = new Chartist.Line('.ct-chart', {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [
    [5, 9, 7, 8, 5, 3, 5, 4]
  ]
}, {
  low: 0,
  showArea: true
});


function UpdateFromInput(){
	
	var tl1 = $("#lab1").val();
	var d1 = $("#d1").val();
	
	if(tl1&&d1){
		if(tl1.indexOf(',')!=-1&&d1.indexOf(',')!=-1){
			
			var data2 = {
			  labels: ['part1', 'part2', 'part3'],
			  series: [[15, 3, 4]]
			};
			
			data2.labels = tl1.split(',');
			data2.series[0] = d1.split(',');
			
			if(data2.labels.length==data2.series[0].length){
				mychart.update(data2);
			}
			
		}
	}
	setTimeout(function() {
		UpdateFromInput();
	},1000);
	
}

setTimeout(function() {
	UpdateFromInput();
}, 1000);
