
var Typeling = Backbone.Model.extend({
	
	chars: null,
	styles: null,
	svg: null,
	container: null,
	mutation_rate: 5,
	population_size: 32,
	colors: 2,
	
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
		
		var id = self.container.data('id');
		
		if(id != undefined){
			
			self.set('id', id);
		}
		
		
		if(attr != undefined && attr.svg != undefined){
			
			self.set_svg(attr.svg);
		}
		
		var svg_node = self.container.find('svg').first();
		
		if(svg_node[0] != undefined){
			
			svg_node.svg();
			
			self.svg = svg_node.svg('get');
			
			var svg_string = self.svg.toSVG();
			
			log('existing: ' + svg_string);
			
			self.set('svg', svg_string);
			
		}else{
			
			self.container.svg();
		
			self.svg = self.container.svg('get');
			
			self.svg.configure({width: '100%', height: '100%', viewBox: '0 0 2000 2000'}, true);
		}
		
		self.chars = Shapes.find().fetch();
	},
	
	
	cull: function(){
		
		var self = this;
		
		var count = Typelings.find().count();
		
		log('total: ' + count);
		
		if(count > self.population_size){
			
			var diff = count - self.population_size;
			
			log('culling: ' + diff);
			
			self.cull_oldest(diff);
		}
		
	},
	
	cull_oldest: function(n){
		
		var oldest = Typelings.find({}, {sort: {created: 1}, limit: n}).fetch();
		
		oldest.forEach(function(lamb){
			
			Typelings.remove({_id: lamb.id});
			
		});
		
	},
	
	
	set_svg: function(svg_string){
		
		var self = this;
		
		self.set('svg', svg_string);
		
		if(svg_string != null){
			
			//self.container.svg();
		
			//self.svg = self.container.svg('get');
		
			//self.svg.configure({width: '100%', height: '100%', viewBox: '0 0 2000 2000'}, true);
			
			self.container.html(svg_string);
			
			var svg_node = self.container.find('svg').first();
		
			if(svg_node[0] != undefined){
				
				svg_node.svg();
				
				self.svg = svg_node.svg('get');
			}
		}
	},
	
	replicate: function(){
		
		var self = this;
		
		var svg = self.get('svg');
		
		var parent_id = self.get('id');
		
		var baby = new Typeling();
		
		function after_replicate(err, baby_id){
			
			//replace id of parent with id of child
			
			log("born id: " + baby_id);
			
			baby.set('id', baby_id);
			
			var regex = new RegExp(parent_id,"g");
			
			var new_svg = svg.replace(regex, baby_id);
			
			//log(new_svg);
			
			baby.set_svg(new_svg);
			
			for(var i = 0; i < self.mutation_rate; i++){
				
				baby.mutate();
			}
			
			log('mutated baby');
			
			function after_after_replicate(err){
				
				log('updated' + err);
			}
			
			baby.store(after_after_replicate);
		}
		
		baby.store(after_replicate);
			
	},
	
	store: function(callback){
		
		var self = this;
		
		var id = self.get('id');
		
		if(!id){
			
			var values = self.toJSON();
			
			values.created = new Date();
			
			Typelings.insert(values, function(err, id){
				
				self.set('id', id);
				
				callback(err, id);
				
			});
			
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
		
		function after_birth_1(err, id){
			
			log("born id: " + id);
			
			self.set('id', id);
			
			//self.md5id = md5(id);
			
			self.generate();
			
			callback(err, id);
		}
		
		self.store(after_birth_1);
		
	},
	
	//makes a new random svg image
	generate: function() {
		
		var self = this;
		
		self.svg = self.container.svg('get');
		
		self.styles = Array();
		
		//var id = self.md5id;
		
		var id = self.get('id');
		
		//var id = self.cid;
		
		for(var i = 0; i < self.colors; i++){
			
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
	
		//self.set_svg(self.get('svg'));
			
		//self.svg = self.container.svg('get');
		
		var svg = self.svg;
		
		//log('mutation start: ' + svg.toSVG());
		
		//log('stored svg: ' + self.get('svg'));
		
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
				
				//change transform
				
				$(g).attr('transform', 'scale(' +  Math.random() * 4 + ')' + ' translate(' +  rand(0,4000)  + ',' +  rand(0,4000) + ')' + ' rotate(' + rand(0,360) + ')');
				
				break;
				
			case 3:
				
				//change class
				
				$(g).attr('class', 'color-' + rand(0,self.colors-1) + '-' + id);
				
				break;
			
			case 4:
				
				//mutate a path
				
				var ps = self.container.find('p');
				
				var p = randFrom(ps);
				
				$(p).attr('d', randFrom(chars).d);
			
				break;
				
			case 5:
				
				//remove a path
				
				var ps = self.container.find('p');
				
				var p = randFrom(ps);
				
				$(p).detach();
				
				break;
				
			
			case 6:
				
				//change a color
				
				var new_color = randHex();
				
				//log('new color: ' + new_color);
				
				var i = rand(0,self.colors-1);
				
				var style = styles[i];
				
				style.textContent = '.color-' + i + '-' + id + ' { fill: ' + new_color + ' }';
				
				break;
				
			
			default:
			
				//add a path
				
				if(g == undefined){
					
					g = svg.group(randFrom(gs,true));
				}
				
				svg.path(g, randFrom(chars).d, {class: 'color-' + rand(0,self.colors-1) + '-' + id, stroke: 'none'});
				
				$(g).attr('transform', 'scale(' +  Math.random() * 4 + ')' + ' translate(' +  rand(0,4000)  + ',' +  rand(0,4000)  + ')' + ' rotate(' + rand(0,360) + ')');
				
			
				break;
		
		}
		
		var image = svg.toSVG();
		
		//log('mutation end: ' + image);
		
		self.set('svg', image);	
	}
	
	
});
