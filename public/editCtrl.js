
angular.module("CollectionManagerApp")
    .controller("EditCtrl", ["$scope", "$http", "$window", "$routeParams", "$location", function ($scope, $http, $window, $routeParams, $location) {
        console.log("EditCtrl initialized.");
        var collectionName = $routeParams.name;
        var APIurl = "/api/v1/collection";
        var url_recurso = APIurl + "/" + collectionName

        function getCollection() {
            $http.get(url_recurso).then(function (response) {
                if (response.status == 200 && response.data.length > 0) {
                    console.log("Collection to be updated: " + JSON.stringify(response.data, null, 2));
                    $scope.updatedCollection = response.data[0];
                }
            },
                function (response) {
                    if (response.status == 404) {
                        console.log("Error retrieving record, resource does not exist. Status code:" + response.status);
                        $window.alert("Error al recuperar el registro: el registro con nombre " + collectionName + " no existe en la base de datos");
                        $location.path("/list");
                    }
                });
        }


        $scope.updateCollection = function updateCollection() {

            $http.put(url_recurso, $scope.updatedCollection).then(function (response) {
                if (response.status == 200) {
                    console.log("Updated registration with data:" + JSON.stringify($scope.updatedCollection, null, 2));
                    $window.alert("Registro actualizado correctamente");
                    $location.path("/list");
                }
            },
                function (response) {
                    if (res.status == 400) {
                        console.log("Registry not updated correctly. Bodyless petition. Status code:" + response.status);
                        $window.alert("No se pudo actualizar el registro. La petición no contiene un cuerpo.");
                    }
                    else if (res.status == 404) {
                        console.log("Registry not updated correctly: the registry to update does not exist. Status code:" + response.status);
                        $window.alert("No se puede actualizar un registro que no existe. Compruebe el nombre del registro.");
                    }

                });
        }

        $scope.cancelUpdate = function cancelUpdate() {
            console.log("UPDATE cancelled");
            $location.path("/");
        };
        console.log("Controller to edit ready resources");
        getCollection();

    }]);
