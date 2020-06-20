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
							text: 'DATASET BY HOZEFA HAVELIWALA'
						},
					
						yAxis: {
							title: {
								text: 'Rating (0-100)'
							},
							categories: response.data.map(function (d){
								return d.total_score;
							})
						},
					
						xAxis: {
							title: {
								text: 'University',
							},
							categories: response.data.map(function (d){
								return d.name;
							})
							
						},
						
						
					
						legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle'
						},
					
						
						series: [{
							name: 'Teaching Rating',
							data: response.data.map(function (d){
								return d.teaching_rating;
							})},{
							
								name: 'Industry Income Rating',
							data: response.data.map(function (d){
								return d.industry_income_rating;
							
							})},{
							
								name: 'Total Score',
							data: response.data.map(function (d){
								return d.total_score;
							})}
						],
					
						responsive: {
							rules: [{
								
								chartOptions: {
									legend: {
										layout: 'horizontal',
										align: 'center',
										verticalAlign: 'bottom'
									}
								}
							}]
						}
					
					});

					});
				}		
		$scope.update(); 
    }]);