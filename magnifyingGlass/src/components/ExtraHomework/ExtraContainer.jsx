import React, { useRef, useState } from 'react'
import ImageHolder from '../../middleware/ImageHolder';
import RgbController from '../../middleware/RgbController';
import SizeController from '../../middleware/SizeController';
import ExtraController from '../../middleware/ExtraController';
import ExtraGlass from './ExtraGlass';
import ExtraSizeController from '../../middleware/ExtraSizeController';

export default function ExtraContainer() {

  const [zoomValue, setZoomValues] = useState(2)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [glassPosition, setGlassPosition] = useState({ x: 0, y: 0 });
  const [rgbValue, setRgbValue] = useState({ r: 100, g: 100, b: 100 });
  const [lock, setLock] = useState(false);
  const [glassSize, setGlassSize] = useState(50);
  const [glassRadius, setGlassRadius] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mouseOver, setMouseOver] = useState(false)
  const BORDER_WIDTH = 4
  const containerRef = useRef(null);
  const rangeRef = useRef(null);
  const rangeInputRef = useRef(null);


  const handleMouseMove = (event) => {
    const container = containerRef.current;
    const containerLeft = container.getBoundingClientRect().left;
    const containerTop = container.getBoundingClientRect().top;
    const containerWidth = container.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;


    const cursorDiamater = glassSize * 2 + BORDER_WIDTH
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
    console.log(value)
    if (id === "zoomValue") setZoomValues(value)
    if (id === "red") setRgbValue(prevState => ({...prevState, r: value}))
    if (id === "green") setRgbValue(prevState => ({...prevState, g: value}))
    if (id === "blue") setRgbValue(prevState => ({...prevState, b: value}))
    if (id === "size") setGlassSize(value)
    if (id === "radius") setGlassRadius(value)
    if (id === "zoomLevel") setZoomLevel(value)
  }

  const handleScroll = (event) => {
    const scrollSensitivity = 1;
    const delta = event.deltaY < 0 ? -scrollSensitivity : scrollSensitivity;
    const newValue = Math.max(1, Math.min(zoomLevel, zoomValue + delta));

    rangeRef.current.value = newValue;
    setZoomValues(newValue);
  };

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
        <ImageHolder rgbValue={rgbValue}/>
        <ExtraGlass 
        cursorPosition={cursorPosition} 
        glassPosition={glassPosition}
        zoomValue={zoomValue} 
        lock={lock}
        rgbValue={rgbValue}
        mouseOver={mouseOver}
        glassSize={glassSize}
        glassRadius={glassRadius}
        zoomLevel={zoomLevel}/>
      </div>
      <div className='scale-container' ref={rangeRef} onChange={handleRangeChange} >
        <ExtraSizeController zoomValue={zoomValue} zoomLevel={zoomLevel}/>
      </div>
      <div className='extra-container' onChange={handleRangeChange}>
        < ExtraController glassRadius={glassRadius} glassSize={glassSize} zoomLevel={zoomLevel}/>
      </div>
      <div className='rgb-container' ref={rangeInputRef} onChange={handleRangeChange}>
        <RgbController rgbValue={rgbValue}/>
      </div>
      <div className='eventLayer'></div>
    </div>
  )
}
