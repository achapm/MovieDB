/* **********************************************
Begin Movie Service
********************************************** */
(function(){

	// Call the themoviedb.org for the search results
	app.factory('movieService', function ($resource) {
		// Using the api key provided in the code challenge
		var apikey = '42b3e60b6636f50062f6d3579100d83f';
		var url = 'http://api.themoviedb.org/3/:method/:what';
		return $resource( url,
						{ api_key: apikey, callback:'JSON_CALLBACK' },
						{ get: {method: 'JSONP', requestType: 'json' }}
						);
	});

})();