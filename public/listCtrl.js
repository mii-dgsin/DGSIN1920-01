angular.module("CollectionManagerApp")
    .controller("ListCtrl", ["$scope", "$http", function ($scope, $http) {
        console.log("ListCtrl initialized.");
        var APIurl = "http://dgsin1920-01.herokuapp.com/api/v1/collection";
        
        function getCollections () {
            $http.get(APIurl).then(function (response) {
                console.log("Collections received: " + JSON.stringify(response.data, null, 2));
                $scope.collections = response.data;
            });
        }

        $scope.addCollection = function addCollection() {
            $http.post(APIurl, $scope.newCollection).then(function (response) {
                console.log("POST finished");
                getCollections();
            }); 
        }

        $scope.deleteCollection = function deleteCollection(CollectionName) {
            $http.delete(APIurl+"/"+CollectionName).then(function (response) {
                console.log("DELETE finished");
                getCollections();
            }); 
        }

        $scope.deleteCollections = function deleteCollections() {
            $http.delete(APIurl).then(function (response) {
                console.log("DELETE all collections finished");
                getCollections();
            }); 
        }

        getCollections();
    }]);