import React from 'react';
import styles from './nav.module.css';



export default function Nav() {

    return(
        <div className={styles.nav__wrapper}>
            <div className={styles.logo}>
                DestinationMap
            </div>
            <nav>
                <span>menu1</span>
                <span>menu2</span>
                <span>menu3</span>
            </nav>
        </div>
    )
}