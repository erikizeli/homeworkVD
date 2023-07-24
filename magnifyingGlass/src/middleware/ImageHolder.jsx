import React from 'react'
import cityImage from "../assets/city.jpg"

export default function ImageHolder({ rgbValue }) {

  const style = {
    'filter':`saturate(${(rgbValue.r/100) * (rgbValue.g/100) * (rgbValue.b/100) * 100}%)`
  }

  return <img className='image' src={cityImage} style={style} alt="Bird's eye view of a metropolitan city at dawn."/>
}
