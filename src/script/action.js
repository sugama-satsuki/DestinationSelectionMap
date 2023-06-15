

// select box選択項目取得
function getSelectData() {
    const prefSelect = document.querySelector("#prefecture");
    const cateSelect = document.querySelector("#category");

    const prefecture = prefSelect.options[prefSelect.selectedIndex].text;
    const category = cateSelect.options[cateSelect.selectedIndex].text;

    return [prefecture, category];
}

function getData() {
    const query = `
            [out:json][timeout:25];
            {{geocodeArea:Okinawa}}->.searchArea;
                (
                    node["tourism"="museum"](area.searchArea);
                    way["tourism"="museum"](area.searchArea);
                    relation["tourism"="museum"](area.searchArea);
                );
            out body;
            >;
            out skel qt;
        `
    query_overpass(query, callback);

    function callback(err, data){
        console.log(err);
        console.log(data);
    }

}

// マップの表示
function showMap() {
    const main = document.querySelector(".main-content");
    const headerContent = document.querySelector(".header__content");
    const headerImg = document.querySelector(".header_img");
    const selectData = getSelectData();

    main.classList.add("content-fadeIn");
    main.classList.remove('hidden');
    headerContent.classList.add('header__content_small');
    headerContent.querySelector('.header__innerContent').classList.add('hidden');
    headerImg.classList.add('header_img_small');
    getData();

    main.querySelector('.main-content-header > .destinationArea > .destination').textContent = selectData[0] + " > " + selectData[1];
}


// 行きたいところリストへ追加
function addDestinationList() {
    const mainContentHeader = document.querySelector(".main-content-header > .searchArea");
    const destinationList = document.querySelector(".destinationList > .destinationList_inner");
    const childEle = document.createElement('li');
    const selectData = getSelectData();

    childEle.textContent = `${selectData[0]}：${selectData[1]}　施設名`;
    destinationList.appendChild(childEle);

    // なかったら表示
    if(!mainContentHeader.querySelector(".searchArea-inner")) {
        console.log('show searchArea');
        mainContentHeader.innerHTML = `
            <div class="searchArea-inner">
                <div class="prefArea">
                    <label>県：</label>
                    <select id="prefecture" class="select-s">
                        <option value='Okinawa'>沖縄</option>
                        <option value='Hokkaido'>北海道</option>
                        <option value='Kyoto'>京都</option>
                        <option value='Kagoshima'>鹿児島</option>
                        <option value='Tokyo'>東京</option>
                        <option value='Nara'>奈良</option>
                        <option value='Hiroshima'>広島</option>
                        <option value='Kanagawa'>神奈川</option>
                        <option value='Hyogo'>兵庫</option>
                        <option value='Ehime'>愛媛</option>
                    </select>
                </div>
                <div class="cateArea">
                    <label>カテゴリー：</label>
                    <div class="content">
                        <select id="category" class="select-s" class="cateLabel">
                            <option value='ArtMuseum'>美術館</option>
                            <option value='OldCityscape'>古い街並み</option>
                            <option value='SeaRiver'>海/川</option>
                            <option value='Mountain'>山</option>
                            <option value='PowerSpot'>パワースポット</option>
                            <option value='TempleShrine'>お寺/神社</option>
                            <option value='DepartmentStore'>デパート</option>
                            <option value='outlet'>アウトレット</option>
                            <option value='Hotel'>ホテル</option>
                            <option value='hotSpring'>温泉</option>
                        </select>
                    </div>
                </div>
                <button type="button" onclick="showMap()">
                    再検索
                </button>
                </div>
            </div>
        `;
    }
}


function planDecision() {
    const container = document.querySelector('.main-content');
    const destinationSelect = container.querySelector(".destinationSelect");
    const destinationList = document.querySelector("div.destinationList > ul").querySelectorAll("li");
    destinationSelect.classList.toggle('content-fadeOut');

    const destinationItems = Array.from(destinationList).map((val) => {
                                let valArr = val.innerHTML.split('　');
                                return `<li>
                                            <span class="sub-title">${valArr[0]}</span>
                                            <span class="title">${valArr[1]}</span>
                                            <span class="description">10km 10分</span>
                                        </li>`
                            });
    
    container.innerHTML = `
        <div class="content__inner destinationFixed content-fadeIn">
            <div class="main-content-header">
                <div class="destinationArea">
                    <a onclick="" class="back">行き先を選ぶ</a>
                    <p class="title paddingLeft-m paddingBottom-xs">最高の旅にしましょう♪</p>
                    <p class="destination paddingLeft-m">最短経路を表示しています。</p>
                </div>
            </div>
            <div>
                <div><p>出発地を入力</p></div>
                <div></div>
            </div>
            <div class="mapArea wideMap">
                <div
                    id="geoloniaWideMap"
                    data-lang="en"
                ></div>
                <div class="text-contents padding-none bgWhite">
                    <ul class="routeList">
                        ${ destinationItems.join("") }
                    </ul>
                </div>
            </div>
        </div>
    `

    // if(!container.classList.contains('hidden')) {

    // }
}