/* **********************************************
Begin Movie Search Controller
********************************************** */
(function(){

	app.controller('movieSearchCtrl', function ($scope, movieService, $timeout, $location) {
			var timer;

			// Calls the movieService to get search results
			function search(){
				movieService.get({method:'search', what:'movie', query: $scope.query}, function (result) {
					$scope.movies = result.results;
				});
			}

			// Delay timer to prevent rapid fire searching while the user types
			function setTimer(){
				timer = $timeout(function () {
					search();
				}, 1000);
			}

			// Watches the search query for changes
			$scope.$watch('query', function (value) {
				if (value !== undefined && value !== '') {
					$timeout.cancel(timer);
					// Run search() after a one second delay
					setTimer(); 
				} else {
					$scope.$eval(getCurrentMovies());
				}
			});

			// Get a list of currently playing movies
			function getCurrentMovies() {
				movieService.get({method:'movie', what:'now_playing'}, function (result) {
					$scope.movies = result.results;
				});
			}

	}) // END app.controller

})();