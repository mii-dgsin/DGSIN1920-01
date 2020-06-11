angular.module("CollectionManagerApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function ($scope, $http, $routeParams, $location) {
        console.log("EditCtrl initialized.");
        var collectionName = $routeParams.name;
        var APIurl = "/api/v1/collection/" + collectionName;

        function getCollection() {
            $http.get(APIurl).then(function (response) {
                console.log("Collection to be updated: " + JSON.stringify(response.data, null, 2));
                $scope.updatedCollection = response.data;
            });
        }

        getCollection();

        $scope.updateCollection = function updateCollection() {
            $http.put(APIurl, $scope.updatedCollection).then(function (response) {
                console.log("Collection UPDATED");
                $location.path("/");
            });
        };

        $scope.cancelUpdate = function cancelUpdate() {
            console.log("UPDATE cancelled");
            $location.path("/");
        };


    }]);