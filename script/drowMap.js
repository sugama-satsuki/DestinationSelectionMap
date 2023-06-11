

// --------------------
// 定数定義
// --------------------

// 初期lngとlat
const center = [ 127.68515584340423, 26.176227738385577 ];
const url = 'https://raw.githubusercontent.com/geolonia/prefecture-tiles/master/prefectures.geojson';
const geojsonExtent = require('geojson-extent');

// --------------------
// mapインスタンスの生成、GeoJsonの取得
// --------------------
const map = new geolonia.Map({
    container: '.geolonia',
    center: center,
    zoom: 16
});


// jsonデータをフェッチ
const fetchData = async () => {
    const res = await fetch(url);
    const json = await res.json();

    return json;
}

map.on('load', async () => {

    const geojson = await fetchData();

    console.log(geojson);

    // 表示非表示が切り替えられるよう、都道府県コードをidにセット
    const prefectures = geojson.features.map((pref) => {
        return {
            ...pref, ...{id: pref.properties.code}
        }
    });
    
    // 取得したGeoJSON（全都道府県のポリゴンデータが入っている）データをマップに追加
    map.addLayer({
        id: 'prefectures',
        type: 'fill',
        source: {
            type: 'geojson',
            data: {
                "type": "FeatureCollection",
                "features": prefectures
            }
        },
        layout: {},
        paint: {
            'fill-color': '#ff0000',
            'fill-opacity': [
                'case', 
                ['boolean', ['feature-state', 'active'], false], 
                1, 
                0
            ]
        }
    })

    const prefectureSelectBox = new PrefectureSelectBox(prefectures);
    map.addControl(prefectureSelectBox);
});



/// --------------------
// マーカーの生成、関数定義、紐付け
// --------------------
const marker = new geolonia.Marker({
    draggable: true
}).setLngLat(center).addTo(map);

// ドラッグ時実行される関数
function onDragEnd() {
    const lngLat = marker.getLngLat();
    alert(`緯度： ${lngLat.lat}, 経度： ${lngLat.lng}`);
}

marker.on('dragend', onDragEnd);




// -------- クラス ---------

// 都道府県選択コントロール
class PrefectureSelectBox {
    
    constructor(prefectures) {
        // prefecturesインスタンス格納用
        this._prefectures = prefectures;
        // 選択した都道府県コード格納用
        this._selectPrefectureCode = undefined;
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl';
        this._container.innerHTML = `
            <select name="prefecture">
                ${this._prefectures.map(pref => {
                    return '<option value=' + pref.properties.code + '>' + pref.properties.name + '</option>';
                })}
            </select>
        `

        // 都道府県が選択されたときに呼ばれる
        this._container.addEventListener("change", (e) => {

            // 前回選択した都道府県があれば、ハイライト表示を無効にする
            if (this._selectedPrefectureCode) {
                this._map.setFeatureState(
                    { source: 'prefectures', id: this._selectedPrefectureCode },
                    { active: false }
                );
            }
        
            // 選択した都道府県のハイライト表示を有効にする
            this._selectedPrefectureCode = e.target.value;
            this._map.setFeatureState(
                { source: 'prefectures', id: this._selectedPrefectureCode },
                { active: true }
            );
        
            // 選択された都道府県をフォーカスする
            const selectedPrefecture = this._prefectures.find(prefecture => prefecture.properties.code === this._selectedPrefectureCode);
            console.log(selectedPrefecture)
            const prefectureGeojson = {
                type: 'FeatureCollection',
                features: [selectedPrefecture]
            }
            
            this._map.fitBounds(geojsonExtent(prefectureGeojson))
        })

        return this._container
    }

    onRemove() {
        this._container.parentNode.removeChild(this.container)
        this._map = undefined
    }
}

// const prefectureSelectBox = new PrefectureSelectBox(prefectures);
// map.addControl(prefectureSelectBox);



// テーマ切り替えコントロール
class styleControl {

    constructor() {
        // styleの定義
        this.styles = [
            'geolonia/basic',
            'geolonia/gsi',
            'geolonia/midnight',
            'geolonia/red-planet',
            'geolonia/notebook',
        ]

        console.log(map);
    }

    onAdd() {
        // mapオブジェクトを代入
        this.map = map;

        // style選択用のelementを生成
        this.container = document.createElement('div');
        const select = document.createElement('select');
        this.container.appendChild(select);

        // styleの設定
        this.container.classList.add("mapStyleSelect");
        console.log(this.container.classList);
        // オプションの生成
        this.styles.forEach((val, index) => {
            select[index] = new Option(val, val, index===0, index===0);
        });

        select.addEventListener('click', (e) => {
            console.log('on click select')
        })
        // 
        select.addEventListener('change', (e) => {
            this.map.setStyle(e.target.value);
        })

        return this.container;
    }

    onRemove() {
        this.container.parentElement.removeChild(this.container);
        this.map = undefined;
    }
}

map.addControl(new styleControl(), 'top-left');
