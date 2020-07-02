angular.module("CollectionManagerApp", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider.when("/",
	{
            templateUrl: "static.html",
        }
    )
		.when("/about", {
            templateUrl:"about.html"
        })
		 .when("/list",
        {
            templateUrl: "list.html",
            controller: "ListCtrl"
        }
    )
		.when("/collection/:name",
        {
            templateUrl: "edit.html",
            controller: "EditCtrl"
        }
    )
        .when("/collection/country/:country",
    {
            templateUrl: "country.html",
            controller: "CountryCtrl"
        }
    )
		.when("/integrations",
            {
                templateUrl: "integrations.html",
                controller: "IntegrationsCtrl"
            })
    .when("/analytics",
        {
            templateUrl: "analytics.html",
            controller: "AnalyticsCtrl"
        }
    );

    console.log("App initialized and configured");
});

 
       