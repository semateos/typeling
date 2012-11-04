Shapes = new Meteor.Collection("shapes");

Template.import.events({
	
	'click #btn_import' : function (event) {
		
		var value = $('#import textarea').val();
		
		//var strings = value.split("\n");
		
		var svg = $(value);
		
		var glyphs = svg.find('glyph');
		
		glyphs.each(function(i, glyph){
			
			var d_string = $(glyph).attr('d');
			
			if(d_string != undefined){
				
				Shapes.insert({d : d_string}, function(err,id){
				
					Client.log("inserted: " + id);
				});
			}
		});
		
		//remove all shapes
		/*Shapes.remove({}, function(err){
			
			if(err){
				
				Client.log('error removing shapes: ' + err);
			}
		});*/
		
		
		
		
		/*
		$.each(strings, function(i, d_string){
			
			Client.log(d_string);
			
			Shapes.insert({d : d_string}, function(err,id){
				
				Client.log("inserted: " + id);
			});
		});*/
		
	}
});