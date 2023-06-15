import React from "react";

/* import css */ 
import styles from "./searchArea.module.css";

/* import atoms */ 
import Button from "../atoms/button";
import SelectBox from "../molecules/selectBox";

/* import data */
import { prefItems, cateItems } from "../../data/data";


export default function SearchArea(props) {

    const {onClickFunc, small} = props;

    const [selectPref, setSelectPref] = React.useState('');
    const [selectCate, setSelectCate] = React.useState('');

    function changePref(val) {
        setSelectPref(() => {return val})
    }
    function changeCate(val) {
        setSelectCate(() => {return val})
    }

    // 検索ボタンクリック処理
    function onClickSearchButton() {
        console.log('searchArea: ' + selectPref, selectCate);
        onClickFunc(selectPref, selectCate);
    }

    return(
        <div className={styles.searchArea}>
            <div className={styles.selectWrapper}>
                {
                    small ?
                        <>
                            <SelectBox items={prefItems} label="県" eleId="pref" onchange={changePref} small/>
                            <SelectBox items={cateItems} label="カテゴリー" eleId="cate" onchange={changeCate} small/>
                        </>
                        :
                        <>
                            <SelectBox items={prefItems} label="県" eleId="pref" onchange={changePref} />
                            <SelectBox items={cateItems} label="カテゴリー" eleId="cate" onchange={changeCate} />
                        </>
                }
            </div>
            <Button text='検索' onClickFunc={onClickSearchButton} />
        </div>
    )
}

