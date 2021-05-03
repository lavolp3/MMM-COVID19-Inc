/* Magic Mirror
 * Module: MMM-COVID19-Inc
 * Displays a scalable hihcharts graph of expected rain for a lon/lat pair based on the climacell free  API
 * By lavolp3, based on the module MMM-Buienalarm.
 */

Module.register("MMM-COVID19-Inc",{
    // Default module config.
    defaults: {
        regions: ['Berlin', 'Hamburg'],
        colors: ['#ade6bb', '#add8e6', '#e6add8', '#e6bbad'],
        width: 400,
        height: 250,
        days: 7,
        showYAxis: false,
        showMap: true,
        mapWidth: 250,
        updateInterval: 10 * 60 * 1000,
        chartType: 'line',
        debug: true
    },

  // Override start method.
    start: function() {
        console.log("Starting module: " + this.name);
    },

  // Define required scripts. Highcharts needed for the graph.
    getScripts: function() {
        return [
            'modules/MMM-COVID19-Inc/node_modules/highcharts/highstock.js',
        ];
    },

  // Define required styles.
    getStyles: function() {
        return ["covid19-inc.css"];
    },

    notificationReceived: function(noti, payload) {
        //console.log("Notification received: "+noti);
        if (noti == "ALL_MODULES_STARTED") {
            this.sendSocketNotification("INC_REQUEST", this.config);
            var self = this;
            setInterval(() => {
                self.sendSocketNotification("INC_REQUEST", self.config)
            },this.config.updateInterval)
        }
    },

    socketNotificationReceived: function(notification, payload) {
        this.log("Socket Notification received: " + notification);
        if (notification == "INC_DATA") {
            this.log(payload);
            this.processData(payload);
        }
    },
    
    
    processData: function(payload) {
        var data = {};
        var regData = payload.data;
        for (region in regData) {
            //this.log("Checking " + regData[region].name);
            this.config.regions.forEach((reqReg) => {
                if (regData[region].name.indexOf(reqReg) > -1) {
                    this.log("Hit! " + reqReg);
                    data[reqReg] = [];
                    for (var i = 0; i < regData[region].history.length; i++) {
                        data[reqReg].push([parseInt(moment(regData[region].history[i].date).add(1, 'days').format("x")), Math.round(parseFloat(regData[region].history[i].weekIncidence))])    
                    }
                }
            });
        }
        this.log(data);
        this.drawChart(data);   
    },


    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "incWrapper";
        wrapper.width = this.config.width;
        var graph = document.createElement("div");
        graph.className = "small thin light";
        graph.id = "incGraph";
        graph.height = this.config.height + "px";
        graph.width = this.config.width + "px";
        graph.style.display = "none";
        wrapper.appendChild(graph);
        if (this.config.showMap) {
            var incImg = document.createElement('img');
            incImg.style.width = this.config.mapWidth + "px";
            incImg.src = "https://api.corona-zahlen.org/map/districts";
            wrapper.appendChild(incImg);
        }
        return wrapper;
    },


    getColors: function(data) {
        var colors = []
        for (var i = 0; i < data.length; i++) {
            colors.push(data[i][1] > 165 ? 'red' : data[i][1] > 150 ? 'orange' : data [i][1] > 100 ? 'yellow' : 'green');
        }
        return colors;
    },
        

    /* Draw chart using highcharts node module
    * For config options visit https://api.highcharts.com/highcharts
    */
    drawChart: function(data) {

        var graph = document.getElementById("incGraph");
        graph.style.display = "block";
        /*graph.width = this.config.width;
        graph.height = this.config.height;*/

        var incData = [];
        
        let count = 0;
        for (region in data) {
            incData.push({
                name: region,
                data: data[region],
                color: this.config.colors[incData.length]
            });
        }
        
        this.log(incData);

        Highcharts.chart("incGraph", {
            chart: {
                type: (this.config.chartType === 'bar') ? 'column' : 'line',
                backgroundColor: '#000',
                width: this.config.width,
                height: this.config.height,
                plotBackgroundColor: '#000',
                plotBorderWidth: '0',
                style: {
                    fontSize: '0.9em',
                    color: "#f3f3f3",
                }
            },
            time: {
                useUTC: false,
            },
            title: {
                //enabled: false,
                text: undefined,
                //align: 'left'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%d.%m.'
                },
                //tickInterval: 1000 * 60 * 60 * 24,
                labels: {
                    overflow: 'justify',
                    style: {
                        fontSize: "0.9em",
                        color: "#eee",
                    }
                },
            },
            yAxis: [
            // RAIN
            {
                labels: {
                    enabled: this.config.showYAxis,
                    style: {
                        fontSize: "0.9em",
                        color: "#eee",
                    }
                },
                title: {
                    text: null
                },
                startOnTick: false,
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                plotBands: [
                    {
                        from: 0,
                        to: 35,
                        color: 'rgba(11,250,20,0.25)',
                    }, {
                        from: 35,
                        to: 100,
                        color: 'rgba(250,240,220,0.25)',
                    }, {
                        from: 100,
                        to: 150,
                        color: 'rgba(255,220,20,0.25)',
                    }, {
                        from: 150,
                        to: 165,
                        color: 'rgba(255,160,20,0.25)',
                    }, {
                        from: 165,
                        to: 300,
                        color: 'rgba(255,20,20,0.25)',
                    }
                ]
            }
            ],
            plotOptions: {
                line: {
                    lineWidth: 3,
                    marker: {
                        enabled: true
                        
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#fafafa',
                            border: 'none',
                            fontSize: "0.8em",
                        }
                    }
                },
                column: {
                    pointPadding: 0.1,
                    groupPadding: 0.05,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        inside: true,
                        //y: -10,
                        style: {
                            color: '#fafafa',
                            border: 'none',
                            fontSize: "0.8em",
                        }
                    }
                }
            },
            series: incData,
            navigation: {
                enabled: false,
            },
            legend: {
                enabled: true,
                align: 'center',
                itemStyle: {
                    color: '#fcfcfc',
                    fontSize: '0.9em',
                    fontWeight: 'normal'
                }
            }
        });
    },

    log: function (msg) {
        if (this.config && this.config.debug) {
            console.log(this.name + ": ", (msg));
        }
    }
});
