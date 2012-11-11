
var Typeling = Backbone.Model.extend({
	
	chars: null,
	styles: null,
	svg: null,
	container: null,
	container_id: null,
	
	initialize: function(id){
		
		var self = this;
		
		self.container_id = id;
		
		self.container = $('#' + id);
		
		self.container.svg();
		
		self.svg = self.container.svg('get');
		
		self.chars = Shapes.find().fetch();
		
		self.width = self.container.width();
		
		//log(self.width);
		
	},
	
	//makes a new random svg image
	generate: function() {
		
		var self = this;
		
		self.svg = self.container.svg('get');
		
		self.styles = Array();
		
		for(var i = 0; i < 4; i++){
			
			self.styles[i] = self.svg.style('.' + self.container_id + '-color-' + i + ' { fill: ' + randHex() + ' }', {id: self.container_id + '-color-' + i});
		}
		
		for(var i = 0; i < 100; i++){
			
			self.mutate();
		}
	},
	
	mutate: function(){
		
		var self = this;
	
		self.svg = self.container.svg('get');
		
		var svg = self.svg;
		
		var gs = self.container.find('g');
		
		var styles = self.styles;
		
		var chars = self.chars;
		
		var g = randFrom(gs);
		
		switch(rand(0,9) ){
			
			case 0:
				
				//remove a group
				
				$(g).remove();
				
				break;
			
			case 1:
				
				//add a group
				
				g = svg.group(randFrom(gs,true));
				
			case 2:
				
				//change rotation
				
				$(g).attr('transform', 'rotate(' + rand(0,90) + ')');
				
				break;
			
			case 3:
				
				//change scale
				
				$(g).attr('transform', 'scale(' +  Math.random() + ')');
				
				break;	
			
			case 4:
				
				//change translation
				
				$(g).attr('transform', 'translate(' +  rand(0,self.width ) + ',' +  rand(0,self.width ) + ')');
				
				break;
				
			case 5:
				
				//change class
				
				$(g).attr('class', self.container_id + '-color-' + rand(0,3));
				
				break;
			
			case 6:
				
				//mutate a path
				
				var ps = self.container.find('p');
				
				var p = randFrom(ps);
				
				$(p).attr('d', randFrom(chars).d);
			
				break;
				
			case 7:
				
				//remove a path
				
				var ps = self.container.find('p');
				
				var p = randFrom(ps);
				
				$(p).detach();
				
				break;
				
			
			case 8:
				
				//change a color
				
				var i = rand(0,3);
							
				$("#" + self.container_id + "-color-" + i).remove();
				
				svg.style('.' + self.container_id + '-color-' + i + ' { fill: ' + randHex() + ' }', {id: self.container_id + '-color-' + i});
				
				break;
				
			
			default:
			
				//add a path
				
				svg.path(g, randFrom(chars).d, {class: self.container_id + '-color-' + rand(0,3), stroke: 'none'});
				
				break;
		
		}
		
		
		
		return svg;
	
	}
	
	
});
