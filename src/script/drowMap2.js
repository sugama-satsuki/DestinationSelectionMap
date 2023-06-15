

// --------------------
// 定数定義
// --------------------

// 初期lngとlat
const center = [ 127.68515584340423, 26.176227738385577 ];
const url = 'https://raw.githubusercontent.com/geolonia/prefecture-tiles/master/prefectures.geojson';

// const geojsonExtent = require('geojson-extent');


// マップの表示
const map = new geolonia.Map({
    container: '#geoloniaMap',
    center: [135.506306, 34.652499],
    zoom: 10
});

map.on('load', async () => {
  const resp = await fetch('https://raw.githubusercontent.com/geolonia/prefecture-tiles/master/prefectures.geojson');
  const geojson = await resp.json();
})