
Template.shapes.typelings = function () {
	return Typelings.find({}, {sort: ['$natural', -1]});
};

Template.shapes.events({
	
	'click #shapes div': function(event){
		
		event.preventDefault();
	
		var div = $(event.currentTarget);
		
		div.svg('destroy');
		
		var dir_id = div.attr('id');
		
		//log(id);
		
		var typey = new Typeling({container: '#' + dir_id});
		
		
		function after_birth(err, id){
			
			//typey.render('#' + dir_id);	
		}
		
		typey.replicate(after_birth);
		
		
		
		
		
		//typey.store();
		
		//console.log(typey.svg.toSVG());
		
		
	},
	
	
	'click #logo': function(event){
		
		var typey = new Typeling();
		
		
		function after_birth_2(err, id){
			
			//typey.render('#' + dir_id);	
		}
		
		typey.spawn(after_birth_2);
		
		/*var typey = new Typeling({container: '#shape-1'});
		
		for(var i = 0; i < 5; i++){
			
			typey.mutate();
		}*/		
		
	}

	
});






