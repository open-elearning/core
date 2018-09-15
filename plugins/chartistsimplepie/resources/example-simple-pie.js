

var data = {
  labels: ['Bananas', 'Apples', 'Grapes'],
  series: [5, 3, 4]
};


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

var cpie = new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
 
function UpdateFromInput(){
	
	var tl1 = $("#lab1").val();
	var d1 = $("#d1").val();
	
	if(tl1&&d1){
		if(tl1.indexOf(',')!=-1&&d1.indexOf(',')!=-1){
			
			var data2 = {
			  labels: ['part1', 'part2', 'part3'],
			  series: [15, 3, 4]
			};
			
			data2.labels = tl1.split(',');
			data2.series = d1.split(',');
			
			if(data2.labels.length==data2.series.length){
				cpie.update(data2);
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
