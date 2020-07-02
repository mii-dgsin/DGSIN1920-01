angular.module("CollectionManagerApp")
    .controller("CountryCtrl", ["$scope", "$http", "$window", "$routeParams","$location", function ($scope, $http, $window, $routeParams,$location) {
        var collectionCountry = $routeParams.country;
        var base_url = "/api/v1/collection";
        url_country = base_url +  "/" + "country" + "/" +  collectionCountry;
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
        $scope.deleteCountry = function deleteCountry() {
            $http.delete(url_country).then(function (res) {
                if (res.status == 204) {
                    console.log("Registros eliminados");
                    $window.alert("Registros asociados al pais con nombre " + country + " eliminados satisfactoriamente");
                    $location.path("/list");
                }
                else {
                }
            },
                function (res) {
                    if (res.status == 404) {
                        console.log("Error eliminando los registros: no hay registros que eliminar " + res.status);
                        $window.alert("No se puede eliminar ningún registro ya que no hay ninguno en la base de datos");
                    }
                    else {
                        console.log("Error eliminando los registros: " + res.status);
                        $window.alert("No se pudo eliminar los registros");
                    }
                });
        }
        
        console.log("Controlador para listar todos los recursos asociados a un sensor listo.");
        getCountry();
    }]);
