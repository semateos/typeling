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

log = function(text){
	
	if (typeof console !== 'undefined'){
		
		console.log(text);
	}
}