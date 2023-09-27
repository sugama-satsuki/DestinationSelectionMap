import React from 'react';

/* import css */
import styles from './home.module.css'; 

/* import atoms */ 
import MsgBnr from '../atoms/msgBnr';

/* import organisms */ 
import Header from '../organisms/header';
import PinSelectContent from '../organisms/main_contents/pinSelectContent';

/* import data */
import { prefItems, cateItems } from '../../data/data'; 
import PlanDecisionContent from '../organisms/main_contents/planDecisionContent';
import { CircularProgress } from '@mui/material';
import { getTakamatsuCarParking, getOkinawaMuseum } from '../../data/getJson';



export default function Home(){

    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~~~ */ 

    // 1:非表示, 2:ピン選択, 3:経路表示
    const [contentState, setContentState] = React.useState(1);

    // {prefecture: string, category: string, facilityName: string}[]
    const [itemList, setItemList] = React.useState([]);

    const [msgId, setMsgId] = React.useState("");

    const [selectPref, setSelectPref] = React.useState('');
    const [selectCate, setSelectCate] = React.useState('');

    const [showData, setShowData] = React.useState({pref: "", cate: ""});


    const [geoJson, setGeoJson] = React.useState("");
    const [prefData, setPrefData] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const [planDecisionGeoJson, setPlanDecisionGeoJson] = React.useState({
        "type": "FeatureCollection",
        "features": []
    });



    /* ~~~~~~~~~ 関数 ~~~~~~~~~~ */ 

    React.useEffect(() => {

        if(geoJson !== "") {
            setLoading(() => { return false });
        }

    }, [geoJson])


    const fetchData = async(pref, cate) => {
        return await getOkinawaMuseum(pref, cate);
    }


    // 検索ボタンクリック処理
    async function searchFunc(prefecture, category) {
        setSelectPref(prefecture);
        setSelectCate(category);
        setContentState(() => {return 2;});

        if(!prefecture || !category) {
            setMsgId("E001");
            return
        }

        const pref = {text: prefItems.filter(el => el.val === prefecture)[0].text, val: prefItems.filter(el => el.val === prefecture)[0].val};
        const cate = {text: cateItems.filter(el => el.val === category)[0].text, val: cateItems.filter(el => el.val === category)[0].val}

        setShowData(
            () => { 
                return ({
                    pref: pref, 
                    cate: cate
                })
            }
        );

        let { data, lngLat } = await fetchData(pref.text, cate.val);
        lngLat['name'] = pref.text;
        setGeoJson(() => { return data });
        setPrefData(() => { return lngLat });
    }
    
    // 決定ボタンクリック処理
    function addDestListFunc(item) {
        const index = itemList.length === 0 ? 0 : itemList[itemList.length - 1].id;
        item.id = index + 1;
        // 行きたいところリストの更新
        setItemList([...itemList, item]);
    }

    // ×ボタンクリック処理
    function delDestListFunc(id) {
        const updateItemList = itemList.filter(item => item.id !== id);
        // 行きたいところリストの更新
        setItemList([...updateItemList]);
    }

    // プラン確定ボタンクリック処理
    function planDecisionFunc() {
        if(itemList.length > 0) {

            let pointList = [];

            // Featureデータの作成
            itemList.forEach((val) => {
                pointList.push({
                    "type": "Feature",
                    "properties": {
                        "prefecture": val.prefecture,
                        "category": val.category,
                        "facilityName": val.facilityName
                    },
                    "geometry": {
                        "coordinates": [
                            val.lng, 
                            val.lat
                        ],
                        "type": "Point"
                    }
                })
            })
            
            setPlanDecisionGeoJson(
                {
                    "type": "FeatureCollection",
                    "features": [
                        ...pointList
                    ]
                }
            )
            setContentState(() => {return 3;});
        } else {
            setMsgId("E002");
        }
    }

    // 戻るボタンクリック処理
    function backFunc() {
        setContentState(() => {return 2})
    }

    /* ~~~~~~~~~ return ~~~~~~~~~~ */ 

    return(
        <>
            <MsgBnr msgId={msgId} closeFunc={setMsgId} />
            <Header searchFunc={searchFunc} searchBarHide={contentState !== 1}/>
            <main className={`${styles.mainContent} ${styles.hidden}`}>
                { contentState === 1 && <></> }
                { contentState === 2 ? 
                    loading ? 
                        <div className={styles.loadingWrapper}><CircularProgress /></div>
                        :<PinSelectContent 
                            itemList={itemList} 
                            addDestListFunc={addDestListFunc} 
                            prefData={prefData} 
                            cate={showData.cate.text} 
                            planDecisionFunc={planDecisionFunc} 
                            geoData={geoJson}
                            delDestListFunc={delDestListFunc} 
                            searchFunc={searchFunc}
                        />
                    :
                    <></>
                }
                { contentState === 3 && 
                    <PlanDecisionContent 
                        destinationItems={planDecisionGeoJson} 
                        backFunc={backFunc} 
                        prefData={prefData} 
                    />
                }
            </main>
        </>
    );
}