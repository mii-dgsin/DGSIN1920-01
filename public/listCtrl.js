var addCollectionAux;
var deleteCollectionAux;
var deleteCollections;
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
            addCollectionAux=true;
            $http.post(APIurl, $scope.newCollection).then(function (response) {
                validateaddCollection();
                console.log("POST finished");
                getCollections();
                
            }); 
        }

        $scope.deleteCollection = function deleteCollection(CollectionName) {
            deleteCollectionAux=true;
            $http.delete(APIurl+"/"+CollectionName).then(function (response) {
                validatedeleteCollection();
                console.log("DELETE finished");
                getCollections();
            }); 
        }

        $scope.deleteCollections = function deleteCollections() {
            deleteCollectionsAux=true;
            $http.delete(APIurl).then(function (response) {
                validatedeleteCollections();
                console.log("DELETE all collections finished");
                getCollections();
            }); 
        }

        getCollections();
    }]);

  
    function validateaddCollection() {

        if (addCollectionAux==true){
            alert('Dato creado correctamente');
        }
    };
    function validatedeleteCollection() {
        if (deleteCollectionAux==true){
            alert('Dato borrado correctamente');
        }
    };

    function validatedeleteCollections() {
        if (deleteCollectionsAux==true){
            alert('Todos los datos borrados correctamente');
        }
    };
    
    