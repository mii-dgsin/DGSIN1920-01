angular 
	.module("CollectionManagerApp") 
	.controller("IntegrationsCtrl", ["$scope", "$http", function ($scope, $http){ 		
        console.log("Integrations Controller initialized"); 
	
		$scope.update = function (){
			$http 
				.get( "/proxy01/api/v1/economic-stats")
				.then(function (response) {
					//$scope.data = response.data;
					console.log("Data received:" + $scope.data);
					Highcharts.chart('container3', {
                        chart: {
                            type: 'area'
                        },
                        title: {
                            text: 'Historic and Estimated Worldwide Population Distribution by Region'
                        },
                        subtitle: {
                            text: 'Source: Wikipedia.org'
                        },
                        xAxis: {
                            categories: response.data.map(function(d){
								return d.country;
							})
                        },
                        yAxis: {
							title: {
								text: 'Rating (0-100)'
							}
						},
                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
                            split: true
                        },
                        plotOptions: {
                            area: {
                                stacking: 'percent',
                                lineColor: '#ffffff',
                                lineWidth: 1,
                                marker: {
                                    lineWidth: 1,
                                    lineColor: '#ffffff'
                                },
                                accessibility: {
                                    pointDescriptionFormatter: function (point) {
                                        function round(x) {
                                            return Math.round(x * 100) / 100;
                                        }
                                        return (point.index + 1) + ', ' + point.category + ', ' +
                                            point.y + ' millions, ' + round(point.percentage) + '%, ' +
                                            point.series.name;
                                    }
                                }
                            }
                        },
                        series: [{
							name: 'Teaching rating',
							data: response.data.map(function (d){
								return d.country;
							})},{
							
							name: 'Total score',
							data: response.data.map(function (d){
								return d.gpd	;
							})}
						]
                    });
                });
			}		
	$scope.update()
	}])