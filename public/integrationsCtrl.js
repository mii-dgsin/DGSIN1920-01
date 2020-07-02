function chartsA($http, $window, url) {
    var date = new Set();
    var pib = {};
    var desempleo = {};
    var deuda = {};
    var paises = new Set();
    var grafica_pib = {};
    var grafica_desempleo = {};
    var grafica_deuda = {};
    var array_pib = [];
    var array_desempleo = [];
    var array_deuda = [];
    var units;

    $http.get(url).then(function (res) {
        if (res.status == 200 && res.data.length > 0) {
            console.log("Registros recibidos: " + JSON.stringify(res.data, null, 2));
            var datos_raw = res.data;

            for (var i = 0; i < datos_raw.length; i++) {
                reg = datos_raw[i];
                if (!paises.has(reg.country)) {
                    paises.add(reg.country);
                    pib[reg.country] = {};
                    pib[reg.country][reg.year] = reg["gdp"];
                    desempleo[reg.country] = {};
                    desempleo[reg.country][reg.year] = reg["unemployment"];
                    deuda[reg.country] = {};
                    deuda[reg.country][reg.year] = reg["debt"];
                    date.add(reg.year);
                }
                else {
                    date.add(reg.year);
                    pib[reg.country][reg.year] = reg["gdp"];
                    desempleo[reg.country][reg.year] = reg["unemployment"];
                    deuda[reg.country][reg.year] = reg["debt"];
                }
            }

            units = Array.from(date);

            for (var i in pib) {
                var array = [];

                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!pib[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(pib[i][f])
                    }
                }
                grafica_pib[i] = array;
                
            }
            
            for (var i in desempleo) {
                var array = [];
                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!desempleo[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(desempleo[i][f])
                    }
                }
                grafica_desempleo[i] = array;
            }

            for (var i in deuda) {
                var array = [];
                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!deuda[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(deuda[i][f])
                    }
                }
                grafica_deuda[i] = array;
            }
            
            for (var o in grafica_pib) {
                array_pib.push({ name: o, data: grafica_pib[o] });
            }
    
            for (var o in grafica_desempleo) {
                array_desempleo.push({ name: o, data: grafica_desempleo[o] });
            }

            for (var o in grafica_deuda) {
                array_deuda.push({ name: o, data: grafica_deuda[o] });
            }

            console.log("Datos cargados y procesados para su visualización");

            const min = arr => Math.min(...arr);
            const max = arr => Math.max(...arr);

            Highcharts.chart('container1', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'PIB'
                },
                subtitle: {
                    text: 'https://dgsin1920-02.herokuapp.com/api/v1/economic-stats'
                },

                xAxis: {
                    allowDecimals: false,
                    categories: units,
                    crosshair: true
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'euros (1T = 10 elevado a 12 = 1 billón de euros)'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: array_pib
            });

            Highcharts.chart('container2', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Desempleo',
                    useHTML: true
                },
                subtitle: {
                    text: 'https://dgsin1920-02.herokuapp.com/api/v1/economic-stats'
                },

                xAxis: {
                    allowDecimals: false,
                    categories: units,
                    crosshair: true
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: '% Desempleo'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: array_desempleo
            });

            Highcharts.chart('container3', {
                chart: {
                    type: 'area',
                    inverted: true
                },
                title: {
                    text: 'Deuda por años'
                },
                subtitle: {
                    text: 'https://dgsin1920-02.herokuapp.com/api/v1/economic-stats'
                },
                accessibility: {
                    keyboardNavigation: {
                        seriesNavigation: {
                            mode: 'serialize'
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
                },
                xAxis: {
                    allowDecimals: false,
                    categories: units,
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                    
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'miles de millones de euros'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                
                plotOptions: {
                    area: {
                        fillOpacity: 0.5
                    }
                },
                series: array_deuda
            });
        }
    },
        function (res) {
            console.log("Error recibiendo los datos: " + res.status);
            /*$window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");*/
        });
}

function chartsB($http, $window, url) {
    var date = new Set();
    var datos_consumo = {};
    var datos_trenes = {};
    var datos_aviones = {};
    var paises = new Set();
    var grafica_consumo = {};
    var grafica_trenes = {};
    var grafica_aviones = {};
    var array_consumo = [];
    var array_trenes = [];
    var array_aviones = [];
    var units;

    $http.get(url).then(function (res) {
        if (res.status == 200 && res.data.length > 0) {
            console.log("Registros recibidos: " + JSON.stringify(res.data, null, 2));
            var datos_raw = res.data;

            for (var i = 0; i < datos_raw.length; i++) {
                reg = datos_raw[i];
                if (!paises.has(reg.country)) {
                    paises.add(reg.country);
                    datos_consumo[reg.country] = {};
                    datos_consumo[reg.country][reg.year] = reg["elect-pwr-cns"];
                    datos_trenes[reg.country] = {};
                    datos_trenes[reg.country][reg.year] = reg["rail-lns"];
                    datos_aviones[reg.country] = {};
                    datos_aviones[reg.country][reg.year] = reg["air-trnspt"];
                    date.add(reg.year);
                }
                else {
                    date.add(reg.year);
                    datos_consumo[reg.country][reg.year] = reg["elect-pwr-cns"];
                    datos_trenes[reg.country][reg.year] = reg["rail-lns"];
                    datos_aviones[reg.country][reg.year] = reg["air-trnspt"]
                }
            }

            units = Array.from(date);

            for (var i in datos_consumo) {
                var array = [];

                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!datos_consumo[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(datos_consumo[i][f])
                    }
                }
                grafica_consumo[i] = array;
            }
            for (var i in datos_trenes) {
                var array = [];
                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!datos_trenes[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(datos_trenes[i][f])
                    }
                }
                grafica_trenes[i] = array;
            }

            for (var i in datos_aviones) {
                var array = [];
                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!datos_aviones[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(datos_aviones[i][f])
                    }
                }
                grafica_aviones[i] = array;
            }

            for (var o in grafica_consumo) {
                array_consumo.push({ name: o, data: grafica_consumo[o] });
            }

            for (var o in grafica_trenes) {
                array_trenes.push({ name: o, data: grafica_trenes[o] });
            }

            for (var o in grafica_aviones) {
                array_aviones.push({ name: o, data: grafica_aviones[o] });
            }

            console.log("Datos cargados y procesados para su visualización");

            const min = arr => Math.min(...arr);
            const max = arr => Math.max(...arr);

            Highcharts.chart('container4', {
                chart: {
                    type: 'area',
                    inverted: true
                },
                title: {
                    text: 'Consumo por años'
                },
                subtitle: {
                text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
            },
            accessibility: {
                keyboardNavigation: {
                    seriesNavigation: {
                        mode: 'serialize'
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            },
            xAxis: {
                    allowDecimals: false,
                    categories: units,
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                
                },
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'kwh per cápita'
                    },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
                series: array_consumo
            });

    Highcharts.chart('container5', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
        }
    },
        title: {
            text: 'Líneas de ferrocarril por años'
        },
        subtitle: {
            text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
        },
        xAxis: {
            allowDecimals: false,
            categories: units,
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'km Totales',
                skew3d: true
            }
        },
        
    
        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
        series:array_trenes
    });

    Highcharts.chart('container6', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },
        title: {
            text: 'Transporte aéreo por años',
            useHTML: true
        },
        subtitle: {
            text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
        },
        xAxis: {
            allowDecimals: false,
            categories: units,
            crosshair: true,
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Salidas de avión registradas',
                skew3d: true
            }
        },
    
        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
    
        series:array_aviones
    });
}
    },
function (res) {
    console.log("Error recibiendo los datos: " + res.status);
    /*$window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");*/
});
}


angular.module("CollectionManagerApp")
    .controller("IntegrationsCtrl", ["$scope", "$http", function ($scope, $http, $window) {
        var url_apiA = "proxy01/api/v1/economic-stats";
        var url_apiB = "proxy01/api/v1/infrastructure-stats";

        function integracionApiA() {
            chartsA($http, $window, url_apiA);
        }

        function integrationApiB() {
            chartsB($http, $window, url_apiB);
        }
        console.log("Controlador para visualizar los datos de nuestra API de manera gráfica listo.");
        //get();
        integracionApiA();
        integrationApiB();
    }]);
