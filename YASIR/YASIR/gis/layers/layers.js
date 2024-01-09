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
var format_JawaTengah_0 = new ol.format.GeoJSON();
var features_JawaTengah_0 = format_JawaTengah_0.readFeatures(json_JawaTengah_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_JawaTengah_0 = new ol.source.Vector({
    attributions: [new ol.Attribution({html: '<a href=""></a>'})],
});
jsonSource_JawaTengah_0.addFeatures(features_JawaTengah_0);var lyr_JawaTengah_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_JawaTengah_0, 
                style: style_JawaTengah_0,
    title: 'Jawa Tengah<br />\
    <img src="styles/legend/JawaTengah_0_0.png" /> Sedikit (0-109107)<br />\
    <img src="styles/legend/JawaTengah_0_1.png" /> Banyak (109107-208943)<br />\
    <img src="styles/legend/JawaTengah_0_2.png" /> Sangat Banyak (208943-308780)<br />'
        });

lyr_JawaTengah_0.setVisible(true);
var layersList = [baseLayer,lyr_JawaTengah_0];
lyr_JawaTengah_0.set('fieldAliases', {'Kab/Kota': 'Kab/Kota', '2020': '2020', '2021': '2021', '2022': '2022', });
lyr_JawaTengah_0.set('fieldImages', {'Kab/Kota': 'TextEdit', '2020': 'TextEdit', '2021': 'TextEdit', '2022': 'TextEdit', });
lyr_JawaTengah_0.set('fieldLabels', {'Kab/Kota': 'inline label', '2020': 'inline label', '2021': 'inline label', '2022': 'inline label', });
lyr_JawaTengah_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});