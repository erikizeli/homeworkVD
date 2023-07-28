import React, { useEffect, useRef, useState } from 'react'
import MainMagnifyingGlass from './MainMagnifyingGlass'
import ImageHolder from '../../middleware/ImageHolder';
import RgbController from '../../middleware/RgbController';
import ZoomController from '../../middleware/ZoomController';
import SaturationController from '../../middleware/SaturationController';

export default function MainContainer() {

  const [zoomValue, setZoomValues] = useState(2)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [glassPosition, setGlassPosition] = useState({ x: 0, y: 0 });
  const [saturation, setSaturation] = useState(100);
  const [currentColor, setCurrentColor] = useState()
  const [lock, setLock] = useState(false);
  const [mouseOver, setMouseOver] = useState(false)
  const BORDER_WIDTH = 4;
  const GLASS_RADIUS = 50;
  const containerRef = useRef(null);

  useEffect(()=>{
    document.addEventListener('keydown', handleArrowChange);

    return () => {
      document.removeEventListener('keydown', handleArrowChange);
    };
  },[saturation])


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

    setGlassPosition({x: offsetX, y: offsetY})
    setCursorPosition({x: lockedX, y: lockedY})
  };
  

  const handleRangeChange = (event) => {
    const value = event.target.value;
    const id = event.target.id
    if (id === "zoomValue") setZoomValues(value)
    if (id === "saturation") setSaturation(value)
  }

  const handleScroll = (event) => {
    const scrollSensitivity = 1;
    const delta = event.deltaY < 0 ? -scrollSensitivity : scrollSensitivity;
    const val = Number(zoomValue) + delta
    const newValue = Math.max(1, Math.min(10, val));

    setZoomValues(newValue);
  };

  const handleArrowChange = (event) => {
    if (event.key == 'ArrowLeft' && saturation > 0) {
      const val = saturation - 2
      setSaturation(val)
    } else if (event.key == 'ArrowRight' && saturation < 200) {
      const val = saturation + 2
      setSaturation(val)
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
        <MainMagnifyingGlass 
        cursorPosition={cursorPosition} 
        glassPosition={glassPosition}
        zoomValue={zoomValue} 
        lock={lock}
        saturation={saturation}
        mouseOver={mouseOver}/>
      </div>
      <div className='zoom-container' onChange={handleRangeChange}>
        <ZoomController zoomValue={zoomValue}/>
      </div>
      <div className='saturation-container' onChange={handleRangeChange} tabIndex={0} onKeyDown={handleArrowChange}>
        <SaturationController saturation={saturation}/>
      </div>
      <div className='eventLayer'></div>
    </div>
  )
}
