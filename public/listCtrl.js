angular.module("CollectionManagerApp")
    .controller("ListCtrl", ["$scope", "$http", function ($scope, $http) {
        console.log("ListCtrl initialized.");
        var APIurl = "/api/v1/collection";
        
        function getCollection () {
            $http.get(APIurl).then(function (response) {
                console.log("Collection received: " + JSON.stringify(response.data, null, 2));
                $scope.collection = response.data;
            });
        }

        $scope.addCollection = function addCollection() {
            $http.post(APIurl, $scope.newCollection).then(function (response) {
                console.log("POST finished");
                getCollection();
            }); 
        }

        $scope.deleteCollection = function deleteCollection(CollectionName) {
            $http.delete(APIurl+"/"+CollectionName).then(function (response) {
                console.log("DELETE finished");
                getCollection();
            }); 
        }

        $scope.deleteCollections = function deleteCollections() {
            $http.delete(APIurl).then(function (response) {
                console.log("DELETE all collection finished");
                getCollection();
            }); 
        }

        getCollection();
    }]);