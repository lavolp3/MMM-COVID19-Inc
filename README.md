# MMM-COVID19-Inc
A <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> module showing last days COVID19 incidence rates.  
Uses data from RKI.  
**Only available for Germany**

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/lavolp3/MMM-COVID19-Inc.git`.
2. Navigate into the module folder and install npm dependencies: `cd MMM-COVID19-Inc && npm install`
3. Add the module in `config.js` placing it where you prefer.
```
{
    module: "MMM-COVID19-Inc",
    position: "top_right",   // see mirror settings for options
    header: "Inzidenzen",
    config: {
        width: 400,
        days: 7,
        districts: ['Berlin', 'Hamburg'],
        chartType: "line",  //use "line" or "bar"
        showGraph: true,
        showMap: true,
        showRanks: true,
        ranks: 5,
    },
},
```
    defaults: {
        chartType: 'line',
        districts: ['Berlin', 'Hamburg'],
        colors: ['#ade6bb', '#add8e6', '#e6add8', '#e6bbad'],
        width: 400,
        days: 7,
        showYAxis: false,
        showGraph: true,
        chartHeight: 250,
        showMap: true,
        showRanks: true,
        ranks: 5,
        mapWidth: 250,
        updateInterval: 10 * 60 * 1000,
        debug: false
    },

## Config options

|Option|Description|
|---|---|
|`chartType`|Type of chart<br>**Type:** `string`<br>**Values:** 'line', 'bar'<br>**Default:**  `"line"`|
|`width`|Width of the graph<br>**Type:** `Integer`<br>**Default:** `400`|
|`chartHeight`|Height of the chart<br>**Type:** `Integer`<br>**Default:** `300`|
|`days`|Number of days to show<br>**Type:** `Integer`<br>**Default:** `7`|
|`districts`|Array with districts to show (see below!)<br>**Type:** `array`<br>**Values:**`['region1', 'region2', ...]`<br>**Default:**  `['Berlin', 'Hamburg']`|
|`showYAxis`|Show Y-Axis of chart<br>**Type:** boolean<br>**Default:**  `false`|
|`showGraph`|Show graph of seleced regions<br>**Type:** `boolean`<br>**Default:**  `true`|
|`showMap`|Show heatmap of Germany<br>**Type:** `boolean`<br>**Default:**  `true`|
|`mapWidth`|Control the maps width/height with this<br>**Type:** `integer`<br>**Default:** `250`|
|`showRanks`|Show ranks of Regions with highest/lowest Incidence rates<br>**Type:** `boolean`<br>**Default:**  `true`|
|`ranks`|Number of entries with highest/lowest Incidence<br>**Type:** `integer`<br>**Default:** `5`|
|`debug`|Debug mode (increased console output)<br>**Type:** `boolean`<br>**Default:**  `false`|


### Districts

You can have the module search for districts (Landkreise) by just including the name of the district.    
If it doesn't show on the graph, you probably haven't used the proper name of the district.  
E.g. "Wesel" will work (Kreis Wesel). "Moers" will not (part of "Kreis Wesel").

## Screenshot
![Incidence rates Screenshot](https://raw.githubusercontent.com/lavolp3/MMM-COVID19-Inc/main/mmm-covid19-inc-sample.png?raw=true)


## Source
Data provided by <a href="https://api.corona-zahlen.org/">api.corona-zahlen.org</a>, provided by <a href="https://marlon-lueckert.de/">Marlon Lückert</a>  
Thanks Marlon!
