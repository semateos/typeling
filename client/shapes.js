
Template.shapes.shapes = function () {
	return Shapes.find();
};

Template.shapes.events({
	
	'click #shapes': function(event){
		
		$('#shapes').svg('destroy'); 
		
		$('#shapes').svg();
		
		var svg = $('#shapes').svg('get'); 
		
		var chars = Shapes.find();
		
		var threshold = Math.random();
		
		chars.forEach(function(item){
			
			if(Math.random() > threshold){
			
				//Client.log(item.d);
			
				svg.path(null, item.d, {fill: 'red', stroke: 'none'});
			}
		});
	
	}

	
});


Template.shapes.rendered = function(){
	

	
	
}

