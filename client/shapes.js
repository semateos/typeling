
Template.shapes.shapes = function () {
	return Shapes.find();
};

Template.shapes.events({
	
	'click #shapes': function(event){
		
		event.preventDefault();
		
		$('#shapes').svg('destroy'); 
		
		$('#shapes').svg();
		
		var svg = $('#shapes').svg('get'); 
		
		var chars = Shapes.find().fetch();
		
		var styles = Array();
		
		for(var i = 0; i < 4; i++){
			
			styles[i] = svg.style('.color-' + i + ' { fill: ' + randHex() + ' }', {id: 'color-' + i});
		}
		
		Session.set('styles', styles);
		
		for(var i = 0; i < 100; i++){
			
			mutate(svg);
			
		}
	},
	
	
	'click #logo': function(event){
		
		
		var svg = $('#shapes').svg('get');
		
		for(var i = 0; i < 5; i++){
			
			mutate(svg);
			
		}
		
		/*
		$('#shapes').svg('destroy'); 
		
		$('#shapes').svg();
		
		var svg = $('#shapes').svg('get'); 
		var colors = Session.get('colors');
		var chars = Shapes.find().fetch();
		
		var s0 = svg.style('.color-0 { fill: ' + randHex() + ' } ...');
		
		
		var g1 = svg.group();
		var g2 = svg.group();
		var g3 = svg.group();
		var g4 = svg.group();
		
		$(g1).attr('transform', 'rotate(' + rand(0,90) + ')');
		$(g2).attr('transform', 'scale(' + Math.random() + ')');
		$(g3).attr('transform', 'rotate(' + rand(0,90) + ')');
		$(g4).attr('transform', 'rotate(' + rand(0,90) + ')');
		
		var gs = $(svg.root).find('g');
		
		svg.path(randFrom(gs), randFrom(chars).d, {class: 'color-0', stroke: 'none'});
		//svg.path(randFrom(gs), randFrom(chars).d, {fill: randFrom(colors), stroke: 'none'});
		//svg.path(randFrom(gs), randFrom(chars).d, {fill: randFrom(colors), stroke: 'none'});
		//svg.path(randFrom(gs), randFrom(chars).d, {fill: randFrom(colors), stroke: 'none'});
		
		
		
		
		/*
		
		var threshold = Math.random();
		
		chars.forEach(function(item){
			
			if(Math.random() > threshold){
			
				//Client.log(item.d);
			
				svg.path(g1, item.d, {fill: colors[rand(0,3)], stroke: 'none'});
			}
		});
		
		*/
	}

	
});


function mutate(svg){
	
	var gs = $(svg.root).find('g');
	
	var styles = Session.get('styles');
	
	var chars = Shapes.find().fetch();
	
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
			
			$(g).attr('transform', 'translate(' +  rand(0,1000) + ',' +  rand(0,1000) + ')');
			
			break;
			
		case 5:
			
			//change class
			
			$(g).attr('class', 'color-' + rand(0,3));
			
			break;
		
		case 6:
			
			//mutate a path
			
			var ps = $(svg.root).find('p');
			
			var p = randFrom(ps);
			
			$(p).attr('d', randFrom(chars).d);
		
			break;
			
		case 7:
			
			//remove a path
			
			var ps = $(svg.root).find('p');
			
			var p = randFrom(ps);
			
			$(p).detach();
			
			break;
			
		
		case 8:
			
			//change a color
			
			var i = rand(0,3);
						
			$("#color-" + i).remove();
			
			svg.style('.color-' + i + ' { fill: ' + randHex() + ' }', {id: 'color-' + i});
			
			break;
			
		
		default:
		
			//add a path
			
			svg.path(g, randFrom(chars).d, {class: 'color-' + rand(0,3), stroke: 'none'});
			
			break;
	
	}
	
	
	
	return svg;
	
}


function rand(n1, n2){
	
	var r = n2 - n1;
	
	return Math.round(Math.random() * r) + n1;
}


function randHex(){
	
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function randFrom(a,allowNull){
	
	var len = a.length-1;
	
	if(allowNull == undefined){
		
		var len = a.length;
	}
	
	return a[rand(0, len)];
	
}
