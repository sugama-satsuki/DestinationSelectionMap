
// mapインスタンスの生成
const map = new geolonia.Map('.geolonia');

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
