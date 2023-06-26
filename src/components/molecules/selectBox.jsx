import React from "react";
import styles from "./selectBox.module.css";



export default function SelectBox(props) {

    const { label, items, eleId, small, onchange, selected } = props;

    const [selectVal, setSelectVal] = React.useState('');

    function change(e) {
        setSelectVal(() => {return e.target.value});
        onchange(e.target.value);
    }

    return(
        <div>
            <label>{label}：</label>
            <select id={eleId} className={`${ small ? styles.selectS : styles.selectM }`} onChange={(e) => change(e)}>
                <option value="">--</option>
                { items.map((val, index) => {
                    return <option value={val.val} key={eleId + '_option' + index}>{val.text}</option>
                  })
                }
            </select>
        </div>
    )
}