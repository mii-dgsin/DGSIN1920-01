function charts1($http, $window, url) {
    var date = new Set();
    var pib = {};
    var desempleo = {};
    var deuda = {};
    var paises = new Set();
    var graph_pib = {};
    var graph_desempleo = {};
    var graph_deuda = {};
    var series_pib = [];
    var series_desempleo = [];
    var series_deuda = [];
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
                graph_pib[i] = array;
                
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
                graph_desempleo[i] = array;
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
                graph_deuda[i] = array;
            }
            
            for (var o in graph_pib) {
                series_pib.push({ name: o, data: graph_pib[o] });
            }
            console.log("series_pib",series_pib);
            for (var o in graph_desempleo) {
                series_desempleo.push({ name: o, data: graph_desempleo[o] });
            }

            for (var o in graph_deuda) {
                series_deuda.push({ name: o, data: graph_deuda[o] });
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
                series: series_pib
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
                series: series_desempleo
            });

            Highcharts.chart('container3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Deuda por años'
                },
                subtitle: {
                    text: 'https://dgsin1920-02.herokuapp.com/api/v1/economic-stats'
                },

                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    },
                    accessibility: {
                        rangeDescription: min(date) + " a " + max(date)
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
                legend: {
                    shadow: false
                },
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },
                series: series_deuda
            });
        }
    },
        function onReject(res) {
            console.log("Error recibiendo los datos: " + res.status);
            $window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");
        });
}

function charts2($http, $window, url) {
    var date = new Set();
    var datos_consumo = {};
    var datos_trenes = {};
    var datos_aviones = {};
    var paises = new Set();
    var graph_data_consumo = {};
    var graph_data_trenes = {};
    var graph_data_aviones = {};
    var series_datos_consumo = [];
    var series_datos_trenes = [];
    var series_datos_aviones = [];
    var units;

    $http.get(url).then(function onSuccess(res) {
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
                graph_data_consumo[i] = array;
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
                graph_data_trenes[i] = array;
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
                graph_data_aviones[i] = array;
            }

            for (var o in graph_data_consumo) {
                series_datos_consumo.push({ name: o, data: graph_data_consumo[o] });
            }

            for (var o in graph_data_trenes) {
                series_datos_trenes.push({ name: o, data: graph_data_trenes[o] });
            }

            for (var o in graph_data_aviones) {
                series_datos_aviones.push({ name: o, data: graph_data_aviones[o] });
            }

            console.log("Datos cargados y procesados para su visualización");

            const min = arr => Math.min(...arr);
            const max = arr => Math.max(...arr);

            Highcharts.chart('container4', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Consumo por años'
                },
                subtitle: {
                text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
            },
                xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
                accessibility: {
                    rangeDescription: min(date) + " a " + max(date)
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
            legend: {
                shadow: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
                series: series_datos_consumo
            });

    Highcharts.chart('container5', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Líneas de ferrocarril por años'
        },
        subtitle: {
            text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            accessibility: {
                rangeDescription: min(date) + " a " + max(date)
            }
        },
        yAxis: {
            title: {
                text: 'km Totales'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        legend: {
            shadow: false
        },
        tooltip: {
            pointFormat: '{series.name} - {point.y:,.0f}</b><br/>people in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: min(date),
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series:series_datos_trenes
    });

    Highcharts.chart('container6', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Transporte aéreo por años'
        },
        subtitle: {
            text: 'https://dgsin1920-02.herokuapp.com/api/v1/infrastructure-stats'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            accessibility: {
                rangeDescription: min(date) + " a " + max(date)
            }
        },
        yAxis: {
            title: {
                text: 'Salidas de avión registradas'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series:series_datos_aviones
    });
}
    },
function onReject(res) {
    console.log("Error recibiendo los datos: " + res.status);
    $window.alert("Ha ocurrido un error al recibir los datos. Vuelva a intentarlo de nuevo");
});
}


angular.module("CollectionManagerApp")
    .controller("IntegrationsCtrl", ["$scope", "$http", function ($scope, $http, $window) {
        var url_apiA = "proxy01/api/v1/economic-stats";
        var url_apiB = "proxy01/api/v1/infrastructure-stats";

        function integrationA() {
            charts1($http, $window, url_apiA);
        }

        function integrationB() {
            charts2($http, $window, url_apiB);
        }
        console.log("Controlador para visualizar los datos de nuestra API de manera gráfica listo.");
        //get();
        integrationA();
        integrationB();
    }]);
