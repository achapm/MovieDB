/* **********************************************
configure the main app module
********************************************** */
var app = angular.module('movies',['ngResource','ngRoute']);

(function(){
	
  // Get referance to the route method of routeResolverProvider
	app.config(['$routeProvider',
		function ($routeProvider) {
			// Open welcome view
			$routeProvider.when('/', {templateUrl: 'views/welcome/welcome.html', controller: 'movieSearchCtrl' });
			$routeProvider.otherwise({redirectTo: '/'});
		}
	]);
	
})();