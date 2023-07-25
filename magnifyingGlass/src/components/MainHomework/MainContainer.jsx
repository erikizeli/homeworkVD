import React, { useEffect, useRef, useState } from 'react'
import MainGlass from './MainGlass'
import ImageHolder from '../../middleware/ImageHolder';
import RgbController from '../../middleware/RgbController';
import SizeController from '../../middleware/SizeController';

export default function MainContainer() {

  const [zoomValue, setZoomValues] = useState(2)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [glassPosition, setGlassPosition] = useState({ x: 0, y: 0 });
  const [rgbValue, setRgbValue] = useState({ r: 100, g: 100, b: 100 });
  const [currectColor, setCurrentColor] = useState()
  const [lock, setLock] = useState(false);
  const [mouseOver, setMouseOver] = useState(false)
  const BORDER_WIDTH = 4;
  const GLASS_RADIUS = 50;
  const containerRef = useRef(null);
  const rangeRef = useRef(null);

  useEffect(()=>{
    document.addEventListener('keydown', handleArrowChange);

    return () => {
      document.removeEventListener('keydown', handleArrowChange);
    };
  },[currectColor])


  const handleMouseMove = (event) => {
    const container = containerRef.current;
    const containerLeft = container.getBoundingClientRect().left;
    const containerTop = container.getBoundingClientRect().top;
    const containerWidth = container.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;

    const cursorDiamater = GLASS_RADIUS * 2 + BORDER_WIDTH;
    const verticalLockPoint = containerWidth - cursorDiamater
    const horizontalLockPoint = containerHeight - cursorDiamater

    const offsetX = event.clientX - containerLeft;
    const offsetY = event.clientY - containerTop;

    let lockedX = Math.max(0, Math.min(containerWidth, offsetX));
    let lockedY = Math.max(0, Math.min(containerHeight, offsetY));

    if (lockedX > verticalLockPoint) {
      lockedX = verticalLockPoint;
    }

    if (lockedY > horizontalLockPoint) {
      lockedY = horizontalLockPoint;
    }

    const delay = 30; // milliseconds
    setTimeout(() => {
      setGlassPosition({x: offsetX, y: offsetY})
      setCursorPosition({x: lockedX, y: lockedY})
    }, delay);
  };
  

  const handleRangeChange = (event) => {
    const value = event.target.value;
    const id = event.target.id
    console.log(event.target.value)
    if (id === "zoomValue") setZoomValues(value)
    if (id === "red") setRgbValue(prevState => ({...prevState, r: value}))
    if (id === "green") setRgbValue(prevState => ({...prevState, g: value}))
    if (id === "blue") setRgbValue(prevState => ({...prevState, b: value}))
  }

  const handleScroll = (event) => {
    const scrollSensitivity = 1;
    const delta = event.deltaY < 0 ? -scrollSensitivity : scrollSensitivity;
    const newValue = Math.max(1, Math.min(10, zoomValue + delta));

    rangeRef.current.value = newValue;
    setZoomValues(newValue);
  };

  const handleArrowChange = (event) => {
    if(event.key == 'r'){
      setCurrentColor(event.key)
    }
    if(event.key == 'g'){
      setCurrentColor(event.key)
    }
    if(event.key == 'b'){
      setCurrentColor(event.key)
    }
    if (event.key == 'ArrowLeft' && currectColor == 'r' && rgbValue.r > 0){
      const val = rgbValue.r -= 2
      setRgbValue(prevValue => ({...prevValue, r: val}))
    }
    if (event.key == 'ArrowRight' && currectColor == 'r' && rgbValue.r < 200){
      const val = rgbValue.r += 2
      setRgbValue(preValue => ({...preValue, r: val }))
    }

    if (event.key == 'ArrowLeft' && currectColor == 'g' && rgbValue.g > 0){
      const val = rgbValue.g -= 2
      setRgbValue(preValue => ({...preValue, g: val }))
    }
    if (event.key == 'ArrowRight' && currectColor == 'g' && rgbValue.g < 200){
      const val = rgbValue.g += 2
      setRgbValue(preValue => ({...preValue, g: val }))
    }

    if (event.key == 'ArrowLeft' && currectColor == 'b' && rgbValue.b > 0){
      const val = rgbValue.b -= 2
      setRgbValue(preValue => ({...preValue, b: val }))
    }
    if (event.key == 'ArrowRight' && currectColor == 'b' && rgbValue.b < 200){
      const val = rgbValue.b += 2
      setRgbValue(preValue => ({...preValue, b: val }))
    }
  }

  function lockGlass(){
    setLock(!lock)
  }

  const handleMouseOver = () => {
    setMouseOver(true)
  }

  const handleMouseOut = () => {
    setMouseOver(false)
  }


  return (
    <div className='main-container' ref={containerRef} onMouseMove={handleMouseMove} >
      <div className='image-container' onClick={lockGlass} onWheel={handleScroll} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <ImageHolder/>
        <MainGlass 
        cursorPosition={cursorPosition} 
        glassPosition={glassPosition}
        zoomValue={zoomValue} 
        lock={lock}
        rgbValue={rgbValue}
        mouseOver={mouseOver}/>
      </div>
      <div className='scale-container' ref={rangeRef} onChange={handleRangeChange}>
        <SizeController zoomValue={zoomValue}/>
      </div>
      <div className='rgb-container' onChange={handleRangeChange} tabIndex={0} onKeyDown={handleArrowChange}>
        <RgbController rgbValue={rgbValue}/>
      </div>
      <div className='eventLayer'></div>
    </div>
  )
}
