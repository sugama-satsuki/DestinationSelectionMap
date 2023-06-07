// // mapオブジェクトの生成（htmlにて設定したidをセット）
// const map = new geolonia.Map("#map");
// const geojson = "https://geolonia.github.io/style-demo-source/takamatsu-car-parking.json";

// (async () => {
//     // 
//     const resJson = await fetch(geojson);

//     // フェッチに失敗したら
//     if (!resJson.ok) {
//         console.log("Error: GeoJSON not found.");
//         return;
//     }

//     const data = await resJson.json();

//     // Marderオブジェクトのセット
//     const setMarker = feature => {
//         const popup = new geolonia.Popup() // add popups
//         .setText(feature.properties["title"]);

//         let options = {}
//         if ("24:00" !== feature.properties["endTime"]) {
//         options = {color: '#F9BF3D'};
//         }

//         const marker = new geolonia.Marker(options)
//         .setLngLat(feature.geometry.coordinates)
//         .setPopup(popup)
//         .addTo(map);
        
//         marker.getElement().style.cursor = 'pointer'
//     };
    
//     // Sorts features from North to South.
//     data.features.sort((a, b) => {
//         const { y: ay } = map.project(a.geometry.coordinates)
//         const { y: by } = map.project(b.geometry.coordinates)
//         return ay - by
//     })

//     // 取得データ分Markerオブジェクトを生成
//     for (let i = 0; i < data.features.length; i++) {
//         setMarker(data.features[i])
//     }

// })();
