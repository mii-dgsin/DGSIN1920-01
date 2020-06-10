angular.module("CollectionManagerApp", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider.when("/",
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
    );

    console.log("App initialized and configured");
});