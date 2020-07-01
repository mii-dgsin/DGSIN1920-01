
angular.module("CollectionManagerApp")
    .controller("ListCtrl", ["$scope", "$http","$window", function ($scope, $http, $window) {
        console.log("ListCtrl initialized.");
        var APIurl = "/api/v1/collection";
        
        function getCollections () {
            $http.get(APIurl).then(function onSuccess(response) {
                if (response.status == 200 && response.data.length > 0) {
                console.log("Collections received: " + JSON.stringify(response.data, null, 2));
                $scope.collections = response.data;
            }
        },

                function onReject(res) {
                    console.log("Error recibiendo los datos: " + res.status);
                    $window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");
                });
        }
        $scope.deleteCollections = function deleteCollections() {
            
            $http.delete(APIurl).then(function onSuccess (response) {
                if (response.status == 204) {
                    console.log("DELETE all collections finished");
                    $window.alert("Todos los registros eliminados exitosamente");
                    $scope.collections =[];
                }
                else{

                }
            },
            function onReject(response) {
                if (response.status == 404) {
                    console.log("Error eliminando los registros: no hay registros que eliminar " + response.status);
                    $window.alert("No se puede eliminar ningún registro ya que no hay ninguno en la base de datos");
                }
                else {
                    console.log("Error eliminando los registros: " + response.status);
                    $window.alert("No se pudo eliminar los registros");
                }
            });
        }
        $scope.deleteCollection = function deleteCollection(CollectionName) {
            
            $http.delete(APIurl+"/"+CollectionName).then(function onSuccess (response) {
                if (response.status == 204) {
                    console.log("Registro correspondiente a la universidad " + CollectionName);
                    $window.alert("Registro con nombre " + CollectionName +  " eliminado exitosamente");
                    getCollections();
                }

            },
                function onReject(response) {
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

        $scope.addCollection = function addCollection() {
            
            $http.post(APIurl, $scope.newCollection).then(function onSuccess(response) {
                if (response.status == 201) {
                    console.log("POST finished");
                    $window.alert("Registro añadido satisfactoriamente");
                    getCollections();
                }
            },
            function onReject(res) {

                if (res.status == 409) {

                    console.log("No se puede añadir un recurso que ya existe: " + res.status);
                    $window.alert("No se pudo añadir el registro debido a que ya existe uno con el mismo nombre");

                }
                else if (res.status == 400) {

                    console.log("Error añadiendo recurso: petición sin cuerpo. Código de estado: " + res.status);
                    $window.alert("No se pudo añadir el registro debido a que no hay campos que añadir");

                }
                
                else {

                    console.log("Error añadiendo recurso: " + res.status);
                    $window.alert("No se pudo añadir el recurso");

                }

            }); 
        }
        console.log("Controlador para listar todos los recursos listo.");
        getCollections();
     
    }]);

 
    