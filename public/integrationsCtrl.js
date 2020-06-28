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

    $http.get(url).then(function onSuccess(res) {
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
            console.log("array_pib",array_pib);
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
                    categories: units,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'euros (1T = 10 elevado a 6)'
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
                    categories: units,
                    crosshair: true
                },
                yAxis: {
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
                    type: 'area'
                },
                title: {
                    text: 'Deuda por años'
                },
                subtitle: {
                    text: 'https://dgsin1920-02.herokuapp.com/api/v1/economic-stats'
                },

                xAxis: {
                    categories: units,
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                    
                yAxis: {
                    title: {
                        text: 'miles de millones de euros'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                
                tooltip: {
                    split: true
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                series: array_deuda
            });
        }
    },
        function onReject(res) {
            console.log("Error recibiendo los datos: " + res.status);
            /*$window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");*/
        });
}

function chartsB($http, $window, url) {
    var date = new Set();
    var consumo = {};
    var trenes = {};
    var aviones = {};
    var paises = new Set();
    var grafica_consumo = {};
    var grafica_trenes = {};
    var grafica_aviones = {};
    var array_consumo = [];
    var array_trenes = [];
    var array_aviones = [];
    var units;

    $http.get(url).then(function onSuccess(res) {
        if (res.status == 200 && res.data.length > 0) {
            console.log("Registros recibidos: " + JSON.stringify(res.data, null, 2));
            var datos_raw = res.data;

            for (var i = 0; i < datos_raw.length; i++) {
                reg = datos_raw[i];
                if (!paises.has(reg.country)) {
                    paises.add(reg.country);
                    consumo[reg.country] = {};
                    consumo[reg.country][reg.year] = reg["elect-pwr-cns"];
                    trenes[reg.country] = {};
                    trenes[reg.country][reg.year] = reg["rail-lns"];
                    aviones[reg.country] = {};
                    aviones[reg.country][reg.year] = reg["air-trnspt"];
                    date.add(reg.year);
                }
                else {
                    date.add(reg.year);
                    consumo[reg.country][reg.year] = reg["elect-pwr-cns"];
                    trenes[reg.country][reg.year] = reg["rail-lns"];
                    aviones[reg.country][reg.year] = reg["air-trnspt"]
                }
            }

            units = Array.from(date);

            for (var i in consumo) {
                var array = [];

                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!consumo[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(consumo[i][f])
                    }
                }
                grafica_consumo[i] = array;
            }
            for (var i in trenes) {
                var array = [];
                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!trenes[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(trenes[i][f])
                    }
                }
                grafica_trenes[i] = array;
            }

            for (var i in aviones) {
                var array = [];
                for (var j = 0; j < units.length; j++) {
                    var f = units[j];
                    if (!aviones[i][f]) {
                        array.push(null);
                    }
                    else {
                        array.push(aviones[i][f])
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
                    type: 'area'
                },
                title: {
                    text: 'Consumo por años'
                },
                subtitle: {
                text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
            },
                xAxis: {
                    categories: units,
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                
                },
                yAxis: {
                    title: {
                        text: 'kwh per cápita'
                    },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                split: true,
               
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
                series: array_consumo
            });

    Highcharts.chart('container5', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Líneas de ferrocarril por años'
        },
        subtitle: {
            text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
        },
        xAxis: {
            categories: units,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'km Totales'
            }
            
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}kg</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series:array_trenes
    });

    Highcharts.chart('container6', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Transporte aéreo por años',
            useHTML: true
        },
        subtitle: {
            text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
        },
        xAxis: {
            categories: units,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Salidas de avión registradas'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}kt</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series:array_aviones
    });
}
    },
function onReject(res) {
    console.log("Error recibiendo los datos: " + res.status);
    /*$window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");*/
});
}


angular.module("CollectionManagerApp")
    .controller("IntegrationsCtrl", ["$scope", "$http", function ($scope, $http, $window) {
        var url_apiA = "proxy01/api/v1/economic-stats";
        var url_apiB = "proxy01/api/v1/infrastructure-stats";

        function integrationA() {
            chartsA($http, $window, url_apiA);
        }

        function integrationB() {
            chartsB($http, $window, url_apiB);
        }
        console.log("Controlador para visualizar los datos de nuestra API de manera gráfica listo.");
        //get();
        integrationA();
        integrationB();
    }]);
