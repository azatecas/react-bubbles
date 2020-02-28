import React, { useState, useEffect } from "react";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [update, setUpdate ] = useState(false)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=>{
    axiosWithAuth()
      .get(`api/colors`)
      .then(res => {
        console.log('res from get', res.data);
        setColorList(res.data);
        //setUpdate to false to force component remount
        //setUpdate(true) is inside colorList component
        setUpdate(false)
      })
      .catch(err => console.log('error get', err))
  },[update])

  return (
    <>
      <ColorList 
        colors={colorList} 
        updateColors={setColorList} 
        setUpdate={setUpdate} 
      />
      <Bubbles 
        colors={colorList} 
      />
    </>
  );
};

export default BubblePage;
