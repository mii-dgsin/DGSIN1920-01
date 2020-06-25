angular 
	.module("CollectionManagerApp") 
	.controller("AnalyticsCtrl", ["$scope", "$http", function ($scope, $http){ 		
        console.log("Analytics Controller initialized"); 
	
		$scope.update = function (){
			$http 
				.get("/api/v1/collection")
				.then(function (response) {
					//$scope.data = response.data;
					console.log("Data received:" + $scope.data);
					Highcharts.chart('container', {

						title: {
							text: 'World University Ranking'
						},
					
						subtitle: {
							text: 'Teaching rating'
						},
					
						yAxis: {
							title: {
								text: 'Rating (0-100)'
							}
						},
					
						xAxis: {
							
							categories: response.data.map(function(d){
								return d.name;
							})
							
						},
						
						series: [{
							name: 'Teaching rating',
							data: response.data.map(function (d){
								return d.teaching_rating;
							})},{
							
							name: 'Total score',
							data: response.data.map(function (d){
								return d.total_score;
							})}
						]
					
					});
					console.log("Data received:" + $scope.data);
					Highcharts.chart('container2', {

						title: {
							text: 'World University Ranking'
						},
					
						subtitle: {
							text: 'Industry income rating'
						},
					
						yAxis: {
							title: {
								text: 'Rating (0-100)'
							}
						},
					
						xAxis: {
							
							categories: response.data.map(function(d){
								return d.name;
							})
							
						},
						
						series: [{
							name: 'Industry income rating',
							data: response.data.map(function (d){
								return d.industry_income_rating;
							
							})},{
							name: 'Total score',
							data: response.data.map(function (d){
								return d.total_score;
							})}
						]
					
					});

				});
			}		
	$scope.update()
	}])