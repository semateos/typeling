
var Router = Backbone.Router.extend({
 	
 	renderTemplate: function(template){
	
		$('body').html(Meteor.render(function () {return template();}));
	},
 	
 	routes: {
		"": 		"shapes",
		"text": 	"index",
		"import": 	"import"
	},

	index: function() {
  	
		this.renderTemplate(Template.hello);
	},

	shapes: function() {
  	
  		this.renderTemplate(Template.shapes);
	},
	
	import: function() {
  	
  		this.renderTemplate(Template.import);
	}
});

var app = new Router;
Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});