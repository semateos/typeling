
var Typeling = Backbone.Model.extend({
	
	chars: null,
	styles: null,
	svg: null,
	container: null,
	container_id: null,
	
	
	defaults: {
		"id": null,
		"svg":  null,
		"age": 0,
		"clicks": 0,
		"fitness": 100
    },
	
	initialize: function(attr){
		
		var self = this;
		
		if(attr != undefined && attr.container != undefined){
			
			self.container = $(attr.container);
			
		}else{
			
			self.container = $('<div></div>');
		}
		
		
		if(attr != undefined && attr.svg != undefined){
			
			self.container.html(svg);
		}
		
		self.container.svg();
		
		self.svg = self.container.svg('get');
		
		self.svg.configure({width: '100%', height: '100%', viewBox: '0 0 2000 2000'}, true);
		
		self.chars = Shapes.find().fetch();
	},
	
	replicate: function(){
		
		var self = this;
		
		var svg = self.get('svg');

		var baby = new Typeling({svg: svg});
		
		for(var i = 0; i < 5; i++){
			
			baby.mutate();
		}
		
		baby.store(function(){});
			
	},
	
	store: function(callback){
		
		var self = this;
		
		var id = self.get('id');
		
		if(!id){
			
			Typelings.insert(self.toJSON(), callback);
			
		}else{
			
			Typelings.update({_id:id}, {$set: self.toJSON()}, callback);
		}
	},
	
	render: function(selector){
		
		var self = this;

		$(selector).html(self.container.html());
		
	},
	
	spawn: function(callback){
		
		var self = this;
		
		function after_birth(err, id){
			
			log("born id: " + id);
			
			self.set('id', id);
			
			//self.md5id = md5(id);
			
			self.generate();
			
			callback(err, id);
		}
		
		self.store(after_birth);
		
	},
	
	//makes a new random svg image
	generate: function() {
		
		var self = this;
		
		self.svg = self.container.svg('get');
		
		self.styles = Array();
		
		//var id = self.md5id;
		
		var id = self.get('id');
		
		//var id = self.cid;
		
		for(var i = 0; i < 4; i++){
			
			self.styles[i] = self.svg.style('.color-' + i + '-' + id + ' { fill: ' + randHex() + ' }', {id: 'color-' + i + '-' + id});
		}
		
		for(var i = 0; i < 100; i++){
			
			self.mutate();
		}
		
		function after_generate(err, id){}
		
		self.store(after_generate);
	},
	
	
	
	//performs a mutation on this svg image
	mutate: function(){
		
		var self = this;
	
		self.svg = self.container.svg('get');
		
		var svg = self.svg;
		
		//var id = self.cid;
		
		var id = self.get('id');
		
		var gs = self.container.find('g');
		
		var styles = self.container.find('style');
		
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
				
				//change translation
				
				$(g).attr('transform', 'translate(' +  rand(0,2000) + ',' +  rand(0,2000) + ')');
				
				break;
			
			case 3:
				
				//change scale
				
				$(g).attr('transform', 'scale(' +  Math.random() + ')');
				
				break;	
			
			case 4:
				
				//change rotation
				
				$(g).attr('transform', 'rotate(' + rand(0,90) + ')');
				
				break;
				
			case 5:
				
				//change class
				
				$(g).attr('class', 'color-' + rand(0,3) + '-' + id);
				
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
				
				
				var new_color = randHex();
				
				log('new color: ' + new_color);
				
				var i = rand(0,3);
				
				var style = styles[i];
				
				style.textContent = '.color-' + i + '-' + id + ' { fill: ' + new_color + ' }';
				
				//var style = svg.getElementById(id + "color-" + i + '-' + id);	
							
				//svg.change(style, {fill: new_color});
				
				//svg.style('.' + id + '-color-' + i + ' { fill: ' + randHex() + ' }', {id: id + '-color-' + i});
				
				
				break;
				
			
			default:
			
				//add a path
				
				svg.path(g, randFrom(chars).d, {class: 'color-' + rand(0,3) + '-' + id, stroke: 'none'});
				
				break;
		
		}
		
		var image = svg.toSVG();
		
		self.set('svg', image);	
	}
	
	
});
