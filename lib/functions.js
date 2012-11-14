function rand(n1, n2){
	
	var r = n2 - n1;
	
	return Math.round(Math.random() * r) + n1;
}

function randHex(){
	
	return '#'+(function(h){return new Array(7-h.length).join("0")+h})((Math.random()*(0xFFFFFF+1)<<0).toString(16));
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