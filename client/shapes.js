
Template.shapes.shapes = function () {
	return Shapes.find();
};

Template.shapes.events({
	
	'click #shapes div': function(event){
		
		event.preventDefault();
	
		var div = $(event.currentTarget);
		
		div.svg('destroy');
		
		var dir_id = div.attr('id');
		
		//log(id);
		
		var typey = new Typeling();
		
		
		function after_birth(err, id){
			
			typey.render('#' + dir_id);	
		}
		
		typey.spawn(after_birth);
		
		
		
		
		
		//typey.store();
		
		//console.log(typey.svg.toSVG());
		
		
	},
	
	
	'click #logo': function(event){
		
		
		
		
		
	}

	
});






