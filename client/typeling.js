Typelings = new Meteor.Collection("typelings");

Client = new Object();

Client.log = function(text){
	
	if (typeof console !== 'undefined'){
		
		console.log(text);
	}
}


Session.set('typing', false);

Template.hello.typelings = function () {
	return Typelings.find();
};

Template.hello.events({
	
	'click #canvas' : function (event) {
		
		Client.log("You clicked the canvas at " + event.pageX + "," + event.pageY);
		
		if(!Session.get('typing')){
			
			Session.set('typing', true);
			
			var $canvas = $('#canvas');
		
			var $input = $('<input type="text" style="top:' + event.pageY + 'px;left:' + event.pageX + 'px;" />');
			
			$canvas.append($input);
			
			$input.focus();
			
		}else{
			
			Session.set('typing', false);
		}	
	},
	
	'keypress' : function (event){
		
		if(event.keyCode == 13){
			
			Client.log('return pressed');
			
			$('#canvas input').blur();
		}	
	},
	
	'click #canvas input' : function (event) {
		
		Session.set('typing', true);
		
		event.stopPropagation();
	},
	
	'blur #canvas input' : function (event) {
		
		var $input = $(event.target);
		
		Client.log("You stoped typing: " + event.target.value + ' position: ' + $input.css('left') + ',' + $input.css('top'));
		
		var text = event.target.value;
		
		if(text == ''){
			
			$input.detach();
		}
		
		var id = $input.attr('id');
		
		if(id != undefined){
			
			if(text == ''){
				
				Typelings.remove({_id:id}, function(err){
					
					Client.log("removed: " + id);
				
				});
			
			}else{
			
				Typelings.update({_id:id}, {$set: {text : event.target.value}}, function(err){
					
					Client.log("updated: " + id);
				
				});
			}
			
		}else{
				
			Typelings.insert({text : event.target.value, top : $input.css('top'), left : $input.css('left') }, function(err,id){
				
				Client.log("inserted: " + id);
				
				$input.detach();
				
			});
		}
		
	}
});






