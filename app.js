

angular.module('myApp',['ngRoute'])

.provider('Flickr', function(){
	var apiKey = '';
	this.setApiKey = function(key){
		apiKey = key;
	};
	this.$get = function($http) { //injecting http dependency
		
		this.getPhotos = function() {
			return $http({
				method: 'GET',
				url: "http://api.flickr.com/services/rest",
				params: {
					method: 'flickr.interestingness.getList',
					api_key: apiKey,
					format: 'json',
					nojsoncallback: 1
				}
			}).then(function(data){
				return data.data.photos.photo;
			});
			
		};
		return this; //have to return object
	};

}	)
.config(function(FlickrProvider){
	FlickrProvider.setApiKey('4f4dfe8f67e3fe1b9ef31414d725ff8f');
})
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'home.html',
		controller: 'HomeController'
	})
	.otherwise({
		redirectTo: '/'  //directs back to homepage
	});
})

// controller and constructor function
.controller("HomeController", function($scope, $http, Flickr){
	$scope.user = {
		name: 'Ari'
	};

	$scope.getPhotoUrl = function(photo) {
		return "http://farm"+photo.farm+
				".static.flickr.com/"+photo.server+
				"/"+photo.id+"_"+photo.secret+".jpg"};
				
	Flickr.getPhotos().then(function(data){
		$scope.photos = data;
	});
});

