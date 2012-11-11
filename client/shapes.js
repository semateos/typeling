
Template.shapes.shapes = function () {
	return Shapes.find();
};

Template.shapes.events({
	
	'click #shapes div': function(event){
		
		event.preventDefault();
	
		var div = $(event.currentTarget);
		
		div.svg('destroy');
		
		var id = div.attr('id');
		
		//log(id);
		
		var typey = new Typeling(id);
		
		typey.generate();
		
		
		
	},
	
	
	'click #logo': function(event){
		
		
		var typey = new Typeling('#shapes');
		
		for(var i = 0; i < 5; i++){
			
			typey.mutate();
			
		}
		
		
	}

	
});






