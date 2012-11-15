
Template.shapes.typelings = function () {
	return Typelings.find({}, {sort: {created: -1}});
};

Template.shapes.events({
	
	'mouseover #shapes div': function(event){
		
		/*
		var div = $(event.currentTarget);
		
		var div_id = div.attr('id');
		
		$('#detail').html(div.html());
		*/
	},
	
	'click #shapes div': function(event){
		
		event.preventDefault();
	
		var div = $(event.currentTarget);
		
		var div_id = div.attr('id');
		
		$('#detail').html(div.html());
		
		var typey = new Typeling({container: '#' + div_id});
		
		function after_birth(err, id){
			
			//typey.render('#' + dir_id);	
		}
		
		for(var i = 0; i < 4; i++){
			
			typey.replicate(after_birth);
		}
		
		//typey.mutate();
		
		//typey.store();
		
		//console.log(typey.svg.toSVG());
	},
	
	
	'click #logo': function(event){
		
		
		function after_birth_2(err, id){
			
			//typey.render('#' + dir_id);	
		}
		
		for(var i = 0; i < 4; i++){
			
			var typey = new Typeling();
			
			typey.spawn(after_birth_2);
			
		}
		
	}

	
});






