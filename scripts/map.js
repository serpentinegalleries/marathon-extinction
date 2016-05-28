L.mapbox.accessToken = 'pk.eyJ1Ijoia2Vpa3JldXRsZXIiLCJhIjoiMWRKNGkwTSJ9.6fwMqvOqGXqAJeH-yF__DQ'; //pk.eyJ1IjoiZ2FtZXJhIiwiYSI6IjNlclVnZDAifQ.a8PjkEfE5i2aOShPawCy1A';
var map = L.mapbox.map('map', 'extinctly.f3ad5588', { // 'keikreutler.jj521j2a', { // 
    zoomControl: true,
    minZoom: 2
}).setView([30, -25], 3);

map.scrollWheelZoom.disable();

/******************
CREATE LAYER GROUPS
******************/

var case_studies = new L.layerGroup();
var extinction_sites = new L.layerGroup();
var extinct_wild = new L.layerGroup();
var volatility_storms = new L.layerGroup();

/******************
LOAD MAP ICONS
******************/

var mapicon_VS = L.icon({
    iconUrl: '/images/map/volatility_sites.png',
    iconAnchor: [12, 5]
});
var mapicon_EW = L.icon({
    iconUrl: '/images/map/extinct_in_the_wild.png',
    iconAnchor: [12, 5]
});
var mapicon_CS = L.icon({
    iconUrl: '/images/map/case_studies.png',
    iconAnchor: [12, 5]
});
var mapicon_ES = L.icon({
    iconUrl: '/images/map/extinction_sites.png',
    iconAnchor: [12, 5]
});

/******************
LOAD MAP DATA
******************/

/*** ASSIGN MARKER TYPES ***/

$.getJSON("/data/map.json", function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.type === "extinct_wild") {
                var marker = L.marker(latlng, {
                    icon: mapicon_EW
                });
            } else if (feature.properties.type === "volatility_storms") {
                var marker = L.marker(latlng, {
                    icon: mapicon_VS
                });
            } else {
                var marker = L.marker(latlng, {
                    icon: mapicon_CS
                });                
            };
            return marker;
            },
        onEachFeature: createPopUps
        }).on('mouseover', function(e) {
            e.layer.openPopup();
        });
    });

$.getJSON("/data/casestudies.json", function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
                icon: mapicon_CS
            });
            return marker;
        },
        onEachFeature: createPopUps
        }).on('mouseover', function(e) {
            e.layer.openPopup();
        });
    });

$.getJSON("/data/sites.json", function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {
                icon: mapicon_ES
            });
            return marker;
        },
        onEachFeature: createSites
        }).on('mouseover', function(e) {
            e.layer.openPopup();
        });
    });

function createSites(feature, featureLayer) {
    if (feature.properties.attribution === undefined) {
        featureLayer.bindPopup('<h1>' + feature.properties.name + '</h1><p>' + feature.properties.description_short + '</p>');
    }
    else {
        featureLayer.bindPopup('<h1>' + feature.properties.name + '</h1><p>' + feature.properties.description_short + '</p><p class="lead">Submitted By: ' + feature.properties.attribution + '</h5>');
    }
    extinction_sites.addLayer(featureLayer);
}

function createPopUps(feature, featureLayer) {
    if(feature.properties.link === undefined) {
        feature.properties.link = feature.properties.name.replace(/ /g, "-").replace(/[^a-zA-Z0-9 -]/g, '').toLowerCase();
    };
    if(feature.properties.type === "case_studies") {
        featureLayer.bindPopup('<h1>' + feature.properties.name + '</h1><p>' + feature.properties.description_short + '</p><a class="lead" data-toggle="modal" id="read-more" class="'+ feature.properties.link +'" data-target="#' + feature.properties.link + '">Read more</a></h5>');
        case_studies.addLayer(featureLayer);
    }
    else if (feature.properties.type === "extinct_wild") {
        featureLayer.bindPopup('<h1>' + feature.properties.name + '</h1><p>' + feature.properties.description_short + '</p><a class="lead" data-toggle="modal" data-target="#' + feature.properties.link + '">Read more</a>');
        extinct_wild.addLayer(featureLayer);
    } else {
        featureLayer.bindPopup('<h1>' + feature.properties.name + '</h1><p>' + feature.properties.description_short + '</p><a class="lead" data-toggle="modal" data-target="#' + feature.properties.link + '">Read more</a>');
        volatility_storms.addLayer(featureLayer, feature.properties.link);
    }
    createModal(feature, feature.properties.link);
}

case_studies.addTo(map);
extinction_sites.addTo(map);
extinct_wild.addTo(map);
volatility_storms.addTo(map);

function createModal(feature, url) {
    var modal = document.createElement("div");
    modal.id = url;
    modal.className = "modal fade";

    switch (feature.properties.type){
        case "extinct_wild":
            modal.innerHTML = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h2 class="modal-title">' + feature.properties.name +'</h2></div><div class="modal-body"><img src="/images/participants/extinct_in_the_wild/' + feature.properties.thumbnail +'"><p>' + feature.properties.description_short + '</p></div></div></div><div class="modal-footer"><h2 class="modal-title"><a href="http://michaelwang.info/Extinct-in-the-Wild-Proposal" target="_blank">Extinct in the Wild</a></h2></div>'
        break;

        case "volatility_storms":
            modal.innerHTML = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h2>' + feature.properties.name +'</h2></div><div class="modal-body"><img src="/images/participants/'+ feature.properties.media.image +'"><p>' + feature.properties.description_long + '</p></div></div></div><div class="modal-footer"><h2>Volatility Storms</h2></div>';
        break;
    }
    document.body.appendChild(modal);
}

/******************
FILTER BY LAYER
******************/

document.getElementById('filter-volatility').onclick = function() {
    map.removeLayer(case_studies);
    map.removeLayer(extinct_wild);
    map.removeLayer(extinction_sites);
    map.addLayer(volatility_storms);
    map.setView([30, -25], 2);
}
document.getElementById('filter-extinct-wild').onclick = function() {
    map.removeLayer(case_studies);
    map.removeLayer(volatility_storms);
    map.removeLayer(extinction_sites);
    map.addLayer(extinct_wild);
}
document.getElementById('filter-case-studies').onclick = function() {
    map.removeLayer(extinct_wild);
    map.removeLayer(volatility_storms);
    map.removeLayer(extinction_sites);
    map.addLayer(case_studies);
}
document.getElementById('filter-extinct-sites').onclick = function() {
    map.removeLayer(extinct_wild);
    map.removeLayer(volatility_storms);
    map.removeLayer(case_studies);
    map.addLayer(extinction_sites);
}
document.getElementById('filter-all').onclick = function() {
    map.addLayer(extinct_wild);
    map.addLayer(volatility_storms);
    map.addLayer(case_studies);
    map.addLayer(extinction_sites);
}

/******************
SET ACTIVE FILTER
******************/

$(window).load(function(){
    $("#filters div").click(function() {
        $('div').removeClass('active');
        $(this).addClass("active");
    });
});