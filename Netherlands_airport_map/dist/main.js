// map class initialize 
var map = L.map('map').setView([52.278648, 5.356002], 8);
map.zoomControl.setPosition('topright');

// adding osm tilelayer 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var watercolorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});

var st = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});

var Nasa_Earth_at_night_map = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
    attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
    minZoom: 1,
    maxZoom: 8,
    format: 'jpg',
    time: '',
    tilematrixset: 'GoogleMapsCompatible_Level'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


////Geojson load
//var civil_airport_marker = L.markerClusterGroup();
//var taji = L.geoJSON(civil_airports, {
//    onEachFeature: function (feature, layer) {
//        layer.bindPopup(feature.properties.name)
//    }
//});
//taji.addTo(civil_airport_marker);
//civil_airport_marker.addTo(map);




var airplaneIcon = L.icon({
    iconUrl:"images/airplane.png",
    iconSize: [31,31],
    iconAnchor: [0,0]
})

var military_plane_Icon = L.icon({
    iconUrl:"images/fighter-plane.png",
    iconSize: [31,31],
    iconAnchor: [0,0]
})

var helipadIcon = L.icon({
    iconUrl:"images/helipad.png",
    iconSize: [31,31],
    iconAnchor: [0,0]
})

//Geojson load
var civil_airport_marker = L.markerClusterGroup();
var taji = L.geoJSON(civil_airports,{
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name)
        layer.setIcon(airplaneIcon)
    }
});

taji.addTo(civil_airport_marker);
civil_airport_marker.addTo(map);

//Geojson load
var military_air_bases_marker = L.markerClusterGroup();
var taji2 = L.geoJSON(military_air_bases, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name)
        layer.setIcon(military_plane_Icon)
    }
});
taji2.addTo(military_air_bases_marker);
military_air_bases_marker.addTo(map);

//Geojson load
var helipads_marker2 = L.markerClusterGroup();
var taji3 = L.geoJSON(helipads, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name)
        layer.setIcon(helipadIcon)
    }
});
taji3.addTo(helipads_marker2);
helipads_marker2.addTo(map);

//Leaflet layer control
var baseMaps = {
    'OSM': osm,
    'Water Color Map': watercolorMap,
    'Stamen Toner': st,
    'Nasa Night Map': Nasa_Earth_at_night_map,
    'Esri Map': Esri_WorldImagery
}

var overlayMaps = {
    'Civil Airports': civil_airport_marker,
    'Military Air Bases': military_air_bases_marker,
    'Helipads': helipads_marker2,
}

L.control.layers(baseMaps, overlayMaps, { collapsed: false, position: 'topleft' }).addTo(map);
