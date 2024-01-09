var wms_layers = [];
var baseLayer = new ol.layer.Group({
    'title': '',
    layers: [
new ol.layer.Tile({
    'title': 'OSM',
    'type': 'base',
    source: new ol.source.OSM()
})
]
});
var format_JAWATENGAH_0 = new ol.format.GeoJSON();
var features_JAWATENGAH_0 = format_JAWATENGAH_0.readFeatures(json_JAWATENGAH_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_JAWATENGAH_0 = new ol.source.Vector({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
});
jsonSource_JAWATENGAH_0.addFeatures(features_JAWATENGAH_0);var lyr_JAWATENGAH_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_JAWATENGAH_0, 
                style: style_JAWATENGAH_0,
    title: 'JAWA TENGAH<br />\
    <img src="styles/legend/JAWATENGAH_0_0.png" /> Sedikit (0-150)<br />\
    <img src="styles/legend/JAWATENGAH_0_1.png" /> Banyak ( 151-300)<br />\
    <img src="styles/legend/JAWATENGAH_0_2.png" /> Sangat Banyak (301-969)<br />'
        });

lyr_JAWATENGAH_0.setVisible(true);
var layersList = [baseLayer,lyr_JAWATENGAH_0];
lyr_JAWATENGAH_0.set('fieldAliases', {'JUDUL': 'JUDUL', 'KABUPATEN': 'KABUPATEN', 'TOTAL': 'TOTAL', });
lyr_JAWATENGAH_0.set('fieldImages', {'JUDUL': 'TextEdit', 'KABUPATEN': 'TextEdit', 'TOTAL': 'TextEdit', });
lyr_JAWATENGAH_0.set('fieldLabels', {'JUDUL': 'inline label', 'KABUPATEN': 'inline label', 'TOTAL': 'inline label', });
lyr_JAWATENGAH_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});