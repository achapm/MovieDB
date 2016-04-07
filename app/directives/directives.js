/* **********************************************
     Begin Directives
********************************************** */
(function(){

	// This directive will crop the mopvie posters to prevent problems in grid layout
	app.directive('backImgCrop', function(){
    return function(scope, element, attrs){
      attrs.$observe('backImgCrop', function(value) {
        element.css({
          'background-image': 'url(' + value +')',
          'background-size' : 'cover',
          'width' : '150px',
          'height' : '220px',
          'background-position' : 'center center'
        });
      });
    };
	});

  // This directive will display a star rating for the average vote
	app.directive('starRating', function () {
	    return {
	        restrict: 'A',
	        template: '<ul class="rating">' +
	            '<li ng-repeat="star in stars" ng-class="star">' +
	            '\u2605' +
	            '</li>' +
	            '</ul>',
	        scope: {
	            ratingValue: '=',
	            max: '='
	        },
	        link: function (scope, elem, attrs) {
	            scope.stars = [];
	            for (var i = 0; i < scope.max; i++) {
	                scope.stars.push({
	                    filled: i < scope.ratingValue
	                });
	            }
	        }
	    }
	});
	
})();