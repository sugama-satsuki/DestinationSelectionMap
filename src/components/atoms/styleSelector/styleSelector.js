import React, { useState, useEffect } from 'react';

import { MapStylesAPI } from '../../../constants';

const StyleSelector = (props) => {
  const { style, styleIdentifier, setStyleIdentifier } = props;
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    fetch(MapStylesAPI)
      .then((res) => res.json())
      .then((json) => {
        setStyles(json);
      });
  }, []);

  const onChangeHandler = (event) => {
    setStyleIdentifier(event.currentTarget.value);
  };

  return (
    <>
      <select style={style} onChange={onChangeHandler} value={styleIdentifier}>{styles.map((item, index) => {
        return <option key={index} value={item}>{item}</option>;
      })}</select>
    </>
  );
};

export default StyleSelector;
