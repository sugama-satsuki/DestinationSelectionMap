import React from 'react';

/* import css */
import styles from './home.module.css'; 

/* import organisms */ 
import Header from '../organisms/header';
import PinSelectContent from '../organisms/main_contents/pinSelectContent';

/* import data */
import { prefItems, cateItems } from '../../data/data'; 
import PlanDecisionContent from '../organisms/main_contents/planDecisionContent';



export default function Home(){

    /* ~~~~~~~~~ 定数・変数 ~~~~~~~~~~ */ 

    // 1:非表示, 2:ピン選択, 3:経路表示
    const [contentState, setContentState] = React.useState(1);

    // {prefecture: string, category: string, facilityName: string}[]
    const [itemList, setItemList] = React.useState([]);

    const [selectPref, setSelectPref] = React.useState('');
    const [selectCate, setSelectCate] = React.useState('');

    const [showData, setShowData] = React.useState({pref: "", cate: ""});


    /* ~~~~~~~~~ 関数 ~~~~~~~~~~ */ 

    function searchFunc(prefecture, category) {
        setSelectPref(prefecture);
        setSelectCate(category);
        setShowData(
            () => { return ({
                pref: prefItems.filter(el => el.val === prefecture)[0].text, 
                cate: cateItems.filter(el => el.val === category)[0].text
            })}
        );
        setContentState(() => {return 2;});
    }
    
    // 決定ボタンクリック処理
    function addDestListFunc(item) {
        console.log('call addDestListFunc');
        // 行きたいところリストの更新
        setItemList([...itemList, item]);
    }

    // プラン確定ボタンクリック処理
    function planDecisionFunc() {
        setContentState(() => {return 3;});
    }

    /* ~~~~~~~~~ return ~~~~~~~~~~ */ 

    return(
        <>
            <Header searchFunc={searchFunc}/>
            <main className={`${styles.mainContent} ${styles.hidden}`}>
                { contentState === 2 && 
                    <PinSelectContent itemList={itemList} addDestListFunc={addDestListFunc} pref={showData.pref} cate={showData.cate} planDecisionFunc={planDecisionFunc}/>
                }
                { contentState === 3 && 
                    <PlanDecisionContent destinationItems={itemList}/>
                }
            </main>
        </>
    );
}