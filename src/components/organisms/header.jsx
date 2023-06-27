import React from "react";

/* import atoms */ 
import Nav from "../atoms/nav";

/* import css */
import styles from "./header.module.css"; 
import SearchArea from './searchArea';



export default function Header(props) {


    const {searchFunc, searchBarHide} = props;

    /* ~~~~~~~~ 定数・変数 ~~~~~~~~ */ 

    


    /* ~~~~~~~~ 関数 ~~~~~~~~ */ 

    function showMap(prefecture, category) {
        searchFunc(prefecture, category);
    }

    

    /* ~~~~~~~~~~ return ~~~~~~~~~~ */ 

    return(
        <header>
            <div className={styles.header__inner}>
                <Nav />
                <div className={styles.header__content}>
                    <h1>Search for <br/>a beautiful holiday.</h1>
                    <p>素敵な国内旅行の計画を練りましょう！</p>
                    <div className={`${styles.header__innerContent} ${searchBarHide && styles.hide}`}>
                        <SearchArea onClickFunc={showMap}/>
                    </div>
                </div>
            </div>
            <img src="../imgs/travel.png" className={`${styles.header_img} ${searchBarHide && styles.small_img}`} alt="header-img"/>
        </header>
    )
}