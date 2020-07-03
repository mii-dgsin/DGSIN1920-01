angular.module("CollectionManagerApp")
    .controller("CountryCtrl", ["$scope", "$http", "$window", "$routeParams", "$location", function ($scope, $http, $window, $routeParams, $location) {
        var collectionCountry = $routeParams.country;
        var APIurl = "/api/v1/collection";
        url_country = APIurl + "/" + "country" + "/" + collectionCountry;
        function getCountry() {
            $http.get(url_country).then(function (res) {
                if (res.status == 200 && res.data.length > 0) {
                    console.log("Registros recibidos: " + JSON.stringify(res.data, null, 2));
                    $scope.countries = res.data;
                }
            },
                function (res) {
                    console.log("Error recibiendo los datos: " + res.status);
                    $window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");
                });
        }
        $scope.deleteCountry = function deleteCountry(CollectionName) {

            $http.delete(APIurl + "/" + CollectionName).then(function (response) {
                if (response.status == 204) {
                    console.log("Registro correspondiente a la universidad " + CollectionName);
                    $window.alert("Registro con nombre " + CollectionName + " eliminado exitosamente");
                    getCountry();
                }

            },
                function (response) {
                    if (response.status == 404) {
                        console.log("Error eliminando registro con nombre " + CollectionName + ": no hay registro que eliminar; " + response.status);
                        $window.alert("Ha ocurrido un problema eliminando los registros: no hay ningún registro con nombre " + CollectionName);
                    }
                    else if (response.status == 422) {
                        console.log("Error eliminando registro con nombre " + CollectionName + ": formato de nombre incorrecto; " + response.status);
                        $window.alert("Ha ocurrido un problema eliminando los registros: formato de nombre incorrecto " + CollectionName);
                    }
                });
        }


        console.log("Controlador para listar todos los recursos asociados a un sensor listo.");
        getCountry();
    }]);
