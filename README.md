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
        height: 300,
        days: 7,
        regions: ['Berlin', 'Hamburg'],
        chartType: "line",  //use "line" or "bar"
    }
},
```


## Config options

|Option|Description|
|---|---|
|`width`|Width of the graph<br>**Type:** `Integer`<br>**Default:** `400`|
|`height`|Height of the graph<br>**Type:** `Integer`<br>**Default:** `300`|
|`days`|Number of days to show<br>**Type:** `Integer`<br>**Default:** `7`|
|`regions`|Array with communities to show<br>**Type:** `array`<br>**Values:**`['region1', 'region2', ...]`<br>**Default:**  `['Berlin', 'Hamburg']`|
|`chartType`|Type of chart<br>**Type:** `string`<br>**Values:** 'line', 'bar'<br>**Default:**  `"line"`|
|`showYAxis`|Show Y-Axis of chart<br>**Type:** boolean<br>**Default:**  `false`|
|`showMap`|Show heatmap of Germany<br>**Type:** `boolean`<br>**Default:**  `true`|
|`debug`|Debug mode (increased console output)<br>**Type:** `boolean`<br>**Default:**  `false`|



## Screenshot
![Incidence rates Screenshot](covid19-inc-sample.png?raw=true)


## Source
Data provided by <a href="https://api.corona-zahlen.org/">api.corona-zahlen.org</a>, provided by <a href="https://marlon-lueckert.de/">Marlon Lückert</a>  
Thanks Marlon!
