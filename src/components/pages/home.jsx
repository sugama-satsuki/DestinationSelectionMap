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
import { getTakamatsuCarParking } from '../../data/getJson';



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
    const [loading, setLoading] = React.useState(true);

    // TODO: フラグの切り替え、減らす増やすなどのstate操作はuseCallback使ってアロー関数定義。



    /* ~~~~~~~~~ 関数 ~~~~~~~~~~ */ 

    React.useEffect(() => {
        console.log("call useEffect!: ", geoJson)
        if(geoJson !== "") {
            setLoading(() => { return false });
        }
    }, [geoJson])


    const fetchData = async() => {
        return getTakamatsuCarParking();
    }


    async function searchFunc(prefecture, category) {
        setSelectPref(prefecture);
        setSelectCate(category);
        setContentState(() => {return 2;});

        if(!prefecture && !category) {
            setMsgId("E001");
            return
        }

        setShowData(
            () => { 
                return ({
                    pref: prefItems.filter(el => el.val === prefecture)[0].text, 
                    cate: cateItems.filter(el => el.val === category)[0].text
                })
            }
        );

        let geoData = await fetchData();
        console.log(geoJson);
        setGeoJson(() => { return geoData});
        console.log('call searchFunc!', loading, geoJson)
    }
    
    // 決定ボタンクリック処理
    function addDestListFunc(item) {
        const index = itemList.length === 0 ? 0 : itemList[itemList.length - 1].id;
        item.id = index + 1;
        console.log(item);
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
        setContentState(() => {return 3;});
    }

    // 戻るボタンクリック処理
    function backFunc() {
        setContentState(() => {return 2})
    }

    /* ~~~~~~~~~ return ~~~~~~~~~~ */ 

    return(
        <>
            <MsgBnr msgId={msgId} closeFunc={setMsgId} />
            <Header searchFunc={searchFunc}/>
            <main className={`${styles.mainContent} ${styles.hidden}`}>
                { contentState === 1 && <></> }
                { contentState === 2 ? 
                    loading ? 
                        <div className={styles.loadingWrapper}><CircularProgress /></div>
                        :<PinSelectContent 
                            itemList={itemList} 
                            addDestListFunc={addDestListFunc} 
                            pref={showData.pref} 
                            cate={showData.cate} 
                            planDecisionFunc={planDecisionFunc} 
                            geoData={geoJson}
                            delDestListFunc={delDestListFunc} 
                        />
                    :
                    <></>
                }
                { contentState === 3 && 
                    <PlanDecisionContent destinationItems={itemList} backFunc={backFunc} />
                }
            </main>
        </>
    );
}